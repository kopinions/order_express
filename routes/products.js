var express = require('express');
var router = express.Router();
var product = require('../models/product');

router.get('/:id', function (req, res) {
    return product.findById(req.params.id, function(err, result) {
        if(err || result === null) {
            return res.send(404);
        }
        return res.send(200);
    });
});

module.exports = router;