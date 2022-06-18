const mongoose = require('mongoose')
const AdminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
})
const Admin = mongoose.model("Admin", AdminSchema)
module.exports = Admin