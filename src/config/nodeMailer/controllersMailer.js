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
const sendReviewEmail = async (email, given_name) => {
    const mailOptions = {
        from: GMAIL,
        to: email,
        subject: `${given_name} cuéntanos tu experiencia de tu última compra.`,
        html: `
        <div class="container" style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <div class="header" style="background-color: #4CAF50; color: #ffffff; padding: 20px; text-align: center;">
        <h1>Gracias por tu compra</h1>
        </div>
        <div class="content" style="padding: 20px; text-align: center;">
        <p>Hola ${given_name},</p>
        <p>Esperamos que estés bien. Nos encantaría escuchar tus comentarios sobre tu última compra con nosotros. Tu opinión es muy importante para nosotros y nos ayuda a mejorar nuestros productos y servicios para ti y otros clientes.</p>
        <p>Por favor, tómate un momento para compartir tu experiencia con nosotros. ¿Cómo fue tu experiencia de compra? ¿Hubo algo que te gustó especialmente o algo en lo que crees que podríamos mejorar?</p>
        <p>¡Tu opinión cuenta! Estamos aquí para escucharte.</p>
        <p>¡Gracias por elegirnos y por tu continuo apoyo!</p>
        <p>Saludos cordiales,</p>
        <p>[Tu nombre o el equipo de atención al cliente]</p>
        <h2>El/los producto/os que compraste</h2>
        <div class="product" style="display: flex; margin-bottom: 20px;">
        <img src="https://via.placeholder.com/120" alt="Producto 1" style="width: 120px; height: auto; margin-right: 20px; border-radius: 8px;">
        <div class="product-info" style="max-width: 400px;">
        <h3 style="margin: 0; font-size: 1.2em; color: #333;">Producto 1</h3>
        <p style="margin: 5px 0 10px; color: #666;">Descripción del producto 1. Es un producto increíble que te encantará.</p>
        <a href="https://example.com/product1" class="cta-button" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: #ffffff; text-decoration: none; border-radius: 5px;">Ver Producto</a>
        </div>
        </div>
        <div class="product" style="display: flex; margin-bottom: 20px;">
        <img src="https://via.placeholder.com/120" alt="Producto 2" style="width: 120px; height: auto; margin-right: 20px; border-radius: 8px;">
        <div class="product-info" style="max-width: 400px;">
        <h3 style="margin: 0; font-size: 1.2em; color: #333;">Producto 2</h3>
        <p style="margin: 5px 0 10px; color: #666;">Descripción del producto 2. Es otro producto asombroso que debes tener.</p>
        <a href="https://example.com/product2" class="cta-button" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: #ffffff; text-decoration: none; border-radius: 5px;">Ver Producto</a>
        </div>
        </div>
        </div>
        <div class="footer" style="background-color: #f4f4f4; color: #666; text-align: center; padding: 10px; font-size: 0.9em;">
        <p>&copy; 2024 Nuestra Tienda. Todos los derechos reservados.</p>
        <p><a href="https://example.com/unsubscribe" style="color: #4CAF50;">Darse de baja</a></p>
        </div>
        </div>
        `
        }
        try {
            await transporter.sendMail(mailOptions)
        } catch (error) {
            console.error('Error al enviar mensaje de bienvenida: ', error)
            
    }
}
module.exports = { sendWelcomeEmail, sendReviewEmail }