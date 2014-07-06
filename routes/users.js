var express = require('express');
var router = express.Router();
var Order = require('../models/order');
var User = require('../models/user');


/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.get('/:user_id/orders/:order_id', function (req, res) {
    console.log(req.param('user_id'));
    User.findById(req.param('user_id'), function (err, user) {
        if (err || !user) {
            return res.send(404);
        }

        Order.findById(req.param('order_id'), function (err, order) {
            if(err || order === null) {
                return res.send(404);
            }
            var order_uri = '/users/' + req.param('user_id') + '/orders/' + order.id;
            res.send(200, {order: {address: order.address, phone: order.phone, name: order.name, uri: order_uri}});
        });
    });


});

module.exports = router;
