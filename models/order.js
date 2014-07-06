var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var OrderItem = new Schema({

});

var Order = new Schema({
    address: {type: String, required: true},
    phone: {type: String, required:true},
    name: {type: String, required: true}
});

module.exports = mongoose.model("Order", Order)