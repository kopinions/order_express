request = require('supertest');
require("should");
var mongoose = require('mongoose');
var mockgoose = require('mockgoose');
mockgoose(mongoose);
var app = require("../app");
var Product = require('../models/product');

describe("Product", function () {
    describe("GET", function () {
        describe("with exist product", function () {
            var product;
            var response;

            beforeEach(function (done) {
                mockgoose.reset();
                product = new Product({name: 'name', description: 'description'});
                product.save(done);
            });

            it('should get 200', function (done) {
                response = request(app).get('/products/' + product.id)
                    .expect(200)
                    .end(function(err, res) {
                        if (err) {
                            done(err);
                        }
                        res.body.should.have.property('name', 'name');
                        res.body.should.have.property('description', 'description');
                        res.body.should.have.property('uri', '/products/'+product.id)
                        done();
                    });
            });
        });

        describe("with none exist product", function () {
            it('should get 404', function (done) {
                request(app)
                    .get('/products/aunexistedidinmongoosedb')
                    .expect(404)
                    .end(function(err, res) {
                        if(err) {
                            done(err);
                        }
                        done();
                    });
            });
        });
    });

    describe("POST", function () {
        beforeEach(function (done) {
            mockgoose.reset();
            done();
        });

        it("should create product", function (done) {
            request(app)
                .post('/products')
                .send({name: 'name', description: 'description', price: {amount: 100, effectDate:"2014-01-01"}})
                .expect(201)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    }
                    Product.findOne({name: 'name'}, function(err, result) {
                        if(err) {
                            done(err);
                        }
                        result.should.have.property('id');
                        res.get('location').should.eql('/products/' + result.id);
                        result.historyPrices.length.should.be.eql(1);

                        result.getCurrentPrice(function (err, price) {
                            price.amount.should.eql(100);
                            done();
                        });
                    });
                });
        });
    });
});
