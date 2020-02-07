'use strict'

let express = require('express');
let ProformaController = require('../controllers/proforma.controller');
let router = express.Router();

router.post('/', ProformaController.saveProforma);
router.get('/', ProformaController.getProformas);
router.get('/:id', ProformaController.getProforma);
router.patch('/:id', ProformaController.updateProforma);
router.delete('/:id', ProformaController.removeProforma);

module.exports = router;