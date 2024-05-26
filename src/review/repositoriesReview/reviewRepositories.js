const {EntityReview} = require('../../db');
const EntityProducts = require('../../models/EntityProducts');
const EntityUsers = require('../../models/EntityUsers');




//Crear un review 
const createReview = async (reviewData) => {
    const reviewCreate = await EntityReview.create(reviewData)

    return reviewCreate;
};

const findAllReview = async () => {
    
    const getAllReview = await EntityReview.findAll();
    return getAllReview
};

const reviewById = async  (idReview) => {
    const reviewId = await EntityReview.findByPk(idReview)
    return reviewId
}
module.exports = {
    createReview,
    findAllReview,
    reviewById
}