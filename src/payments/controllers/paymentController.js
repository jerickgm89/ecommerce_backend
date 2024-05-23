const { EntityOrderItems, EntityOrderDetail, EntityUsers, EntityProducts, EntityPayment } = require('../../db');

const mercadopago = require('mercadopago');
const crypto = require('crypto');
const { MERCADOPAGO_API_KEY, MERCADOPAGO_SECRET } = process.env;

mercadopago.configure({
  access_token: MERCADOPAGO_API_KEY,
});
const createOrder = async (req, res) => {
  try {
    const body = req.body; // Obtener todos los datos de la solicitud

    // Convertir `payer.phone.number` a número si es una cadena
    if (body.payer && body.payer.phone && typeof body.payer.phone.number === 'string') {
      body.payer.phone.number = Number(body.payer.phone.number);
    }

    // Eliminar el campo shipments si está presente
    delete body.shipments;

    // Eliminar el campo payment_methods si está presente
    delete body.payment_methods;

    // Añadir la identificación del usuario al campo external_reference
    const externalReference = body.payer.identification.number;

    const result = await mercadopago.preferences.create({
      items: body.items,
      payer: body.payer,
      notification_url: "https://4d38-152-203-155-214.ngrok-free.app/payment/webhook",
      back_urls: {
        success: "https://59fc-152-203-155-214.ngrok-free.app/success",
        pending: "https://www.youtube.com/@art17joel/pending",
        failure: "https://www.youtube.com/@art17joel/failure",
      },
      external_reference: externalReference
    });

    console.log('Preference created:', result.body);
    res.json(result.body);
  } catch (error) {
    console.error('Error creating order:', error.message);
    return res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};


const webhook = async (req, res) => {
  console.log('Received webhook:', req.body);

  const signature = req.headers['x-signature'];
  const xRequestId = req.headers['x-request-id'];

  if (!signature || !xRequestId) {
    console.log('Missing headers');
    return res.sendStatus(400);
  }

  const [tsPart, hashPart] = signature.split(',');
  const ts = tsPart.split('=')[1];
  const hash = hashPart.split('=')[1];
  const dataID = req.query['data.id'] || (req.body.data && req.body.data.id);

  if (!dataID) {
    console.log('Missing data ID');
    return res.sendStatus(400);
  }

  const manifest = `id:${dataID};request-id:${xRequestId};ts:${ts};`;

  const computedHash = crypto
    .createHmac('sha256', MERCADOPAGO_SECRET)
    .update(manifest)
    .digest('hex');

  if (computedHash !== hash) {
    console.log('HMAC verification failed');
    return res.sendStatus(400);
  }

  console.log('HMAC verification passed');

  const notificationType = req.body.type;
  const resourceId = req.body.data && req.body.data.id;

  if (!resourceId) {
    console.log('Missing resource ID');
    return res.sendStatus(400);
  }

  try {
    const payment = req.query;
    console.log(payment);
    if (payment.type === "payment") {
      const data = await mercadopago.payment.findById(payment["data.id"]);
      console.log('data status: ', data.status);
    }
    
    res.sendStatus(204);
  } catch (error) {
    console.error('Error fetching resource:', error.message);
    res.sendStatus(500);
  }
};


module.exports = {
  createOrder,
  webhook,
};
