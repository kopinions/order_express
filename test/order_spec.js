var request = require("supertest");

require("should");

var app = require("../app");


describe("Order", function () {
    describe("GET", function () {
        it("should return 200", function (done) {
            request(app)
                .get("/users/1/orders/2")
                .expect(200, done);
        });
    });
});