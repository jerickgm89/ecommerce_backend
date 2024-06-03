const fs = require('fs');
const path = require('path');
const { EntityCategory, EntityBrand, EntityProducts, CharacteristicsProducts, EntityUsers } = require('../db');
const { imageCloudinaryUploader } = require('../../utils/imageReception.js')
const {logInUserServices} = require('../Users/services/userService.js')

const initialCategories = [
    { nameCategory: "Celulares y Teléfonos", descriptionCategory: "Breve descripcion de la categoria", imageCategory: "https://falabella.scene7.com/is/image/Falabella/14673309_6?format=png" },
    { nameCategory: "Accesorios para Celulares", descriptionCategory: "Breve descripcion de la categoria", imageCategory: "https://falabella.scene7.com/is/image/Falabella/prod16426548?format=png" },
    { nameCategory: "Smartwatches y Accesorios", descriptionCategory: "Breve descripcion de la categoria", imageCategory: "https://falabella.scene7.com/is/image/Falabella/16354229_2?format=png" },
    // { nameCategory: "Laptops", descriptionCategory: "Breve descripcion de la categoria" },
    { nameCategory: "Cámaras", descriptionCategory: "Breve descripcion de la categoria", imageCategory: "https://falabella.scene7.com/is/image/Falabella/gsc_122577138_3386294_1?format=png" },
    { nameCategory: "Accesorios para Cámaras", descriptionCategory: "Breve descripcion de la categoria", imageCategory: "https://rinconfotografico.cl/image/cachewebp/data/productos/easycover/5DMKII/easycover_ecc5d2_easycover_for_the_canon_1407519315000_1070763-370x370.webp" },
    { nameCategory: "Drones y Accesorios", descriptionCategory: "Breve descripcion de la categoria", imageCategory: "https://falabella.scene7.com/is/image/Falabella/15181586_1?format=png" },
    { nameCategory: "Consolas", descriptionCategory: "Breve descripcion de la categoria", imageCategory: "https://falabella.scene7.com/is/image/Falabella/16894931_3?format=png" },
    { nameCategory: "Accesorios para Consolas", descriptionCategory: "Breve descripcion de la categoria", imageCategory: "https://falabella.scene7.com/is/image/Falabella/16957319_1?format=png" },
    { nameCategory: "Accesorios para PC Gaming", descriptionCategory: "Breve descripcion de la categoria", imageCategory: "https://falabella.scene7.com/is/image/Falabella/gsc_113797053_765549_1?format=png" },
    { nameCategory: "PC de Escritorio", descriptionCategory: "Breve descripcion de la categoria", imageCategory: "https://falabella.scene7.com/is/image/Falabella/gsc_112882071_448839_1?format=png" },
    { nameCategory: "Portátiles", descriptionCategory: "Breve descripcion de la categoria", imageCategory: "https://falabella.scene7.com/is/image/Falabella/16495789_1?format=png" },
    { nameCategory: "Accesorios para Portátiles", descriptionCategory: "Breve descripcion de la categoria", imageCategory: "https://falabella.scene7.com/is/image/Falabella/3651417_2?format=png" },
    { nameCategory: "Tablets", descriptionCategory: "Breve descripcion de la categoria", imageCategory: "https://falabella.scene7.com/is/image/Falabella/16642827_1?format.png" },
    { nameCategory: "Televisores", descriptionCategory: "Breve descripcion de la categoria", imageCategory: "https://falabella.scene7.com/is/image/Falabella/16763072_1?format=png" }
];

const initialBrands = [
    { nameBrand: "Samsung", logoBrand: "https://logos-world.net/wp-content/uploads/2020/04/Samsung-Logo-700x394.png" },
    { nameBrand: "Apple", logoBrand: "https://logos-world.net/wp-content/uploads/2020/04/Apple-Logo-700x394.png" },
    { nameBrand: "Google", logoBrand: "https://logos-world.net/wp-content/uploads/2020/09/Google-Logo-700x394.png" },
    { nameBrand: "OnePlus", logoBrand: "https://logos-world.net/wp-content/uploads/2023/03/OnePlus-Logo-500x281.png" },
    { nameBrand: "Xiaomi", logoBrand: "https://logos-world.net/wp-content/uploads/2020/07/Xiaomi-Logo-700x394.png" },
    { nameBrand: "Sony", logoBrand: "https://logos-world.net/wp-content/uploads/2020/04/Sony-Logo-700x394.png" },
    { nameBrand: "Motorola", logoBrand: "https://logos-world.net/wp-content/uploads/2022/07/Motorola-Logo-700x394.png" },
    { nameBrand: "Nokia", logoBrand: "https://logos-world.net/wp-content/uploads/2020/10/Nokia-Logo-500x281.png" },
    { nameBrand: "Asus", logoBrand: "https://logos-world.net/wp-content/uploads/2020/07/Asus-Logo-700x394.png" },
    { nameBrand: "Oppo", logoBrand: "https://logos-world.net/wp-content/uploads/2023/03/Oppo-Logo-500x281.png" },
    { nameBrand: "Realme", logoBrand: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Realme-realme-_logo_box-RGB-01_with_out_back_ground.svg/2560px-Realme-realme-_logo_box-RGB-01_with_out_back_ground.svg.png" },
    { nameBrand: "Vivo", logoBrand: "https://logos-world.net/wp-content/uploads/2023/03/Vivo-Logo-500x281.png" },
    { nameBrand: "BlackBerry", logoBrand: "https://logos-world.net/wp-content/uploads/2020/11/BlackBerry-Logo-700x394.png" },
    { nameBrand: "Huawei", logoBrand: "https://logos-world.net/wp-content/uploads/2020/04/Huawei-Logo-700x394.png" },
    { nameBrand: "ZTE", logoBrand: "https://logos-world.net/wp-content/uploads/2023/03/ZTE-Logo-500x281.png" },
    { nameBrand: "Lenovo", logoBrand: "https://logos-world.net/wp-content/uploads/2022/07/Lenovo-Logo-700x394.png" },
    { nameBrand: "Redmi", logoBrand: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Redmi_Logo.svg/2560px-Redmi_Logo.svg.png" },
    { nameBrand: "Infinix", logoBrand: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Logo_of_Infinix.png/800px-Logo_of_Infinix.png" },
    { nameBrand: "Dell", logoBrand: "https://logos-world.net/wp-content/uploads/2020/08/Dell-Logo-700x394.png" },
    { nameBrand: "Hp", logoBrand: "https://logos-world.net/wp-content/uploads/2020/11/HP-Logo-700x394.png" },
    { nameBrand: "Microsoft", logoBrand: "https://logos-world.net/wp-content/uploads/2020/09/Microsoft-Logo-700x394.png" },
    { nameBrand: "Acer", logoBrand: "https://logos-world.net/wp-content/uploads/2022/11/Acer-Logo-500x281.png" },
    { nameBrand: "Razer", logoBrand: "https://logos-world.net/wp-content/uploads/2020/11/Razer-Logo-700x394.png" },
    { nameBrand: "Alienware", logoBrand: "https://logos-world.net/wp-content/uploads/2020/05/Alienware-Logo-700x394.png" },
    { nameBrand: "MSI", logoBrand: "https://logos-world.net/wp-content/uploads/2020/11/MSI-Logo-700x394.png" },
    { nameBrand: "LG", logoBrand: "https://logos-world.net/wp-content/uploads/2020/05/LG-Logo-700x394.png" }
];

const initialUserAdmin = [
    { email: "ecommercetech2024@gmail.com", given_name: "Admin", family_name:"EcommerceTech Proyecto Final", isAdmin: true },
    { email: "afoviedola@gmail.com", given_name: "Alen", family_name:"Oviedo", isAdmin: true },
    { email: "martineznavarrojulian159@gmail.com", given_name: "Julian", family_name:"Navarro", isAdmin: true },
    { email: "jerickgm89@gmail.com", given_name: "Jorge", family_name:"Garcia", isAdmin: true },
    { email: "ajds.joel1995@gmail.com", given_name: "Anthony", family_name:"Depablos", isAdmin: true },
    { email: "cristianse.galvan@gmail.com", given_name: "Cristian", family_name:"Galván", isAdmin: true },
    { email: "javier.arangue@gmail.com", given_name: "Javier", family_name:"Arangue", isAdmin: true },
    { email: "velardemarianovelarde37@gmail.com", given_name: "Mariano", family_name:"Velarde", isAdmin: true },
    { email: "cami.igsa@gmail.com", given_name: "Camila", family_name:"Sotomayor", isAdmin: true },
]

async function initializeData() {
    console.log('Initializing data...');

    const userCount = await EntityUsers.count();
    if ( userCount === 0 ) {
        initialUserAdmin.map( async (user) => await logInUserServices(user))
        console.log('Initial admin user added.');
    }
    // if ( userCount === 0 ) {
    //     await EntityUsers.bulkCreate(initialUserAdmin);
    //     console.log('Initial admin user added.');
    // } 

    const categoryCount = await EntityCategory.count();
    if (categoryCount === 0) {
        await EntityCategory.bulkCreate(initialCategories);
        console.log('Initial categories added.');
    }

    const brandCount = await EntityBrand.count();
    if (brandCount === 0) {
        await EntityBrand.bulkCreate(initialBrands);
        console.log('Initial brands added.');
    }

    const productCount = await EntityProducts.count();
    if (productCount === 0) {
        console.log('Loading products from products.json...');
        const filePath = path.join(__dirname, '../config/products.json');
        const productData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        for (let item of productData) {
            // console.log(`Processing product: ${item.product.nameProduct}`);
            if (typeof item.product.imageProducts === "string") {
                item.product.imageProducts = await imageCloudinaryUploader(false, item.product.imageProducts)
                // item.product.imageProducts = [item.product.imageProducts];
            }
            const newProduct = await EntityProducts.create(item.product);
            await CharacteristicsProducts.create({
                ...item.characteristics,
                idProduct: newProduct.idProduct
            });
        }
        console.log('Initial products and characteristics added.');
    }
}

module.exports = { initializeData };

