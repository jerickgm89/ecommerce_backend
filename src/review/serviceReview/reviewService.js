const { 
createReview,
findAllReview,
updateReview
 } = require('../repositoriesReview/reviewRepositories');

const createReviewServices = async (idUser, idProduct,descriptionReview, scoreReview) => {
    const reviewData = {
        idUser,
        idProduct,
        descriptionReview,
        scoreReview
    };
  


        if(!reviewData) {
            throw new Error(`Error al crear la review: ${error.message}`);
        } else {

            const newReview = await createReview(reviewData);
            return newReview;
        }
   

};

const findAllReviewServices = async () => {

    const getAllReview = await findAllReview();
    if(!getAllReview) {
        throw new Error('No se puede mostrar las reviews.')
    }
    return getAllReview
};




module.exports = {
    createReviewServices,
    findAllReviewServices,
    
};
