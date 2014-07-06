var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Payment = new Schema({
    payType: {type: String, enum: ["CASH"]},
    payTime: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Payment", Payment);