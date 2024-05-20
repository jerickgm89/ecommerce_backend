const { EntityPayment, EntityUsers } = require('../../../db.js'); // Asegúrate de importar EntityUsers

const createPayment = async (req, res) => {
    console.log('Body de la solicitud:', req.body);
    const { paymentType, ccv, accountNumber, expiry, idUser } = req.body;
    
    // Agregar logs para ver los valores individuales
    console.log('CCV:', ccv);

    if (!paymentType || !ccv || !accountNumber || !expiry || !idUser) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    try {
        const newPayment = await EntityPayment.create({
            paymentType,
            ccv,
            accountNumber,
            expiry,
            idUser
        });
        res.status(201).json(newPayment);
    } catch (error) {
        console.error('Error creating payment:', error);  // Log del error para depuración
        res.status(500).json({ error: 'Error al crear el pago' });
    }
};

const updatePayment = async (req, res) => {
    const { id } = req.params;
    const { paymentType, ccv, accountNumber, expiry, idUser } = req.body;

    // Verificar que todos los parámetros necesarios estén presentes
    if (!paymentType || !ccv || !accountNumber || !expiry || !idUser) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const Payment = await EntityPayment.findByPk(id);
        if (Payment) {
            Payment.paymentType = paymentType;
            Payment.ccv = ccv;
            Payment.accountNumber = accountNumber;
            Payment.expiry = expiry;
            Payment.idUser = idUser;
            await Payment.save();
            res.json(Payment);
        } else {
            res.status(404).json({ error: 'Payment not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error updating Payment' });
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


// const getPayment = async (req, res) => {
//     try {
//         const payment = await EntityPayment.findAll();
//         res.json(payment);
//     } catch (error) {
//         res.status(500).json({ error: 'Error fetching payment' });
//     }
// };

module.exports = {
    createPayment,
    updatePayment,
    deletePayment,
    getPayment
};