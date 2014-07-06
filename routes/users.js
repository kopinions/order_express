var express = require('express');
var router = express.Router();
var Order = require('../models/order');
/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.get('/:user_id/orders/:order_id', function (req, res) {
    Order.findById(req.param('order_id'), function (err, order) {
        var order_uri = '/users/' + req.param('user_id') + '/orders/' + order.id;
        res.send(200, {order: {address: order.address, phone: order.phone, name: order.name, uri: order_uri}});
    });
});

module.exports = router;
