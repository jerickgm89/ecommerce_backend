const { Op } = require('sequelize')
const { EntityDiscounts, EntityProducts } = require('../../../db.js')

const createDiscount = async ( idProduct, {
    nameDiscount,
    descriptionDiscount,
    quantity,
    activeDiscount
} ) => {
    const product = await EntityProducts.findByPk(idProduct);

    if(!product){
        throw new error ('Producto no encontrado, no es posible asociarle un descuento');
    }
    const [discount, created] = await EntityDiscounts.findOrCreate({
        where: { 
            idProduct,
            nameDiscount,
            quantity
        },
        defaults: {
            idProduct,
            nameDiscount,
            descriptionDiscount,
            quantity,
            activeDiscount
        }
    })

    await product.addEntityDiscount( discount )
    const discountCreated = await EntityDiscounts.findByPk(discount.idDiscount)

    // console.log("###", quantity, typeof(quantity), isNaN(quantity), objeto);
    return [discountCreated, created]
    // const findProduct = await EntityDiscounts.findByPk( idProducts )
    
    // Si ya existe un descuento asociado al producto


    // if ( findProduct?.idDiscount == idDiscount ){
    //     findProduct.nameDiscount = nameDiscount,
    //     findProduct.descriptionDiscount = descriptionDiscount,
    //     findProduct.quantity = quantity,
    //     findProduct.activeDiscount = activeDiscount,
    //     await findProduct.save()
    //     await findProduct.reload()
    //     return findProduct
    // }
    // else if ( findProduct ) {
    //     const createDiscount = await EntityDiscounts.create(  )
    // }
    // else {
    //     throw new error ('')
    // }
}
const getDiscountByProduct = async ( idProduct ) => {
    const getListOfDiscounts = await EntityDiscounts.findAll({
        where:{
            idProduct
        }
    })
    return getListOfDiscounts
}

const getDiscountByName = async ( name ) => {
    const discountByName = await EntityDiscounts.findAll({
        where: {
            nameDiscount: {
                [Op.iLike] : `%${name}%`
            }
        }
    })
    return discountByName
}
const getDiscountById = async ( idDiscount ) => {
    const discountByIdDiscount = await EntityDiscounts.findOne({
        where: {
            idDiscount,
        }
    })
    return discountByIdDiscount
}
const findByPk = (idDiscount) => {

}
const updateDiscount = async (idDiscount) => {
    const updateByIdDiscounts = await EntityDiscounts.update({
        where:{
            idProduct
        }
    })
    return updateByIdDiscounts
}
const updateDiscountByGroup = async (name) => {

}
const deleteDiscount = async (idDiscount) => {

}


module.exports = {
    createDiscount,
    getDiscountByProduct,
    getDiscountByName,
    getDiscountById,
    updateDiscount,
    updateDiscountByGroup,
    deleteDiscount
}