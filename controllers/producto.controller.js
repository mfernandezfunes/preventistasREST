'use strict'

let rutaBase = "/api/producto";
let Producto = require('../models/producto.model');
let controller = {
    saveProducto: function (req, res) {

        console.log(`POSTING: ${rutaBase}${req.url}${req.body}`)

        let producto = new Producto();

        let params = req.body;

        producto.code = params.code;
        producto.gtin = params.gtin;
        producto.title = params.title;
        producto.description = params.description;
        producto.category_id = params.category_id;
        producto.presentations = params.presentations;
        producto.family = params.family;
        producto.tags = params.tags;
        producto.date_created = new Date();
        producto.last_updated = '';

        console.log(producto)
        producto.save((err, productoStored) => {
            if (err) return res.status(500).send({
                message: "Error al guardar"
            });
            if (!productoStored) return res.status(404).send({
                message: 'No se ha podido guardar la producto'
            })
            return res.status(201).send({
                producto: productoStored
            })
        });
    },
    getProducto: function (req, res) {
        console.log(`GETTING: ${rutaBase}${req.url}`)
        let productoId = req.params.id;

        if (productoId == null) return res.status(404).send({
            message: 'El producto no existe'
        });
        producto.findById(productoId, (err, producto) => {
            if (err) return res.status(500).send({
                message: 'Error al devolver los datos. getproducto' + err
            });
            if (!producto) return res.status(404).send({
                message: 'El producto no existe'
            });
            return res.status(200).send({
                producto
            });
        });
    },
    getProductos: function (req, res) {
        console.log(`GETTING QUERY: ${rutaBase}${req.url}`)
        let search = {}
        search = req.query
        Producto.find(search).exec((err, productos) => {
            if (err) return res.status(500).send({
                message: 'Error al devolver los datos .getproductos'
            });
            if (!productos) return res.status(404).send({
                message: 'No existen productos para mostrar'
            });
            return res.status(200).send({
                productos
            });
        })
    },
    updateProducto: function (req, res) {
        console.log(`PATCHING: ${rutaBase}${req.url}`)
        let productoId = req.params.id;
        let update = req.body;
        update.modified = new Date();
        console.log(update)
        // {new:true} devuelve el objeto actualizado sino el antiguo
        producto.findByIdAndUpdate(productoId, update, {
            new: true
        }, (err, productoUpdated) => {
            if (err) return res.status(500).send({
                message: 'Error al actualizar los datos.'
            });
            if (!productoUpdated) return res.status(404).send({
                message: 'No existe la producto para actualizar'
            });
            return res.status(200).send({
                producto: productoUpdated
            });
        })
    },
    removeProducto: function (req, res) {
        console.log(`DELETING: ${rutaBase}${req.url}`)
        let productoId = req.params.id;
        producto.findOneAndRemove(productoId, (err, productoRemoved) => {
            if (err) return res.status(500).send({
                message: 'Error borrar los datos.'
            });
            if (!productoRemoved) return res.status(404).send({
                message: 'No se ha podido borrar la producto'
            });
            return res.status(204).send({
                producto: productoRemoved
            });
        })
    }
};

module.exports = controller;