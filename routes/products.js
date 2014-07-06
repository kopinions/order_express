var express = require('express');
var router = express.Router();
var Product = require('../models/product');

router.get('/:id', function (req, res) {
    return Product.findById(req.params.id, function(err, result) {
        if(err || result === null) {
            return res.send(404);
        }
        return res.send(200, {name: result.name, description: result.description, uri: '/products/'+result.id});
    });
});

router.post('/', function (req, res) {
    var product = new Product({
        name: req.param('name'),
        description: req.param('description')
    });

    product.historyPrices.push(req.body.price);

    product.save(function(err, result) {
        if(err || result === null) {
            return res.send(400);
        }
        res.location('/products/' + result.id);
        res.send(201);
    });

});

module.exports = router;