var express = require('express');
var router = express.Router();
var product = require('../models/product');

router.get('/:id', function (req, res) {
    return product.findById(req.params.id, function(err, result) {
        if(err || result === null) {
            return res.send(404);
        }
        console.log(result);
        return res.send(200, {name: result.name, description: result.description, uri: '/products/'+result.id});
    });
});

router.post('/', function (req, res) {
    res.send(201);
});

module.exports = router;