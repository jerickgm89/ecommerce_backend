const {
    createDiscountService,
    // postGroupDiscountService,
    getDiscountByProductService,
    getDiscountByNameService,
    getDiscountByIdService,
    updateDiscountService,
    updateDiscountByGroupService,
    deleteDiscountService
} = require('../../services/servicesDiscounts/discountServices.js')

const createDiscountController = async ( request, response ) => {
    const { idProduct } = request.params;
    const {
        nameDiscount, // string
        descriptionDiscount, // string
        quantity, // decimal
        activeDiscount // boolean
    } = request.body
    try {
    
    // 
    const [ discount, created ] = await createDiscountService(idProduct, { 
        nameDiscount,
        descriptionDiscount,
        quantity: parseFloat(quantity),
        activeDiscount
    })
    const objetoNewDiscount = {
        idDiscount: discount.idDiscount,
        nameDiscount: discount.nameDiscount,
        descriptionDiscount: discount.descriptionDiscount,
        quantity: parseFloat(discount.quantity),
        activeDiscount: discount.activeDiscount,
        idProduct: idProduct,
        discountInGroup: discount.discountInGroup,
        productsInDiscountGroup: discount.productsInDiscountGroup
    }
    if(!created){
        return response.status(201).json(objetoNewDiscount)
    }
    return response.status(200).json(objetoNewDiscount)
    
} catch (error) {
    response.status(500).json({ error: error, details: error.message })
}


}
const getDiscountByProductController = async ( request, response ) => {
    const { idProduct } = request.params;
    try {
        const discountByProduct = await getDiscountByProductService(idProduct)
        
        return response.status(200).json(discountByProduct)
    } catch (error) {
        response.status(500).json({ error: error, details: error.message })
        
    }
}
const getDiscountByNameController = async ( request, response ) => {
    const { name } = request.params;
    try {
        const discountByName = await getDiscountByNameService(name)
        return response.status(200).json(discountByName)
    } catch (error) {
        response.status(500).json({ error: error, details: error.message })
        
    }
    
}
const getDiscountByIdController = async ( request, response ) => {
    const { idDiscount } = request.params;
    try {
        const discountByIdDiscount = await getDiscountByIdService( idDiscount )
        
        return response.status(200).json( discountByIdDiscount )
    } catch (error) {
        response.status(500).json({ error: error, details: error.message })
        
    }
    
}
const updateDiscountController = async ( request, response ) => {
    try {
        const { idDiscount } = request.params;
        const {
            nameDiscount,
            descriptionDiscount,
            quantity,
            activeDiscount
        } = request.body;
        
        const updateSingleDiscount = await updateDiscountService(idDiscount, {
            nameDiscount,
            descriptionDiscount,
            quantity,
            activeDiscount,
        })
        return response.status(200).json(updateSingleDiscount)
    } catch (error) {
        response.status(500).json({ error: error, details: error.message })   
    }
}
const updateDiscountByGroupController = async ( request, response ) => {
    const {
        nameDiscount,
        descriptionDiscount,
        quantity,
        activeDiscount,
        discountInGroup,
        productsInDiscountGroup
    } = request.body;
    const { idDiscount } = request.params;

    try {
        const updatedGroupDiscount = await updateDiscountByGroupService( idDiscount, {
            nameDiscount,
            descriptionDiscount,
            quantity,
            activeDiscount,
            discountInGroup,
            productsInDiscountGroup
        })
        return response.status(200).json(updatedGroupDiscount)
    } catch (error) {
        response.status(500).json({ error: error, details: error.message })
    }
    
}
const deleteDiscountController = async ( request, response ) => {
    const { idDiscount } = request.params;
    try {
        const deletedDiscount = await deleteDiscountService(idDiscount)
        
        return response.status(200).json(deletedDiscount)
    } catch (error) {
        response.status(500).json({ error: error, details: error.message })
        
    }
    
}

module.exports = {
    createDiscountController,
    getDiscountByProductController,
    getDiscountByNameController,
    getDiscountByIdController,
    updateDiscountController,
    updateDiscountByGroupController,
    deleteDiscountController
}

// createDiscountService,
// getDiscountByProductService,
// getDiscountByNameService,
// getDiscountByidService,
// updateDiscountService,
// updateDiscountByGroupService,
// deleteDiscountService

// createDiscount,
// getDiscountByProduct,
// getDiscountByName,
// getDiscountByid,
// updateDiscount,
// updateDiscountByGroup,
// deleteDiscount