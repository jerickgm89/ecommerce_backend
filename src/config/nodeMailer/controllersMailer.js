const {transporter} = require('./nodeMailerConfig')
require('dotenv').config()
const {GMAIL} = process.env

const sendWelcomeEmail = async (email, given_name) => {
    const mailOptions = {
        from: GMAIL,
        to: email,
        subject: 'Registro de usuario en E-commerce Tech.',
        html: `
        <h1>Bienvenido a E-commerce Tech, ${given_name}!</h1>
        <h2>¡Gracias por registrarte en nuestra aplicación!</h2>
        <p>Nos alegra tenerte con nosotros. Aquí en E-commerce Tech, nos dedicamos a brindarte la mejor experiencia de compra en línea.</p>
        <p>Aprovecha nuestras ofertas exclusivas y descubre la amplia variedad de productos que tenemos para ti.</p>
        <p>¡Esperamos que disfrutes de tu experiencia!</p>
        <p>Atentamente,</p>
        <p>El equipo de E-commerce Tech</p>
    `
    };
    try {
        await transporter.sendMail(mailOptions)
    } catch (error) {
        console.error('Error al enviar mensaje de bienvenida: ', error)
        
    }
}
module.exports = {sendWelcomeEmail}