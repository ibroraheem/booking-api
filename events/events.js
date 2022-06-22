const Events = require("../model/event")
const QRCode = require('qrcode')
require("dotenv").config()

exports.bookEvent = async (req, res, next) => {
    const { name, email, phone, event_date, event_duration, event_type } = req.body
    if (registrant_name && email && phone && event_date && event_duration && event_type) {
        await Events.create({
            registrant_name, email, phone, event_date, event_duration, event_type
        }).then(() => {

            let transporter = nodeMailer.createTransport({
                host: "smtp.zoho.com",
                secure: true,
                port: 465,
                auth: {
                    user: process.env.USER,
                    pass: process.env.PASS,
                },
            });

            const mailOptions = {
                from: "admin@malhub.com.ng",
                to: `${email}`,
                subject: `Hello ${name}`,
                body: `<h1>Welcome to Malhub</h1> <p>Your event has been booked successfully</p>`,
            }

            transporter.sendMail(mailOptions, (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(data);
                }

            })
            QRCode.toDataURL(`Name: ${registrant_name} <br /> Email: ${email} <br/> Phone: ${phone} <br/> Date: ${event_date} <br/> Duration: ${event_duration}<br /> Event Type: ${event_type}`, (err, url) => {
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