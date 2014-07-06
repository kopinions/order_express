var mongoose = require("mongoose");


var Schema = mongoose.Schema;

var Product = new Schema({
    name: {type: String},
    description: {type: String}
});

var exports = mongoose.model("Product", Product);
module.exports = exports;