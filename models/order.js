var mongoose = require('mongoose');

var Product = require("./product");
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.ObjectId;

var OrderItem = new Schema({
    productId: {type: ObjectId, ref: Product.schema},
    quantity: {type: Number, required: true}
});

var Order = new Schema({
    address: {type: String, required: true},
    phone: {type: String, required:true},
    name: {type: String, required: true},
    orderItems: [OrderItem]
});

module.exports = mongoose.model("Order", Order)