const Admin = require('../model/admin')

exports.Login = async (req, res, next) => {
    const { email, password } = req.body
    if (email && password) {
        await Admin.findOne({ email, password }).then(admin => {
            if (admin) {
                res.status(200).json({ message: "Login successful", admin })
            } else {
                res.status(404).json({ message: "Invalid credentials" })
            }
        })
    } else {
        res.status(404).json({ message: "Please fill all the fields" })
    }
}

exports.Register = async (req, res) => {
    const { name, email, password } = req.body
    if (name && email && password) {
        await Admin.create({
            name, email, password
        }).then(() => {
            res.status(200).send("Admin registered successfully")
        })
    } else {
        res.status(404).json({ message: "Please fill all the fields" })
    }
}