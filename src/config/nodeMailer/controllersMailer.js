const { transporter } = require('./nodeMailerConfig');
require('dotenv').config();
const { GMAIL } = process.env;

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
        await transporter.sendMail(mailOptions);
        console.log(`Welcome email sent to ${email}`);
    } catch (error) {
        console.error('Error al enviar mensaje de bienvenida: ', error);
    }
};

const sendReviewEmail = async (email, given_name) => {
    const mailOptions = {
        from: GMAIL,
        to: email,
        subject: `${given_name}, cuéntanos tu experiencia de tu última compra.`,
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
        <p>El equipo de atención al cliente</p>
        </div>
        <div class="footer" style="background-color: #f4f4f4; color: #666; text-align: center; padding: 10px; font-size: 0.9em;">
        <p>&copy; 2024 Nuestra Tienda. Todos los derechos reservados.</p>
        <p><a href="https://example.com/unsubscribe" style="color: #4CAF50;">Darse de baja</a></p>
        </div>
        </div>
        `
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log(`Review email sent to ${email}`);
    } catch (error) {
        console.error('Error al enviar mensaje de revisión: ', error);
    }
};

const sendStatusResponse = async (email, given_name, status) => {
    if (!email) {
        throw new Error('Email is required');
    }

    let subject, htmlContent;

    switch (status) {
        case 'approved':
            subject = '¡Tu compra fue aprobada 🎉';
            htmlContent = `
            <h1>¡Gracias por tu compra, ${given_name}!</h1>
            <p>Nos complace informarte que tu compra ha sido aprobada exitosamente. Estamos preparando tu pedido y te notificaremos cuando esté en camino.</p>
            <p>Mientras tanto, ¿por qué no echas un vistazo a nuestras nuevas ofertas y productos recomendados especialmente para ti?</p>
            <p>¡Gracias por elegirnos y feliz compra!</p>
            <p>El equipo de E-commerce Tech</p>
            `;
            break;
        case 'in_process':
            subject = '¡Tu compra se está procesando ⏳';
            htmlContent = `
            <h1>Hola, ${given_name}</h1>
            <p>Tu compra está siendo procesada. Nos estamos asegurando de que todo esté en orden antes de aprobar tu pedido.</p>
            <p>¡Gracias por tu paciencia y por elegirnos!</p>
            <p>El equipo de E-commerce Tech</p>
            `;
            break;
        case 'rejected':
            subject = '¡Ups! Tu compra fue rechazada 😟';
            htmlContent = `
            <h1>Hola, ${given_name}</h1>
            <p>Lamentamos informarte que tu compra fue rechazada. Por favor, verifica los detalles de tu pago y vuelve a intentarlo. Si necesitas asistencia, nuestro equipo de soporte está disponible para ayudarte.</p>
            <p>Gracias por tu paciencia y por elegirnos.</p>
            <p>El equipo de E-commerce Tech</p>
            `;
            break;
        default:
            console.error('Unknown status', status);
            return;
    }

    const mailOptions = {
        from: GMAIL,
        to: email,
        subject: subject,
        html: htmlContent
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Status response email sent to ${email} with status ${status}`);
    } catch (error) {
        console.error('Error al enviar notificación:', error);
    }
};

module.exports = { sendWelcomeEmail, sendReviewEmail, sendStatusResponse };