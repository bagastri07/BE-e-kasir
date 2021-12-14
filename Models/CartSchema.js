const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    }
})

const CartSchema = new Schema.Types({
    products: [itemSchema],
    subTotal: {
        default: 0,
        type: Number
    }
})

module.exports = mongoose.model('Cart', CartSchema)