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
        type: String,
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
    happened:{
        type: Boolean,
        default: false, 
        required: false
    }
})
const Event = mongoose.model("Event", EventSchema)
module.exports = Event