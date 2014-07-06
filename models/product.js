var mongoose = require("mongoose");

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

Product.methods.getCurrentPrice = function (cb) {
    return this.model('Product').find().sort('-historyPrices.effectDate').findOne().exec(function(err, result) {
        cb(err, result.historyPrices[0])
    });
};

module.exports = mongoose.model("Product", Product);
