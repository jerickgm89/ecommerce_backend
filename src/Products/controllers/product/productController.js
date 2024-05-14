const { Op } = require('sequelize');
const { EntityProducts, CharacteristicsProducts } = require('../../../db.js');
const cloudinary = require('cloudinary')
const createProductAndCharacteristics = async (req, res) => {
   
    const imageProd = await cloudinary.uploader.upload(req.file.path)

    const {
        Products: {
            nameProduct,
            priceProduct,
            imageProducts,
            SKU,
            yearProduct,
            stockProduct,
            descriptionProduct,
            idReview,
            idCategory,
            IdDiscount
        },
        Variants: {
            modelProduct,
            characteristics,
            idBrand
        }
    } = req.body;

    const transaction = await EntityProducts.sequelize.transaction();
    
   
    try {
        const newProduct = await EntityProducts.create({
            nameProduct,
            priceProduct,
            imageProducts: imageProd.secure_url,
            SKU,
            descriptionProduct,
            yearProduct,
            stockProduct,
            yearProduct,
            descriptionProduct,
            idReview,
            idCategory,
            IdDiscount
        }, { transaction });

        const newCharacteristics = await CharacteristicsProducts.create({
            idProduct: newProduct.idProduct,
            modelProduct,
            characteristics,
            idBrand
        }, { transaction });

        await transaction.commit();
        // console.log(newCharacteristics)
        res.status(201).json({ newProduct, newCharacteristics });
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ error: 'Error creating product and characteristics', details: error.message });
    }
};

// ############### Peticion para crear Un Producto con sus Detalles o Caracteristicas ########### 

// {
//     "Products": {
//         "nameProduct": "Nombre",
//         "priceProduct": 99.99,
//         "imageProducts": "image.jpg",
//         "yearProduct": "1990",
//         "descriptionProduct": "Descripción muy importante sobre el producto",
//         "SKU": "B0CFNX3PTT",
//         "stockProduct": 10,
//         "idReview": null,
//         "idCategory": 1,
//         "IdDiscount": null
//     },
//     "Variants": {
//         "modelProduct": "Model A",
//         "characteristics": {
//             "color": "red",
//             "size": "L"
//         },
//         "idBrand": 1
//     }
// }


const updateProductAndCharacteristics = async (req, res) => {
    const { id } = req.params;
    const {
        Products: {
            nameProduct,
            priceProduct,
            imageProducts,
            SKU,
            descriptionProduct,
            yearProduct,
            stockProduct,
            idReview,
            idCategory,
            IdDiscount
        },
        Variants: {
            modelProduct,
            characteristics,
            idBrand
        }
    } = req.body;

    const transaction = await EntityProducts.sequelize.transaction();

    try {
        const product = await EntityProducts.findByPk(id, { transaction });

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        product.nameProduct = nameProduct || product.nameProduct;
        product.priceProduct = priceProduct || product.priceProduct;
        product.imageProducts = imageProducts || product.imageProducts;
        product.SKU = SKU || product.SKU;
        product.descriptionProduct = descriptionProduct || product.descriptionProduct
        product.stockProduct = stockProduct || product.stockProduct;
        product.idReview = idReview || product.idReview;
        product.idCategory = idCategory || product.idCategory;
        product.IdDiscount = IdDiscount || product.IdDiscount;

        await product.save({ transaction });

        const characteristicsRecord = await CharacteristicsProducts.findOne({ where: { idProduct: id } }, { transaction });

        if (characteristicsRecord) {
            characteristicsRecord.modelProduct = modelProduct || characteristicsRecord.modelProduct;
            characteristicsRecord.characteristics = characteristics || characteristicsRecord.characteristics;
            characteristicsRecord.idBrand = idBrand || characteristicsRecord.idBrand;

            await characteristicsRecord.save({ transaction });
        } else {
            await CharacteristicsProducts.create({
                idProduct: id,
                modelProduct,
                characteristics,
                idBrand
            }, { transaction });
        }

        await transaction.commit();
        res.json({ product, characteristicsRecord });
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ error: 'Error updating product and characteristics', details: error.message });
    }
};

// ####### Peticion para Editar por metodo Patch #######
// recordar que por el metodo patch no es obligatoriuo pasar todo el json yal cual si no tambien se puede pasar solo la key y el valor actualizado

// {
//     "Products": {
//         "nameProduct": "Nuevo Nombre",
//         "priceProduct": 199.99,
//         "imageProducts": "image.jpg, url",
//         "yearProduct": "1990",
//         "descriptionProduct": "Descripción muy importante sobre el producto",
//         "SKU": "B07F22VLWY",
//         "stockProduct": 25,
//         "idReview": null,
//         "idCategory": 2,
//         "IdDiscount": null
//     },
//     "Variants": {
//         "modelProduct": "Updated Model B",
//         "characteristics": {
//             "color": "blue",
//             "size": "M"
//         },
//         "idBrand": 1
//     }
// }

const getAllProducts = async (req, res) => {
    let { page = 1, limit = 9 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    const offset = (page - 1) * limit;
    try {
        const products = await EntityProducts.findAll({
            offset,
            limit,
            include:[{
                model: CharacteristicsProducts,
                attributes: ['modelProduct', 'characteristics','idBrand']
            }]
        });
        if(products.length){
            // return res.status(200).send('No existen coincidencias.')
            return res.status(200).json(products);
        }
        
    } catch (error) {
        res.status(500).json({ error: 'Error fetching products', details: error.message });
    }
};

const getProductById = async (req, res) => {
    const { id } = req.params;
    // console.log(id, "IDD");
    try {
        const product = await EntityProducts.findByPk(id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching product by id', details: error.message });
    }
};

const getProductByName = async (req, res) => {
    let { page = 1, limit = 9 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    const offset = (page - 1) * limit;


    const { name } = req.query;
    // console.log(name, "nameee");
    try {
        const products = await EntityProducts.findAll({ 
            where: {
                nameProduct: { 
                    [Op.iLike]: `%${name}%`
                }
            },
            offset,
            limit,
    });
        if (products.length) {
            res.status(200).json(products);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching product by name', details: error.message });
    }
};

const deleteProductAndCharacteristics = async (req, res) => {
    const { id } = req.params;
    const transaction = await EntityProducts.sequelize.transaction();

    try {
        const product = await EntityProducts.findByPk(id, { transaction });

        if (!product) {
            await transaction.rollback();
            return res.status(404).json({ error: 'Product not found' });
        }

        await CharacteristicsProducts.destroy({ where: { idProduct: id }, transaction });
        await product.destroy({ transaction });

        await transaction.commit();
        res.status(204).json({ message: 'Product and characteristics deleted successfully' });
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ error: 'Error deleting product and characteristics', details: error.message });
    }
};

module.exports = {
    createProductAndCharacteristics,
    updateProductAndCharacteristics,
    getAllProducts,
    getProductById,
    getProductByName,
    deleteProductAndCharacteristics
};