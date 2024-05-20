const { EntityOrderItems, EntityProducts } = require('../../../db.js');

const createOrderItems = async (req, res) => {
    console.log('Body de la solicitud:', req.body);
    const { UUID, idOrder, quantity, idProduct } = req.body;
    
    if (!UUID || !idOrder || !quantity || !idProduct) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    try {
        const newOrder = await EntityOrderItems.create({
            UUID,
            idOrder,
            quantity,
            idProduct
        });
        res.status(201).json(newOrder);
    } catch (error) {
        console.error('Error creating order item:', error);  // Log del error para depuración
        res.status(500).json({ error: 'Error al crear el item de la orden' });
    }
};

const updateOrderItems = async (req, res) => {
    const { id } = req.params;
    const { UUID, idOrder, quantity, idProduct } = req.body;

    if (!UUID || !idOrder || !quantity || !idProduct) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const orderItem = await EntityOrderItems.findByPk(id);
        if (orderItem) {
            orderItem.UUID = UUID;
            orderItem.idOrder = idOrder;
            orderItem.quantity = quantity;
            orderItem.idProduct = idProduct;
            await orderItem.save();
            res.json(orderItem);
        } else {
            res.status(404).json({ error: 'Order item not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error updating order item' });
    }
};

const deleteOrderItems = async (req, res) => {
    const { id } = req.params;
    try {
        const orderItem = await EntityOrderItems.findByPk(id);
        if (orderItem) {
            await orderItem.destroy();
            res.status(200).json({ message: 'Order item deleted successfully' });
        } else {
            res.status(404).json({ error: 'Order item not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error deleting order item' });
    }
};

// const getOrderItems = async (req, res) => {
//     try {
//         const orderItems = await EntityOrderItems.findAll();
//         res.json(orderItems);
//     } catch (error) {
//         res.status(500).json({ error: 'Error fetching order items' });
//     }
// };
const getOrderItems = async (req, res) => {
    try {
        const orderItems = await EntityOrderItems.findAll({
            include: [{
                model: EntityProducts,
                as: 'entityProduct', // Aquí se cambia 'product' por 'entityProduct'
                attributes: ['nameProduct', 'priceProduct']
            }]
        });
        res.json(orderItems);
    } catch (error) {
        console.error('Error fetching order items:', error);  // Log del error para depuración
        res.status(500).json({ error: 'Error fetching order items' });
    }
};


module.exports = {
    createOrderItems,
    updateOrderItems,
    deleteOrderItems,
    getOrderItems
};
