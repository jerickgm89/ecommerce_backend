const { EntityComments, EntityProducts } = require('../../db')


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
       include: [
        {
          model: EntityProducts,
          attributes: ['imageProducts', 'nameProduct'],
        },
      ],
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
               include: [
                {
                  model: EntityProducts,
                  attributes: ['imageProducts', 'nameProduct'],
                },
              ]
        });
    return comment;
};

//Modificar comentario. solo comments
const updateComments = async (idComments, commentsData) => {
    const { comments, responseComments } = commentsData;
    const reviewUpdate = await EntityComments.update(
        { comments, responseComments },
        
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

const reportComment = async (id) => {
    const reportedComment = await EntityComments.findByPk(id);
    if(!reportedComment){
        return {success: !reportedComment}
    }
    else{
        if(reportedComment.reportsCount === 5){ // === 5
            reportedComment.activeComments = false;
            await reportedComment.save()
            await reportedComment.reload()
        }
        else{
            reportedComment.reportsCount += 1 
            await reportedComment.save()
            await reportedComment.reload()
        }
    }
    response = {
        success: !!reportedComment,
        activeComments: reportedComment.activeComments
    }
    
    // const foundedComment = await EntityComments.findByPk(idComments)
    console.log("founded comment -> ", reportedComment) 
    console.log("obj comment ->>>>> ", response) 
    // return false
    return response;
};


module.exports = {
    createComments,
    getAllComments,
    updateComments,
    getCommentsById,
    deleteComments,
    deactivateComment,
    restoreComment,
    getInactiveComments,
    reportComment
};
