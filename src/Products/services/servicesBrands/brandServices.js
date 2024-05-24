const { createBrandRepository, updateBrandRepository, allBrandsListRepository, getBrandByNameRepository, deleteBrandRepository } = require('../../repositories/repositoriesBrands/brandRepositories.js')
// const { imageCloudinaryUploader } = require('../../configCloudinary.js')

const createBrandService = async (newBrandInfo) => {
    
    const newBrand = await createBrandRepository(newBrandInfo);
    return newBrand;
}

const updateBrandService = async ({ idBrand, nameBrand, logoBrand }) => {
    const updatedBrand = await updateBrandRepository({ idBrand, nameBrand, logoBrand })
    return updatedBrand
}

const allBrandsListService = async () => {
    const allBrandsList = await allBrandsListRepository()
    return allBrandsList
}

const getBrandByNameService = async (brandName) => {
    const allBrandsList = await getBrandByNameRepository(brandName)
    return allBrandsList
}

const deleteBrandService = async (idBrand) => {
    const deleted = await deleteBrandRepository(idBrand)
    return deleted
}

module.exports = {
    createBrandService,
    updateBrandService,
    allBrandsListService,
    getBrandByNameService,
    deleteBrandService
}