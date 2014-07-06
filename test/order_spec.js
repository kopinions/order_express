var request = require("supertest");
var mockgoose = require('mockgoose');
var mongoose = require('mongoose');
mockgoose(mongoose);
require("should");

var Order = require('../models/order');
var User = require("../models/user");

var app = require("../app");


describe("Order", function () {
    describe("GET", function () {
        describe("with exist user", function () {
            var user;

            beforeEach(function (done) {
                mockgoose.reset();
                user = new User({name: "sofia", phone: "13200000000"});
                user.save(done);
            });
            afterEach(function (done) {
                mockgoose.reset();
                done();
            });

            describe("with exist order", function () {
                var order;
                beforeEach(function (done) {
                    order = new Order({address: "address", name: "name", phone: "13200000000"});
                    order.save(done);
                });
                it("should return 200", function (done) {
                    request(app)
                        .get("/users/" + user.id+ "/orders/" + order.id)
                        .expect(200)
                        .end(function(err, res) {
                            res.body.should.have.property('order', {
                                address: 'address',
                                phone: '13200000000',
                                name: 'name',
                                uri: "/users/" + user.id+ "/orders/" + order.id});
                            done();
                        });
                });
                afterEach(function (done) {
                    mockgoose.reset("Order");
                    done();
                });
            });

            describe("with non exist order", function () {
                it("should return 404", function (done) {
                    request(app)
                        .get("/users/1/orders/aunexistedidinmongoosedb")
                        .expect(404, done);
                });
            });
        });

        describe("with not exist user", function () {
            it("should get 404", function (done) {
                var order = new Order({address: "address", name: "name", phone: "13200000000"});
                order.save(done);
                request(app)
                    .get("/users/notexistuseridinmongoose/orders/" + order.id)
                    .expect(404, done);
            });
        });
    });

    describe("POST", function() {
        it("should create an order for user", function (done) {
            request(app)
                .post("/users/1/orders")
                .expect(201, done);
        });
    })
});