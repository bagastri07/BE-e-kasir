const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ProductNoteSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: String,
        required: true
    }
})

const NoteSchema = new Schema({
    products: [ProductNoteSchema],
    date: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Note', NoteSchema)