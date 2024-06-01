const { EntityProducts, CharacteristicsProducts, EntityDiscounts, EntityReview, EntityUsers, EntityBrand, ProductsDiscounts } = require('../../../db.js');
const { Op } = require('sequelize');
const modifyPriceProduct = require('../../../../utils/modifyPriceProduct.js');
const filtersProducts = async (properties, limit, offset, order) => {
    const { category, brand, name, price, year, priceMin, priceMax } = properties;
    const where = {};
    // Construye las condiciones de filtrado basadas en los parámetros de consulta.

    let include =  [ 
        {
            model: CharacteristicsProducts,
            where: {},
            attributes: ['idCharacteristicsProducts', 'modelProduct', 'characteristics', 'idBrand'],
            include: [
                {
                    model: EntityBrand,
                    attributes: ['nameBrand', 'logoBrand'],
                }
            ]
        },{
            model: EntityReview,
            attributes: ['descriptionReview','idReview'],
            include: [
                {
                    model: EntityUsers,
                    attributes: ['emailUser']
                }
            ]
        },{
            model: EntityDiscounts,
            attributes: ['nameDiscount', 'descriptionDiscount', 'quantity', 'activeDiscount', 'idProduct', 'discountInGroup', 'productsInDiscountGroup' ],
            through: {
                model: ProductsDiscounts,
                attributes: []
            }
        }
    ];

    if (name) {
        where.nameProduct = { [Op.iLike]: `%${name}%` };
    }
    if (price) {
        where.priceProduct = price;
    }
    if (year) {
        where.yearProduct = year;
    }
    if ( priceMin || priceMax ) {
        if( priceMin && priceMax ){
            where.priceProduct = {
                [Op.and]: [
                    { [Op.gte]: priceMin },
                    { [Op.lte]: priceMax }
                ]
            };
        }
        else if (priceMin) {
            where.priceProduct = {[ Op.gte ] : priceMin}; // Mayor o igual que priceMin
        }
        else{
            where.priceProduct= {[ Op.lte ] : priceMax}; // Menor o igual que priceMax
        }
    }

    if( category ) {
        const categoryIds = Array.isArray(category) ? category : category.split('+').map(categoryId => parseInt(categoryId))
        if( Array.isArray(categoryIds)){ 
            where.idCategory = {[Op.in]: categoryIds};
        }
        else where.idCategory = category
    }
    if(brand) {
        const brandIds = Array.isArray(brand) ? brand : brand.split('+').map(brandId => parseInt(brandId))
        include[0].where.idBrand = {[Op.in]: brandIds};
    }  
    const resultFilters = await EntityProducts.findAndCountAll({
        where,
        limit,
        offset,
        include,
        order
    });
    const modifiedProducts = await Promise.all(
        // resultFilters.rows?.map(async (product) => {
        //     const modifiedProduct = await modifyPriceProduct(product);
        //     return modifiedProduct;
        // })
    );
    const response = {
        count: resultFilters.count,
        rows: modifiedProducts
    };
    
    return response;
};
module.exports = {
    filtersProducts
}