require('dotenv').config();
const nodemailer = require('nodemailer');

const { GMAIL, PASSWORD_GMAIL_APP } = process.env;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    secure: true,
    auth: {
        user: GMAIL,
        pass: PASSWORD_GMAIL_APP
    },
    tls: {
        rejectUnauthorized: false
    }
});

module.exports = { transporter };
