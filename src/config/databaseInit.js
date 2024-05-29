const fs = require('fs');
const path = require('path');
const { EntityCategory, EntityBrand, EntityProducts, CharacteristicsProducts, EntityUsers } = require('../db');
const { imageCloudinaryUploader } = require('../../utils/imageReception.js')
const {logInUserServices} = require('../Users/services/userService.js')

const initialCategories = [
    { nameCategory: "Celulares y Teléfonos", descriptionCategory: "Breve descripcion de la categoria" },
    { nameCategory: "Accesorios para Celulares", descriptionCategory: "Breve descripcion de la categoria" },
    { nameCategory: "Smartwatches y Accesorios", descriptionCategory: "Breve descripcion de la categoria" },
    // { nameCategory: "Laptops", descriptionCategory: "Breve descripcion de la categoria" },
    { nameCategory: "Cámaras", descriptionCategory: "Breve descripcion de la categoria" },
    { nameCategory: "Accesorios para Cámaras", descriptionCategory: "Breve descripcion de la categoria" },
    { nameCategory: "Drones y Accesorios", descriptionCategory: "Breve descripcion de la categoria" },
    { nameCategory: "Consolas", descriptionCategory: "Breve descripcion de la categoria" },
    { nameCategory: "Accesorios para Consolas", descriptionCategory: "Breve descripcion de la categoria" },
    { nameCategory: "Accesorios para PC Gaming", descriptionCategory: "Breve descripcion de la categoria" },
    { nameCategory: "PC de Escritorio", descriptionCategory: "Breve descripcion de la categoria" },
    { nameCategory: "Portátiles", descriptionCategory: "Breve descripcion de la categoria" },
    { nameCategory: "Accesorios para Portátiles", descriptionCategory: "Breve descripcion de la categoria" },
    { nameCategory: "Tablets", descriptionCategory: "Breve descripcion de la categoria" },
    { nameCategory: "Televisores", descriptionCategory: "Breve descripcion de la categoria" }
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
    { nameBrand: "Infinix", logoBrand: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fes.m.wikipedia.org%2Fwiki%2FArchivo%3ALogo_of_Infinix.png&psig=AOvVaw0SGT3WhDIv5ilyFirHmNJ0&ust=1716273708345000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCIiiyffPm4YDFQAAAAAdAAAAABAE" },
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
    { emailUser: "ecommercetech2024@gmail.com", isAdmin: true },
    { emailUser: "cami.igsa@gmail.com", isAdmin: true }
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
            console.log(`Processing product: ${item.product.nameProduct}`);
            if (typeof item.product.imageProducts === "string") {
                // item.product.imageProducts = await imageCloudinaryUploader(false, item.product.imageProducts)
                item.product.imageProducts = [item.product.imageProducts];
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

