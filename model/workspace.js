const mongoose = require('mongoose')
const WorkspaceSchema = new mongoose.Schema({
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
    from:{
        type: String,
        required: true
    }, 
    to:{
        type: String,
        required: true
    },
    amount:{
        type: String,
        required: true
    }
})

const Workspace = mongoose.model("Workspace", WorkspaceSchema)
module.exports = Workspace