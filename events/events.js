const Events = require("../model/event")
const QRCode = require('qrcode')
require("dotenv").config()

exports.bookEvent = async (req, res) => {
    const { name, email, phone, date, duration, type } = req.body
    if (name && email && phone && date && duration && type) {
        await Events.create({
            name, email, phone, date, duration, type
        }).then(() => {

                        QRCode.toDataURL(`Name: ${name} Email: ${email} Phone: ${phone}  Date: ${date} Duration: ${duration} Event Type: ${type}`, (err, url) => {
                if (err) {
                    res.status(500).json({
                        message: "Error in generating QR Code",
                        error: err
                    })
                } else {
                    res.status(200).json({
                        message: "Event Booked Successfully",
                        url: url
                    })

                }
            })

        })
    } else {
        res.status(404).json({ message: "Please fill all the fields" })
    }
}
exports.bookedEvents = async (req, res, next) => {
    await Events.find({}).sort({ createdAt: -1 })
        .then(events => {
            res.status(200).json({
                message: "Booked Events Displayed Successfully",
                events: events
            })
        }).catch(err => {
            res.status(500).json({
                message: "Error in displaying booked events",
                error: err
            })
        }
        )
}