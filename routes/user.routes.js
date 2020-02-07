'use strict';

const express = require('express');
const api = express.Router();

// Controladores
const UserController = require('../controllers/user.controller');

// Middlewares
const auth = require('../middlewares/auth');


/*************************
 **		END POINTS		**
 *************************/

// Ruta para registro de usuarios
api.post('/signup', UserController.signUp);

// Ruta para inicio de sesión de usuario
api.post('/signin', UserController.signIn);

// Ruta para eliminar usuarios según su email
api.delete('/user/', auth, UserController.deleteUser);

// Ruta de pruebas para autenticación
api.get('/private', auth, (req, res) => {
    res.status(200).send({
        message: 'Acces granted ^_^'
    })
});

module.exports = api;