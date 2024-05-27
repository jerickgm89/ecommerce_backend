/*Crear un usuario: 

{
    "idUser": 2,
    "idProduct": 2,
    "descriptionReview": "¡Muy buen productooo!",
    "scoreReview": 5
}
*/

const {
    createReviewServices,
    findAllReviewServices,
    findReviewByProductServices,
    findReviewByUserServices,
    findReviewByIdServices,
    updateReviewServices,
    deleteReviewServices,
} = require('../serviceReview/reviewService');

const createReviewControllers = async (req, res) => {
    const { idUser, idProduct, scoreReview, descriptionReview } = req.body;
    try {
        const newReview = await createReviewServices(idUser, idProduct, descriptionReview, scoreReview);
        res.status(201).json({ message: 'Review creada con éxito', newReview });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear una review' });
    }
};

const findAllReviewControllers = async (req, res) => {
    try {
        const reviews = await findAllReviewServices();
        res.status(200).json(reviews);
    } catch (error) {
        console.error('Error detectado en controllers: ', error.message);
        res.status(500).json({ message: error.message });
    }
};

const findReviewByProductControllers = async (req, res) => {
    const { idProduct } = req.params;
    try {
        const reviews = await findReviewByProductServices(idProduct);
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las reviews para este producto' });
    }
};
const findReviewByUserControllers = async (req, res) => {
    const { idUser } = req.params;
    try {
        const reviews = await findReviewByUserServices(idUser);
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las reviews de este usuario' });
    }
};
const findReviewByIdControllers = async (req, res) => {
    const { idReview } = req.params;
    console.log('ID Review:', idReview);  // Log para verificar el parámetro
    try {
        const review = await findReviewByIdServices(idReview);
        console.log('Review encontrada:', review);  // Log para verificar la respuesta del servicio
        if (review) {
            res.status(200).json(review);
        } else {
            res.status(404).json({ message: 'Review no encontrada' });
        }
    } catch (error) {
        console.error('Error al obtener la review:', error);  // Log para el error
        res.status(500).json({ error: 'Error al obtener la review' });
    }
};

const updateReviewControllers = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    try {
        const reviewUpdate = await updateReviewServices(id, updatedData);
        res.status(200).json({ message: 'Review actualizada con éxito', reviewUpdate });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la review' });
    }
};

const deleteReviewControllers = async (req, res) => {
    const { id } = req.params;
    try {
        await deleteReviewServices(id);
        res.status(200).json({ message: 'Review eliminada con éxito' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la review' });
    }
};
module.exports = {
    createReviewControllers,
    findAllReviewControllers,
    findReviewByProductControllers,
    findReviewByUserControllers,
    findReviewByIdControllers,
    updateReviewControllers,
    deleteReviewControllers,
};