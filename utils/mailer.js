const nodeMailer = require('nodemailer');


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
    from: "admin@malhub.com.ng",
    to: `${req.body.email}`,
    subject: `Welcome to Malhub`,
    body: `<h1>Welcome to Malhub</h1> <p>Your space has been booked successfully</p>`,
}

transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
    }
})
