const Workspace = require('../model/workspace')

exports.bookWorkspace = async (req, res, next) => {
    const { name, email, phone, from, to, amount } = req.body
    if (name && email && phone && from && to && amount) {
        await Workspace.create({
            name, email, phone, from, to, amount
        }).then(() => {
            res.status(200).send("Workspace booked successfully")
        })
    } else {
        res.status(404).json({ message: "Please fill all the fields" })
    }
}
  