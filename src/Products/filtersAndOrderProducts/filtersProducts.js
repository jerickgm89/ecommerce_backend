const { EntityProducts, CharacteristicsProducts } = require('../../db');
const { Op } = require('sequelize');

const filtersProducts = async (req, res) => {
    const { category, brand, name, price, year, priceMin, priceMax } = req.query;
    const { orderBy, orderDirection } = req.query;
    
    let { page, limit } = req.query;
    let order = [];
    // console.log(where);
    try {
        let offset;
        if( page && limit ){
            offset = (page - 1) * limit;
        }
        const where = {};
        let include = brand
        ? [{
            model: CharacteristicsProducts,
            where: {},
            attributes: []
        }]
        : undefined
        // Construye las condiciones de filtrado basadas en los parámetros de consulta.
        if (name) {
            where.nameProduct = { [Op.iLike]: `%${name}%` };
        }
        if (price) {
            where.priceProduct = price;
        }
        if (year) {
            where.yearProduct = year;
        }
        if ( priceMin || priceMax ) {
            if( priceMin && priceMax ){
                where.priceProduct = {
                    [Op.and]: [
                        { [Op.gte]: priceMin },
                        { [Op.lte]: priceMax }
                    ]
                };
            }
            else if (priceMin) {
                where.priceProduct = {[ Op.gte ] : priceMin}; // Mayor o igual que priceMin
            }
            else if (priceMax) {
                where.priceProduct= {[ Op.lte ] : priceMax}; // Menor o igual que priceMax
            }
        }

        if(category) {
            where.idCategory = category
        }
        // if(brand) {
        //     include[0].where.idBrand = brand
        //     // console.log(order)
        // }
        if(brand) {
            const brandIds = brand.split(',').map(brandId => parseInt(brandId)); // Convertir a array de números
            include[0].where.idBrand = {[Op.in]: brandIds};
        }
        

        if (orderBy && orderDirection) {
            let selectedOrderBy = '';
            let selectedOrderDirection = '';

            if  (orderBy === 'priceProduct' || orderBy === 'yearProduct' || orderBy === 'nameProduct') {
                selectedOrderBy = orderBy;
            }
            // {
            //     selectedOrderBy = orderBy;
            // }

            if (orderDirection === 'ASC' || orderDirection === 'DESC') {
                selectedOrderDirection = orderDirection;
            }

            if (selectedOrderBy && selectedOrderDirection) {
                order.push([selectedOrderBy, selectedOrderDirection.toUpperCase()]);
            }
        }
        const resultFilters = await EntityProducts.findAndCountAll({
            where: { ...where, active: true },
            limit,
            offset,
            include,
            order: order.length ? order : undefined,
        });
        // console.log(order);

        if (!resultFilters.rows.length) {
            return res.status(400).send('No existen coincidencias.');
        }
        return res.status(200).json(resultFilters);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error en el servidor.' });
    }
};

//EJEMPLO TE PETICION: http://localhost:3001/filterproducts?orderBy=nameProduct&orderDirection=ASC
//Por nombre: http://localhost:3001/filterproducts?name=iphone&orderBy=nameProduct&orderDirection=ASC

module.exports = {filtersProducts};
