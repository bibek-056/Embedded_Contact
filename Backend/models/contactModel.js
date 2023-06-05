const mongoose = require('mongoose')

const Schema = mongoose.Schema

const contactSchema = new Schema ({
    name: {
        type: String,
        required: true,
    },
    whatsApp: {
        type: Number,
        required: true
    },
    messenger: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    contactNo: {
        type: Number,
        required: true
    },
    whatsAppQR: {
        type: String,
        required: true
    },
    messengerQR: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Contact', contactSchema)