const mongoose = require('mongoose')
const dotenv = require('dotenv')
const url = process.env.MONGO_URI


const connectDB =  () => {
   mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  console.log("MongoDB Connected")
}
module.exports = connectDB;