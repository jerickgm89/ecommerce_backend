const { EntityBrand } = require('../../../db.js');

// const { createBrandService } = require('../../services/brand/brandServices.js')

const createBrand = async (req, res) => {
    const { nameBrand } = req.body;
    try {
        // const newBrand = await createBrandService({nameBrand})
        const newBrand = await EntityBrand.create({ nameBrand });
        res.status(201).json(newBrand);
    } catch (error) {
        console.error('Error creating brand:', error);
        res.status(500).json({ error: 'Error creating brand', details: error.message });
    }
};

// Peticion Create :
// {
//     "nameBrand": "Adidas"
// }


const updateBrand = async (req, res) => {
    const { id } = req.params;
    const { nameBrand } = req.body;
    try {
        const brand = await EntityBrand.findByPk(id);
        if (brand) {
            brand.nameBrand = nameBrand;
            await brand.save();
            res.json(brand);
        } else {
            res.status(404).json({ error: 'Brand not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error updating brand' });
    }
};

// Peticion Update :
// {
//     "nameBrand": "Editar Nombre "
// }

const getAllBrands = async (req, res) => {
    let { page = 1, limit = 9 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    const offset = (page - 1) * limit;
    try {
        const brands = await EntityBrand.findAll({
            offset,
            limit,
        });
        res.json(brands);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching brands' });
    }
};

const getBrandByName = async (req, res) => {
    const { name } = req.params;
    try {
        const brand = await EntityBrand.findOne({ where: { nameBrand: name } });
        if (brand) {
            res.json(brand);
        } else {
            res.status(404).json({ error: 'Brand not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching brand' });
    }
};

const deleteBrand = async (req, res) => {
    const { id } = req.params;
    try {
        const brand = await EntityBrand.findByPk(id);
        if (brand) {
            await brand.destroy();
            res.status(204).json({ message: 'Brand deleted successfully' });
        } else {
            res.status(404).json({ error: 'Brand not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error deleting brand' });
    }
};

module.exports = {
    getAllBrands,
    getBrandByName,
    createBrand,
    updateBrand,
    deleteBrand
};
