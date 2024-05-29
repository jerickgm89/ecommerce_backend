<!-- ## **Rutas BackEnd Products**
► [Crear un nuevo producto](#método-post) ► [Todos los productos](#método-get)
► [Usuario según id](#método-get-id)    ► [Modificar producto](#método-put)
► ["Borrar" producto](#método-delete)
► [Buscar producto por nombre](#método-delete) -->


# Ruta 1: /products/index
### Maneja productos
<details>
<summary>METODO POST</summary>

<a name="crear-nuevo-producto">


### Método POST
</a>

post/ products/index → Crear un nuevo producto
### Respuesta Exitosa (201 OK)
```json
{
  "newProduct": {
    "idProduct": 33,
    "nameProduct": "Nombre",
    "priceProduct": "99.99",
    "imageProducts": null,
    "SKU": "B0CFNX3PTT",
    "descriptionProduct": "Descripción muy importante sobre el producto",
    "yearProduct": 1990,
    "stockProduct": 10,
    "idReview": null,
    "idCategory": 1,
    "modifiedProd_at": "2024-05-18T05:39:07.476Z",
    "createdProd_at": "2024-05-18T05:39:07.476Z",
    "IdDiscount": null,
    "deletedProd_at": null
  },
  "newCharacteristics": {
    "idCharacteristicsProducts": 33,
    "idProduct": 33,
    "modelProduct": "Model A",
    "characteristics": {
      "size": "L",
      "color": "red"
    },
    "idBrand": 1,
    "modifiedCharacteristic_at": "2024-05-18T05:39:07.478Z",
    "createCharacteristic_at": "2024-05-18T05:39:07.478Z",
    "deleteCharacteristic_at": null
  }
}
```

<details>
<summary>JSON EJEMPLO POST</summary>

```json
 {
    "Products": {
        "nameProduct": "Nombre",
        "priceProduct": 99.99,
        "yearProduct": "1990",
        "descriptionProduct": "Descripción muy importante sobre el producto",
        "SKU": "B0CFNX3PTT",
        "stockProduct": 10,
        "idReview": null,
        "idCategory": 1,
        "IdDiscount": null
    },
    "Variants": {
        "modelProduct": "Model A",
        "characteristics": {
            "color": "red",
            "size": "L"
        },
        "idBrand": 1
    }
}
```
</details>
</details>
</details>

<!-- </details> -->
<details>

<a name="todos-los-productos"></a>

<summary>METODO GET</summary>

### Método GET
get /products/index → Trae todos los productos
### Respuesta Exitosa (200 OK)
```json

[
    {
        "idProduct": 1,
        "nameProduct": "Samsung Galaxy S21",
        "priceProduct": "759000.00",
        "yearProduct": 2021,
        "imageProducts": "https://http2.mlstatic.com/D_NQ_NP_908886-MLA53734668410_022023-O.webp",
        "descriptionProduct": "The Samsung Galaxy S21 is a flagship smartphone with a stunning display and powerful performance.",
        "SKU": "celsamS21-001",
        "stockProduct": 50,
        "idReview": null,
        "idCategory": 1,
        "IdDiscount": null,
        "createdProd_at": "2024-05-16T08:37:16.055Z",
        "modifiedProd_at": "2024-05-16T08:37:16.055Z",
        "deletedProd_at": null,
        "characteristicsProduct": {
        "modelProduct": "Samsung Galaxy S21",
        "characteristics": {
            "memory": "8GB RAM",
            "battery": "4000mAh battery",
            "display": "6.2-inch Dynamic AMOLED display",
            "storage": "128GB storage",
            "processor": "Exynos 2100 processor"
        },
        "idBrand": 1
        }
    }
]

```
</details>
</details>

<details>

<summary>METODO GET ID</summary>
</a>

### Método GET ID
get /products/index/:id → Busca producto según id
### Respuesta Exitosa (200 OK)
petición a → products/index/3
```json
{
  "idProduct": 3,
  "nameProduct": "Google Pixel 5",
  "priceProduct": "10000.00",
  "yearProduct": 2020,
  "imageProducts": "https://http2.mlstatic.com/D_NQ_NP_966068-MLA50145216014_052022-O.webp",
  "descriptionProduct": "The Google Pixel 5 is a premium Android smartphone known for its exceptional camera performance and clean software experience.",
  "SKU": "celgoopix5-001",
  "stockProduct": 50,
  "idReview": null,
  "idCategory": 1,
  "IdDiscount": null,
  "createdProd_at": "2024-05-16T23:59:22.718Z",
  "modifiedProd_at": "2024-05-16T23:59:22.718Z",
  "deletedProd_at": null,
  "characteristicsProduct": {
    "idCharacteristicsProducts": 3,
    "modelProduct": "Google Pixel 5",
    "characteristics": {
      "memory": "8GB RAM",
      "battery": "4080mAh battery",
      "display": "6.0-inch OLED display",
      "storage": "128GB storage",
      "processor": "Snapdragon 765G processor"
    },
    "idBrand": 3
  }
}

```
</details>
</details>

<details>

<a name="usuario-segun-id"></a>

<summary>METODO PATCH</summary>


### Método PATCH
get /products/index/:id → Modificar un producto
### Respuesta Exitosa (200 OK)

```json
{
  "product": {
    "idProduct": 13,
    "nameProduct": "Nuevo Nombre",
    "priceProduct": 199.99,
    "yearProduct": "1990",
    "imageProducts": "image.jpg",
    "descriptionProduct": "Descripción muy importante sobre el producto",
    "SKU": "B07F22VLWY",
    "stockProduct": 25,
    "idReview": null,
    "idCategory": 2,
    "IdDiscount": null,
    "createdProd_at": "2024-05-16T08:37:16.095Z",
    "modifiedProd_at": "2024-05-16T16:13:27.155Z",
    "deletedProd_at": null
  },
  "characteristicsRecord": {
    "idCharacteristicsProducts": 13,
    "idProduct": 13,
    "modelProduct": "Updated Model B",
    "characteristics": {
      "color": "blue",
      "size": "M"
    },
    "idBrand": 1,
    "createCharacteristic_at": "2024-05-16T08:37:16.097Z",
    "modifiedCharacteristic_at": "2024-05-16T16:13:27.164Z",
    "deleteCharacteristic_at": null
  }
}
```

<details>
<summary>JSON EJEMPLO PATCH</summary>
  
```json
{
    "Products": {
        "nameProduct": "Nuevo Nombre",
        "priceProduct": 199.99,
        "imageProducts": "image.jpg",
        "yearProduct": "1990",
        "descriptionProduct": "Descripción muy importante sobre el producto",
        "SKU": "B07F22VLWY",
        "stockProduct": 25,
        "idReview": null,
        "idCategory": 2,
        "IdDiscount": null
    },
    "Variants": {
        "modelProduct": "Updated Model B",
        "characteristics": {
            "color": "blue",
            "size": "M"
        },
        "idBrand": 1
    }
}
```
</details>
</details>

<details>
<summary>METODO DELETE</summary>

### Método DELETE
delete /products/index/:id → "Eliminar" producto (paranoid: true)
### Respuesta Exitosa (200 OK)
```json
true
```

</details>
</br>

# Ruta 2: /products/category
### Maneja categorías de productos
<details>
<summary>METODO POST</summary>

<a name="crear-nuevo-producto">


### Método POST 
</a>

post/ products/category → Crear un nueva categoría
### Respuesta Exitosa (201 OK)
```json
{
  "idCategory": 3,
  "nameCategory": "Electronics",
  "descriptionCategory": "Breve descripcion de la categoria",
  "modifiedCategory_at": "2024-05-16T17:28:23.909Z",
  "createdCategory_at": "2024-05-16T17:28:23.909Z",
  "deletedCategory_at": null
}
```

<details>
<summary>JSON EJEMPLO POST</summary>
  
```json
{
    "nameCategory": "Electronics",
    "descriptionCategory": "Breve descripcion de la categoria"
}
```
</details>

</details>
<details>

<a name="todos-los-productos"></a>

<summary>METODO GET</summary>

### Método GET
get /products/category → Trae todas las categorías
### Respuesta Exitosa (200 OK)
```json

[
    {
        "idCategory": 1,
        "nameCategory": "Celulares",
        "descriptionCategory": "Breve descripcion de la categoria",
        "createdCategory_at": "2024-05-16T08:37:16.042Z",
        "modifiedCategory_at": "2024-05-16T08:37:16.042Z",
        "deletedCategory_at": null
    }
]

```
</details>
<details>
<a name="todos-los-productos"></a>

<summary>METODO GET NAME</summary>

### Método GET NAME
get /products/category/name/:name → Busca categoría según nombre exacto (sensible a mayúsculas)
### Respuesta Exitosa (200 OK)
petición a → /products/category/name/Electronics
```json
{
  "idCategory": 3,
  "nameCategory": "Electronics",
  "descriptionCategory": "Breve descripcion de la categoria",
  "createdCategory_at": "2024-05-16T17:28:23.909Z",
  "modifiedCategory_at": "2024-05-16T17:28:23.909Z",
  "deletedCategory_at": null
}

```
</details>

<details>
<summary>METODO PUT</summary>

### Método PUT
get /products/category/:id → Modificar un categoría

petición a → products/category/3
### Respuesta Exitosa (200 OK)
```json
{
    "idCategory": 3,
    "nameCategory": "Deporte",
    "descriptionCategory": "Updated description de la  categoria ",
    "createdCategory_at": "2024-05-16T17:28:23.909Z",
    "modifiedCategory_at": "2024-05-16T17:30:50.766Z",
    "deletedCategory_at": null
}
```

<details>
<summary>JSON EJEMPLO PUT</summary>
  
```json
{
    "nameCategory": "Deporte",
    "descriptionCategory": "Updated description de la  categoria "
}
```

</details>
    </details>

<details>

<summary>METODO DELETE</summary>


### Método DELETE

delete /products/category/:id → "Eliminar" categoría (paranoid: true)
### Respuesta Exitosa (200 OK)
```json
true
```

</details>

# Ruta 3: /products/brands
### Maneja marcas de productos
<details>
<summary>METODO POST</summary>
<!-- 
<a name="crear-nueva-categoria"> -->


### Método POST
</a>

post/ products/brands → Crear un nueva marca
### Respuesta Exitosa (201 OK)

```json
{
  "idBrand": 27,
  "nameBrand": "Editar Nombre",
  "modifiedBrand_at": "2024-05-16T17:02:44.157Z",
  "createBrand_at": "2024-05-16T17:02:44.157Z",
  "deleteBrand_at": null

}
```


<details>
<summary>JSON EJEMPLO POST</summary>
  
```json
{
    "nameBrand": "Editar Nombre"
}
```
</details>
    </details>

<!-- </details> -->
<details>

<!-- <a name="todos-los-productos"></a> -->

<summary>METODO GET</summary>

### Método GET
get /products/brands → Trae todas las marcas
### Respuesta Exitosa (200 OK)
```json

[
    {
        "idBrand": 1,
        "nameBrand": "Samsung",
        "createBrand_at": "2024-05-16T08:37:16.049Z",
        "modifiedBrand_at": "2024-05-16T08:37:16.049Z",
        "deleteBrand_at": null
    }
]

```
</details>
<details>
<a name="todos-los-productos"></a>

<summary>METODO GET NAME</summary>

### Método GET NAME
get /products/brands/name/:name → Busca marca según nombre exacto (sensible a mayúsculas)
### Respuesta Exitosa (200 OK)
petición a → products/brands/name/Samsung
```json
{
    "idBrand": 1,
    "nameBrand": "Samsung",
    "createBrand_at": "2024-05-16T08:37:16.049Z",
    "modifiedBrand_at": "2024-05-16T08:37:16.049Z",
    "deleteBrand_at": null
}

```

</details>
<details>

<summary>METODO PUT</summary>

### Método PUT
get /products/brands/:id → Modificar una marca según id

petición a → products/brands/1
### Respuesta Exitosa (200 OK)
```json
{
    "idBrand": 1,
    "nameBrand": "Nuevo Nombre de marca",
    "createBrand_at": "2024-05-16T08:37:16.049Z",
    "modifiedBrand_at": "2024-05-16T17:15:09.941Z",
    "deleteBrand_at": null
}
```

<details>
<summary>JSON EJEMPLO PUT</summary>
  
```json
{
    "nameBrand": "Nuevo Nombre de marca"
}
```

</details>
</details>

<details>

<summary>METODO DELETE</summary>


### Método DELETE

get /products/brands/:id → "Eliminar" marca (paranoid: true)
### Respuesta Exitosa (200 OK)
```json
true
```

</details>
</br>

# Ruta 4: /filterproducts
### Maneja filtros de productos
‣ Ordena productos según año, precio o nombre del producto de forma ascendente o descendente (orderBy, orderDirection)
</br>
‣ Filtra por precio (exacto), año, nombre e intervalo de precios (priceMin, priceMax)
<details>

<summary>METODO GET FILTROS Y ORDENAMIENTOS</summary>

### FILTROS Y ORDENAMIENTOS
get /filterproducts → 
</br>
Filtra productos según price (exacto), year, name (inexacto), priceMin, priceMax, category, brand
Ordena productos según priceProduct, yearProduct, nameProduct
Petición a → 
</br>
/filterproducts?name=acer&orderBy=nameProduct&orderDirection=ASC

### Respuesta Exitosa (200 OK)
```json

{
    "count": 2,
  "rows": [
      {
          "idProduct": 32,
      "nameProduct": "Acer Predator Helios 300",
      "priceProduct": "3450000.00",
      "yearProduct": 2021,
      "imageProducts": "https://http2.mlstatic.com/D_NQ_NP_887095-MLA49933868752_052022-O.webp",
      "descriptionProduct": "The Acer Predator Helios 300 is a powerful gaming laptop with a high-refresh-rate display and advanced cooling system.",
      "SKU": "lapaceprehel3000-001",
      "stockProduct": 0,
      "idReview": null,
      "idCategory": 2,
      "IdDiscount": null,
      "createdProd_at": "2024-05-16T08:37:16.140Z",
      "modifiedProd_at": "2024-05-16T08:37:16.140Z",
      "deletedProd_at": null
    },
    {
        "idProduct": 25,
      "nameProduct": "Acer Swift 5",
      "priceProduct": "3210000.00",
      "yearProduct": 2022,
      "imageProducts": "https://http2.mlstatic.com/D_NQ_NP_969653-MLA71828485655_092023-O.webp",
      "descriptionProduct": "The Acer Swift 5 is an ultra-lightweight laptop with a sleek design and long-lasting battery life.",
      "SKU": "lapaceswi5-001",
      "stockProduct": 0,
      "idReview": null,
      "idCategory": 2,
      "IdDiscount": null,
      "createdProd_at": "2024-05-16T08:37:16.127Z",
      "modifiedProd_at": "2024-05-16T08:37:16.127Z",
      "deletedProd_at": null
    }
  ]
}


```
### INCLUIR PAGINADO
Petición a → 
</br>
filterproducts?brand=1&category=1&orderBy=yearProduct&orderDirection=DESC&page=1&limit=1

### Respuesta Exitosa (200 OK)
```json
{
  "count": 2,
  "rows": [
    {
      "idProduct": 1,
      "nameProduct": "Samsung Galaxy S21",
      "priceProduct": "759000.00",
      "yearProduct": 2021,
      "imageProducts": "https://http2.mlstatic.com/D_NQ_NP_908886-MLA53734668410_022023-O.webp",
      "descriptionProduct": "The Samsung Galaxy S21 is a flagship smartphone with a stunning display and powerful performance.",
      "SKU": "celsamS21-001",
      "stockProduct": 50,
      "idReview": null,
      "idCategory": 1,
      "IdDiscount": null,
      "createdProd_at": "2024-05-16T18:19:18.007Z",
      "modifiedProd_at": "2024-05-16T18:19:18.007Z",
      "deletedProd_at": null
    }
  ]
}
... CAMBIAR DE PÁGINA
```


</details>
</br>

<!-- ## **Rutas BackEnd Users**
► [Crear un nuevo usuario](#método-post) ► [Todos los usuarios](#método-get)
► [Usuario según id](#método-get-id)    ► [Modificar usuarios](#método-put)
► ["Borrar" usuario](#método-delete) -->


# Ruta 5: /users 
<details>
<summary>METODO POST</summary>

### Método POST
post/ users → Busca o crea un nuevo usuario o admin
### Respuesta Exitosa (201 OK)
Entrega, si existe, token perteneciente al usuario. Si no, le asigna un token
</br>

```
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbFVzZXIiOiJjYW1pLmlnc2FAZ21haWwuY29tIiwiaWF0IjoxNzE2MTc1NTQ5LCJleHAiOjE3MTYzMTk1NDl9.R9w1UbRQYSXxVYrnT8vOYtnhoXGmfwupPUL8evNqzfw"
```

<details>
<summary>JSON EJEMPLO POST</summary>

```json 
{
  "email": "cami.igsa@gmail.com", //allowNull: false
  "email_verified": true, 
  "family_name": "S",
  "given_name": "Cami",
  "picture": "https://lh3.googleusercontent.com/a/ACg8ocKPC6GOWR5AEG6bHbGzjPlzCu9e5TfoaYhk3_I6eNVXOhnZPCq-=s96-c"
}
```
</details>

</details>
<details>
<summary>METODO GET</summary>

### Método GET
get /users → Trae todos los usuarios
### Respuesta Exitosa (200 OK)
```json

[
  {
    "idUser": 1,
    "DNI": null,
    "nameUser": null,
    "lastNameUser": null,
    "emailUser": "cami@hotmail.com",
    "pictureUser": null,
    "numberMobileUser": null,
    "email_verified": null,
    "isAdmin": false,
    "tokenAuth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbFVzZXIiOiJjYW1pQGhvdG1haWwuY29tIiwiaWF0IjoxNzE2MTc1NTIwLCJleHAiOjE3MTYzMTk1MjB9.51cWo4atThQ5fQuGwcRp3PdGyfMCD2uxAwsK_Guwv_o",
    "activeUser": true,
    "createdUser_at": "2024-05-20T03:25:20.946Z",
    "modifiedUser_at": "2024-05-20T03:25:20.954Z",
    "deletedUser_at": null
  },
  ... continúa
]

```
</details>
<details>
<summary>METODO GET ID</summary>

### Método GET ID
get /users/:id → Busca usuario según id
### Respuesta Exitosa (200 OK)
```json

{
  "idUser": 1,
  "DNI": null,
  "nameUser": null,
  "lastNameUser": null,
  "emailUser": "cami@hotmail.com",
  "pictureUser": null,
  "numberMobileUser": null,
  "email_verified": null,
  "isAdmin": false,
  "tokenAuth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbFVzZXIiOiJjYW1pQGhvdG1haWwuY29tIiwiaWF0IjoxNzE2MTc1NTIwLCJleHAiOjE3MTYzMTk1MjB9.51cWo4atThQ5fQuGwcRp3PdGyfMCD2uxAwsK_Guwv_o",
  "activeUser": true,
  "createdUser_at": "2024-05-20T03:25:20.946Z",
  "modifiedUser_at": "2024-05-20T03:25:20.954Z",
  "deletedUser_at": null
}

```
</details>
<details>
<summary>METODO PUT</summary>

### Método PUT
get /users/:id → Modificar un usuario o admin según id
### Respuesta Exitosa (200 OK)
```json
{
  "idUser": 1,
  "DNI": null,
  "nameUser": "Admin",
  "lastNameUser": "Garcia",
  "emailUser": "hola89@gmail.com",
  "pictureUser": "https://lh3.googleusercontent.com/a/ACg8ocKPC6GOWR5AEG6bHbaYhk3_I6eNVXOhnZPCq-=s96-c",
  "numberMobileUser": null,
  "email_verified": true,
  "isAdmin": true,
  "tokenAuth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbFVzZXIiOiJjYW1pQGhvdG1haWwuY29tIiwiaWF0IjoxNzE2MTc1NTIwLCJleHAiOjE3MTYzMTk1MjB9.51cWo4atThQ5fQuGwcRp3PdGyfMCD2uxAwsK_Guwv_o",
  "activeUser": true,
  "createdUser_at": "2024-05-16T08:37:51.731Z",
  "modifiedUser_at": "2024-05-16T09:30:41.560Z",
  "deletedUser_at": null
}
```

<details>
<summary>JSON EJEMPLO PUT</summary>
  
```json
{
    "nameUser": "Admin",
    "isAdmin": true
}
```
</details>
</details>
<details>
<summary>METODO DELETE</summary>

### Método DELETE
delete /users/:id → Eliminar user o admin según id (paranoid: true)
### Respuesta Exitosa (200 OK)
```json
true
```
</details>
<details>
<summary>METODO GET USER BY EMAIL</summary>

### Método GET
get /users/verify/:emailUser → Envía email para recibir token del usuario
### Respuesta Exitosa (200 OK)
```
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbFVzZXIiOiJjYW1pd2FudGFuQGhvdG1haWwuY29tIiwiaWF0IjoxNzE2MDk0NjIwLCJleHAiOjE3MTYwOTgyMjB9.Ky_mhAPMbr6CxYONaJKfai9DxZw2-_0raBgCVJWlwkg"
```

</details>

<details>
<summary>METODO GET USER INFO BY TOKEN</summary>

### Método GET
get /users/auth/token → Envía token por header para recibir información del usuario
### Respuesta Exitosa (200 OK)
```json
{
  "idUser": 2,
  "DNI": null,
  "nameUser": null,
  "lastNameUser": null,
  "emailUser": "camiwantan@hotmail.com",
  "pictureUser": null,
  "numberMobileUser": null,
  "email_verified": null,
  "isAdmin": false,
  "tokenAuth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbFVzZXIiOiJjYW1pd2FudGFuQGhvdG1haWwuY29tIiwiaWF0IjoxNzE2MTc1NTQwLCJleHAiOjE3MTYzMTk1NDB9.A8lWG0l82nIpXqQUURfXaXVKJnhK4iu24EWY5Z1h2ac",
  "activeUser": true,
  "createdUser_at": "2024-05-20T03:25:40.729Z",
  "modifiedUser_at": "2024-05-20T03:25:40.739Z",
  "deletedUser_at": null
}
```

</details>

# Ruta 6: /products/review
Maneja Puntuación de productos
<details>
<summary>METODO POST</summary>
<a name="crear-nueva-review"></a>
### Método POST
post /products/review → Crear una nueva review

### Respuesta Exitosa (201 OK)
```json
{
  "idReview": 3,
  "descriptionReview": "Excelente producto, muy satisfecho con mi compra.",
  "ratingReview": 5,
  "createdReview_at": "2024-05-16T17:28:23.909Z",
  "modifiedReview_at": "2024-05-16T17:28:23.909Z",
  "deletedReview_at": null,
  "idProduct": 1,
  "idUser": 1
}
```
<details>
<summary>JSON EJEMPLO POST</summary>
```json
{
  "descriptionReview": "Excelente producto, muy satisfecho con mi compra.",
  "ratingReview": 5,
  "idProduct": 1,
  "idUser": 1
}
  ```
</details>
</details>
<details>
<summary>METODO GET</summary>
<a name="todas-las-revisiones"></a>
### Método GET
get /products/review → Trae todas las revisiones

### Respuesta Exitosa (200 OK)
```json
[
  {
    "idReview": 1,
    "descriptionReview": "Buen producto, cumple con lo esperado.",
    "ratingReview": 4,
    "createdReview_at": "2024-05-16T08:37:16.040Z",
    "modifiedReview_at": "2024-05-16T08:37:16.040Z",
    "deletedReview_at": null,
    "idProduct": 1,
    "idUser": 2,
    "user": {
      "idUser": 2,
      "nameUser": "Jane Smith"
    },
    "product": {
      "idProduct": 1,
      "nameProduct": "Samsung Galaxy S21"
    }
  },
  {
    "idReview": 2,
    "descriptionReview": "No estoy satisfecho, el producto tiene varios problemas.",
    "ratingReview": 2,
    "createdReview_at": "2024-05-16T08:37:16.040Z",
    "modifiedReview_at": "2024-05-16T08:37:16.040Z",
    "deletedReview_at": null,
    "idProduct": 2,
    "idUser": 3,
    "user": {
      "idUser": 3,
      "nameUser": "John Doe"
    },
    "product": {
      "idProduct": 2,
      "nameProduct": "MacBook Pro"
    }
  }
]
```
</details>
<details>
<summary>METODO GET ID</summary>
<a name="revision-segun-id"></a>
### Método GET ID
get /products/review/
→ Busca revisión según id

### Respuesta Exitosa (200 OK)
Petición a → products/review/1

```json
{
  "idReview": 1,
  "descriptionReview": "Buen producto, cumple con lo esperado.",
  "ratingReview": 4,
  "createdReview_at": "2024-05-16T08:37:16.040Z",
  "modifiedReview_at": "2024-05-16T08:37:16.040Z",
  "deletedReview_at": null,
  "idProduct": 1,
  "idUser": 2,
  "user": {
    "idUser": 2,
    "nameUser": "Jane Smith"
  },
  "product": {
    "idProduct": 1,
    "nameProduct": "Samsung Galaxy S21"
  }
}
```
</details>
<details>
<summary>METODO PATCH</summary>
### Método PUT
patch /products/review/
→ Modificar una review

### Respuesta Exitosa (200 OK)
```json
{
  "idReview": 1,
  "descriptionReview": "Producto decente, pero esperaba más.",
  "ratingReview": 3,
  "createdReview_at": "2024-05-16T08:37:16.040Z",
  "modifiedReview_at": "2024-05-16T16:37:12.569Z",
  "deletedReview_at": null,
  "idProduct": 1,
  "idUser": 2
}
```
<details>
<summary>JSON EJEMPLO PATCH</summary>
```json
{
  "descriptionReview": "Producto decente, pero esperaba más.",
  "ratingReview": 3
}
```
</details>
</details>
<details>
<summary>METODO DELETE</summary>
 Método DELETE
delete /products/review/
→ "Eliminar" review (paranoid: true)

### Respuesta Exitosa (200 OK)
```json
true
```
</details>
 Método DELETE
 <details>
   
 <summary>Metodo deactive/Active</summary>
patch /products/review/deactivate/
→ Desactivar una revisión (paranoid: true)
 </details>

### Respuesta Exitosa (200 OK)
```json
{
  "idReview": 1,
  "activeReview": false,
  "modifiedReview_at": "2024-05-16T16:37:12.569Z"
}
```
<details>
<summary>JSON EJEMPLO PATCH</summary>
```json
{
  "activeReview": false
}
  ```
</details>

### Método DELETE
<details>
  
patch /products/review/restore/
→ Restaurar una review (paranoid: true)

### Respuesta Exitosa (200 OK)
```json
{
  "idReview": 1,
  "activeReview": true,
  "modifiedReview_at": "2024-05-16T16:37:12.569Z"
}
```
</details>
<details>
<summary>JSON EJEMPLO PATCH</summary>
```json
{
  "activeReview": true
}
```
</details>
</details>
