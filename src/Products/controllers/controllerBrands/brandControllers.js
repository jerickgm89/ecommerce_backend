const { imageCloudinaryUploader } = require('../../../../utils/imageReception.js')
const { 
    createBrandService,
    updateBrandService,
    allBrandsListService,
    getBrandByNameService,
    deleteBrandService
} = require('../../services/servicesBrands/brandServices.js')


const createBrand = async (req, res) => {
    const { nameBrand, logoBrand } = req.body;
    const fileImages = req.file

    const imagesUploader = (await imageCloudinaryUploader( fileImages, logoBrand ))
    try {
        const newBrand = await createBrandService({ nameBrand, logoBrand: imagesUploader })
        res.status(201).json(newBrand);
    } catch (error) {
        console.error({error: 'Error creating brand:', details: error.message });
        res.status(500).json({ error: 'Error creating brand', details: error.message });
    }
};


const updateBrand = async (req, res) => {
    const { idBrand } = req.params;
    const { nameBrand, logoBrand } = req.body;
    const fileImages =  req.file;
    console.log(idBrand);
    const imagesUploader = (await imageCloudinaryUploader( fileImages, logoBrand ))[0]
    
    try {
        const updatedBrand = await updateBrandService({ idBrand, nameBrand, logoBrand: imagesUploader })
        if ( updatedBrand ) {
            res.status(200).json( updatedBrand );
        } else {
            res.status(404).json({ error: 'Brand not found', details: error.message  });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error updating brand', details: error.message });
    }
};

const getAllBrands = async (req, res) => {

    try {

        const allBrandsList = await allBrandsListService()
        res.status(200).json(allBrandsList);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching brands', details: error.message  });
    }
};

const getBrandByName = async (req, res) => {
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

const deleteBrand = async (req, res) => {
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

module.exports = {
    getAllBrands,
    getBrandByName,
    createBrand,
    updateBrand,
    deleteBrand
};
