var request = require("supertest");

var mongoose = require("mongoose"),
    mockgoose = require("mockgoose");

mockgoose(mongoose);

var app = require("../app");

var User = require("../models/user"),
    Product = require("../models/product"),
    Order = require("../models/order");


describe("Payment", function () {
    var user;
    var order;
    beforeEach(function (done) {
        mockgoose.reset();
        user = new User({name: "sofia", phone: "13200000000"});
        order = new Order({address: 'address', name: 'sofia', phone: '13200000000'});
        user.orders.push(order);
        user.save(done);
    });

    afterEach(function (done) {
        mockgoose.reset();
        done();
    });

    describe("GET", function () {
        it("should return 200", function (done) {
            request(app)
                .get("/users/" + user.id + "/orders/" + order.id + "/payment")
                .expect(200, done);
        });
    });
});