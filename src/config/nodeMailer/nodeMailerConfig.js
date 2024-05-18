
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ecommerceTech2024@gmail.com',
        pass: 'Ecommerce2024'
    }
})

module.exports = transporter;
//dejo un comentario para pushear