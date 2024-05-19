const mercadopago = require('mercadopago');
const { MERCADOPAGO_API_KEY } = process.env;

const createOrder = async (req, res) => {
  mercadopago.configure({
    access_token: MERCADOPAGO_API_KEY,
  });

  try {
    const result = await mercadopago.preferences.create({
      items: [
        {
          title: "Laptop",
          unit_price: 10000, 
          currency_id: "COP", 
          quantity: 1,
        },
      ],
      payer: {
        email: "test_user@test.com", 
        identification: {
          type: "DNI", 
          number: "12345678", 
        },
        name: "Test",
        surname: "User",
        address: {
          zip_code: "1234",
          street_name: "Test Street",
          street_number: 123,
        },
        phone: {
          area_code: "11",
          number: 12345678,
        },
      },
      notification_url: "https://e720-190-237-16-208.sa.ngrok.io/webhook",
      back_urls: {
        success: "https://www.youtube.com/@art17joel/success",
        pending: "https://www.youtube.com/@art17joel/pending",
        failure: "https://www.youtube.com/@art17joel/failure",
      },
    });

    console.log('Preference created:', result.body);
    res.json(result.body); 
  } catch (error) {
    console.error('Error creating order:', error.message);
    return res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

const receiveWebhook = async (req, res) => {
  try {
    const payment = req.query;
    console.log(payment);
    if (payment.type === "payment") {
      const data = await mercadopago.payment.findById(payment["data.id"]);
      console.log(data);
    }

    res.sendStatus(204);
  } catch (error) {
    console.error('Error receiving webhook:', error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  createOrder,
  receiveWebhook,
};
