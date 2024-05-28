// const { EntityOrderDetail, EntityUsers, EntityPayment } = require('../../../db.js');

// const updateOrderDetails = async (req, res) => {
//     const { UUID } = req.params; // Ahora UUID viene en los parámetros de la ruta
//     const { totalOrder, idPayment, idUser } = req.body;

//     // Validar que los campos necesarios están presentes
//     if (!totalOrder || !idPayment || !idUser) {
//         return res.status(400).json({ error: 'Missing required fields' });
//     }

//     try {
//         // Buscar el detalle del pedido por UUID
//         const orderDetail = await EntityOrderDetail.findOne({ where: { UUID } });

//         if (orderDetail) {
//             // Actualizar los campos
//             await orderDetail.update({ totalOrder, idPayment, idUser });

//             // Devolver el detalle del pedido actualizado
//             res.json(orderDetail);
//         } else {
//             // Si no se encuentra el detalle del pedido, devolver un error 404
//             res.status(404).json({ error: 'Order not found' });
//         }
//     } catch (error) {
//         // Manejar errores y devolver un error 500
//         console.error('Error updating order detail:', error);
//         res.status(500).json({ error: 'Error updating order' });
//     }
// };

// const deleteOrderDetails = async (req, res) => {
//     const { UUID } = req.params;
//     try {
//         const orderDetails = await EntityOrderDetail.findByPk(UUID);
//         if (orderDetails) {
//             await orderDetails.destroy();
//             res.status(200).json({ message: 'Order details deleted successfully' });
//         } else {
//             res.status(404).json({ error: 'Order details not found' });
//         }
//     } catch (error) {
//         console.error('Error deleting order details:', error); // Log the error for debugging
//         res.status(500).json({ error: 'Error deleting order details', details: error.message });
//     }
// };

// const getDetails = async (req, res) => {
//     try {
//         const orderDetail = await EntityOrderDetail.findAll({
//             include: [
//                 {
//                     model: EntityUsers,
//                     as: 'user',
//                     attributes: ['idUser', 'nameUser', 'lastNameUser', 'emailUser', 'pictureUser', 'numberMobileUser', 'email_verified', 'isAdmin', 'tokenAuth', 'activeUser']
//                 },
//                 {
//                     model: EntityPayment,
//                     attributes: ['paymentType', 'accountNumber', 'expiry', 'idUser']
//                 }
//             ]
//         });
//         res.json(orderDetail);
//     } catch (error) {
//         res.status(500).json({ error: 'Error fetching order items' });
//     }
// };
// module.exports = {
//     updateOrderDetails,
//     deleteOrderDetails,
//     getDetails
// };


const { EntityOrderDetail, EntityUsers, EntityPayment, EntityOrderItems } = require('../../../db.js');

const updateOrderDetails = async (req, res) => {
    const { UUID } = req.params;
    const { totalOrder, idPayment, idUser } = req.body;

    if (!totalOrder || !idPayment || !idUser) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const orderDetail = await EntityOrderDetail.findOne({ where: { UUID } });

        if (orderDetail) {
            await orderDetail.update({ totalOrder, idPayment, idUser });
            res.json(orderDetail);
        } else {
            res.status(404).json({ error: 'Order not found' });
        }
    } catch (error) {
        console.error('Error updating order detail:', error);
        res.status(500).json({ error: 'Error updating order' });
    }
};

const deleteOrderDetails = async (req, res) => {
    const { UUID } = req.params;
    try {
        const orderDetails = await EntityOrderDetail.findByPk(UUID);
        if (orderDetails) {
            await orderDetails.destroy();
            res.status(200).json({ message: 'Order details deleted successfully' });
        } else {
            res.status(404).json({ error: 'Order details not found' });
        }
    } catch (error) {
        console.error('Error deleting order details:', error);
        res.status(500).json({ error: 'Error deleting order details', details: error.message });
    }
};

const getDetails = async (req, res) => {
    try {
        const orderDetail = await EntityOrderDetail.findAll({
            include: [
                {
                    model: EntityUsers,
                    as: 'user',
                    attributes: ['idUser', 'nameUser', 'lastNameUser', 'emailUser', 'pictureUser', 'numberMobileUser', 'email_verified', 'isAdmin', 'tokenAuth', 'activeUser']
                },
                {
                    model: EntityPayment,
                    attributes: ['paymentType', 'accountNumber', 'expiry', 'idUser']
                }
            ]
        });
        res.json(orderDetail);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching order items' });
    }
};

// const getTotalRevenue = async (req, res) => {
//     try {
//         const totalRevenue = await EntityOrderDetail.sum('totalOrder');
//         res.json({ totalRevenue });
//     } catch (error) {
//         console.error('Error fetching total revenue:', error);
//         res.status(500).json({ error: 'Error fetching total revenue' });
//     }
// };

const getTotalRevenue = async (req, res) => {
    try {
        const totalRevenue = await EntityOrderDetail.sum('totalOrder', {
            include: [{
                model: EntityOrderItems,
                attributes: [],
                where: { status: 'approved' }, // Ajusta esto según el campo que indique que la orden está aprobada
                required: true // Asegura que solo se incluyan las ventas aprobadas
            }],
            group: ['entityOrderItems.idOrder', 'entityOrderItems.quantity', 'entityOrderItems.idProduct', 'entityOrderItems.status', 'entityOrderItems.createentityOrderDetail', 'entityOrderItems.modifiedentityOrderDetail', 'entityOrderItems.deleteentityOrderDetail']
        });
        res.json({ totalRevenue });
    } catch (error) {
        console.error('Error fetching total revenue:', error);
        res.status(500).json({ error: 'Error fetching total revenue' });
    }
};



module.exports = {
    updateOrderDetails,
    deleteOrderDetails,
    getDetails,
    getTotalRevenue
};
