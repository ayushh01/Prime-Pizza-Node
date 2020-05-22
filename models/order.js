const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    dish:{
        type:String,
        required:true
    }
});

const Order = mongoose.model('Order',OrderSchema);

module.exports = Order;