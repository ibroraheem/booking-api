const Events = require("../model/event")

exports.bookEvent = async (req, res, next) => {
    const { registrant_name, email, phone, event_date, event_duration, event_type } = req.body
    if (registrant_name && email && phone && event_date && event_duration && event_type) {
        await Events.create({
            registrant_name, email, phone, event_date, event_duration, event_type
        }).then(() => {
            res.status(200).send("Event booked successfully")
        })
    } else {
        res.status(404).json({ message: "Please fill all the fields" })
    }
}
