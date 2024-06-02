const {
    createCategoryRepository,
    updateCategoryRepository,
    fullListCategoryRepository,
    byNameCategoryRepository,
    deleteCategoryRepository,
    byIdCategoryRespository
} = require('../../repositories/repositoriesCategories/categoriesRepositories.js')
const { imageCloudinaryUploader } = require('../../../../utils/imageReception.js')

const createCategoryService = async ({ nameCategory, descriptionCategory, imageCategory }, fileImages) => {
    const imagesUploader = (await imageCloudinaryUploader(fileImages, imageCategory ))[0]
    const objectToCreate = {
        nameCategory,
        descriptionCategory,
        imageCategory: imagesUploader
    }
    const category = await createCategoryRepository(objectToCreate)
    return category
}

const updateCategoryService = async ({ idCategory, nameCategory, descriptionCategory, imageCategory }, fileImages) => {
    const imagesUploader = (await imageCloudinaryUploader( fileImages, imageCategory ))[0]
    const infoToUpload = {
        nameCategory,
        descriptionCategory,
        imageCategory: imagesUploader 
    }
    const category = await updateCategoryRepository( idCategory, infoToUpload )
    return category
}
const allCategoryListService =async () => {
    const category = await fullListCategoryRepository()
    return category
}
const byNameCategoryService = async (nameCategory) => {
    const category = await byNameCategoryRepository(nameCategory)
    return category
}
const deleteCategoryService = async (idCategory) => {
    const category = await deleteCategoryRepository(idCategory)
    return category
}

const byIdCategoryService = async (idCategory) => {
    const category = await byIdCategoryRespository(idCategory)
    return category
}

module.exports = {
    createCategoryService,
    updateCategoryService,
    allCategoryListService,
    byNameCategoryService,
    deleteCategoryService,
    byIdCategoryService
}