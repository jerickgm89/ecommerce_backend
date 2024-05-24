const { EntityCategory } = require('../../../db.js');
const { imageCloudinaryUploader } = require('../../../../utils/imageReception.js')


const createCategory = async (req, res) => {
    const { nameCategory, descriptionCategory, imageCategory } = req.body;
    const fileImages =  req.files || req.file

    const imagesUploader = (await imageCloudinaryUploader( fileImages, imageCategory ))[0]
    console.log("ACA CONTROLLER CATEGORY: ", imagesUploader)
    try {
        const newCategory = await EntityCategory.create({ 
            nameCategory, 
            descriptionCategory, 
            // imageCategory: imagesUploader
        });
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ error: 'Error creating category' });
    }
};

//########## Peticion de como crear una Categoria ########

// {
    //     "nameCategory": "Electronics",
    //     "descriptionCategory": "Breve descripcion de la categoria",
    //     "createdCat_at": "2024-05-10T10:00:00.000Z",
    //     "modifiedCat_at": "2024-05-10T10:00:00.000Z",
    //     "deletedCat_at": null
    // }
    
    const updateCategory = async (req, res) => {
        const { id } = req.params;
        const { nameCategory, descriptionCategory, imageCategory } = req.body;
        const fileImages = req.files || req.file  
        
        try {
            const imagesUploader = (await imageCloudinaryUploader( fileImages, imageCategory ))
            
        const category = await EntityCategory.findByPk(id);
        if (category) {
            category.nameCategory = nameCategory;
            category.descriptionCategory = descriptionCategory;
            // category.imageCategory = imagesUploader;
            await category.save();
            return res.status(200).json(category);
        } else {
            res.status(404).json({ error: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error updating category' });
    }
};

// #####  Peticion de como Actualizar o editas la Categoria #######

// {
//     "nameCategory": "Deporte",
//     "descriptionCategory": "Updated description de la  categoria "
// }


const getAllCategories = async (req, res) => {
    try {
        const categories = await EntityCategory.findAll();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching categories' });
    }
};

const getCategoryByName = async (req, res) => {
    const { name } = req.params;
    try {
        const category = await EntityCategory.findOne({ where: { nameCategory: name } });
        if (category) {
            res.json(category);
        } else {
            res.status(404).json({ error: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching category' });
    }
};

const deleteCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await EntityCategory.findByPk(id);
        if (category) {
            await category.destroy();
            res.status(200).json(!!category);
            // res.status(204).json({ message: 'Category deleted successfully' });
        } else {
            res.status(404).json({ error: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error deleting category' });
    }
};

module.exports = {
    getAllCategories,
    getCategoryByName,
    createCategory,
    updateCategory,
    deleteCategory
};
