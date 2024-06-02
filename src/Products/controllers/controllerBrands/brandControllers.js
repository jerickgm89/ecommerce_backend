const { imageCloudinaryUploader } = require('../../../../utils/imageReception.js')
const { 
    createBrandService,
    updateBrandService,
    allBrandsListService,
    getBrandByNameService,
    deleteBrandService,
    getBrandByIdService
} = require('../../services/servicesBrands/brandServices.js')


const createBrandController = async (req, res) => {
    const { nameBrand, logoBrand } = req.body;
    const fileImages = req.file

    try {
        const newBrand = await createBrandService({nameBrand, logoBrand}, fileImages)
        res.status(201).json(newBrand);
    } catch (error) {
        console.error({error: 'Error creating brand:', details: error.message });
        res.status(500).json({ error: 'Error creating brand', details: error.message });
    }
};


const updateBrandController = async (req, res) => {
    const { idBrand } = req.params;
    const { nameBrand, logoBrand } = req.body;
    const fileImages =  req.file;
    
    try {
        const updatedBrand = await updateBrandService({ idBrand, nameBrand, logoBrand}, fileImages)
        if ( updatedBrand ) {
            res.status(200).json( updatedBrand );
        } else {
            res.status(404).json({ error: 'Brand not found', details: error.message  });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error updating brand', details: error.message });
    }
};

const getAllBrandsController = async (req, res) => {

    try {

        const allBrandsList = await allBrandsListService()
        res.status(200).json(allBrandsList);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching brands', details: error.message  });
    }
};

const getBrandByNameController = async (req, res) => {
    const { brandName } = req.params;
    // console.log(brandName);
    try {
        const brand = await getBrandByNameService(brandName)
        if (brand) {
            res.status(200).json(brand);
        } else {
            res.status(404).json({ error: 'Brand not found', details: error.message  });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching brand', details: error.message  });
    }
};

const deleteBrandController = async (req, res) => {
    const { idBrand } = req.params;
    try {
        const brand = await deleteBrandService(idBrand)
    // if (brand) {
        res.status(200).json(!!brand);
        // } else {
            //     res.status(404).json({ error: 'Brand not found', details: error.message  });
            // }
    } catch (error) {
        res.status(500).json({ error: 'Error deleting brand', details: error.message  });
    }
};

const getBrandByIdController = async (req, res) => {
    const { idBrand } = req.params;
    // console.log(idBrand);
    try {
        const brand = await getBrandByIdService(idBrand)
        if (brand) {
            res.status(200).json(brand);
        } else {
            res.status(404).json({ error: 'Brand not found', details: error.message  });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching brand', details: error.message  });
    }
};
module.exports = {
    getAllBrandsController,
    getBrandByNameController,
    createBrandController,
    updateBrandController,
    deleteBrandController,
    getBrandByIdController
};
