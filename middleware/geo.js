let config = require('../config/config')
let geocoder = NodeGeocoder(config.geoOptions);

// Using callback

geocoder.geocode('caboto 450 caba', function (err, res) {
    console.log(res);
});
/*
// Or using Promise
geocoder.geocode('av belgrano 1250 caba')
    .then(function (res) {
        console.log(res);
    })
    .catch(function (err) {
        console.log(err);
    });*/