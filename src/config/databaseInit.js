

const { EntityCategory, EntityBrand, EntityProducts, CharacteristicsProducts } = require('../db');

const initialCategories = [
    {
        nameCategory: "Celulares",
        descriptionCategory: "Breve descripcion de la categoria",
        
    },
    {
        nameCategory: "Laptops",
        descriptionCategory: "Breve descripcion de la categoria",
    }
];

const initialBrands = [
    { nameBrand: "Samsung" , logoBrand: "https://logos-world.net/wp-content/uploads/2020/04/Samsung-Logo-700x394.png"},
    { nameBrand: "Apple" , logoBrand: "https://logos-world.net/wp-content/uploads/2020/04/Apple-Logo-700x394.png"},
    {nameBrand: "Google", logoBrand: "https://logos-world.net/wp-content/uploads/2020/09/Google-Logo-700x394.png"},
    {nameBrand: "OnePlus", logoBrand: "https://logos-world.net/wp-content/uploads/2023/03/OnePlus-Logo-500x281.png"},
    {nameBrand: "Xiaomi", logoBrand: "https://logos-world.net/wp-content/uploads/2020/07/Xiaomi-Logo-700x394.png"},
    {nameBrand: "Sony", logoBrand: "https://logos-world.net/wp-content/uploads/2020/04/Sony-Logo-700x394.png"},
    {nameBrand: "Motorola", logoBrand: "https://logos-world.net/wp-content/uploads/2022/07/Motorola-Logo-700x394.png"},
    {nameBrand: "Nokia", logoBrand: "https://logos-world.net/wp-content/uploads/2020/10/Nokia-Logo-500x281.png"},
    {nameBrand: "Asus", logoBrand: "https://logos-world.net/wp-content/uploads/2020/07/Asus-Logo-700x394.png"},
    {nameBrand: "Oppo", logoBrand: "https://logos-world.net/wp-content/uploads/2023/03/Oppo-Logo-500x281.png"},
    {nameBrand: "Realme", logoBrand: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Realme-realme-_logo_box-RGB-01_with_out_back_ground.svg/2560px-Realme-realme-_logo_box-RGB-01_with_out_back_ground.svg.png"},
    {nameBrand: "Vivo", logoBrand: "https://logos-world.net/wp-content/uploads/2023/03/Vivo-Logo-500x281.png"},
    {nameBrand: "BlackBerry", logoBrand: "https://logos-world.net/wp-content/uploads/2020/11/BlackBerry-Logo-700x394.png"},
    {nameBrand: "Huawei", logoBrand: "https://logos-world.net/wp-content/uploads/2020/04/Huawei-Logo-700x394.png"},
    {nameBrand: "ZTE", logoBrand: "https://logos-world.net/wp-content/uploads/2023/03/ZTE-Logo-500x281.png"},
    {nameBrand: "Lenovo", logoBrand: "https://logos-world.net/wp-content/uploads/2022/07/Lenovo-Logo-700x394.png"},
    {nameBrand: "Redmi", logoBrand: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Redmi_Logo.svg/2560px-Redmi_Logo.svg.png"},
    {nameBrand: "Infinix", logoBrand: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fes.m.wikipedia.org%2Fwiki%2FArchivo%3ALogo_of_Infinix.png&psig=AOvVaw0SGT3WhDIv5ilyFirHmNJ0&ust=1716273708345000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCIiiyffPm4YDFQAAAAAdAAAAABAE"},
    {nameBrand: "Dell", logoBrand: "https://logos-world.net/wp-content/uploads/2020/08/Dell-Logo-700x394.png"},
    {nameBrand: "Hp", logoBrand: "https://logos-world.net/wp-content/uploads/2020/11/HP-Logo-700x394.png"},
    {nameBrand: "Microsoft", logoBrand: "https://logos-world.net/wp-content/uploads/2020/09/Microsoft-Logo-700x394.png"},
    {nameBrand: "Acer", logoBrand: "https://logos-world.net/wp-content/uploads/2022/11/Acer-Logo-500x281.png"},
    {nameBrand: "Razer", logoBrand: "https://logos-world.net/wp-content/uploads/2020/11/Razer-Logo-700x394.png"},
    {nameBrand: "Alienware", logoBrand: "https://logos-world.net/wp-content/uploads/2020/05/Alienware-Logo-700x394.png"},
    {nameBrand: "MSI", logoBrand: "https://logos-world.net/wp-content/uploads/2020/11/MSI-Logo-700x394.png"},
    {nameBrand: "LG", logoBrand: "https://logos-world.net/wp-content/uploads/2020/05/LG-Logo-700x394.png"}
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
    },
    {
        product: {
            nameProduct: "Dell XPS 13",
            priceProduct: 2490000,
            imageProducts: "https://http2.mlstatic.com/D_NQ_NP_948090-MLA54586548191_032023-O.webp",
            SKU: "lapdellxps13-001",
            yearProduct: "2022",
            descriptionProduct: "The Dell XPS 13 is a premium laptop with a stunning display and powerful performance.",
            stockProduct: 0,
            idCategory: 2
        },
        characteristics: {
            modelProduct: "",
            characteristics: {
                display: "13.4-inch 4K UHD display",
                processor: "Intel Core i7 processor",
                memory: "16GB RAM",
                storage: "1TB SSD",
                battery: "52Wh battery"
            },
            idBrand: 19
        }
    },
    {
        product: {
            nameProduct: "Apple MacBook Pro 14",
            priceProduct: 4000000,
            imageProducts: "https://http2.mlstatic.com/D_NQ_NP_732996-MLA74328205367_012024-O.webp",
            SKU: "lapappmacp140-001",
            yearProduct: "2021",
            descriptionProduct: "The MacBook Pro 14 is a powerful laptop with Apple's M1 Pro chip and a stunning Liquid Retina XDR display.",
            stockProduct: 0,
            idCategory: 2
        },
        characteristics: {
            modelProduct: "",
            characteristics: {
                display: "14.2-inch Liquid Retina XDR display",
                processor: "Apple M1 Pro chip",
                memory: "16GB RAM",
                storage: "1TB SSD",
                battery: "70Wh battery"
            },
            idBrand: 2
        }
    },
    {
        product: {
            nameProduct: "HP Spectre x360",
            priceProduct: 3000000,
            imageProducts: "https://http2.mlstatic.com/D_NQ_NP_935665-MLA72396574169_102023-O.webp",
            SKU: "laphpSpex360-001",
            yearProduct: "2022",
            descriptionProduct: "The HP Spectre x360 is a versatile convertible laptop with a sleek design and impressive performance.",
            stockProduct: 0,
            idCategory: 2
        },
        characteristics: {
            modelProduct: "",
            characteristics: {
                display: "13.5-inch OLED display",
                processor: "Intel Core i7 processor",
                memory: "16GB RAM",
                storage: "1TB SSD",
                battery: "66Wh battery"
            },
            idBrand: 20
        }
    },
    {
        product: {
            nameProduct: "Lenovo ThinkPad X1 Carbon",
            priceProduct: 5000000,
            imageProducts: "https://www.smartdeal.cl/wp-content/uploads/2022/06/m15r6.jpg",
            SKU: "laplenthix1car-001",
            yearProduct: "2022",
            descriptionProduct: "The Lenovo ThinkPad X1 Carbon is a lightweight and durable business laptop with impressive performance.",
            stockProduct: 0,
            idCategory: 2
        },
        characteristics: {
            modelProduct: "",
            characteristics: {
                display: "14-inch 4K UHD display",
                processor: "Intel Core i7 processor",
                memory: "16GB RAM",
                storage: "1TB SSD",
                battery: "57Wh battery"
            },
            idBrand: 16
        }
    },
    {
        product: {
            nameProduct: "Asus ROG Zephyrus G14",
            priceProduct: 2740000,
            imageProducts: "https://http2.mlstatic.com/D_NQ_NP_927362-MLA52990553670_122022-O.webp",
            SKU: "lapasurogzepg14-001",
            yearProduct: "2021",
            descriptionProduct: "The Asus ROG Zephyrus G14 is a powerful gaming laptop with a compact design and high-performance hardware.",
            stockProduct: 0,
            idCategory: 2
        },
        characteristics: {
            modelProduct: "",
            characteristics: {
                display: "14-inch QHD display",
                processor: "AMD Ryzen 9 processor",
                memory: "16GB RAM",
                storage: "1TB SSD",
                battery: "76Wh battery"
            },
            idBrand: 9
        }
    },
    {
        product: {
            nameProduct: "Microsoft Surface Laptop 4",
            priceProduct: 1700000,
            imageProducts: "https://http2.mlstatic.com/D_NQ_NP_955681-MLA54985741718_052023-O.webp",
            SKU: "lapmicsurlap4-001",
            yearProduct: "2021",
            descriptionProduct: "The Microsoft Surface Laptop 4 is a sleek and powerful laptop with a premium design and smooth performance.",
            stockProduct: 0,
            idCategory: 2
        },
        characteristics: {
            modelProduct: "",
            characteristics: {
                display: "13.5-inch PixelSense display",
                processor: "Intel Core i7 processor",
                memory: "16GB RAM",
                storage: "512GB SSD",
                battery: "49Wh battery"
            },
            idBrand: 21
        }
    },
    {
        product: {
            nameProduct: "Acer Swift 5",
            priceProduct: 3210000,
            imageProducts: "https://http2.mlstatic.com/D_NQ_NP_969653-MLA71828485655_092023-O.webp",
            SKU: "lapaceswi5-001",
            yearProduct: "2022",
            descriptionProduct: "The Acer Swift 5 is an ultra-lightweight laptop with a sleek design and long-lasting battery life.",
            stockProduct: 0,
            idCategory: 2
        },
        characteristics: {
            modelProduct: "",
            characteristics: {
                display: "14-inch Full HD display",
                processor: "Intel Core i7 processor",
                memory: "16GB RAM",
                storage: "1TB SSD",
                battery: "56Wh battery"
            },
            idBrand: 22
        }
    },
    {
        product: {
            nameProduct: "Razer Blade 15",
            priceProduct: 4200000,
            imageProducts: "https://http2.mlstatic.com/D_NQ_NP_935883-MLA70179141807_062023-O.webp",
            SKU: "laprazbla15-001",
            yearProduct: "2022",
            descriptionProduct: "The Razer Blade 15 is a high-performance gaming laptop with a sleek design and powerful hardware.",
            stockProduct: 0,
            idCategory: 2
        },
        characteristics: {
            modelProduct: "",
            characteristics: {
                display: "15.6-inch QHD display",
                processor: "Intel Core i7 processor",
                memory: "16GB RAM",
                storage: "1TB SSD",
                battery: "80Wh battery"
            },
            idBrand: 23
        }
    },
    {
        product: {
            nameProduct: "Alienware m15 R6",
            priceProduct: 3760000,
            imageProducts: "https://www.reuse.cl/cdn/shop/files/1_bf0acb8f-5421-4a3e-ba7b-8044c32392e6_700x700.png",
            SKU: "lapalin15r6-001",
            yearProduct: "2022",
            descriptionProduct: "The Alienware m15 R6 is a powerful gaming laptop with a futuristic design and top-notch performance.",
            stockProduct: 0,
            idCategory: 2
        },
        characteristics: {
            modelProduct: "",
            characteristics: {
                display: "15.6-inch Full HD display",
                processor: "Intel Core i7 processor",
                memory: "16GB RAM",
                storage: "1TB SSD",
                battery: "86Wh battery"
            },
            idBrand: 24
        }
    },
    {
        product: {
            nameProduct: "MSI Prestige 14 Evo",
            priceProduct: 4540000,
            imageProducts: "https://http2.mlstatic.com/D_NQ_NP_692191-MLA46517834216_062021-O.webp",
            SKU: "lapmsipres14-001",
            yearProduct: "2022",
            descriptionProduct: "The MSI Prestige 14 Evo is a sleek and powerful laptop with a focus on productivity and performance.",
            stockProduct: 0,
            idCategory: 2
        },
        characteristics: {
            modelProduct: "",
            characteristics: {
                display: "14-inch Full HD display",
                processor: "Intel Core i7 processor",
                memory: "16GB RAM",
                storage: "512GB SSD",
                battery: "52Wh battery"
            },
            idBrand: 25
        }
    },
    {
        product: {
            nameProduct: "LG Gram 17",
            priceProduct: 1200000,
            imageProducts: "https://http2.mlstatic.com/D_NQ_NP_656631-MLA75128733761_032024-O.webp",
            SKU: "laplggram17-001",
            yearProduct: "2022",
            descriptionProduct: "The LG Gram 17 is an ultra-lightweight and portable laptop with a large display and impressive battery life.",
            stockProduct: 0,
            idCategory: 2
        },
        characteristics: {
            modelProduct: "",
            characteristics: {
                display: "17-inch WQXGA display",
                processor: "Intel Core i7 processor",
                memory: "16GB RAM",
                storage: "1TB SSD",
                battery: "80Wh battery"
            },
            idBrand: 26
        }
    },
    {
        product: {
            nameProduct: "Lenovo Yoga 9i",
            priceProduct: 5000000,
            imageProducts: "https://http2.mlstatic.com/D_NQ_NP_662478-MLU72561914070_112023-O.webp",
            SKU: "laplenyog9i-001",
            yearProduct: "2022",
            descriptionProduct: "The Lenovo Yoga 9i is a versatile 2-in-1 laptop with a premium design and powerful performance.",
            stockProduct: 0,
            idCategory: 2
        },
        characteristics: {
            modelProduct: "",
            characteristics: {
                display: "14-inch 4K UHD display",
                processor: "Intel Core i7 processor",
                memory: "16GB RAM",
                storage: "1TB SSD"
            },
            idBrand: 16
        }
    },
    {
        product: {
            nameProduct: "Samsung Galaxy Book Pro 360",
            priceProduct: 3450000,
            imageProducts: "https://http2.mlstatic.com/D_NQ_NP_2X_669720-MLU73980600476_012024-F.webp",
            SKU: "lapsamgalboop360-001",
            yearProduct: "2022",
            descriptionProduct: "The Samsung Galaxy Book Pro 360 is a convertible laptop with a stunning AMOLED display and long-lasting battery.",
            stockProduct: 0,
            idCategory: 2
        },
        characteristics: {
            modelProduct: "",
            characteristics: {
                display: "13.3-inch AMOLED display",
                processor: "Intel Core i7 processor",
                memory: "16GB RAM",
                storage: "1TB SSD",
                battery: "63Wh battery"
            },
            idBrand: 1
        }
    },
    {
        product: {
            nameProduct: "Acer Predator Helios 300",
            priceProduct: 3450000,
            imageProducts: "https://http2.mlstatic.com/D_NQ_NP_887095-MLA49933868752_052022-O.webp",
            SKU: "lapaceprehel3000-001",
            yearProduct: "2021",
            descriptionProduct: "The Acer Predator Helios 300 is a powerful gaming laptop with a high-refresh-rate display and advanced cooling system.",
            stockProduct: 0,
            idCategory: 2
        },
        characteristics: {
            modelProduct: "",
            characteristics: {
                display: "15.6-inch Full HD display (144Hz)",
                processor: "Intel Core i7 processor",
                memory: "16GB RAM",
                storage: "512GB SSD",
                battery: "59Wh battery"
            },
            idBrand: 22
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
        for (let item of initialProducts) {
            if( typeof item.product.imageProducts === "string" ){
                item.product.imageProducts= [item.product.imageProducts]
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
