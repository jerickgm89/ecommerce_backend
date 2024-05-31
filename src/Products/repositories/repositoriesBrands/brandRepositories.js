const { Op } = require('sequelize');
const { EntityProducts, CharacteristicsProducts, EntityDiscounts, EntityReview, EntityUsers, EntityBrand, ProductsDiscounts, EntityCategory } = require('../../../db.js');

const createBrandRepository = async ({nameBrand, logoBrand}) => {
    const objectToCreate = {nameBrand, logoBrand}
    // console.log( objectToCreate )
    const newBrand = await EntityBrand.create(objectToCreate);
    return newBrand
}
const updateBrandRepository = async (idBrand, infoToUpdate) => {
    const newBrand = await EntityBrand.update( 
        infoToUpdate,
        { 
            where:{ 
                idBrand
            } 
        }
    );
    const findUpdatedProduct = await EntityBrand.findByPk(idBrand)
    return findUpdatedProduct
}

const allBrandsListRepository = async () => {
    const newBrand = await EntityBrand.findAll();
    return newBrand
}
const getBrandByNameRepository = async (brandName) => {
    const responseName = await EntityBrand.findAll({where:{ nameBrand: {[Op.like]:brandName }}});
    console.log(brandName)
    return responseName[0]
}
const deleteBrandRepository = async (idBrand) => {
    const newBrand = await EntityBrand.destroy({
        where: {
            idBrand
        }
    });
    return !!newBrand
}

const getBrandByIdRepository = async (idBrand) => {
    const responseIdProduct = await CharacteristicsProducts.findAll({
        where: { idBrand },
        attributes: ['idCharacteristicsProducts', 'modelProduct', 'idBrand'],
        include: [
            {
                model: EntityProducts,
                attributes: ['idProduct', 'nameProduct', 'descriptionProduct', 'priceProduct', 'discountPriceProduct', 'stockProduct', 'idProduct', 'imageProducts', 'idCategory', 'yearProduct', 'active' ],
                include: [
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
                    }
                ]
            },
            {
                model: EntityBrand,
                attributes: ['nameBrand', 'logoBrand'],
            },
        ]
    });
    return responseIdProduct;
}

module.exports = {
    createBrandRepository,
    updateBrandRepository,
    allBrandsListRepository,
    getBrandByNameRepository,
    deleteBrandRepository,
    getBrandByIdRepository
}