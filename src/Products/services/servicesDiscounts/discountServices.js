const {
    createDiscount,
    getDiscountByProduct,
    getDiscountByName,
    getDiscountById,
    updateDiscount,
    updateDiscountByGroup,
    deleteDiscount
} = require('../../repositories/repositoriesDiscounts/repositoriesDiscounts.js')

const createDiscountService = async ( idProduct, discountInfo ) => {
    const [ discount, created ] = await createDiscount( idProduct, discountInfo )
    return [ discount, created ]

}
const getDiscountByProductService = async ( idProduct ) => {
    const getDiscountsProductsList = await getDiscountByProduct( idProduct )
    return getDiscountsProductsList
}
const getDiscountByNameService = async ( name ) => {
    const getByNameDiscountsList = await getDiscountByName( name )
    return getByNameDiscountsList
    
}
const getDiscountByIdService = async ( idDiscount ) => {
    const discountByIdDiscount = await getDiscountById( idDiscount )
    return discountByIdDiscount
    
}
const updateDiscountService = async ( idDiscount ) => {
    const updatedDiscount = await updateDiscount( idDiscount )
    return updatedDiscount
    
}
const updateDiscountByGroupService = async ( name ) => {
    const updatedGroupDiscount = await updateDiscountByGroup( name )
    return updatedGroupDiscount
    
}
const deleteDiscountService = async (idDiscount) => {
    const deletedDiscountById = await deleteDiscount( idDiscount )
    return deletedDiscountById

}

module.exports = {
    createDiscountService,
    getDiscountByProductService,
    getDiscountByNameService,
    getDiscountByIdService,
    updateDiscountService,
    updateDiscountByGroupService,
    deleteDiscountService
}

// createDiscount,
// getDiscountByProduct,
// getDiscountByName,
// getDiscountByid,
// updateDiscount,
// updateDiscountByGroup,
// deleteDiscount