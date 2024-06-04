const { Op } = require('sequelize');
const { EntityOrderDetail, EntityOrderItems } = require('../../../db');
const { getRegistredUsersInDescendingOrder } = require('../../services/incomeServices/incomeServices');
const { findProductsByReviewIdServices, getAverageScoreByProduct, getLastRegisteredUsersServices } = require('../../services/incomeServices/incomeServices');

const getTotalRevenue = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;

        // Si startDate está presente, establece la hora a las 00:00:00
        const startDateTime = startDate ? new Date(`${startDate}T00:00:00Z`) : null;

        // Si endDate está presente, establece la hora a las 23:59:59
        const endDateTime = endDate ? new Date(`${endDate}T23:59:59Z`) : null;

        // Define el filtro de fecha basado en los parámetros proporcionados
        const dateFilter = {};
        if (startDateTime && endDateTime) {
            dateFilter.createentityOrderDetail = { [Op.between]: [startDateTime, endDateTime] };
        } else if (startDateTime) {
            dateFilter.createentityOrderDetail = { [Op.gte]: startDateTime };
        } else if (endDateTime) {
            dateFilter.createentityOrderDetail = { [Op.lte]: endDateTime };
        }

        // Realiza la consulta sumando los totales de las ventas dentro del intervalo de tiempo especificado
        const totalRevenue = await EntityOrderDetail.sum('totalOrder', {
            where: dateFilter,
            include: [{
                model: EntityOrderItems,
                attributes: [],
                where: { status: 'approved' },
                required: true
            }]
        });

        res.json({ totalRevenue });
    } catch (error) {
        console.error('Error fetching total revenue:', error);
        res.status(500).json({ error: 'Error fetching total revenue' });
    }
};

const findProductsByReviewIdControllers = async (req, res) => {
    const { reviewId } = req.params;
    try {
        const product = await findProductsByReviewIdServices(reviewId);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAverageScoreByProductControllers = async (req, res) => {
    try {
        const reviews = await getAverageScoreByProduct();
        res.status(200).json(reviews);
    } catch (error) {
        console.error('Error in controller:', error);
        res.status(500).json({ error: 'Error al obtener el promedio de scoreReview para los productos', details: error.message });
    }
};

const getregistredControllers = async (req, res) => {
    try {
        const registred = await getRegistredUsersInDescendingOrder();
        res.status(200).json(registred);
    } catch (error) {
        console.error('Error in controller:', error);
        res.status(500).json({ error: 'Error al obtener los usuarios registrados', details: error.message });
    }
};

// controllers/productController.js
const productService = require('../../services/incomeServices/incomeServices');

const getTopSellingProducts = async (req, res) => {
    try {
        const topProducts = await productService.getTopSellingProducts();
        res.json(topProducts);
    } catch (error) {
        console.error('Error fetching top selling products:', error);
        res.status(500).json({ error: 'Error fetching top selling products' });
    }
};

module.exports = {
    getTotalRevenue,
    findProductsByReviewIdControllers,
    getAverageScoreByProductControllers,
    getregistredControllers,
    getTopSellingProducts
};