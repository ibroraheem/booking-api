const mongoose = require('mongoose')


const WorkspaceSchema = new mongoose.Schema({
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
    from: {
        type: Date,
        required: true
    },
    to: {
        type: Date,
        required: true
    },
    
    createdAt: {
        type: Date,
        default:  Date.now
    }
})

const Workspace = mongoose.model("Workspace", WorkspaceSchema)
module.exports = Workspace