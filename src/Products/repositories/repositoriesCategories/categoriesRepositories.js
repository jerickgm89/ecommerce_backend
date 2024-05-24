const { Op } = require('sequelize')
const { EntityCategory } = require('../../../db.js')

const createCategoryRepository = async ( categoryToCreate ) => {
    const newCategory = await EntityCategory.create(categoryToCreate);
    return newCategory
}
const updateCategoryRepository = async ( idCategory, infoToUpload ) => {
    // console.log(idCategory, "##########")
    const updatedCategory = await EntityCategory.update(
        infoToUpload,
        {
            where:{
                idCategory
            }
        }
        
    )
    const category = await EntityCategory.findByPk(idCategory);
    return category
}
const fullListCategoryRepository = async () => {
    const updatedCategory = await EntityCategory.findAll()
    return updatedCategory
    
}
const byNameCategoryRepository = async (name) => {
    const category = await EntityCategory.findOne({ 
        where: { 
                nameCategory: name
                }
            });
    return category

}
const deleteCategoryRepository = async (idCategory) => {
    const destoyed = await EntityCategory.destroy({
        where:{
            idCategory
        }
    })
    return !!destoyed
}

module.exports = {
    createCategoryRepository,
    updateCategoryRepository,
    fullListCategoryRepository,
    byNameCategoryRepository,
    deleteCategoryRepository
}