const {EntityReview, EntityProducts, EntityUsers} = require('../../db');





//Crear un review 
const createReview = async (reviewData) => {
    const reviewCreate = await EntityReview.create(reviewData)

    return reviewCreate;
};

const findAllReview = async () => {
    
    const getAllReview = await EntityReview.findAll();
    return getAllReview
};

// const reviewById = async  (idReview) => {
//     const reviewId = await EntityReview.findOne({where: {idReview: idReview}},{
//         attributes: ['descriptionReview', 'scoreReview'],
//         include: [
//             {
//                 model: EntityProducts,
//                 attributes: ['nameProduct']
//             },
//             {
//                 model: EntityUsers,
//                 attributes: ['emailUser']
//             }
//         ]
//     });
//     return reviewId;
// }


module.exports = {
    createReview,
    findAllReview,

}