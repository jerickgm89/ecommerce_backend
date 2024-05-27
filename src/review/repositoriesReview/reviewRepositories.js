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
const findReviewById = async (idReview) => {
    console.log('Repositorio buscando review con ID:', idReview);  // Log para verificar el parámetro
    const review = await EntityReview.findByPk(idReview);
    console.log('Review en repositorio:', review);  // Log para verificar el resultado de la consulta
    return review;
};


// Actualizar una review por ID
const updateReview = async (idReview, updatedData) => {
    const reviewUpdate = await EntityReview.update(updatedData, {
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
    findReviewById,
    updateReview,
    deleteReview,
};