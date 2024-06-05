const {EntityProducts, CharacteristicsProducts, EntityReview, EntityUsers, EntityDiscounts, EntityComments, ProductsDiscounts} = require('../../../db');
const {Op} = require('sequelize');
const sequelize = require('sequelize')
const modifyPriceProduct = require('../../../../utils/modifyPriceProduct.js');

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
            attributes: ['nameDiscount', 'descriptionDiscount', 'quantity', 'activeDiscount', 'idProduct', 'discountInGroup', 'productsInDiscountGroup', 'expirationDate' ],
            through: {
                model: ProductsDiscounts,
                attributes: []
            }
        }
    ]

    let response = await  EntityProducts.findAll({
        where,
        offset,
        limit,
        order,
        include
    })
    const modifiedProducts = await Promise.all(
        response.map(async (product) => {
            const modifiedProduct = await modifyPriceProduct(product);
            return modifiedProduct;
        })
    );
    return modifiedProducts;

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
                attributes: ['nameDiscount', 'descriptionDiscount', 'quantity', 'activeDiscount', 'idProduct', 'discountInGroup', 'productsInDiscountGroup','expirationDate' ],
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
    // función que modifica el precio por uno con descuento
    // Si existen descuentos activos, se modifica el precio del producto
    // Si existe descuento de grupo y precio específico -> precio específico modifica el precio del producto
    const modifyPrice = await modifyPriceProduct(productById);
    return modifyPrice;
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
    })
    const modifiedProducts = await Promise.all(
        searchName.map(async (product) => {
            const modifiedProduct = await modifyPriceProduct(product);
            return modifiedProduct;
        })
    );
    return modifiedProducts;

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
