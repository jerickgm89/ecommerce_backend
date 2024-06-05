const { filtersProductsServices } = require('../src/Products/services/servicesFiltersAndOrder/filtersProductsServices.js');
const { allCategoryListService } = require('../src/Products/services/servicesCategory/categoryServices.js');
const { allBrandsListService } = require('../src/Products/services/servicesBrands/brandServices.js');

const formatArrayToAddDiscount = async (idProduct) => {
    let searchedCategory = [];
    let searchedBrand = [];
    
    const bruteListNames = idProduct.split('+'); // Ej: ["Laptops","Acer", "MSI","Celulares"]

    const fullListCategories = await allCategoryListService();
    const fullListBrands = await allBrandsListService();

    bruteListNames.forEach((name) => {
        const category = fullListCategories.find(cat => cat.nameCategory === name);
        if (category) {
            searchedCategory.push(category.idCategory);
        } else {
            const brand = fullListBrands.find(br => br.nameBrand === name);
            if (brand) {
                searchedBrand.push(brand.idBrand);
            }
        }
    });

    let resultFilterCat = { rows: [] };
    let resultFilterBr = { rows: [] };

    if (searchedCategory.length) {
        const properties = { category: searchedCategory };
        resultFilterCat = await filtersProductsServices(properties, undefined, undefined, undefined);
    }

    if (searchedBrand.length) {
        const properties = { brand: searchedBrand };
        resultFilterBr = await filtersProductsServices(properties, undefined, undefined, undefined);
    }

    const resultFilter = [...resultFilterCat.rows, ...resultFilterBr.rows];
    const filteredResults = resultFilter.map((product) => product.idProduct);
    console.log("filteredResults", filteredResults)
    return filteredResults;
};

module.exports = formatArrayToAddDiscount;
