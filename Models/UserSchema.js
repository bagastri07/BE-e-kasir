const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const titleCase = require('../_helpers/titleCase')

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
})

UserSchema.pre('save', function (next) {
    // capitalize
    this.name = titleCase(this.name)
    next()
  })

module.exports = mongoose.model('User', UserSchema)