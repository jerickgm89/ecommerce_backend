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
      notification_url: "https://www.ecommercetech.software/payment/webhook",
      back_urls: {
        success: "https://main.d1v4o3mt97tf62.amplifyapp.com/user/order?success=true",
        pending: "https://main.d1v4o3mt97tf62.amplifyapp.com/contact",
        failure: "https://main.d1v4o3mt97tf62.amplifyapp.com/contact",
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
      return res.sendStatus(400);
    }

    const [tsPart, hashPart] = signature.split(',');
    const ts = tsPart.split('=')[1];
    const hash = hashPart.split('=')[1];
    const dataID = req.query['data.id'] || (req.body.data && req.body.data.id) || req.query.id;

    if (!dataID) {
      return res.sendStatus(400);
    }

    if (processedTransactions.has(dataID)) {
      return res.sendStatus(200);
    }

    const manifest = `id:${dataID};request-id:${xRequestId};ts:${ts};`;
    const computedHash = crypto
      .createHmac('sha256', process.env.MERCADOPAGO_SECRET)
      .update(manifest)
      .digest('hex');

    if (computedHash !== hash) {
      return res.sendStatus(400);
    }

    const notificationType = req.body.type || req.query.topic;
    const resourceId = req.body.data && req.body.data.id || req.query.id;

    let details;
    if (notificationType === 'payment') {
      const response = await mercadopago.payment.findById(resourceId);
      details = response.body;

      const { status, transaction_amount, payer, additional_info, card, id, payment_method_id, metadata } = details;

      const payerEmail = lastPayerEmail;
      const couponCode = metadata ? metadata.coupon_code : null;
      const idUserAddress = metadata ? metadata.id_user_address : null;
      const payerName = payer.first_name || (additional_info && additional_info.payer && additional_info.payer.first_name) || 'Cliente';

      if (!payerEmail) {
        return res.sendStatus(400);
      }
      await sendStatusResponse(payerEmail, payerName, status);

      const user = await EntityUsers.findOne({
        where: { DNI: details.external_reference }
      });

      if (!user) {
        return res.sendStatus(404);
      }

      const userAddress = await EntityUserAddress.findOne({ where: { idUserAddress: idUserAddress, idUser: user.idUser } });
      if (!userAddress) {
        return res.sendStatus(400);
      }

      let accountNumber = '';
      if (payment_method_id === 'visa' || payment_method_id === 'master') {
        accountNumber = `${card.first_six_digits}******${card.last_four_digits}`;
      } else if (payment_method_id === 'amex') {
        accountNumber = `${card.first_six_digits}*****${card.last_four_digits}`;
      }

      const payment = await EntityPayment.create({
        name: card.cardholder.name,
        dni: card.cardholder.identification.number,
        paymentType: payment_method_id,
        accountNumber,
        expiry: new Date(card.expiration_year, card.expiration_month - 1),
        idUser: user.idUser
      });

      let idShipment = null;

      if (status === 'approved') {
        const shipment = await EntityShipments.create({
          status: 'in_shop',
          guideNumber: null,
        });

        idShipment = shipment.idShipments;
      }

      const orderDetail = await EntityOrderDetail.create({
        totalOrder: transaction_amount,
        idPayment: payment.idPayment,
        couponApplied: couponCode,
        idUser: user.idUser,
        operation: id,
        idShipment: idShipment,
        idUserAddress: idUserAddress
      });

      for (const item of additional_info.items) {
        let product = await EntityProducts.findOne({ where: { idProduct: item.id } });

        if (!product) {
          continue;
        }

        const orderItem = await EntityOrderItems.create({
          idOrderDetail: orderDetail.idOrderDetail,
          quantity: parseInt(item.quantity),
          idProduct: product.idProduct,
          status: details.status
        });

        if (status === 'approved') {
          product.stockProduct -= parseInt(item.quantity);
          await product.save();
        }
      }

      if (status === 'approved' && couponCode) {
        const coupon = await Coupon.findOne({ where: { code: couponCode } });

        if (coupon) {
          await CouponUsage.create({ userId: user.idUser, couponId: coupon.idCoupon });
        }
      }

      processedTransactions.add(dataID);
    } else if (notificationType === 'merchant_order') {
      const response = await mercadopago.merchant_orders.get(resourceId);
      details = response.body;

      processedTransactions.add(dataID);
    }

    if (!details) {
      return res.sendStatus(404);
    }

    res.status(200).json(details);
  } catch (error) {
    console.error('Error fetching resource:', error.message);
    if (!res.headersSent) {
      res.status(500).json({ error: error.message });
    }
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

module.exports = {
  createOrder,
  webhook,
  updatePayment,
  deletePayment,
  getPayment
};