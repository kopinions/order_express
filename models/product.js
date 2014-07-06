var mongoose = require("mongoose");
//var Price = require('./price');

var Schema = mongoose.Schema;

var Price = new Schema({
    amount: {type: Number},
    effectDate: {type: Date, required: true}
});

var Product = new Schema({
    name: {type: String},
    description: {type: String},
    historyPrices: [Price]
});

var exports = mongoose.model("Product", Product);
module.exports = exports;