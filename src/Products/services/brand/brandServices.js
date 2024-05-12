const { createBrandRepository } = require('../../repositories/brand/brandRepositories.js')

const createBrandService = async ({nameBrand}) => {
    
    const newBrand = await createBrandRepository({nameBrand});
    // const newBrand = await EntityBrand.create({ nameBrand });
    return newBrand;
}


module.exports = {
    createBrandService
}