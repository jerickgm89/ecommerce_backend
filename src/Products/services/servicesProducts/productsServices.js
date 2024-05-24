const {CharacteristicsProducts} = require('../../../db');

const {
    createProducts,
    createCharacteristics,
    getProductById,
    findProductById,
    findCharacteriscticsProductsById,
    updateCharacteristics,
    updateProduct,
    deleteProduct,
    deleteCharacteristics,
    getAllProducts,
    searchProductByName,
    blockedProduct,
    restoreProduct,
    getDeactiveProducts,
    transactionRecicle
} = require('../../repositories/repositoriesProducts/productRepositories');

const { imageCloudinaryUploader } = require('../../../../utils/imageReception');

//Crear producto
const ProductAndCharacteristicsServices = async (Products, Variants, fileImages) => {

    const transaction = await transactionRecicle();
    try {
        const imagesUploader = await imageCloudinaryUploader(fileImages, Products.imageProducts)
        Products.imageProducts = imagesUploader;

        const newProduct = await createProducts({
            nameProduct: Products.nameProduct,
            priceProduct: Products.priceProduct,
            imageProducts: Products.imageProducts,
            SKU: Products.SKU,
            yearProduct: Products.yearProduct,
            stockProduct: Products.stockProduct,
            descriptionProduct: Products.descriptionProduct,
            idReview: Products.idReview || null,
            idCategory: Products.idCategory,
            idDiscount: Products.idDiscount || null,
        }, transaction );

        Variants.idProduct = newProduct.idProduct;
        const newCharacteristics = await createCharacteristics({
            idProduct: Variants.idProduct,
            modelProduct: Variants.modelProduct,
            characteristics: Variants.characteristics,
            idBrand: Variants.idBrand
        }, transaction);

        await transaction.commit()
        // console.log('new Product: ', newProduct);
        // console.log('Characteristics: ', newCharacteristics);
        return {newProduct, newCharacteristics}
    } catch (error) {
        await transaction.rollback()
        console.error('Error al crear y asociar un producto:', error); 
        throw new Error(`Error al crear y asociar un producto: ${error.message}`);
    };
};

//Actualizar un producto creado

const updateProductCharacteristicsServices = async (id, productData, characteristicsData, fileImages) => {
    const transaction = await transactionRecicle();

    try {
        const product = await findProductById(id, transaction)
        if(!product) {
            throw new Error('No se encuentra el producto')
        };

        const imagesUploader = await imageCloudinaryUploader(fileImages, productData.imageProducts)
        productData.imageProducts = imagesUploader;

        await updateProduct(product, productData, transaction)

        const characteristics = await findCharacteriscticsProductsById(id, transaction)

        if(characteristics) {
            await updateCharacteristics(characteristics,characteristicsData, transaction)
        } else {
            characteristicsData.idProduct = id
            await createCharacteristics(characteristicsData, transaction)
        }
        await transaction.commit()
        return {product, characteristics}
    } catch (error) {
        await transaction.rollback();
        throw new Error(error.message);
    }
};
//Eliminar un producto permanentemente
const deleteProductCharacteristicsServices = async (id) => {
    const transaction = await transactionRecicle()

    try {
        const product = await findProductById(id, transaction)
        if(!product) {
            throw new Error('No se encuentra el producto.')
        };
        await deleteProduct(product, transaction)
        await deleteCharacteristics(id, transaction)

        await transaction.commit()
    } catch (error) {
        await transaction.rollback()
        console.error('error: ', error.message)
        throw new Error(error.message)
    }
};

//Ver todos los productos 
const getAllProductsServices = async (page, limit) => {
    let offset;
    if(page && limit) {
        offset = (page - 1) * limit;
    };
    const getProducts = getAllProducts({
        where: { active: true},
        offset,
        limit,
        order: [['idProduct', 'ASC']],
        include:[{
            model: CharacteristicsProducts,
            attributes: ['modelProduct', 'characteristics','idBrand']
        }]
    })
    if(!getProducts) {
        throw new Error ('Error al mostrar los productos')
    }
    return getProducts
}
//Buscar producto por Id
const getProductByIdServices = async(id) => {
    const productById = await getProductById(id)
    if(!productById) {
        throw new Error ('No se encuentra el producto')
    }
    return productById
};

//Buscar producto por nombre

const searchProductByNameServices = async (name,page,limit) => {
    const offset = (page - 1) * limit;
    
    const searchByName = await searchProductByName(name, offset, limit);

    if(!searchByName) {
        console.error('Error Service: ', error.message)
        throw new Error('No se pudo encontrar el producto por su nombre')
    }
    return searchByName;
};

//Desctivar un producto
const blockedProductService = async (id) => {
    const productBlocked = await blockedProduct(id)
    if(!productBlocked) {
        throw new Error('No se puede encontrar el producto')
    }
    return productBlocked

};

//Restaurar un producto
const restoreProductService = async (id) => {
    const productRestore = await restoreProduct(id)
    if(!productRestore) {
        throw new Error('No se puede restaurar el producto')
    }
};

//mostrar productos desactivados

const getDeactiveProductsService = async () => {
    const deactiveProducts = await getDeactiveProducts()
    if(!deactiveProducts) {
        throw new Error('Error al querer mostrar productos desactivados.')
    }
    return deactiveProducts;
};


module.exports = {
    ProductAndCharacteristicsServices,
    getProductByIdServices,
    updateProductCharacteristicsServices,
    deleteProductCharacteristicsServices,
    getAllProductsServices,
    searchProductByNameServices,
    blockedProductService,
    restoreProductService,
    getDeactiveProductsService    
}; 