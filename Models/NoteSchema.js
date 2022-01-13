const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ProductNoteSchema = {
    name: {
        type: String,
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
    subTotal: {
        type: Number,
        required: true
    }
}

const NoteSchema = new Schema({
    products: [ProductNoteSchema],
    date: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    total: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Note', NoteSchema)