const {EntityCategory, EntityProducts } = require('../../../db');
const {Op} = require('sequelize');

const filterAndOrderCategory = async (req,res) => {
    const {nameCategory, orderBy, orderDirection} = req.query;
    // let { page, limit } = req.query;
    // let offset;
    // if( page|| limit ){
    //     page = parseInt(page);
    //     limit = parseInt(limit);
    //     offset = (page - 1) * limit;
    // }
    const where = {};

    try {
        if(nameCategory) {
            where.nameCategory = { [Op.like]: `%${nameCategory}%`}
        }
        const order = [];
        if(orderBy && orderDirection) {
            let selectedOrderBy = '';
            let selectedOrderDirection = '';
            if(orderBy === 'nameProduct') {
                selectedOrderBy = orderBy
            }
            if(orderDirection === 'ASC' || orderDirection === 'DESC') {
                selectedOrderDirection = orderDirection
            }
            if(selectedOrderBy && selectedOrderDirection) {
                order.push([selectedOrderBy, selectedOrderDirection.toUpperCase()])
            }
        }
    // console.log(order);

        const resultFiltersAndOrder = await EntityCategory.findAndCountAll({
            where: {...where},
            include:[{
                model: EntityProducts,
                // limit,
                // offset,
                // attributes: ['idProduct']
            }],
            order: order.length ? [[{ model: EntityProducts }, order[0][0], order[0][1]]]: undefined
            // order.length > 0 ? order : undefined,
        });
        const response = resultFiltersAndOrder.rows[0].entityProducts

        if(!resultFiltersAndOrder || resultFiltersAndOrder.rows.length < 1) {
            return res.status(200).send('No existen coincidencias.')
        }
        return res.status(200).json(response)

    } catch (error) {
        // console.error(error);
        return res.status(500).json({ error: 'Error en el servidor.' });
    }
}

//EJEMPLO DE PETICION: http://localhost:3001/filtercategory?orderBy=nameCategory&orderDirection=DESC

module.exports = {filterAndOrderCategory}