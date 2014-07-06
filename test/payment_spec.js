var request = require("supertest");

var mongoose = require("mongoose"),
    mockgoose = require("mockgoose");

mockgoose(mongoose);

var app = require("../app");

var User = require("../models/user"),
    Product = require("../models/product"),
    Order = require("../models/order"),
    Payment = require("../models/payment");


describe("Payment", function () {
    var user;
    var order;
    var payment;

    beforeEach(function (done) {
        mockgoose.reset();
        user = new User({name: "sofia", phone: "13200000000"});
        order = new Order({address: 'address', name: 'sofia', phone: '13200000000'});
        payment = new Payment({payType: "CASH"});
        payment.save(function (err, payment) {
            order.payment = payment;
            user.orders.push(order);
            user.save(done);
        });
    });

    afterEach(function (done) {
        mockgoose.reset();
        done();
    });

    describe("GET", function () {
        it("should return 200", function (done) {
            request(app)
                .get("/users/" + user.id + "/orders/" + order.id + "/payment")
                .expect(200)
                .end(function(err, res) {
                    res.body.should.have.property("uri", "/users/" + user.id + "/orders/" + order.id);
                    res.body.should.have.property("address", "address");
                    res.body.should.have.property("payment", {
                        uri: "/users/" + user.id + "/orders/" + order.id + "/payment",
                        payType: "CASH"
                    });
                    done();
                });
        });
    });
});