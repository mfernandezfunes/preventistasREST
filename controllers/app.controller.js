'use strict'

let rutaBase = "/";

let controller = {
    getRoot: (req, res) => {
        console.log(`GETTING: ${rutaBase}${req.url}`);
        res.json({
            'message': 'API REST v1'
        });
    }
};

module.exports = controller;