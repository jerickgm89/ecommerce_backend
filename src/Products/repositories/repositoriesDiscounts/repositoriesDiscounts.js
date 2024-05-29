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
    });
    await product.addEntityDiscount( discount )
    const discountCreated = await EntityDiscounts.findByPk(discount.idDiscount);
    // console.log("###", quantity, typeof(quantity), isNaN(quantity), objeto);
    return [discountCreated, created]
};

const createGroupDiscount = async ( idProductList, {
    nameDiscount,
    descriptionDiscount,
    quantity,
    activeDiscount,
} ) => {
    // const idProductList = idProduct.split('+').map(Number).sort((a, b) => a - b); 
    if (!idProductList.length) {
        throw new Error('El listado de productos asociados no puede estar vacío.');
    }
    // console.log("type of idProductList->", typeof idProductList, "   isArray ->> ", Array.isArray(idProductList))
    const objectToCreate = {
        nameDiscount,
        descriptionDiscount,
        quantity: parseFloat(quantity),
        activeDiscount,
        discountInGroup: true,
        productsInDiscountGroup: idProductList
    }
    // console.log("type of idProductList->", typeof objectToCreate, "   isArray ->> ", Array.isArray(objectToCreate.productsInDiscountGroup))
    
    // const newDiscount = await EntityDiscounts.create( objectToCreate )

    const [newDiscount, create] = await EntityDiscounts.findOrCreate({        
        where: { 
            idProduct: null,
            nameDiscount,
            discountInGroup: true,
            quantity
        },
        defaults: objectToCreate
    });

    // console.log("salio bien o no:   ", !!newDiscount)

    if(!newDiscount){
        throw new Error('No fue posible crear el descuento');

    }
    await Promise.all( 
        idProductList.map( async ( productID ) => {
            const productFound = await EntityProducts.findOne({
                where: {
                    idProduct: productID
                }
        })
        if (!productFound) {
            throw new error(`Producto con ID ${productID} no fue encontrado.`);
        }
        !!productFound && await newDiscount.addEntityProduct(productFound);
        })
    )

    const result = await EntityDiscounts.findOne({
        where:{
            idDiscount: newDiscount.idDiscount,
    //         // productsInDiscountGroup: idProductList
        },
    })
    // console.log("was->>", result)
    return [result, create]
};

const getDiscountByProduct = async ( idProduct ) => {
    const getListOfDiscounts = await EntityDiscounts.findAndCountAll({
        where: {
            [Op.or]: [
                { idProduct },
                {
                    productsInDiscountGroup: {
                        [Op.contains]: [idProduct]
                    }
                }
            ]
        }
    });
    return getListOfDiscounts
};

const getDiscountByName = async ( name ) => {
    const discountByName = await EntityDiscounts.findAll({
        where: {
            nameDiscount: {
                [Op.iLike] : `%${name}%`
            }
        }
    })
    return discountByName
};

const getDiscountById = async ( idDiscount ) => {
    const discountByIdDiscount = await EntityDiscounts.findOne({
        where: {
            idDiscount,
        }
    })
    return discountByIdDiscount
};

const getAllGroupOfDiscount = async (  ) => {
    const discountByIdDiscount = await EntityDiscounts.findAll({
        where: {
            // idDiscount,
            // idProduct: null,
            discountInGroup: true
        }
    })
    return discountByIdDiscount
};

const updateDiscount = async ( idDiscount, infoToUploadDiscount ) => {
    // console.log("ID DISCOUNT ->  ",idDiscount)
    // console.log("UPLOAD ->  ",infoToUploadDiscount)
    const updateByIdDiscounts = await EntityDiscounts.update(
        infoToUploadDiscount,
        {
            where:{
            idDiscount,
            discountInGroup: false,
            productsInDiscountGroup: []
            }
        }
    )
    const response = 
    !!updateByIdDiscounts[0] 
    ? await EntityDiscounts.findByPk(
        idDiscount,
        {
            where:{
            discountInGroup: false,
            productsInDiscountGroup: []
            }
        }
    )
    : false
    
    return response
};

const updateDiscountByGroup = async (idDiscount, infoToUploadDiscount) => {
    const updateByIdDiscounts = await EntityDiscounts.update(
        infoToUploadDiscount,
        {
            where:{
            idDiscount,
            discountInGroup: true,
            // productsInDiscountGroup: {
            //     [Op.ne]: []
            // }
            }
        }
    )
    const response = 
    !!updateByIdDiscounts[0] 
    ? await EntityDiscounts.findByPk(
        idDiscount,
        {
            where:{
                discountInGroup: true,
            // productsInDiscountGroup: []
            }
        }
    )
    : false
    
    return response
};

const deleteDiscount = async ( idDiscount ) => {
    const successfullyDeleted = await EntityDiscounts.destroy({
        where: {
            idDiscount
        }
    })
    if( !successfullyDeleted ) throw new error ('No fue posible borrar el descuento, revise el id proporcionado.')
    else return !!successfullyDeleted
};


module.exports = {
    createDiscount,
    createGroupDiscount,
    getDiscountByProduct,
    getDiscountByName,
    getDiscountById,
    getAllGroupOfDiscount,
    updateDiscount,
    updateDiscountByGroup,
    deleteDiscount
}