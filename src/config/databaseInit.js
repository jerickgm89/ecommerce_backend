

const { EntityCategory, EntityBrand, EntityProducts, CharacteristicsProducts } = require('../db');

const initialCategories = [
    {
        nameCategory: "Celulares",
        descriptionCategory: "Breve descripcion de la categoria",
        
    },
    {
        nameCategory: "Computadoras y Laptops",
        descriptionCategory: "Breve descripcion de la categoria",
    }
];

const initialBrands = [
    { nameBrand: "Apple" },
    { nameBrand: "Samsung" }
];

const initialProducts = [
    {
        product: {
            nameProduct: "iPhone 14",
            priceProduct: 799.99,
            imageProducts: "url_to_image.jpg",
            yearProducts: "2023",
            SKU: "IP13001",
            stockProduct: 50,
            idCategory: 1
        },
        characteristics: {
            modelProduct: "iPhone 13",
            characteristics: ({ color: "Black", memory: "128GB" }),
            idBrand: 1 
        }
    },
    {
        product: {
            nameProduct: "Sansung Galaxy S24",
            priceProduct: 599.99,
            imageProducts: "url_to_image.jpg",
            yearProducts: "2022",
            SKU: "IP13001",
            stockProduct: 50,
            idCategory: 1
        },
        characteristics: {
            modelProduct: "Galaxy S21",
            characteristics: ({ color: "Black", memory: "128GB" }),
            idBrand: 1 
        }
    },
    {
        product: {
            nameProduct: "Sansung Galaxy S21",
            priceProduct: 599.99,
            imageProducts: "url_to_image.jpg",
            yearProducts: "2020",
            SKU: "IP13001",
            stockProduct: 50,
            idCategory: 1
        },
        characteristics: {
            modelProduct: "Galaxy S21",
            characteristics: ({ color: "Black", memory: "128GB" }),
            idBrand: 1 
        }
    },
    
];

async function initializeData() {
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
        for (const item of initialProducts) {
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
