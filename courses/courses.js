const Courses = require("../model/courses")

exports.registerCourse = async (req, res, next) => {
    const { name, email, phone, guardian_name, guardian_phone, guardian_address, course, stack, duration, fee } = req.body
    if (name && email && phone && guardian_name && guardian_phone && guardian_address && course && stack && duration && fee) {
        await Courses.create({
            name, email, phone, guardian_name, guardian_phone, guardian_address, course, stack, duration, fee
        }).then(() => {
            res.status(200).send("Course registered successfully")
        })
    } else {
        res.status(404).json({ message: "Please fill all the fields" })
    }
}