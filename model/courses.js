const mongoose = require('mongoose')
const CourseSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    guardian_name:{
        type: String,
        required: true
    },
    guardian_phone:{
        type: String,
        required: true
    },
    guardian_address:{
        type: String,
        required: true
    },
    course:{
        type: String,
        required: true
    },
    stack:{
        type: String,
    },
    duration:{
        type: String,
        required: true
    },
    fee:{
        type: String,
        required: true
    }
})

const Course = mongoose.model("Course", CourseSchema)
module.exports = Course