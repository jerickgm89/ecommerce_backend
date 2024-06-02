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
} = require('../../repositories/repositoriesDiscounts/repositoriesDiscounts.js');
const arrayFormatter = require('../../../../utils/formatArrayToAddDiscount.js') ;

const createDiscountService = async ( idProduct, discountInfo ) => {
    const [ discount, created ] = await createDiscount( idProduct, discountInfo )
    return [ discount, created ]
}

const createGroupDiscountService = async ( idProduct, discountInfo ) => {
    
    // idProduct es un string, ejemplos: "Laptops", "Apple", "Acer", "Celulares"
    // unidos de forma "Laptops+Celulares"
    
    const idProductsList = await arrayFormatter( idProduct );
    // console.log("idProduct in discountService->", idProductsList)

    // debo entregar un array de idProduct, ejemplos: [1, 2, 3, 4]
    // console.log("formatted info in discountService ->>>", idProductsList )

    // const toShow = idProduct
    const [ discount, created ] = await createGroupDiscount( idProductsList, discountInfo )
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