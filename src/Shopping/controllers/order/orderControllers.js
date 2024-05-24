const { EntityOrderItems, EntityProducts } = require('../../../db.js');

const updateOrderItems = async (req, res) => {
    const { id } = req.params;
    const { idOrder, quantity, idProduct } = req.body;

    if (!idOrder || !quantity || !idProduct) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const orderItem = await EntityOrderItems.findByPk(id);
        if (orderItem) {
            await orderItem.update({ idOrder, quantity, idProduct });
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
    updateOrderItems,
    deleteOrderItems,
    getOrderItems
};

