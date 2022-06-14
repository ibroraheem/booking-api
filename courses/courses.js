const Courses = require("../model/courses")

exports.registerCourse = async (req, res, next) => {
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