const {
    createCommentsServices,
    getAllCommentsService,
    updateCommentsService,
    getCommentsByIdService,
    deleteCommentsService,
    deactivateCommentService,
    restoreCommentService,
    getInactiveCommentsService
 } = require('../servicesComments/commentsServices')

 //Crer comentarios
const createCommentsControllers = async (req,res) => {

    const {idUser, idProduct, comments} = req.body
    try {
        const newComments = await createCommentsServices(idUser,idProduct,comments)
        res.status(201).json({message: 'Comentario creado con éxito ', newComments})
    } catch (error) {
        res.status(500).json({error: 'Error al crear un comentario', details: error.message})
    }
};


//Mostrar todos los comentarios
const getAllCommentsControllers = async (req,res) => {

    const getComments = await getAllCommentsService()
    try {
        res.status(200).json(getComments)
    } catch (error) {
        res.status(500).json({message: 'Error al mostrar todos los comentarios', details: error.message})
    }
};

//Mostrar solo los comentarios desactivados
const getInactiveCommentsControllers = async (req, res) => {
    const inactiveComments = await getInactiveCommentsService()
    
    try {
        if(inactiveComments.length) {

            return    res.status(200).json(inactiveComments)
        }
        return res.status(200).json([])
        
    } catch (error) {
        res.status(500).json({ message: 'Error al mostrar los comentarios desactivados', details: error.message })
    }
};

//buscar comentarios por ID
const getCommentsByIdControllers = async (req, res) => {
    const { id } = req.params;
    try {
        const comment = await getCommentsByIdService(id);
        res.status(200).json(comment)
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el comentario', details: error.message })
    }
};

//Modificar Comentario. solo el comments
const updateCommentsControllers = async (req, res) => {
    const { id } = req.params;
    const idComments = id
    const commentsData = req.body
    try {
        const updatedComments = await updateCommentsService(idComments, commentsData)
        res.status(200).json({ message: 'Comentario modificado con éxito' })
    } catch (error) {
        res.status(500).json({ error: 'Error al modificar el comentario', details: error.message })
    }
};

//Borrar un comentario permanentemente.
const deleteCommentsControllers = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await deleteCommentsService(id)
        res.status(200).json({ message: 'Comentario borrado con éxito', deleted })
    } catch (error) {
        res.status(500).json({ error: 'Error al borrar el comentario', details: error.message })
    }
};

//Desactivar un comentario
const deactivateCommentControllers = async (req, res) => {
    const { id } = req.params;
    try {
        const deactivated = await deactivateCommentService(id)
        res.status(200).json({ message: 'Comentario desactivado con éxito', deactivated })
    } catch (error) {
        res.status(500).json({ error: 'Error al desactivar el comentario', details: error.message })
    }
};

//Restaurar comentario
const restoreCommentControllers = async (req,res) => {
    const {id} = req.params
        const restore = await restoreCommentService(id)
    try {
        res.status(200).json({message: 'El comentario fue restaurado ', restore})
    } catch (error) {
        res.status(500).json({message: 'Error al restaurar el comentario'})
    }
};



 module.exports = {
    createCommentsControllers,
    getAllCommentsControllers,
    updateCommentsControllers,
    getCommentsByIdControllers,
    deleteCommentsControllers,
    deactivateCommentControllers,
    restoreCommentControllers,
    getInactiveCommentsControllers
}