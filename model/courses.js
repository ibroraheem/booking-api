const mongoose = require('mongoose')

const CourseSchema = new mongoose.Schema({
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
    guardianName: {
        type: String,
        required: true
    },
    guardianPhone: {
        type: String,
        required: true
    },
    guardianAddress: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Course = mongoose.model("Course", CourseSchema)
module.exports = Course