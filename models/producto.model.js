'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductoSchema = Schema({
    code: {
        type: String,
        trim: true,
        required: true
    },
    gtin: {
        type: String,
        minLength: [13, 'Cantidad invalida de caracteres < 13'],
        maxLength: [13, 'Cantidad invalida de caracteres < 13'],
        trim: true,
        required: true
    },
    title: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    category_id: {
        type: Array
    },
    presentations: {
        type: Array
    },
    family: {
        type: Array
    },
    tags: {
        type: Array
    },
    date_created: {
        type: Date,
        default: Date.now
    },
    last_updated: {
        type: Date
    }
});

module.exports = mongoose.model('Producto', ProductoSchema);