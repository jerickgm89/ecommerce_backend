const {
    createReviewServices,
    findAllReviewServices,
    reviewByIdServices
} = require('../serviceReview/reviewService')

const createReviewControllers = async (req,res) => {
    const {
        idUser,
        idProduct,
        scoreReview,
        descriptionReview} = req.body
        
try {
    const newReview = await createReviewServices(idUser,idProduct,descriptionReview, scoreReview)
    res.status(201).json({message: 'Review creada con éxito', newReview})
} catch (error) {

    res.status(500).json({error: 'Error al crear una review'})
}
};
/*Crear un usuario: 

{
    "idUser": 2,
    "idProduct": 2,
    "descriptionReview": "¡Muy buen productooo!",
    "scoreReview": 5
}
*/
const findAllReviewControllers = async (req,res) => {
    try {
        const reviews = await findAllReviewServices()
        res.status(200).json(reviews)
    } catch (error) {
        console.error('Error en detectado en controllers: ', error.message)
        res.status(500).json({message: error.message})
    }
};

const reviewByIdControllers = async (req,res) => {
    const {id} = req.params
    const idReview = id
    try {
        res.status(200).json(idReview)
    } catch (error) {
        res.status(500).json({message: 'Error al buscar un review especifico'})
    }
}

module.exports = {
    createReviewControllers,
    findAllReviewControllers,
    reviewByIdControllers

}