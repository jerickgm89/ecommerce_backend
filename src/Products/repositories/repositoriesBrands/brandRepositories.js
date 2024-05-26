const { Op } = require('sequelize');
const { EntityBrand } = require('../../../db.js')

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


module.exports = {
    createBrandRepository,
    updateBrandRepository,
    allBrandsListRepository,
    getBrandByNameRepository,
    deleteBrandRepository
}