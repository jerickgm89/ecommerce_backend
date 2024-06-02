const { Op } = require('sequelize')
const { EntityCategory, EntityProducts, CharacteristicsProducts, EntityDiscounts, EntityReview, EntityUsers, EntityBrand, ProductsDiscounts } = require('../../../db.js');

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

const byIdCategoryRespository = async (idCategory) => {
    const category = await EntityProducts.findAll({ 
        where: { 
            idCategory
        },
        include: [ 
            {
                model: CharacteristicsProducts,
                where: {},
                attributes: ['idCharacteristicsProducts', 'modelProduct', 'characteristics', 'idBrand'],
                include: [
                    {
                        model: EntityBrand,
                        attributes: ['nameBrand', 'logoBrand'],
                    }
                ]
            },{
                model: EntityReview,
                attributes: ['descriptionReview','idReview'],
                include: [
                    {
                        model: EntityUsers,
                        attributes: ['emailUser']
                    }
                ]
            },{
                model: EntityDiscounts,
                attributes: ['nameDiscount', 'descriptionDiscount', 'quantity', 'activeDiscount', 'idProduct', 'discountInGroup', 'productsInDiscountGroup' ],
                through: {
                    model: ProductsDiscounts,
                    attributes: []
                }
            }
        ]
    });
    return category
}
module.exports = {
    createCategoryRepository,
    updateCategoryRepository,
    fullListCategoryRepository,
    byNameCategoryRepository,
    deleteCategoryRepository,
    byIdCategoryRespository
}