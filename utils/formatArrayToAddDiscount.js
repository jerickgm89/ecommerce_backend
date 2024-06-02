const { filtersProductsServices } = require('../src/Products/services/servicesFiltersAndOrder/filtersProductsServices.js')
const { allCategoryListService } = require('../src/Products/services/servicesCategory/categoryServices.js')
const { allBrandsListService } = require('../src/Products/services/servicesBrands/brandServices.js') // Add this line
// const { allBrandsListService } = require('../src/Products/services/servicesBrands/brandServices.js')
const formatArrayToAddDiscount = async ( idProduct ) => {
    // debo entregar un array de idProduct, ejemplos: [1, 2, 3, 4]
    
    let searchedCategory = []
    let searchedBrand = []
    
    // recibo por ejemplo "Laptops+Celulares"
    const bruteListNames = idProduct.split('+'); //["Laptops","Acer", "MSI","Celulares", ...]
    // console.log("bruteListNames ->  ", bruteListNames, "idProduct ->>  ", idProduct);
    // ["Laptops","Celulares", ...]
    const fullListCategories = await allCategoryListService();
    
    const allCategoryList = fullListCategories.map((eachCategory, index) =>{
        if(bruteListNames.length >= index){
            if(bruteListNames.includes(eachCategory.nameCategory)){
                searchedCategory.push(eachCategory.idCategory)
                // bruteListNames.splice(index-1, 1)
            }
        }
        return searchedCategory
    })
    const fullListBrands = await allBrandsListService()
    console.log("bruteListNames ->  ", bruteListNames);

    
    const allBrandList = fullListBrands.map((eachBrand, index) =>{
        if(bruteListNames.length >= index){
            if(bruteListNames.includes(eachBrand.nameBrand)){
                searchedBrand.push(eachBrand.idBrand)
                // bruteListNames.splice(index-1, 1)
            }
        }
        return searchedBrand
    })

    const properties = {
        category: searchedCategory,
        brand: searchedBrand,
    }
    const resultFilterCategory= await filtersProductsServices({properties: properties.category}, undefined, undefined, undefined);

    const resultFilterBrand= await filtersProductsServices({properties: properties.brand}, undefined, undefined, undefined);
    const resultsTogether = resultFilterCategory.rows.concat(resultFilterBrand.rows)
    const idProductListUnduplicates = new Set();
    const filteredResult = resultsTogether.map((eachProduct) => idProductListUnduplicates.add(eachProduct.idProduct))
    const formatedList = Array.from(idProductListUnduplicates)
    return formatedList
};

module.exports = formatArrayToAddDiscount;