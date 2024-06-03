const EntityUsers = require("../../../models/EntityUsers");
const sequelize = require('sequelize');

// Obtener reviews por idProduct
const findReviewByProduct = async (idProduct) => {
    const reviews = await EntityReview.findAll({
        where: { idProduct },
    });
    return reviews;
};

// const findRegistredUsers = async (idUser) => {
//     const registred = await EntityUsers.findAll({
//         where: { idUser },
//     });
//     return registred;
// };
// repositories/userRepository.js

// Obtener usuarios registrados
const findRegistredUsers = async (options = {}) => { 
    const registred = await EntityUsers.findAll(options); 
    return registred;
}

// repositories/productRepository.js
const { EntityOrderItems, EntityOrderDetail, EntityProducts } = require('../../../db.js');

const getTopSellingProducts = async () => {
    try {
        const topProducts = await EntityOrderItems.findAll({
            attributes: [
                'idProduct',
                [sequelize.fn('SUM', sequelize.col('quantity')), 'totalSold'] // Calcula la suma de quantity por idProduct
            ],
            where: { status: 'approved' },
            group: ['idProduct'],
            order: [[sequelize.literal('SUM(quantity)'), 'DESC']], // Ordena por la suma de la cantidad vendida
            limit: 10,
        });
        return topProducts;
    } catch (error) {
        throw new Error('Error al buscar los productos más vendidos: ' + error.message);
    }
};

module.exports = {
    getTopSellingProducts
};





module.exports = {
    findReviewByProduct,
    findRegistredUsers,
    getTopSellingProducts
};