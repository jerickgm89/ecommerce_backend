

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
    {nameBrand: "LG"}
];

const initialProducts = [
    {
        product: {
            nameProduct: "Samsung Galaxy S21",
            priceProduct: 759000.00,
            imageProducts: "https://http2.mlstatic.com/D_NQ_NP_908886-MLA53734668410_022023-O.webp",
            SKU: "celsamS21-001",
            yearProduct: "2021",
            descriptionProduct: "The Samsung Galaxy S21 is a flagship smartphone with a stunning display and powerful performance.",
            stockProduct: 50,
            idCategory: 1
        },
        characteristics: {
            modelProduct: "Samsung Galaxy S21",
            characteristics: {
                display: "6.2-inch Dynamic AMOLED display",
                processor: "Exynos 2100 processor",
                memory: "8GB RAM",
                storage: "128GB storage",
                battery: "4000mAh battery"
            },
            idBrand: 1
        }
    },
    {
        product: {
            nameProduct: "iPhone 12",
            priceProduct: 500000.00,
            imageProducts: "https://http2.mlstatic.com/D_NQ_NP_864889-MLA45729915884_042021-O.webp",
            SKU: "celipho12-001",
            yearProduct: "2020",
            descriptionProduct: "The iPhone 12 is a high-end smartphone that offers a seamless user experience and impressive camera capabilities.",
            stockProduct: 50,
            idCategory: 1
        },
        characteristics: {
            modelProduct: "iPhone 12",
            characteristics: {
                display: "6.1-inch Super Retina XDR display",
                processor: "A14 Bionic chip",
                memory: "4GB RAM",
                storage: "64GB storage",
                battery: "2815mAh battery"
            },
            idBrand: 2
        }
    },
    {
        product: {
            nameProduct: "Google Pixel 5",
            priceProduct: 10000.00,
            imageProducts: "https://http2.mlstatic.com/D_NQ_NP_966068-MLA50145216014_052022-O.webp",
            SKU: "celgoopix5-001",
            yearProduct: "2020",
            descriptionProduct: "The Google Pixel 5 is a premium Android smartphone known for its exceptional camera performance and clean software experience.",
            stockProduct: 50,
            idCategory: 1
        },
        characteristics: {
            modelProduct: "Google Pixel 5",
            characteristics: {
                display: "6.0-inch OLED display",
                processor: "Snapdragon 765G processor",
                memory: "8GB RAM",
                storage: "128GB storage",
                battery: "4080mAh battery"
            },
            idBrand: 3
        }
    },
    {
        product: {
            nameProduct: "OnePlus 9 Pro",
            priceProduct: 2000000.00,
            imageProducts: "https://http2.mlstatic.com/D_NQ_NP_955388-MLA75663727189_042024-O.webp",
            SKU: "celon9pl-001",
            yearProduct: "2021",
            descriptionProduct: "The OnePlus 9 Pro is a flagship smartphone that offers a smooth and fast user experience with its high-refresh-rate display and powerful processor.",
            stockProduct: 50,
            idCategory: 1
        },
        characteristics: {
            modelProduct: "OnePlus 9 Pro",
            characteristics: {
                display: "6.7-inch Fluid AMOLED display",
                processor: "Snapdragon 888 processor",
                memory: "12GB RAM",
                storage: "256GB storage",
                battery: "4500mAh battery"
            },
            idBrand: 4
        }
    },
    {
        product: {
            nameProduct: "Xiaomi Mi 11",
            priceProduct: 2500000.00,
            imageProducts: "https://http2.mlstatic.com/D_NQ_NP_860255-MLA48698173457_122021-O.webp",
            SKU: "celxia11-001",
            yearProduct: "2021",
            descriptionProduct: "The Xiaomi Mi 11 is a feature-packed smartphone with a powerful camera system and a beautiful display.",
            stockProduct: 50,
            idCategory: 1
        },
        characteristics: {
            modelProduct: "Xiaomi Mi 11",
            characteristics: {
                display: "6.81-inch AMOLED display",
                processor: "Snapdragon 888 processor",
                memory: "8GB RAM",
                storage: "128GB storage",
                battery: "4600mAh battery"
            },
            idBrand: 5
        }
    },
    {
        product: {
            nameProduct: "Sony Xperia 1 III",
            priceProduct: 800000.00,
            imageProducts: "https://http2.mlstatic.com/D_NQ_NP_987188-MLA74776688756_032024-O.webp",
            SKU: "celsonx-001",
            yearProduct: "2021",
            descriptionProduct: "The Sony Xperia 1 III is a premium smartphone that offers a 4K OLED display and professional camera features.",
            stockProduct: 50,
            idCategory: 1
        },
        characteristics: {
            modelProduct: "Sony Xperia 1 III",
            characteristics: {
                display: "6.5-inch 4K HDR OLED display",
                processor: "Snapdragon 888 processor",
                memory: "12GB RAM",
                storage: "256GB storage",
                battery: "4500mAh battery"
            },
            idBrand: 6
        }
    },
    {
        product: {
            nameProduct: "Motorola Edge+",
            priceProduct: 256000.00,
            imageProducts: "https://http2.mlstatic.com/D_NQ_NP_850045-MLA43752372061_102020-O.webp",
            SKU: "celmotEd-001",
            yearProduct: "2020",
            descriptionProduct: "The Motorola Edge+ is a flagship smartphone with a curved display and a large battery for all-day usage.",
            stockProduct: 50,
            idCategory: 1
        },
        characteristics: {
            modelProduct: "Motorola Edge+",
            characteristics: {
                display: "6.7-inch OLED display",
                processor: "Snapdragon 865 processor",
                memory: "12GB RAM",
                storage: "256GB storage",
                battery: "5000mAh battery"
            },
            idBrand: 7
        }
    },
    {
        product: {
            nameProduct: "Nokia 8.3 5G",
            priceProduct: 876000.00,
            imageProducts: "https://http2.mlstatic.com/D_NQ_NP_753477-MLA52349105729_112022-O.webp",
            SKU: "celno85g-001",
            yearProduct: "2020",
            descriptionProduct: "The Nokia 8.3 5G is a mid-range smartphone that offers 5G connectivity and a large display for multimedia consumption.",
            stockProduct: 50,
            idCategory: 1
        },
        characteristics: {
            modelProduct: "Nokia 8.3 5G",
            characteristics: {
                display: "6.81-inch IPS LCD display",
                processor: "Snapdragon 765G processor",
                memory: "8GB RAM",
                storage: "128GB storage",
                battery: "4500mAh battery"
            },
            idBrand: 8
        }
    },
    {
        product: {
            nameProduct: "ASUS ROG Phone 5",
            priceProduct: 3000000.00,
            imageProducts: "https://http2.mlstatic.com/D_NQ_NP_806269-MLA53981317263_022023-O.webp",
            SKU: "celasurogpho5-001",
            yearProduct: "2021",
            descriptionProduct: "The ASUS ROG Phone 5 is a gaming smartphone with a high-refresh-rate display and powerful hardware for smooth gaming performance.",
            stockProduct: 50,
            idCategory: 1
        },
        characteristics: {
            modelProduct: "ASUS ROG Phone 5",
            characteristics: {
                display: "6.78-inch AMOLED display",
                processor: "Snapdragon 888 processor",
                memory: "16GB RAM",
                storage: "256GB storage",
                battery: "6000mAh battery"
            },
            idBrand: 9
        }
    },
    {
        product: {
            nameProduct: "Oppo Find X3 Pro",
            priceProduct: 1500000.00,
            imageProducts: "https://http2.mlstatic.com/D_NQ_NP_796396-MLA75608767367_042024-O.webp",
            SKU: "ceskufinx3p001",
            yearProduct: "2021",
            descriptionProduct: "The Oppo Find X3 Pro is a flagship smartphone with a versatile camera system and a beautiful display.",
            stockProduct: 50,
            idCategory: 1
        },
        characteristics: {
            modelProduct: "Oppo Find X3 Pro",
            characteristics: {
                display: "6.7-inch AMOLED display",
                processor: "Snapdragon 888 processor",
                memory: "12GB RAM",
                storage: "256GB storage",
                battery: "4500mAh battery"
            },
            idBrand: 10
        }
    },
    {
        product: {
            nameProduct: "Realme GT",
            priceProduct: 712000.00,
            imageProducts: "https://http2.mlstatic.com/D_NQ_NP_631688-MLA73828165428_012024-O.webp",
            SKU: "celreagt-001",
            yearProduct: "2021",
            descriptionProduct: "The Realme GT is a high-performance smartphone with a flagship processor and a high-refresh-rate display.",
            stockProduct: 50,
            idCategory: 1
        },
        characteristics: {
            modelProduct: "Realme GT",
            characteristics: {
                display: "6.43-inch Super AMOLED display",
                processor: "Snapdragon 883 processor",
                memory: "8GB RAM",
                storage: "128GB storage",
                battery: "4500mAh battery"
            },
            idBrand: 11
        }
    },
    {
        product: {
            nameProduct: "Vivo X60 Pro+",
            priceProduct: 1200000.00,
            imageProducts: "https://i.blogs.es/26af7f/vivo-x60-pro-/1366_2000.webp",
            SKU: "celvivx60P-001",
            yearProduct: "2021",
            descriptionProduct: "The Vivo X60 Pro+ is a camera-centric smartphone with a professional-grade camera system and a beautiful design.",
            stockProduct: 50,
            idCategory: 1
        },
        characteristics: {
            modelProduct: "Vivo X60 Pro+",
            characteristics: {
                display: "6.56-inch AMOLED display",
                processor: "Snapdragon 888 processor",
                memory: "12GB RAM",
                storage: "256GB storage",
                battery: "4200mAh battery"
            },
            idBrand: 12
        }
    },
    {
        product: {
            nameProduct: "BlackBerry Key2",
            priceProduct: 648000.00,
            imageProducts: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcS8JWpOBIMUJEtHVlGs4w545vUoldC7ZdhLq9bI5uYZr2p9_FUS49YM7lo9_jDjt1EB6NUZo3cE2TDAbGGB7t-pkvZv-bBYnQ",
            SKU: "celblak2-001",
            yearProduct: "2018",
            descriptionProduct: "The BlackBerry Key2 is a unique smartphone with a physical keyboard and a focus on productivity and security.",
            stockProduct: 50,
            idCategory: 1
        },
        characteristics: {
            modelProduct: "BlackBerry Key2",
            characteristics: {
                display: "4.5-inch IPS LCD display",
                processor: "Snapdragon 660 processor",
                memory: "6GB RAM",
                storage: "64GB storage",
                battery: "3500mAh battery"
            },
            idBrand: 13
        }
    },
    {
        product: {
            nameProduct: "Huawei P40 Pro",
            priceProduct: 898000.00,
            imageProducts: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTZ9I-ojVWBxnWcDdrOuakMJDAzDajxqsalnzlAZYF_IXQFGEoHLahIzxcJhEw60qUwlnSCkGxoiA6zkWN2aaM2UhIUOHxFMg",
            SKU: "celhuap40-001",
            yearProduct: "2020",
            descriptionProduct: "The Huawei P40 Pro is a flagship smartphone with a versatile camera system and a beautiful curved display.",
            stockProduct: 50,
            idCategory: 1
        },
        characteristics: {
            modelProduct: "Huawei P40 Pro",
            characteristics: {
                display: "6.58-inch OLED display",
                processor: "Kirin 990 5G processor",
                memory: "8GB RAM",
                storage: "256GB storage",
                battery: "4200mAh battery"
            },
            idBrand: 14
        }
    },
    {
        product: {
            nameProduct: "ZTE Axon 30 Ultra",
            priceProduct: 898000.00,
            imageProducts: "https://i.blogs.es/33ef87/41zd8-jk2-s/450_1000.jpeg",
            SKU: "celztepaxo-001",
            yearProduct: "2021",
            descriptionProduct: "The ZTE Axon 30 Ultra is a flagship smartphone with a high-refresh-rate display and a powerful camera system.",
            stockProduct: 50,
            idCategory: 1
        },
        characteristics: {
            modelProduct: "ZTE Axon 30 Ultra",
            characteristics: {
                display: "6.67-inch AMOLED display",
                processor: "Snapdragon 888 processor",
                memory: "8GB RAM",
                storage: "128GB storage",
                battery: "4600mAh battery"
            },
            idBrand: 15
        }
    },
    {
        product: {
            nameProduct: "Lenovo Legion Phone Duel",
            priceProduct: 2300000.00,
            imageProducts: "https://p1-ofp.static.pub/fes/cms/2023/01/19/9ze48952q8e5wre5bvi8a39u2urxfn063590.jpg",
            SKU: "cellenleg-001",
            yearProduct: "2020",
            descriptionProduct: "The Lenovo Legion Phone Duel is a gaming smartphone with a unique side-mounted pop-up camera and a high-refresh-rate display.",
            stockProduct: 50,
            idCategory: 1
        },
        characteristics: {
            modelProduct: "Lenovo Legion Phone Duel",
            characteristics: {
                display: "6.65-inch AMOLED display",
                processor: "Snapdragon 865+ processor",
                memory: "12GB RAM",
                storage: "256GB storage",
                battery: "5000mAh battery"
            },
            idBrand: 16
        }
    },
    {
        product: {
            nameProduct: "Redmi Note 10 Pro",
            priceProduct: 1320000.00,
            imageProducts: "https://http2.mlstatic.com/D_NQ_NP_660768-MLA74988011796_032024-O.webp",
            SKU: "celredn10-001",
            yearProduct: "2021",
            descriptionProduct: "The Redmi Note 10 Pro is a mid-range smartphone with a high-resolution display and a large battery for extended usage.",
            stockProduct: 50,
            idCategory: 1
        },
        characteristics: {
            modelProduct: "Redmi Note 10 Pro",
            characteristics: {
                display: "6.67-inch Super AMOLED display",
                processor: "Snapdragon 732G processor",
                memory: "6GB RAM",
                storage: "128GB storage",
                battery: "5020mAh battery"
            },
            idBrand: 17
        }
    },
    {
        product: {
            nameProduct: "Infinix Zero 8",
            priceProduct: 740000.00,
            imageProducts: "https://fdn2.gsmarena.com/vv/pics/infinix/infinix-zero8-3.jpg",
            SKU: "celinfz8-001",
            yearProduct: "2020",
            descriptionProduct: "The Infinix Zero 8 is a budget-friendly smartphone with a high-refresh-rate display and a capable camera system.",
            stockProduct: 50,
            idCategory: 1
        },
        characteristics: {
            modelProduct: "Infinix Zero 8",
            characteristics: {
                display: "6.85-inch IPS LCD display",
                processor: "MediaTek Helio G90T processor",
                memory: "8GB RAM",
                storage: "128GB storage",
                battery: "4500mAh battery"
            },
            idBrand: 18
        }
    }
  ]
  

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
