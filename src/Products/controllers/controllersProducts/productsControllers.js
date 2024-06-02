
const {
ProductAndCharacteristicsServices,
getProductByIdServices,
updateProductCharacteristicsServices,
deleteProductCharacteristicsServices,
getAllProductsServices,
searchProductByNameServices,
blockedProductService,
restoreProductService,
getDeactiveProductsService

} = require('../../services/servicesProducts/productsServices');

//Crear producto
const createProductControllers = async (req,res) => {
    const {
        Products: {
            nameProduct,
            priceProduct,
            imageProducts,
            SKU,
            yearProduct,
            stockProduct,
            descriptionProduct,
            idCategory,
        },
        Variants: {
            modelProduct,
            characteristics,
            idBrand
        }
    } = req.body;

    const fileImages =  req.files;

    try {
        const result = await ProductAndCharacteristicsServices({
            nameProduct,
            priceProduct,
            imageProducts,
            SKU,
            yearProduct,
            stockProduct,
            descriptionProduct,
            idCategory
        },
        {
            modelProduct,
            characteristics,
            idBrand
        
        },
            fileImages
    );
    if (!result) {
            res.status(400).send('Completar los campos obligatorios')
    }
            res.status(201).json(result);
    } catch (error) {
        console.error('Error en createProductControllers:', error); 
        res.status(500).json({ error: 'Error al intentar crear producto y caracteristicas', details: error.message });
    };
};

//Modificar un producto
const updateProductCharacteristicsControllers = async (req,res) => {
    const {id} = req.params;

        const { Products, Variants } = req.body;


    const fileImages = req.files || req.file;

    try {
        const result = await updateProductCharacteristicsServices(id, Products, Variants, fileImages)
        res.status(201).json(result)
    } catch (error) {
        console.error('Error en controllers: ', error.message)
            res.status(500).json({error: 'error al modificar producto o caracteristicas', details: error.message})
    }
};

//Eliminar un producto permanentemente.
const deleteProductCharacteristicsControllers = async (req,res) => {
    const {id} = req.params;

    try {
        await deleteProductCharacteristicsServices(id)
        res.status(200).json({message: 'El producto ha sido eliminado permanentemente.'})
    } catch (error) {

        res.status(500).json({error: 'El producto y/o las caracteristicas no pudieron ser eliminadas', details: error.message})
    }
};

//ver todos los productos

const getAllProductsControllers = async (req,res) => {
    const { page, limit } = req.query;

    try {
        const products = await getAllProductsServices(page, limit)
        if(products.length) {
            res.status(200).json(products)
        } else {
            return res.status(200).json([])
        }
    } catch (error) {
        console.error('Controllers', error.message)
            res.status(500).json({error: 'Error al mostrar los productos', details: error.message}
            )
    }
}
//Buscar producto por Id
const GetProductByIdControllers = async (req,res) => {
    const {id} = req.params
    try {
        const product = await getProductByIdServices(id);
        res.status(200).json(product);
    } catch (error) {
        if (error.message === 'No se encuentra el producto') {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Error fetching product by id', details: error.message });
        }
    }
};
//Buscar por name
const searchProductsControllers = async (req,res) => {
    const {name,page= 1,limit= 9} = req.query

    try {
        const products = await searchProductByNameServices(name, page, limit);
        if(products.length) {
            res.status(200).json(products)
        } else {
            res.status(404).json({error: 'Producto no encontrado'})
        }
    } catch (error) {
        console.error('error Controllers: ', error.message)
        res.status(500).json({error: 'Error al mostrar el producto por nombre', details: error.message})
    }
};

//Desactivar producto
const blockedProductControllers = async (req,res) => {
    const {id} = req.params
    try { 
        const blockedProduct = await blockedProductService(id);
        
        res.status(200).json({message: 'Producto desactivado con éxito', blockedProduct} )
    } catch (error) {
        console.error('error en controllers:', error.message)
        res.status(500).send('Error al desactivar un producto',{details: error.message})
    }
};

//Restaurar producto
const restoreProductControllers = async (req,res) => {
    const {id} = req.params;
    try {
        const restoreProduct = await restoreProductService(id)
        res.status(200).json({message: 'El producto fue restaurado', restoreProduct})
    } catch (error) {
        console.error('error en controllers: ', error.message)
        res.status(500).json({message: 'El producto no fue restaurado', details: error.message})
    }
};

//mostrar productos desactivados
const getDeactivatedProductsControllers = async (req,res) => {
    const deactivatedProducts = await getDeactiveProductsService();

    if(deactivatedProducts.length) {
        return res.status(200).json(deactivatedProducts)
    }
    return res.status(200).json([])
};


module.exports = {
    createProductControllers,
    GetProductByIdControllers,
    updateProductCharacteristicsControllers,
    deleteProductCharacteristicsControllers,
    getAllProductsControllers,
    searchProductsControllers,
    blockedProductControllers,
    restoreProductControllers,
    getDeactivatedProductsControllers
}