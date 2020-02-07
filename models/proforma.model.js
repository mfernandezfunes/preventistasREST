'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProformaSchema = Schema({
    cuit: {
        type: String,
        minLength: [11, 'Cantidad invalida de caracteres < 11'],
        maxLength: [11, 'Cantidad invalida de caracteres < 11'],
        trim: true,
        required: true
    },
    razonSocial: {
        type: String,
        trim: true,
        required: true
    },
    nombreFantasia: {
        type: String,
        trim: true,
        required: true
    },
    address: {
        type: String,
        trim: true,
        required: true
    },
    geoCode: {
        type: JSON
    },
    phone: {
        type: String,
        minLength: [7, 'El numero es demasiado corto!'],
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        lowercase: true,
        trim: true
    },
    legajoVendedor: {
        type: String,
        trim: true,
        required: true
    },
    date_created: {
        type: Date
    },
    last_updated: {
        type: Date
    }
});

module.exports = mongoose.model('Proforma', ProformaSchema);