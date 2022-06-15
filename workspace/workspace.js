const Workspace = require('../model/workspace')
const QRCode = require('qrcode')

exports.bookWorkspace = async (req, res, next) => {
    var { name, email, phone, from, to, amount } = req.body
    if (name && email && phone && from && to && amount) {
        await Workspace.create({
            name, email, phone, from, to, amount
        }).then(() => {
            QRCode.toDataURL(`${name} ${email} ${phone} ${from} ${to} ${amount}`, (err, url) => {
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
exports.bookedSpaces = async (req, res, next) => {
    await Workspace.find({}).then(async (data) => {
        res.status(200).json({
            message: "Booked Spaces",
            data: data
        })
    }).catch(err => {
        res.status(500).json({
            message: "Error in getting booked spaces",
            error: err
        })
    })
}