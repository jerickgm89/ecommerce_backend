const { EntityProducts } = require('../db');

module.exports = {
  // Crear un nuevo producto
  createProduct: async (req, res) => {
    try {
      const {
        nameProduct,
        priceProduct,
        imageProducts,
        SKU,
        stockProduct,
        idCategory,
        idCharacteristicsProducts,
        IdDiscount
      } = req.body;

      const newProduct = await EntityProducts.create({
        nameProduct,
        priceProduct,
        imageProducts,
        SKU,
        stockProduct,
        idCategory,
        idCharacteristicsProducts,
        IdDiscount,
        createPro_at: new Date(),
        modifiedPro_at: new Date()
      });

      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({ error: 'Error creating the product.' });
    }
  },

  // Actualizar un producto existente
  updateProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        nameProduct,
        priceProduct,
        imageProducts,
        SKU,
        stockProduct,
        idCategory,
        idCharacteristicsProducts,
        IdDiscount
      } = req.body;

      const updatedProduct = await EntityProducts.update(
        {
          nameProduct,
          priceProduct,
          imageProducts,
          SKU,
          stockProduct,
          idCategory,
          idCharacteristicsProducts,
          IdDiscount,
          modifiedPro_at: new Date()
        },
        { where: { idProduct: id } }
      );

      if (updatedProduct[0] === 0) {
        res.status(404).json({ error: 'Product not found.' });
      } else {
        res.json({ message: 'Product updated successfully.' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error updating the product.' });
    }
  },

  // Eliminar un producto
  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;

      const result = await EntityProducts.destroy({ where: { idProduct: id } });

      if (result === 0) {
        res.status(404).json({ error: 'Product not found.' });
      } else {
        res.json({ message: 'Product deleted successfully.' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error deleting the product.' });
    }
  },

  // Pausar o reanudar un producto
  pauseProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const { pause } = req.body;

      const updatedProduct = await EntityProducts.update(
        { paused: pause },
        { where: { idProduct: id } }
      );

      if (updatedProduct[0] === 0) {
        res.status(404).json({ error: 'Product not found.' });
      } else {
        res.json({ message: pause ? 'Product paused.' : 'Product resumed.' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error pausing/resuming the product.' });
    }
  },

  // Listar todos los productos (resumen)
  getProductsBrief: async (req, res) => {
    try {
      const products = await EntityProducts.findAll({
        attributes: ['idProduct', 'nameProduct', 'priceProduct', 'imageProducts']
      });
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Error retrieving products.' });
    }
  },

  // Mostrar detalles de un producto
  getProductDetails: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await EntityProducts.findByPk(id);

      if (!product) {
        res.status(404).json({ error: 'Product not found.' });
      } else {
        res.json(product);
      }
    } catch (error) {
      res.status(500).json({ error: 'Error retrieving the product.' });
    }
  }
};
