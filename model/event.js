const mongoose = require('mongoose')
const EventSchema = new mongoose.Schema({
    registrant_name: {
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
    event_date: {
        type: String,
        required: true
    },
    event_duration: {
        type: String,
        required: true
    },
    event_type: {
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