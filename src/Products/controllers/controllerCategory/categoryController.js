const { EntityCategory } = require('../../../db.js');
const { imageCloudinaryUploader } = require('../../../../utils/imageReception.js')
const { 
    createCategoryService,
    updateCategoryService,
    allCategoryListService,
    byNameCategoryService,
    deleteCategoryService,
} = require('../../services/servicesCategory/categoryServices.js')


const createCategory = async (req, res) => {
    const { nameCategory, descriptionCategory, imageCategory } = req.body;
    const fileImages =  req.file

    try {
    const newCategory = await createCategoryService( {nameCategory, descriptionCategory, imageCategory}, fileImages )
        if(!newCategory){
            res.status(400).json({error: 'No fue posible crear esa categoría.'});
        }
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ error: 'Error creating category', details: error.message });
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
    const { idCategory } = req.params;
    const { nameCategory, descriptionCategory, imageCategory } = req.body;
    const fileImages = req.file  
    
    try {
        const updatedCategory = await updateCategoryService( {idCategory, nameCategory, descriptionCategory, imageCategory}, fileImages )
        if (!updatedCategory) {
            res.status(404).json({ error: 'Category not found', details: error.message  });
        } 
        return res.status(200).json(!!updatedCategory);

    } catch (error) {
        res.status(500).json({ error: 'Error updating category', details: error.message  });
    }
};

// #####  Peticion de como Actualizar o editas la Categoria #######

// {
//     "nameCategory": "Deporte",
//     "descriptionCategory": "Updated description de la  categoria "
// }


const getAllCategories = async (req, res) => {
    try {
        const categories = await allCategoryListService()
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching categories' });
    }
};

const getCategoryByName = async (req, res) => {
    const { name } = req.params;
    try {
        const category = await byNameCategoryService(name)
        // const category = await EntityCategory.findOne({ where: { nameCategory: name } });
        if (category) {
            return res.status(200).json(category);
        }
        res.status(404).json({ error: 'Category not found', details: error.message  });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching category', details: error.message  });
    }
};

const deleteCategory = async (req, res) => {
    const { idCategory } = req.params;
    try {
        const category = await deleteCategoryService(idCategory)
        // const category = await EntityCategory.findByPk(id);
        if (category) {
            // await category.destroy();
            res.status(200).json(!!category);
            // res.status(204).json({ message: 'Category deleted successfully' });
        } else {
            res.status(404).json({ error: 'Category not found', details: error.message  });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error deleting category', details: error.message  });
    }
};

module.exports = {
    getAllCategories,
    getCategoryByName,
    createCategory,
    updateCategory,
    deleteCategory
};
