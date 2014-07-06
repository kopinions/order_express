var express = require('express');
var router = express.Router();
var Order = require('../models/order');
var User = require('../models/user');


/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.get('/:user_id/orders/:order_id', function (req, res) {
    User.findById(req.param('user_id'), function (err, user) {
        if (err || !user) {
            return res.send(404);
        }
        User.findOne({'orders._id': req.param('order_id')}, function (err, user) {
            if(err || user === null) {
                return res.send(404);
            }
            var order_uri = '/users/' + req.param('user_id') + '/orders/' + user.orders[0].id;

            res.send(200, {order:
                {
                    address: user.orders[0].address,
                    phone: user.orders[0].phone,
                    name: user.orders[0].name,
                    uri: order_uri,
                    orderItems: user.orders[0].orderItems.map(function(item) { return {uri: order_uri + "/orderItems/" + item.id}})
                }});
        });
    });
});

router.post('/:user_id/orders', function (req, res) {
    User.findById(req.param("user_id"), function (err, user) {
        if(err || !user) {
            return res.send(400);
        }
        var order = new Order({address: req.param("address"), phone: req.param("phone"), name: req.param("name")});

        req.param("orderItems").map(function (item) {
            order.orderItems.push(item);
        });

        user.orders.push(order);
        user.save(function (err, result) {
            res.location("/users/" + req.param("user_id") + "/orders/" + result.id);
            res.send(201);
        });
    });

});

module.exports = router;
