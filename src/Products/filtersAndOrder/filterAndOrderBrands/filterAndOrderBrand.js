const { EntityBrand } = require('../../../db');
const {Op} = require('sequelize')

const filterAndOrderBrand = async (req, res) => {
    const { nameBrand, orderBy, orderDirection } = req.query;
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    const where = {};

    try {
        if (nameBrand) {
            where.nameBrand = { [Op.iLike]: `%${nameBrand}%` }
        }

        const order = [];
        if (orderBy && orderDirection) {
            let selectedOrderBy = '';
            let selectedOrderDirection = '';
            if (orderBy === 'nameBrand') {
                selectedOrderBy = orderBy
            }
            if (orderDirection === 'ASC' || orderDirection === 'DESC') {
                selectedOrderDirection = orderDirection
            }
            if (selectedOrderBy && selectedOrderDirection) {
                order.push([selectedOrderBy, selectedOrderDirection.toUpperCase()])
            }
        }
        console.log(order)

        const resultFiltersAndOrder = await EntityBrand.findAndCountAll({
            where: { ...where },
            limit,
            offset,
            order: order.length > 0 ? order : undefined
        });

        if (!resultFiltersAndOrder || resultFiltersAndOrder.rows.length < 1) {
            return res.status(200).send('No existen coincidencias.')
        }
        return res.status(200).json(resultFiltersAndOrder)
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error en el servidor.' });
    }
}

//EJEMPLO DE PETICION: http://localhost:3001/filterbrand?nameBrand=Samsung&orderBy=nameBrand&orderDirection=ASC

module.exports = { filterAndOrderBrand };
