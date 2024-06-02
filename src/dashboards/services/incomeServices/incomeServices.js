const { Sequelize } = require('sequelize');
const { findRegistredUsers } = require('../../repositories/incomeRepositories/incomeRepositories');
const { findReviewByIdServices, findReviewByProduct } = require('../../repositories/incomeRepositories/incomeRepositories');
const { EntityProducts, EntityUsers, EntityReview } = require('../../../db');
//const EntityUsers = require('../../../models/EntityUsers');

const findProductsByReviewIdServices = async (reviewId) => {
    try {
        const review = await findReviewByIdServices(reviewId);
        if (!review) {
            throw new Error('Review not found');
        }
        const productId = review.idProduct;
        const product = await EntityProducts.findByPk(productId);
        if (!product) {
            throw new Error('Product not found');
        }
        return product;
    } catch (error) {
        throw new Error(`Error retrieving products for review: ${error.message}`);
    }
};


// const getAverageScoreByProduct = async () => {
//     try {
//         const reviews = await EntityReview.findAll({
//             attributes: [
//                 'idProduct',
//                 [Sequelize.fn('AVG', Sequelize.col('scoreReview')), 'averageScore'],
//             ],
//             group: ['idProduct'],
//             order: [[Sequelize.fn('AVG', Sequelize.col('scoreReview')), 'DESC']],
//         });
//         return reviews;
//     } catch (error) {
//         console.error('Error fetching average scores:', error);
//         throw new Error('Error fetching average scores');
//     }
// };

const getAverageScoreByProduct = async () => {
    try {
        const reviews = await EntityReview.findAll({
            attributes: [
                'idProduct',
                [Sequelize.fn('ROUND', Sequelize.fn('AVG', Sequelize.col('scoreReview')), 2), 'averageScore'],
            ],
            group: ['idProduct'],
            order: [[Sequelize.fn('AVG', Sequelize.col('scoreReview')), 'DESC']],
        });
        return reviews;
    } catch (error) {
        console.error('Error fetching average scores:', error);
        throw new Error('Error fetching average scores');
    }
};


// services/userService.js


const getRegistredUsersInDescendingOrder = async () => {
    try {
        const registeredUsers = await EntityUsers.findAll({
            order: [['createdUser_at', 'DESC']],
            limit: 5
        });
        return registeredUsers;
    } catch (error) {
        console.error('Error in service:', error);
        throw new Error('Error al obtener los usuarios registrados en orden descendente');
    }
};

// services/productService.js
const productRepository = require('../../repositories/incomeRepositories/incomeRepositories');

const getTopSellingProducts = async () => {
    return await productRepository.getTopSellingProducts();
};




module.exports = {
    findProductsByReviewIdServices,
    getAverageScoreByProduct,
    getRegistredUsersInDescendingOrder,
    getTopSellingProducts
};
