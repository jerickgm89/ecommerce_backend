const { EntityReview, EntityProducts, EntityUsers } = require('../../db');

// Crear una review
const createReview = async (reviewData) => {
    const reviewCreate = await EntityReview.create(reviewData);
    return reviewCreate;
};

// Obtener todas las reviews
const findAllReview = async () => {
    const getAllReview = await EntityReview.findAll();
    return getAllReview;
};

// Obtener reviews por idProduct
const findReviewByProduct = async (idProduct) => {
    const reviews = await EntityReview.findAll({
        where: { idProduct },
    });
    return reviews;
};

// Obtener reviews por idUser
const findReviewByUser = async (idUser) => {
    const reviews = await EntityReview.findAll({
        where: { idUser },
    });
    return reviews;
};

// Actualizar una review por ID
const updateReview = async (idReview, updatedData) => {
    const infoToUpdate = {
        descriptionReview,
        scoreReview
    }
    const reviewUpdate = await EntityReview.update(infoToUpdate, {
        where: { idReview }
    });
    return reviewUpdate;
};

// Eliminar una review por ID
const deleteReview = async (idReview) => {
    const reviewDelete = await EntityReview.destroy({
        where: { idReview }
    });
    return reviewDelete;
};

module.exports = {
    createReview,
    findAllReview,
    findReviewByProduct,
    findReviewByUser,
    updateReview,
    deleteReview,
};