const mongoose = require('mongoose')

const url = process.env.MONGODB_URL
const connectDB = async () => {
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  console.log("MongoDB Connected")
}
module.exports = connectDB