var request = require("supertest");
var mockgoose = require('mockgoose');
var mongoose = require('mongoose');
mockgoose(mongoose);
require("should");

var Order = require('../models/order');

var app = require("../app");


describe("Order", function () {
    describe("GET", function () {
        describe("with exist user", function () {
            describe("with exist order", function () {
                var order;
                beforeEach(function (done) {
                    mockgoose.reset();
                    order = new Order({address: "address", name: "name", phone: "13200000000"});
                    order.save(done);
                });
                it("should return 200", function (done) {
                    request(app)
                        .get("/users/1/orders/" + order.id)
                        .expect(200)
                        .end(function(err, res) {
                            res.body.should.have.property('order', {
                                address: 'address',
                                phone: '13200000000',
                                name: 'name',
                                uri: '/users/1/orders/'+order.id});
                            done();
                        });
                });
                afterEach(function (done) {
                    mockgoose.reset();
                    done();
                });
            });

            describe("with non exist order", function() {
                it("should return 404", function (done) {
                    request(app)
                        .get("/users/1/orders/aunexistedidinmongoosedb")
                        .expect(404, done);
                });
            })
        });

    });
});