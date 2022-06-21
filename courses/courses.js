const Courses = require("../model/courses")

exports.registerCourse = async (req, res) => {
    const { name, email, phone, guardianName, guardianPhone, guardianAddress, course, duration, fee } = req.body
    if (name && email && phone && guardianName && guardianPhone && guardianAddress && course && duration && fee) {
        await Courses.create({
            name, email, phone, guardianName, guardianPhone, guardianAddress, course, duration, fee
        }).then(() => {
            res.status(200).send("Course registered successfully")
        })
    } else {
        res.status(404).json({ message: "Please fill all the fields" })
    }
}

exports.displayTrainees = async (req, res) => {
    await Courses.find({}).then(trainees => {
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