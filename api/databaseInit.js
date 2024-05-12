
const { EntityCategory, EntityBrand, EntityProducts, CharacteristicsProducts } = require('../src/db');

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
    { nameBrand: "Samsung" },
    { nameBrand: "Apple" },
    {nameBrand: "Google"},
    {nameBrand: "OnePlus"},
    {nameBrand: "Xiaomi"},
    {nameBrand: "Sony"},
    {nameBrand: "Motorola"},
    {nameBrand: "Nokia"},
    {nameBrand: "Asus"},
    {nameBrand: "Oppo"},
    {nameBrand: "Realme"},
    {nameBrand: "Vivo"},
    {nameBrand: "BlackBerry"},
    {nameBrand: "Huawei"},
    {nameBrand: "ZTE"},
    {nameBrand: "Lenovo"},
    {nameBrand: "Redmi"},
    {nameBrand: "Infinix"},
    {nameBrand: "Dell"},
    {nameBrand: "Hp"},
    {nameBrand: "Microsoft"},
    {nameBrand: "Acer"},
    {nameBrand: "Razer"},
    {nameBrand: "Alienware"},
    {nameBrand: "MSI"},
    {nameBrand: "LG"},
];

const initialProducts = [
    {
       
        product: {
            nameProduct: "iPhone 14",
            priceProduct: 799.99,
            yearProduct: 2021,
            descriptionProduct: "The Samsung Galaxy S21 is a flagship smartphone with a stunning display and powerful performance.",
            imageProducts: "url_to_image.jpg",
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
            yearProduct: 2020,
            imageProducts: "url_to_image.jpg",
            descriptionProduct: "The Samsung Galaxy S21 is a flagship smartphone with a stunning display and powerful performance.",
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
        nameProduct: "Samsung Galaxy S21",
        priceProduct: 759000.00,
          yearProduct: 2021,
          descriptionProduct: "The Samsung Galaxy S21 is a flagship smartphone with a stunning display and powerful performance.",
          imageProducts: {
            img: "https://http2.mlstatic.com/D_NQ_NP_908886-MLA53734668410_022023-O.webp",
            imgFront: "https://http2.mlstatic.com/D_NQ_NP_931265-MLA53734633580_022023-O.webp",
            imgBack: "https://http2.mlstatic.com/D_NQ_NP_720601-MLA53734633575_022023-O.webp",
            SKU: "celsamS21-001",
            stockProduct: 50,
            idCategory: 1
          },
            characteristics: {
            display: "6.2-inch Dynamic AMOLED display",
            processor: "Exynos 2100 processor",
            memory: "8GB RAM",
            storage: "128GB storage",
             battery: "4000mAh battery",
            idbrand: 1
          },
        },
    product: {
        nameProduct: "iPhone 12",
        priceProduct: 500000.00,
        idBrand: 2,
        yearProduct: 2020,
        descriptionProduct: "The iPhone 12 is a high-end smartphone that offers a seamless user experience and impressive camera capabilities.",
        imageProducts: {
          img: "https://http2.mlstatic.com/D_NQ_NP_864889-MLA45729915884_042021-O.webp",
          imgFront: "https://http2.mlstatic.com/D_NQ_NP_740855-MLA45719698644_042021-O.webp"
        },
        SKU: "celipho12-001",
        stockProduct: 30,
        characteristics: {
          display: "6.1-inch Super Retina XDR display",
          processor: "A14 Bionic chip",
          memory: "4GB RAM",
          storage: "64GB storage",
          battery: "2815mAh battery",
          idBrand: 1
         },        
    },
    product: {
        nameProduct: "Lenovo Yoga 9i",
        priceProduct: 5000000.00,
        yearProduct: 2022,
        descriptionProduct: "The Lenovo Yoga 9i is a versatile 2-in-1 laptop with a premium design and powerful performance.",
        imageProducts: {
          img: "https://http2.mlstatic.com/D_NQ_NP_662478-MLU72561914070_112023-O.webp",
          imgBack: "https://http2.mlstatic.com/D_NQ_NP_2X_719485-MLU72561914074_112023-F.webp"
        },
        SKU: "laplenyog9i-001",
        characteristics: {
          display: "14-inch 4K UHD display",
          processor: "Intel Core i7 processor",
          memory: "16GB RAM",
          graphics: "Intel Iris Xe Graphics",
          storage: "1TB SSD",
          battery: "60Wh battery",
          idBrand: 16
        },    
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
