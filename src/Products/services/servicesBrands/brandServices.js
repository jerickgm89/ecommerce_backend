const { createBrandRepository, updateBrandRepository, allBrandsListRepository, getBrandByNameRepository, deleteBrandRepository } = require('../../repositories/repositoriesBrands/brandRepositories.js')
const { imageCloudinaryUploader } = require('../../../../utils/imageReception.js')

const createBrandService = async ({nameBrand, logoBrand}, fileImages) => {
    const imagesUploader = (await imageCloudinaryUploader( fileImages, logoBrand ))[0]
    const infoToCreate = {
        nameBrand,
        logoBrand: imagesUploader
    }
    const newBrand = await createBrandRepository(infoToCreate);
    return newBrand;
}

const updateBrandService = async ({ idBrand, nameBrand, logoBrand }, fileImages) => {
    const imagesUploader = (await imageCloudinaryUploader( fileImages, logoBrand ))[0]
    const infoToUpdate = {
        nameBrand,
        logoBrand: imagesUploader
    }
    const updatedBrand = await updateBrandRepository( idBrand, infoToUpdate)
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