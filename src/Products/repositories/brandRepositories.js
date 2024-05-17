const { EntityBrand } = require('../../../db.js')

const createBrandRepository = async ({nameBrand}) => {
    const newBrand = await EntityBrand.create({ nameBrand });
    return newBrand
}


module.exports = {
    createBrandRepository
}