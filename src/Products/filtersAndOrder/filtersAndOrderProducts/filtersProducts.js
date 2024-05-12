const { EntityProducts, EntityBrand, EntityCategory } = require('../../../db');
const { Op } = require('sequelize');

const filtersProducts = async (req, res) => {
    const { name, price, year, orderBy, orderDirection } = req.query;
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;   // Calcula el inicio del paginado.
    const where = {};

    try {
        if (name) {
            where.nameProduct = { [Op.iLike]: `%${name}%` };
        }
        if (price) {
            where.priceProduct = price;
        }
        if (year) {
            where.yearProduct = year;
        }

        const order = [];
        if (orderBy && orderDirection) {
            let selectedOrderBy = '';
            let selectedOrderDirection = '';

            if  (orderBy === 'priceProduct' || orderBy === 'yearProduct' || orderBy === 'nameProduct') {
                selectedOrderBy = orderBy;
            }
             {
                selectedOrderBy = orderBy;
            }

            if (orderDirection === 'ASC' || orderDirection === 'DESC') {
                selectedOrderDirection = orderDirection;
            }

            if (selectedOrderBy && selectedOrderDirection) {
                order.push([selectedOrderBy, selectedOrderDirection.toUpperCase()]);
            }
        }
console.log(order);
        const resultFilters = await EntityProducts.findAndCountAll({
            where: { ...where },
            limit,
            offset,
            
            order: order.length > 0 ? order : undefined,
        });

        if (resultFilters.rows.length < 1) {
            return res.status(400).send('No existen coincidencias.');
        }

        return res.status(200).json(resultFilters);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error en el servidor.' });
    }
};

//EJEMPLO TE PETICION: http://localhost:3001/filterproducts?orderBy=nameProduct&orderDirection=ASC
//Por nombre: http://localhost:3001/filterproducts?nameProduct=samsung&orderDirection=ASC

module.exports = {filtersProducts};
