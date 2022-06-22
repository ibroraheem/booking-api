const Courses = require("../model/courses")
const nodeMailer = require('nodemailer');
const QRCode = require('qrcode')

exports.registerCourse = async (req, res) => {
    const { name, email, phone, guardianName, guardianPhone, guardianAddress, course, duration, fee } = req.body
    if (name && email && phone && guardianName && guardianPhone && guardianAddress && course && duration && fee) {
        await Courses.create({
            name, email, phone, guardianName, guardianPhone, guardianAddress, course, duration, fee
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
                from: "adminn@malhub.com.ng",
                to: `${email}`,
                subject: `Hello ${name}`,
                body: `<h1>Welcome to Malhub</h1> <p>Your course has been registered successfully</p>`,
            }

            transporter.sendMail(mailOptions, (err, data) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(data);
                }
            })
            QRCode.toDataURL(`${name} ${email} ${phone} ${guardianName} ${guardianPhone} ${guardianAddress} ${course} ${duration} ${fee}`, (err, url) => {
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
    await Courses.find({}).sort({createdAt: -1})
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