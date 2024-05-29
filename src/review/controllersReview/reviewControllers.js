/*Crear una review: 

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
    updateReviewServices,
    deleteReviewServices,
    deactivedReviewService,
    restoreReviewService,
    getInactiveReviewService
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

const deactivedReviewControllers = async (req, res) => {
    const {id} = req.params;
    try {
        const inactiveReviews = await deactivedReviewService(id);
        res.status(200).json({message: 'Review desactivada: ', inactiveReviews});
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener reviews desactivadas', details: error.message });
        }
    };

    const restoreReviewControllers = async (req,res) => {
        const {id} = req.params;
            const restore = await restoreReviewService(id)
        try {
            res.status(200).json({message: 'La review fue restaurada', restore})
        } catch (error) {
            res.status(500).json({error: 'No se pudo restaurar la review', details: error.message})
        }
    };

    const getInactiveReviewControllers = async (req,res) => {
        
        try {
        const inactive = await  getInactiveReviewService()
    
            res.status(200).json(inactive)
        } catch (error) {
            res.status(500).json({error: 'No se puede mostrar las review desactivadas'})
        }
    }


module.exports = {
    createReviewControllers,
    findAllReviewControllers,
    findReviewByProductControllers,
    findReviewByUserControllers,
    updateReviewControllers,
    deleteReviewControllers,
    deactivedReviewControllers,
    restoreReviewControllers,
    getInactiveReviewControllers
};