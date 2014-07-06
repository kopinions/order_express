request = require('supertest');
require("should");
var app = require("../app");

describe("Product", function () {
    describe("GET", function () {
        describe("with exist product", function () {
            it('should get 200', function (done) {
                request(app)
                    .get('/products/1')
                    .expect(200)
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
