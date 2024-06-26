const {
    createDiscountService,
    // postGroupDiscountService,
    createGroupDiscountService,
    getDiscountByProductService,
    getDiscountByNameService,
    getDiscountByIdService,
    getAllGroupOfDiscountService,
    updateDiscountService,
    updateDiscountByGroupService,
    deleteDiscountService
} = require('../../services/servicesDiscounts/discountServices.js')

const createDiscountController = async ( request, response ) => {
    const {
        nameDiscount, // string
        descriptionDiscount, // string
        quantity, // decimal
        activeDiscount, // boolean
        // productsInDiscountGroup
        expirationDate
    } = request.body;
    const { idProduct } = request.params;
    let discount;
    let created;
    try {
        // acá recibo un string en idProduct, ejemplos: "Laptops", "Apple", "Acer", "Celulares"
        if(!Number(idProduct)){
            [ discount, created ] = await createGroupDiscountService(idProduct, { 
                nameDiscount,
                descriptionDiscount,
                quantity,
                activeDiscount,
                expirationDate
            })
        }
        else{
            [ discount, created ] = await createDiscountService(idProduct, { 
            nameDiscount,
            descriptionDiscount,
            quantity: parseFloat(quantity),
            activeDiscount,
            expirationDate
            })
        }
        const objetoNewDiscount = {
            idDiscount: discount.idDiscount,
            nameDiscount: discount.nameDiscount,
            descriptionDiscount: discount.descriptionDiscount,
            quantity: parseFloat(discount.quantity),
            activeDiscount: discount.activeDiscount,
            idProduct: discount.idProduct,
            discountInGroup: discount.discountInGroup,
            productsInDiscountGroup: discount.productsInDiscountGroup,
            expirationDate: discount.expirationDate
        }
        if(!created){
            return response.status(200).json(objetoNewDiscount)
        }
        return response.status(201).json(objetoNewDiscount)
        
    } catch (error) {
        response.status(500).json({ error: error, details: error.message })
    }
;}
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
    
};
const getAllGroupOfDiscountController = async ( request, response ) => {
    try {
        const discountByIdDiscount = await getAllGroupOfDiscountService( )
        
        return response.status(200).json( discountByIdDiscount )
    } catch (error) {
        response.status(500).json({ error: error, details: error.message })
        
    }
    
};
const updateDiscountController = async ( request, response ) => {
    try {
        const { idDiscount } = request.params;
        const {
            nameDiscount,
            descriptionDiscount,
            quantity,
            activeDiscount,
            discountInGroup,
            productsInDiscountGroup,
            expirationDate
        } = request.body;
        
        if( discountInGroup && productsInDiscountGroup.length ){
            const updateGroupDiscount = await updateDiscountByGroupService(idDiscount, {
                nameDiscount,
                descriptionDiscount,
                quantity,
                activeDiscount,
                discountInGroup,
                productsInDiscountGroup,
                expirationDate
            })
            if( !updateGroupDiscount ) {
                return response.status(400).json({ error: "No fue posible modificar el descuento de grupo"})
            }
            return response.status(200).json(updateGroupDiscount)
        }
        else {
            const updateSingleDiscount = await updateDiscountService(idDiscount, {
            nameDiscount,
            descriptionDiscount,
            quantity,
            activeDiscount,
            expirationDate
            })
            if( !updateSingleDiscount ) {
                return response.status(400).json({ error: "No fue posible modificar el descuento simple"})

            }
            return response.status(200).json(updateSingleDiscount)
        }
    } catch (error) {
        response.status(500).json({ error: error, details: error.message })   
    }
};  
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
    getAllGroupOfDiscountController,
    updateDiscountController,
    deleteDiscountController,
};