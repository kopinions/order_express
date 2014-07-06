var mongoose = require("mongoose");
var order = require("./user");

var Schema = mongoose.Schema;

var User = new Schema({
    name: {type: String, required: true},
    phone: {type: String, required: true},
    orders: [mongoose.model("Order")]
});

module.exports = mongoose.model("User", User);