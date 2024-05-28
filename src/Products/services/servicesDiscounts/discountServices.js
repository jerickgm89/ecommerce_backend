const {
    createDiscount,
    createGroupDiscount,
    getDiscountByProduct,
    getDiscountByName,
    getDiscountById,
    getAllGroupOfDiscount,
    updateDiscount,
    updateDiscountByGroup,
    deleteDiscount
} = require('../../repositories/repositoriesDiscounts/repositoriesDiscounts.js')

const createDiscountService = async ( idProduct, discountInfo ) => {
    const [ discount, created ] = await createDiscount( idProduct, discountInfo )
    return [ discount, created ]
}

const createGroupDiscountService = async ( idProduct, discountInfo ) => {
    const [ discount, created ] = await createGroupDiscount( idProduct, discountInfo )
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
const getAllGroupOfDiscountService = async (  ) => {
    const discountByIdDiscount = await getAllGroupOfDiscount(  )
    return discountByIdDiscount
    
}
const updateDiscountService = async ( idDiscount, infoToUploadDiscount ) => {
    const updatedDiscount = await updateDiscount( idDiscount, infoToUploadDiscount )
    return updatedDiscount
    
}
const updateDiscountByGroupService = async ( idDiscount, infoToUploadDiscount ) => {
    const updatedGroupDiscount = await updateDiscountByGroup( idDiscount, infoToUploadDiscount )
    return updatedGroupDiscount
    
}
const deleteDiscountService = async (idDiscount) => {
    const deletedDiscountById = await deleteDiscount( idDiscount )
    return deletedDiscountById

}

module.exports = {
    createDiscountService,
    createGroupDiscountService,
    getDiscountByProductService,
    getDiscountByNameService,
    getDiscountByIdService,
    getAllGroupOfDiscountService,
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