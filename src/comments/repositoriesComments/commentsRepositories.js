const { EntityComments } = require('../../db')


//Crear comentarios
/*
{
    
    "idUser": 1,
    "idProduct": 2,
    "comments": "Este es un comentario"
}

*/
const createComments = async (commentsData) => {
    const commentsCreate = await EntityComments.create(commentsData)
    return commentsCreate;
};

//Mostrar todos los comentarios
const getAllComments = async () => {
    const getCommit = await EntityComments.findAll({
       where: {
        activeComments: true
       },
        order: [['idComments', 'ASC']]
    })
    return getCommit;
};

//Buscar comentario por ID
const getCommentsById = async (id) => {
    const comment = await EntityComments.findOne({
        where: {
                idComments: id,
                activeComments: true
               },
        });
    return comment;
};

//Modificar comentario. solo comments
const updateComments = async (idComments, commentsData) => {
    const { comments } = commentsData;
    const reviewUpdate = await EntityComments.update(
        { comments },
        { where: { idComments } }
    )
    return reviewUpdate
};

//Borrar comentario permanentemente
const deleteComments = async (id) => {
    const deleted = await EntityComments.destroy({
        where: { idComments: id }
    });
    return deleted;
};

//Desactivar un comentario
const deactivateComment = async (id) => {
    const deactivated = await EntityComments.findOne(
        { where: { idComments: id } }
    );
    deactivated.activeComments = false,
    await deactivated.save()
    return deactivated;
};

//Restaurar un comentario
const restoreComment = async (id) => {
        const commentsRestore = await EntityComments.findOne({where:{idComments: id}}, {paranoid: true})
    
        commentsRestore.activeComments = true;
        await commentsRestore.restore();
        await commentsRestore.save();
    
        return commentsRestore;
};

//Mostrar lista de comentarios desactivados.
const getInactiveComments = async () => {
        const inactiveComments = await EntityComments.findAll({
            where: { activeComments: false },
            order: [['idComments', 'ASC']]
        });
        return inactiveComments;
    };


module.exports = {
    createComments,
    getAllComments,
    updateComments,
    getCommentsById,
    deleteComments,
    deactivateComment,
    restoreComment,
    getInactiveComments
};
