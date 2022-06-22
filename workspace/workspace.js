const Workspace = require('../model/workspace')
require("dotenv").config()
const nodeMailer = require('nodemailer');
const QRCode = require('qrcode')

exports.bookWorkspace = async (req, res, next) => {
    var { name, email, phone, from, to } = req.body
    if (name && email && phone && from && to) {
        await Workspace.create({
            name, email, phone, from, to
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
                body: `<h1>Welcome to Malhub</h1> <p>Your space has been booked successfully</p>`,
            }

            transporter.sendMail(mailOptions, (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(data);
                }
            })

            QRCode.toDataURL(`Name: ${name} <br /> Email: ${email} <br /> Phone: ${phone} <br /> Booked From: ${from} <br /> Till: ${to}`, (err, url) => {
                if (err) {
                    res.status(500).json({
                        message: "Error in generating QR Code",
                        error: err
                    })
                } else {
                    res.status(200).json({
                        message: "Workspace Booked Successfully",
                        url: url
                    })

                }
            })
        }).catch(err => {
            res.status(500).json({
                message: "Error in booking workspace",
                error: err
            })
        })

    } else {
        res.status(404).json({ message: "Please fill all the fields" })
    }
}
exports.bookedSpaces = async (req, res) => {
    await Workspace.find({}).sort({ to: 1 }).then(workspace => {
        res.status(200).json({
            message: "Workspace Booking Successfully Displayed",
            workspace
        })
    }).catch(err => {
        res.status(500).json({
            message: "Error in displaying workspace",
            error: err
        })
    })
} 
