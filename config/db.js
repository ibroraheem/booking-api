const mongoose = require('mongoose')
const url = process.env.MONGODB_URL || 'mongodb://localhost:27017/booking'


const connectDB =  () => {
   mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  console.log("MongoDB Connected")
}
module.exports = connectDB;