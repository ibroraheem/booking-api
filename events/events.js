const Events = require("../model/event")
const QRCode = require('qrcode')

exports.bookEvent = async (req, res, next) => {
    const { registrant_name, email, phone, event_date, event_duration, event_type } = req.body
    if (registrant_name && email && phone && event_date && event_duration && event_type) {
        await Events.create({
            registrant_name, email, phone, event_date, event_duration, event_type
        }).then(() => {
            QRCode.toDataURL(`${registrant_name} ${email} ${phone} ${event_date} ${event_duration} ${event_type}`, (err, url) => {
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