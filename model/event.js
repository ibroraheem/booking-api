const mongoose = require('mongoose')
const EventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    happened: {
        type: Boolean,
        default: false,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})
const Event = mongoose.model("Event", EventSchema)
module.exports = Event