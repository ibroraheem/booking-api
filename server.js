const express = require('express');
const app = express();
const cors = require("cors");
const connectDB = require("./config/db");
const dotenv = require('dotenv');
dotenv.config();
connectDB();
app.use(express.json())
app.use(cors())
app.get('/', (req, res) => {
    res.status(200).send("Hello World")
})
app.use("/", require("./routes/booking"))
app.use("/admin", require("./routes/admin"))
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})