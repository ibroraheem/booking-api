const Courses = require("../model/courses")
const QRCode = require('qrcode')

exports.registerCourse = async (req, res) => {
    const { name, email, phone, guardianName, guardianPhone, guardianAddress, course } = req.body
    if (name && email && phone && guardianName && guardianPhone && guardianAddress && course) {
        await Courses.create({
            name, email, phone, guardianName, guardianPhone, guardianAddress, course
        }).then(() => {

            QRCode.toDataURL(`Name: ${name} <br /> Email: ${email} <br /> Phone: ${phone}<br /> Guardian Name: ${guardianName} <br /> Guardian Phone: ${guardianPhone} <br /> Guardian Address: ${guardianAddress} <br /> Course: ${course}`, (err, url) => {
                if (err) {
                    res.status(500).json({
                        message: "Error in generating QR Code",
                        error: err
                    })
                }
                else {
                    res.status(200).json({
                        message: "Course Registered Successfully",
                        url: url
                    })
                }

            })
        }).catch(err => {
            res.status(500).json({
                message: "Error in registering course",
                error: err
            })
        })
    } else {
        res.status(404).json({
            message: "Please fill all the fields"
        })
    }

}

exports.displayTrainees = async (req, res) => {
    await Courses.find({}).sort({ createdAt: -1 })
        .then(trainees => {
            res.status(200).json({
                message: "Trainees Displayed Successfully",
                trainees
            })
        }).catch(err => {
            res.status(500).json({
                message: "Error in displaying trainees",
                error: err
            })
        }
        )
}