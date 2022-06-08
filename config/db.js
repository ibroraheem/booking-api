const mongoose = require('mongoose')
const url = process.env.MONGODB_URI


const connectDB =  () => {
   mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  console.log("MongoDB Connected")
}
module.exports = connectDB;