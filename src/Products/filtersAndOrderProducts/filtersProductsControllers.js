const {filtersProductsServices} = require('../services/servicesFiltersAndOrder/filtersProductsServices.js');   

const filtersProductsController = async (req, res) => {
    const { category, brand, name, price, year, priceMin, priceMax } = req.query;
    const { orderBy, orderDirection } = req.query;
    
    let { page, limit } = req.query;
    let order = [];

    try {
        let offset;
        if( page && limit ){
            offset = (page - 1) * limit;
        }

        const properties = { category, brand, name, price, year, priceMin, priceMax };

        if (orderBy && orderDirection) {
            let selectedOrderBy = '';
            let selectedOrderDirection = '';

            if  (orderBy === 'priceProduct' || orderBy === 'yearProduct' || orderBy === 'nameProduct') {
                selectedOrderBy = orderBy;
            }

            if (orderDirection === 'ASC' || orderDirection === 'DESC') {
                selectedOrderDirection = orderDirection;
            }

            if (selectedOrderBy && selectedOrderDirection) {
                order.push([selectedOrderBy, selectedOrderDirection.toUpperCase()]);
            }
        }

        const resultFiltersProducts = await filtersProductsServices( properties, limit, offset, order );

        if (!resultFiltersProducts.rows.length) {
            return res.status(400).send('No existen coincidencias.');
        }
        return res.status(200).json(resultFiltersProducts);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error en el servidor.' });
    }
};

module.exports = {
    filtersProductsController
}