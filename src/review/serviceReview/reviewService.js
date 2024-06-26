const {
    createReview,
    findAllReview,
    findReviewByProduct,
    findReviewByUser,
    updateReview,
    deleteReview,
    deactivedReview,
    restoreReview,
    getInactiveReview,
} = require('../repositoriesReview/reviewRepositories');

const createReviewServices = async (idUser, idProduct, descriptionReview, scoreReview) => {
    const reviewData = { idUser, idProduct, descriptionReview, scoreReview };
    if (!reviewData) {
        throw new Error('Error al crear la review');
    } else {
        const newReview = await createReview(reviewData);
        return newReview;
    }
};

const findAllReviewServices = async () => {
    const getAllReview = await findAllReview();
    if (!getAllReview) {
        throw new Error('No se pueden mostrar las reviews.');
    }
    return getAllReview;
};

const findReviewByProductServices = async (idProduct) => {
    const reviews = await findReviewByProduct(idProduct);
    if (!reviews) {
        throw new Error('No se pueden mostrar las reviews para este producto.');
    }
    return reviews;
};

const findReviewByUserServices = async (idUser) => {
    const reviews = await findReviewByUser(idUser);
    if (!reviews) {
        throw new Error('No se pueden mostrar las reviews de este usuario.');
    }
    return reviews;
};

const updateReviewServices = async (idReview, updatedData) => {
    const reviewUpdate = await updateReview(idReview, updatedData);
    if (!reviewUpdate) {
        throw new Error('Error al actualizar la review.');
    }
    return reviewUpdate;
};

const deleteReviewServices = async (idReview) => {
    const reviewDelete = await deleteReview(idReview);
    if (!reviewDelete) {
        throw new Error('Error al eliminar la review.');
    }
    return reviewDelete;
};

const deactivedReviewService = async (id) => {
    const inactiveReviews = await deactivedReview(id);
    if (inactiveReviews.length === 0) {
        throw new Error('No hay reviews desactivadas');
    }
    return inactiveReviews
};


const restoreReviewService = async (id) => {
    const restore = await restoreReview(id)
    if(!restore) {
        throw new Error('No se pudo restaurar la review')
    }
    return restore
};

const getInactiveReviewService = async () => {
    const getInactive = await getInactiveReview()
    if(!getInactive) {
        throw new Error('no se pudo mostrar los reviews desactivados')
    }
    
    return getInactive
}

module.exports = {
    createReviewServices,
    findAllReviewServices,
    findReviewByProductServices,
    findReviewByUserServices,
    updateReviewServices,
    deleteReviewServices,
    deactivedReviewService,
    restoreReviewService,
    getInactiveReviewService
};
