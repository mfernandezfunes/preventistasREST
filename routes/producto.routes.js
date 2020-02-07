'use strict'

let express = require('express');
let ProductoController = require('../controllers/producto.controller');
let router = express.Router();

// Middlewares
const auth = require('../middlewares/auth');

router.post('/', ProductoController.saveProducto);
router.get('/', ProductoController.getProductos);
router.get('/:id', ProductoController.getProducto);
router.patch('/:id', ProductoController.updateProducto);
router.delete('/:id', ProductoController.removeProducto);

module.exports = router;