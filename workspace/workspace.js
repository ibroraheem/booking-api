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

            QRCode.toDataURL(`
            Name: ${name} 
            Email: ${email} 
            Phone: ${phone}
            Booked From: ${from}
            Till: ${to}`, (err, url) => {
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
