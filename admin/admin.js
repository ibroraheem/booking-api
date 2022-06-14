const Admin = require('../model/admin')
const bcrypt = require("bcrypt");
exports.Login = async (req, res, next) => {
    const{email, password} = req.body
    if(email && password){
        const validPassword = await bcrypt.compare(password, password)
        if(validPassword){
            await Admin.findOne({email}).then(admin => {
                res.status(200).json({
                    message: "Login successful",
                    admin
                })
            }).catch(err => {
                res.status(404).json({
                    message: "Login failed",
                    err
                })
            })
        }else{
            res.status(404).json({
                message: "Login failed"
            })
        }
    }else{
        res.status(404).json({
            message: "Login failed"
        })
    }   
    
}

exports.Register = async (req, res) => {
    const { name, email, password } = req.body
    if (name && email && password) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        await Admin.create({
            name, email, password: hash
        }).then(() => {
            res.status(200).json({ message: "Admin registered successfully" })
        }).catch(err => {
            res.status(404).json({ message: "Admin already exists" })
        }).catch(err => {
            res.status(404).json({ message: "Please fill all the fields" })
        }).catch(err => {
            res.status(404).json({ message: "Something went wrong" })
        }).catch(err => {
            res.status(404).json({ message: "Something went wrong" })
        }
        )
    } else {
        res.status(404).json({ message: "Please fill all the fields" })
    }

}