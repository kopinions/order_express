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
                .send({name: 'name', description: 'description', price: {price: 100}})
                .expect(201)
                .expect('Location', /\/products\/.{24}/)
                .end(function () {
                    Product.count(function (err, count) {
                        if (count === 1) {
                            return done();
                        }

                        done('product should be 1 after create');
                    })
                });

        });
    });
});
