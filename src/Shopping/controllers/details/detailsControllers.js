const { EntityOrderDetail } = require('../../../db.js');

const createOrderDetail = async (req, res) => {
    const { UUID, totalOrder, idPayment, idUser } = req.body;
    
    if (!UUID || !totalOrder || !idPayment || !idUser) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    try {
        const newDetail = await EntityOrderDetail.create({
            UUID,
            totalOrder,
            idPayment,
            idUser
        });
        res.status(201).json(newDetail);
    } catch (error) {
        console.error('Error creating order detail:', error);  // Log del error para depuración
        res.status(500).json({ error: 'Error al crear detail' });
    }
};

const getDetails = async (req, res) => {
    try {
        const orderDetail = await EntityOrderDetail.findAll();
        res.json(orderDetail);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching order items' });
    }
};

module.exports = {
    createOrderDetail,
    getDetails
}