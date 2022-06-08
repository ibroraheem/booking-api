const mongoose = require('mongoose')
const dotenv = require('dotenv')
const url = process.env.MONGO_URI || "mongodb+srv://ibro:ibro@cluster0.4jxx3fe.mongodb.net/?retryWrites=true&w=majority"


const connectDB =  () => {
   mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  console.log("MongoDB Connected")
}
module.exports = connectDB;