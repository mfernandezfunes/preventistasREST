'use strict'

let rutaBase = "/api/proforma";

let Proforma = require('../models/proforma.model');
let controller = {
    saveProforma: function (req, res) {

        console.log(`POSTING: ${rutaBase}${req.url}${req.body}`)
        console.log(`${req}`)
        let proforma = new Proforma();

        let params = req.body;

        proforma.cuit = params.cuit;
        proforma.razonSocial = params.razonSocial;
        proforma.nombreFantasia = params.nombreFantasia;
        proforma.address = params.address;
        proforma.phone = params.phone;
        proforma.geoCode = {};
        proforma.email = params.email;
        proforma.legajoVendedor = params.legajoVendedor;
        proforma.created = new Date();
        proforma.modified = '';

        console.log(proforma)

        proforma.save((err, proformaStored) => {
            if (err) return res.status(500).send({
                message: "Error al guardar en conformacion de datos"
            });
            if (!proformaStored) return res.status(404).send({
                message: 'No se ha podido guardar la proforma'
            })
            return res.status(201).send({
                proforma: proformaStored
            })
        });
    },
    getProforma: function (req, res) {
        console.log(`GETTING: ${rutaBase}${req.url}`)
        let proformaId = req.params.id;

        if (proformaId == null) return res.status(404).send({
            message: 'La proforma no existe'
        });
        Proforma.findById(proformaId, (err, proforma) => {
            if (err) return res.status(500).send({
                message: 'Error al devolver los datos. getproforma' + err
            });
            if (!proforma) return res.status(404).send({
                message: 'La proforma no existe'
            });
            return res.status(200).send({
                proforma
            });
        });
    },
    getProformas: function (req, res) {
        console.log(`GETTING QUERY: ${rutaBase}${req.url}`)
        let search = {}
        search = req.query
        Proforma.find(search).exec((err, proformas) => {
            if (err) return res.status(500).send({
                message: 'Error al devolver los datos .getProformas'
            });
            if (!proformas) return res.status(404).send({
                message: 'No existen proformas para mostrar'
            });
            return res.status(200).send({
                proformas
            });
        })
    },
    updateProforma: function (req, res) {
        console.log(`PATCHING: ${rutaBase}${req.url}`)
        let proformaId = req.params.id;
        let update = req.body;
        update.modified = new Date();
        console.log(update)
        // {new:true} devuelve el objeto actualizado sino el antiguo
        Proforma.findByIdAndUpdate(proformaId, update, {
            new: true
        }, (err, proformaUpdated) => {
            if (err) return res.status(500).send({
                message: 'Error al actualizar los datos.'
            });
            if (!proformaUpdated) return res.status(404).send({
                message: 'No existe la proforma para actualizar'
            });
            return res.status(200).send({
                proforma: proformaUpdated
            });
        })
    },
    removeProforma: function (req, res) {
        console.log(`DELETING: ${rutaBase}${req.url}`)
        let proformaId = req.params.id;
        Proforma.findOneAndDelete({
            '_id': proformaId
        }, (err, proformaRemoved) => {
            if (err) return res.status(500).send({
                message: 'Error borrar los datos.'
            });
            if (!proformaRemoved) return res.status(404).send({
                message: 'No se ha podido borrar la proforma'
            });
            return res.status(204).send({
                message: 'Resource Deleted Successfully',
                proforma: proformaRemoved
            });
        })
    }
};

module.exports = controller;