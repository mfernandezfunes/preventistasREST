/**
 * Arquivo: app.js
 * Descripcion: Archivo principal y responsable de la ejecucion de la aplicacion
 * fecha: 28/01/2020
 * Author: Martin Fernandez Funes
 */
'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const logger = require('simple-express-logger');

const config = require('./config/config.js');

// const errorhandler = require('errorhandler')
let connected = false;

const app = express();

// Cargar archivos de rutas
let app_routes = require('./routes/app.routes');
let user_routes = require('./routes/user.routes');
let proforma_routes = require('./routes/proforma.routes');
let producto_routes = require('./routes/producto.routes');


// Midlewares API - Configuración
app.use(bodyParser.json({
    limit: '50mb',
    extended: true
}));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
}));
app.use(cors());
app.set('port', config.puerto);
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); // origenes front permitidos
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
app.use('*', (req, res, next) => {
    !connected ?
        res.status(500).json({
            error: true,
            data: {
                msg: 'Sin conexión con la Base de datos, reintente más tarde'
            }
        }) :
        next()
});

app.use(logger());

mongoose.Promise = global.Promise;

app.use('/static', express.static('uploads'));

// Rutas
app.use('/', app_routes);
app.use('/api', user_routes);
app.use('/api/proforma', proforma_routes);
app.use('/api/producto', producto_routes);


// Conexión con la base de datos
mongoose
    .connect(`mongodb:${config.dbDomain}:${config.dbPort}/${config.dbName}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

console.log(`Tryin to connect to Mongoose at ${config.dbDomain}:${config.dbPort} ..`)

mongoose.connection
    .on('connected', function () {
        console.log('Successfully connected to Mongoose..')
    })
    .on('error', function (err) {
        console.log(`Mongoose error ${err}`)
    })
    .on('disconnected', function (err) {
        console.log('Mongoose disconnected..')
    })
    .then(() => {
        connected = true;
        // Inicialización del servicio
        app.listen(config.appPort, function (err) {
            console.log(`API server ejecutandose en http:${config.dbDomain}:${config.appPort}`);
            console.log('Listening ...')
            if (err) {
                console.error('Unable to listen for connections', err);
                process.exit(1);
            }
        });
    })
    .catch(err => {
        connected = false
    })

// Exportar
module.exports = app;