const {
    createComments,
    getAllComments,
    updateComments,
    getCommentsById,
    deleteComments,
    deactivateComment,
    restoreComment,
    getInactiveComments,
    reportComment
} = require('../repositoriesComments/commentsRepositories')


//Crear comentarios
const createCommentsServices = async (idUser, idProduct, comments, responseComments) => {

    const commentsData = {
        idUser,
        idProduct,
        comments,
        responseComments
    }
    if(!commentsData) {
        throw new Error('Error al crear un comentario')
    }
    const responseComment = await  createComments(commentsData)
    return responseComment
};

//Mostrar todos los comentarios
const getAllCommentsService = async () => {
    const getComments = await getAllComments()
    if(!getComments){
        throw new Error('No se pude mostrar los comentarios')
    }
    return getComments
};

//Modificar comentario . solo comments
const updateCommentsService = async (idComments, commentsData) => {
    const update = await updateComments(idComments, commentsData)
    if(update[0] === 0) {
        throw new Error('No se puede modificar el comentario.')
    }
    return update;
};

//Buscar comentario por ID
const getCommentsByIdService = async (id) => {
    const comment = await getCommentsById(id);
    if (!comment) {
        throw new Error('No se encontró el comentario')
    }
    return comment;
};

//Borrar un comentario permanentemente
const deleteCommentsService = async (id) => {
    const deleted = await deleteComments(id)
    if (deleted === 0) {
        throw new Error('No se puede borrar el comentario')
    }
    return deleted;
};

//Desactivar un comentario
const deactivateCommentService = async (id) => {
    const deactivated = await deactivateComment(id)
    if (deactivated[0] === 0) {
        throw new Error('No se puede desactivar el comentario.')
    }
    return deactivated;
};

//Activar un comentario
const restoreCommentService = async (id) => {
    const commentRestore = await restoreComment(id)
    if(!commentRestore) {
        throw new Error('No se puede restaurar el producto')
    }
};

//Mostrar lista de comentarios desactivados.
const getInactiveCommentsService = async () => {
    const inactiveComments = await getInactiveComments()
    if (!inactiveComments) {
        throw new Error('No se puede mostrar los comentarios desactivados')
    }
    return inactiveComments;
};

//Agregar un reporte a comentario, después del 5to reporte es desactivado.
const reportCommentService = async (id) => {
    const report = await reportComment(id)
    if (!report.success) {
        throw new Error('No se pudo encontrar el comentario a reportar')
    }
    return report;
};

module.exports = {
    createCommentsServices,
    getAllCommentsService,
    updateCommentsService,
    getCommentsByIdService,
    deleteCommentsService,
    deactivateCommentService,
    restoreCommentService,
    getInactiveCommentsService,
    reportCommentService
}