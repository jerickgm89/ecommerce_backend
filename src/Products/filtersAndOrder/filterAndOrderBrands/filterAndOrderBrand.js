const { EntityBrand, CharacteristicsProducts, EntityProducts } = require('../../../db');
const {Op} = require('sequelize');

const filterAndOrderBrand = async (req, res) => {
    const { nameBrand, orderBy, orderDirection } = req.query;
    let { page, limit } = req.query;
    let offset;
    if( page|| limit ){
        page = parseInt(page);
        limit = parseInt(limit);
        offset = (page - 1) * limit;
    }
    const where = {};
    // console.log(limit)
    try {
        if (nameBrand) {
            console.log(nameBrand)
            where.nameBrand = { [Op.like]: `%${nameBrand}%` }
        }

        const order = [];
        if (orderBy && orderDirection) {
            let selectedOrderBy = '';
            let selectedOrderDirection = '';
            if (orderBy === 'nameProduct') {
                selectedOrderBy = orderBy
            }
            if (orderDirection === 'ASC' || orderDirection === 'DESC') {
                selectedOrderDirection = orderDirection
            }
            if (selectedOrderBy && selectedOrderDirection) {
                order.push([selectedOrderBy, selectedOrderDirection.toUpperCase()])
            }
        }
        // console.log(order)

        const resultFiltersAndOrder = await EntityBrand.findAndCountAll({
            where: {nameBrand : { [Op.like]: `%${nameBrand}%` }},
            include:[{
                model: CharacteristicsProducts,
                attributes: ['idProduct']
            }]
        });
        
        const idProducts = resultFiltersAndOrder.rows.map(row => row.characteristicsProducts.map(characteristic => characteristic.idProduct)).flat();
        const productsFilteredByBrand= await EntityProducts.findAll({
            where: {
                idProduct: {
                    [Op.in]: idProducts
                }
            },
            offset,
            limit,
            order: order.length ? order : undefined,
        });
        if (!productsFilteredByBrand || productsFilteredByBrand.length < 1) {
            return res.status(200).send('No existen coincidencias.')
        }
        
        return res.status(200).json(productsFilteredByBrand)
    } catch (error) {
        // console.error(error);
        return res.status(500).json({ error: 'Error en el servidor.' });
    }
}

//EJEMPLO DE PETICION: http://localhost:3001/filterbrand?nameBrand=Samsung&orderBy=nameBrand&orderDirection=ASC

module.exports = { filterAndOrderBrand };
