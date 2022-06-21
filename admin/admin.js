require("dotenv").config
const Admin = require('../model/admin')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.Login = async (req, res) => {
    const { email, password } = req.body
    try {
        const admin = await Admin.findOne({ email })
        if (!admin) {
            return res.status(401).json({
                message: "Invalid Email"
            })
        }
        const isMatch = await bcrypt.compare(password, admin.password)
        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid Password"
            })
        }
        const token = jwt.sign({ id: admin._id }, process.env.TOKEN_SECRET, { expiresIn: "1h" })
        res.status(200).json({
            message: "Login Successful",
            token,
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Error logging in"
        })
    }
}



exports.Register = async (req, res) => {
    const { name, email, password } = req.body
    try {
        email = email.toLowerCase()
        const admin = await Admin.findOne({ email })
        if (admin) {
            return res.status(401).json({
                message: "Email already exists"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 12)
        const newAdmin = new Admin({
            name,
            email,
            password: hashedPassword
        })
        await newAdmin.save()
        res.status(201).json({
            message: "Admin created successfully"
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Error creating admin"
        })
    }
}
exports.Logout = async (req, res) => {
    req.logout()
    res.status(200).json({
        message: "Logout Successful"
    })

}

exports.ForgotPassword = async (req, res) => {
    const { email } = req.body
    try {
        const admin = await Admin.findOne({ email })
        if (!admin) {
            return res.status(401).json({
                message: "Invalid Email"
            })
        }
        const token = jwt.sign({ id: admin._id }, process.env.TOKEN_SECRET, { expiresIn: "1h" })
        res.status(200).json({
            message: "Password reset link sent to email",
            token
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Error resetting password"
        })
    }
}