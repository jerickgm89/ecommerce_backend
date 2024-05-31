const {EntityProducts, CharacteristicsProducts, EntityReview, EntityUsers, EntityDiscounts, EntityComments, ProductsDiscounts} = require('../../../db');
const {Op} = require('sequelize');
const sequelize = require('sequelize')

//Crear producto
const createProducts = async (productData, transaction) => {
    return EntityProducts.create(productData, {transaction});
};

const createCharacteristics = async (characteristicsData, transaction) => {
    return CharacteristicsProducts.create(characteristicsData, {transaction});
};

//Repositorios para Modulular la funcion PATCH
const findProductById = async (id, transaction) => {
    console.log("id ->>", id);
    const response = await EntityProducts.findOne({
        where: {
            idProduct: id
        },
        include: [
            {
                model: CharacteristicsProducts,
                attributes: ['modelProduct', 'characteristics','idBrand']
            },{
                model: EntityReview,
                attributes: ['descriptionReview','idReview'],
            },{
            model: EntityDiscounts,
            attributes: ['nameDiscount', 'descriptionDiscount', 'quantity', 'activeDiscount', 'idProduct', 'discountInGroup' ],
        }],
        transaction: transaction
    });
    return response;
};
const findCharacteriscticsProductsById = async (id, transaction) => {
        return CharacteristicsProducts.findOne({where: {idProduct: id}, transaction})
}
const updateProduct = async (product, updatedData, transaction) => {
    return product.update(updatedData, { transaction });
};
const updateCharacteristics = async (characteristics, updatedData, transaction) => {
    return characteristics.update(updatedData, { transaction });
};

//Borrar un producto
const deleteProduct = async (product, transaction) => {
    return product.destroy({transaction})
};
const deleteCharacteristics = async (id, transaction) => {
    return CharacteristicsProducts.destroy({where: {idProduct: id}, transaction})
};

//Ver todos los productos
// const getAllProducts = async (query) => {
const getAllProducts = async (where, offset, limit, order ) => {
    let include = [
        {
            model: CharacteristicsProducts,
            attributes: ['modelProduct', 'characteristics','idBrand']
        },{
            model: EntityReview,
            attributes: ['descriptionReview','idReview'],
        },{
            model: EntityDiscounts,
            attributes: ['nameDiscount', 'descriptionDiscount', 'quantity', 'activeDiscount', 'idProduct', 'discountInGroup'],
            through: {
                model: ProductsDiscounts,
                attributes: []
            }
        }
    ]

    return EntityProducts.findAll({
        where,
        offset,
        limit,
        order,
        include
    })
};

//Buscar producto por id
const getProductById = async (id) => {
    const productById = await EntityProducts.findOne({
        where: {
            idProduct: id
        },
        include: [
            {
                model: CharacteristicsProducts, 
                attributes: ['idCharacteristicsProducts', 'modelProduct', 'characteristics', 'idBrand']
            },
            {
                model: EntityReview,
                attributes: ['descriptionReview','idReview'],
                include: [
                    {
                        model: EntityUsers,
                        attributes: ['emailUser']
                    }
                ]
            },
            {
                model: EntityDiscounts,
                attributes: ['nameDiscount', 'descriptionDiscount', 'quantity', 'activeDiscount', 'idProduct', 'discountInGroup', 'productsInDiscountGroup' ],
                through: {
                    model: ProductsDiscounts,
                    attributes: []
                }
            },
            {
            model: EntityComments,
            attributtes: ['comments', 'idProduct'],
            include: [
                {
                    model: EntityUsers,
                    attributes: ['emailUser']
                }
            ]
        }
        ]
    });

    // if(productById.entityDiscounts.length){
    //     productById.entityDiscounts?.map(async (discount) => {
    //         if(discount.activeDiscount) {
    //             if( !!discount.idProduct) {
    //                 const newPrice = (1-discount.quantity)*productById.priceProduct;
    //                 productById.discountPriceProduct = newPrice;
    //             }
    //             if(discount.discountInGroup && productById.productsDiscounts.length) {
    //                 const newPrice = 1-discount.quantity*productById.priceProduct;
    //                 productById.discountPriceProduct = newPrice;
    //             }
    //             if(newPrice !== undefined) {
    //                 console.log("newPrice ->>", newPrice);
    //                 await productById.save();
    //                 await productById.reload();
    //             }
    //         }
    //     });
    // }
    return productById;
};


//buscar por nombre
const searchProductByName = async (name, offset, limit) => {
    const searchName =  await EntityProducts.findAll({ 
        where: {
            active: true,
            nameProduct: { 
                [Op.iLike]: `%${name}%`
            },
        },
        offset,
        limit,
        include: [
            {
                model: CharacteristicsProducts, 
                attributes: ['idCharacteristicsProducts', 'modelProduct', 'characteristics', 'idBrand']
            },
            {
                model: EntityReview,
                attributes: ['descriptionReview','idReview'],
                include: [
                    {
                        model: EntityUsers,
                        attributes: ['emailUser']
                    }
                ]
            },
            {
                model: EntityDiscounts,
                attributes: ['nameDiscount', 'descriptionDiscount', 'quantity', 'activeDiscount', 'idProduct', 'discountInGroup' ],
            },
            {
            model: EntityComments,
            attributtes: ['comments', 'idProduct'],
            include: [
                {
                    model: EntityUsers,
                    attributes: ['emailUser']
                }
            ]
        }
        ]
    })
    return searchName;
};

//Desactivar un producto
const blockedProduct = async (id) => {
    const productBlocked = await EntityProducts.findOne({where:{idProduct: id}})

    productBlocked.active = false;
    await productBlocked.save();
    
    return productBlocked;
};

//restaurar un producto

const restoreProduct = async (id) => {
    const productRestore = await EntityProducts.findByPk(id, {paranoid: true})

    productRestore.active = true;
    await productRestore.restore();
    await productRestore.save();

    return productRestore;
};

//mostrar productos desactivados
const getDeactiveProducts = async () => {
        const deactivatedProducts = await EntityProducts.findAll({
            where: {
                active: false
            },
            order: [['idProduct', 'ASC']],
            include: [{
                model: CharacteristicsProducts,
                attributes: ['modelProduct', 'characteristics', 'idBrand']
            }]
        });
    return deactivatedProducts;
};

//funcion transaction
const transactionRecicle = async () => {
    const transaction = await EntityProducts.sequelize.transaction()
    return transaction
}



module.exports = {
    createProducts,
    createCharacteristics,
    getProductById,
    findProductById,
    findCharacteriscticsProductsById,
    updateProduct,
    updateCharacteristics,
    deleteProduct,
    deleteCharacteristics,
    getAllProducts,
    searchProductByName,
    blockedProduct,
    restoreProduct,
    getDeactiveProducts,
    transactionRecicle

};
