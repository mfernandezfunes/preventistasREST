'use strict'

let express = require('express');
let AppController = require('../controllers/app.controller');
let router = express.Router();

router.get('/', AppController.getRoot);

module.exports = router;