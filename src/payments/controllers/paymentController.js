const mercadopago = require('mercadopago');
const { MERCADOPAGO_API_KEY, MERCADOPAGO_SECRET } = process.env;
const crypto = require('crypto');
const { sendStatusResponse } = require('../../config/nodeMailer/controllersMailer');
const { EntityOrderItems, 
  EntityOrderDetail, 
  EntityUsers, 
  EntityProducts, 
  EntityPayment, 
  Coupon, 
  CouponUsage, 
  EntityShipments, 
  EntityUserAddress 
} = require('../../db');

mercadopago.configure({ access_token: MERCADOPAGO_API_KEY });   

let lastPayerEmail = '';
let lastCouponCode = ''; 
let lastIdUserAddress = ''; 
const processedTransactions = new Set();

const createOrder = async (req, res) => {
  try {
    const body = req.body;

    if (body.payer && body.payer.phone && typeof body.payer.phone.number === 'string') {
      body.payer.phone.number = Number(body.payer.phone.number);
    }

    delete body.shipments;
    delete body.payment_methods;

    const externalReference = body.payer.identification.number;
    lastPayerEmail = body.payer.email; 
    lastCouponCode = body.coupon_code;
    lastIdUserAddress = body.id_user_address;

    const result = await mercadopago.preferences.create({
      items: body.items,
      payer: body.payer,
      notification_url: "https://6d98-152-203-34-160.ngrok-free.app/payment/webhook",
      back_urls: {
        success: "https://st2.depositphotos.com/3108485/9725/i/450/depositphotos_97258336-stock-photo-hand-thumb-up.jpg",
        pending: "https://cdn-icons-png.flaticon.com/512/3756/3756719.png",
        failure: "https://www.publicdomainpictures.net/pictures/180000/nahled/hand-with-thumb-down.jpg",
      },
      external_reference: externalReference,
      metadata: {
        coupon_code: body.coupon_code,
        id_user_address: body.id_user_address 
      }
    });
    // console.log('Preference created:', result.body);
    res.json(result.body);
  } catch (error) {
    console.error('Error creating order:', error.message);
    return res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};
const webhook = async (req, res) => {
  try {
    const signature = req.headers['x-signature'];
    const xRequestId = req.headers['x-request-id'];

    if (!signature || !xRequestId) {
      console.log('Missing signature or xRequestId');
      return res.sendStatus(400);
    }

    const [tsPart, hashPart] = signature.split(',');
    const ts = tsPart.split('=')[1];
    const hash = hashPart.split('=')[1];
    const dataID = req.query['data.id'] || (req.body.data && req.body.data.id) || req.query.id;

    if (!dataID) {
      console.log('Missing data ID');
      return res.sendStatus(400);
    }

    if (processedTransactions.has(dataID)) {
      console.log(`Transaction ${dataID} already processed`);
      return res.sendStatus(200);
    }

    const manifest = `id:${dataID};request-id:${xRequestId};ts:${ts};`;
    const computedHash = crypto
      .createHmac('sha256', process.env.MERCADOPAGO_SECRET)
      .update(manifest)
      .digest('hex');

    if (computedHash !== hash) {
      console.log('HMAC verification failed');
      return res.sendStatus(400);
    }

    console.log('HMAC verification passed');

    const notificationType = req.body.type || req.query.topic;
    const resourceId = req.body.data && req.body.data.id || req.query.id;

    let details;
    if (notificationType === 'payment') {
      console.log(`Fetching payment details for resource ID: ${resourceId}`);
      const response = await mercadopago.payment.findById(resourceId);
      details = response.body;

      const { status, transaction_amount, payer, additional_info, card, id, payment_method_id, metadata } = details;
      console.log('Payment details:', details);

      const payerEmail = lastPayerEmail;
      const couponCode = metadata ? metadata.coupon_code : null;  // Obtener el código del cupón desde los metadatos
      const idUserAddress = metadata ? metadata.id_user_address : null; // Obtener idUserAddress desde los metadatos
      const payerName = payer.first_name || (additional_info && additional_info.payer && additional_info.payer.first_name) || 'Cliente';

      if (!payerEmail) {
        console.error('No se pudo encontrar el correo electrónico del pagador');
        return res.sendStatus(400);
      }
      await sendStatusResponse(payerEmail, payerName, status);
      console.log(`Status response email sent to ${payerEmail} with status ${status}`);

      const user = await EntityUsers.findOne({
        where: { DNI: details.external_reference }
      });

      if (!user) {
        console.log('User not found');
        return res.sendStatus(404);
      }

      let accountNumber = '';
      if (payment_method_id === 'visa' || payment_method_id === 'master') {
        accountNumber = `${card.first_six_digits}******${card.last_four_digits}`;
      } else if (payment_method_id === 'amex') {
        accountNumber = `${card.first_six_digits}*****${card.last_four_digits}`;
      }

      console.log('Creating payment record');
      const payment = await EntityPayment.create({
        name: card.cardholder.name,
        dni: card.cardholder.identification.number,
        paymentType: payment_method_id,
        accountNumber,
        expiry: new Date(card.expiration_year, card.expiration_month - 1),
        idUser: user.idUser
      });
      console.log('Payment record created:', payment);

      let idShipment = null;

      if (status === 'approved') {
        console.log('Creating shipment record');
        const shipment = await EntityShipments.create({
          status: 'in_shop',
          guideNumber: null,
        });

        idShipment = shipment.idShipments;
        console.log('Shipment record created:', shipment);
      }

      console.log('Creating order detail record');
      const orderDetail = await EntityOrderDetail.create({
        totalOrder: transaction_amount,
        idPayment: payment.idPayment,
        couponApplied: couponCode,
        idUser: user.idUser,
        operation: id,
        idShipment: idShipment,  // Relación con la tabla de envíos
        idUserAddress: idUserAddress  // Usar idUserAddress desde los metadatos
      });
      console.log('Order detail record created:', orderDetail);

      for (const item of additional_info.items) {
        let product = await EntityProducts.findOne({ where: { idProduct: item.id } });

        if (!product) {
          console.log('Product not found:', item.id);
          continue;
        }

        console.log('Creating order item record for product:', product.idProduct);
        const orderItem = await EntityOrderItems.create({
          idOrderDetail: orderDetail.idOrderDetail,
          quantity: parseInt(item.quantity),
          idProduct: product.idProduct,
          status: details.status
        });
        console.log('Order item created for product:', product.idProduct);

        if (status === 'approved') {
          product.stockProduct -= parseInt(item.quantity);
          await product.save();
          console.log('Stock updated for product:', product.idProduct);
        }
      }

      if (status === 'approved' && couponCode) {
        console.log(`Marking coupon ${couponCode} as used for user ${user.idUser}`);
        const coupon = await Coupon.findOne({ where: { code: couponCode } });

        if (coupon) {
          await CouponUsage.create({ userId: user.idUser, couponId: coupon.idCoupon });
          console.log(`Coupon ${couponCode} marked as used for user ${user.idUser}`);
        }
      }

      // Marcar la transacción como procesada
      processedTransactions.add(dataID);
      console.log(`Transaction ${dataID} marked as processed`);
    } else if (notificationType === 'merchant_order') {
      console.log(`Fetching merchant order details for resource ID: ${resourceId}`);
      const response = await mercadopago.merchant_orders.get(resourceId);
      details = response.body;
      console.log('Merchant order details:', details);

      // Marcar la transacción como procesada para merchant_order también
      processedTransactions.add(dataID);
      console.log(`Transaction ${dataID} marked as processed (merchant order)`);
    }

    if (!details) {
      console.log('Resource details not found');
      return res.sendStatus(404);
    }

    res.status(200).json(details);
  } catch (error) {
    console.error('Error fetching resource:', error.message);
    res.sendStatus(500).json({ error: error.message });
  }
};

const updatePayment = async (req, res) => {
  const { id } = req.params;
  const { name, dni, paymentType, accountNumber, expiry, idUser } = req.body;

  if (!name || !dni || !paymentType || !accountNumber || !expiry || !idUser) {
      return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
      const payment = await EntityPayment.findByPk(id);
      if (payment) {
          await payment.update({ name, dni, paymentType, accountNumber, expiry, idUser });
          res.json(payment);
      } else {
          res.status(404).json({ error: 'Payment not found' });
      }
  } catch (error) {
      res.status(500).json({ error: 'Error updating payment' });
  }
};

const deletePayment = async (req, res) => {
  const { id } = req.params;
  try {
      const payment = await EntityPayment.findByPk(id);
      if (payment) {
          await payment.destroy();
          res.status(200).json({ message: 'Payment deleted successfully' });
      } else {
          res.status(404).json({ error: 'Payment not found' });
      }
  } catch (error) {
      res.status(500).json({ error: 'Error deleting payment' });
  }
};

const getPayment = async (req, res) => {
  try {
      const payments = await EntityPayment.findAll({
          include: {
              model: EntityUsers,
              attributes: ['idUser', 'nameUser', 'lastNameUser', 'emailUser', 'pictureUser', 'numberMobileUser', 'email_verified', 'isAdmin', 'tokenAuth', 'activeUser']
          }
      });
      res.json(payments);
  } catch (error) {
      console.error('Error fetching payments:', error);
      res.status(500).json({ error: 'Error fetching payments' });
  }
};

const getAllShipments = async (req,res) => {
  try {
    const shipment = await EntityShipments.findAll()
    res.status(200).json(shipment)
  } catch (error) {
    console.error('Error fetching shipments: ',error)
    res.status(500).json({error: 'Error fetching shipments'})
  }
};
const updateShipment = async (req,res) => {
  const {id} = req.params;
  const {status, guideNumber} = req.body

  const idShipments = id;
  if(!status) {
    return res.status(400).json({error: 'MISSING REQUIRED FIELD: STATUS'})
  }
  try {
    const shipment = await EntityShipments.findByPk(idShipments)
    if(!shipment) {
      return res.status(404).json({error: 'Shipment not found'})
    }
    shipment.status = status;
    if(guideNumber) {
      shipment.guideNumber = guideNumber
    }
    await shipment.save()
    res.json(shipment)
  } catch (error) {
    console.error('Error updating shipment:', error);
    res.status(500).json({ error: 'Error updating shipment' })
  }
};

const deleteShipment = async (req,res) => {
  const {id} = req.params;
  const idShipments = id

  try {
    const shipment = await EntityShipments.findByPk(idShipments)
    if(!shipment) {
      res.status(404).json({error: 'Shipment delete'})
    }
  } catch (error) {
    console.error('Error deleting shipment:', error);
    res.status(500).json({ error: 'Error deleting shipment' });
  }
}
module.exports = {
  createOrder,
  webhook,
  updatePayment,
  deletePayment,
  getPayment,
  getAllShipments,
  updateShipment,
  deleteShipment
};