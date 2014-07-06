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
                response = request(app)
                    .get('/products/' + product.id);
            });

            it('should get 200', function (done) {
                    response
                    .expect(200)
                    .end(function(err, res) {
                        if(err) {
                            done(err);
                        }
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
});
