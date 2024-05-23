const cloudinary = require('cloudinary')


const imageCloudinaryUploader = async ( fileImages, imageProducts ) =>{
    const arrayImagesProducts = []

    if( !!fileImages || imageProducts ){
        if( typeof imageProducts === "string" ){
            const result = await cloudinary.uploader.upload(imageProducts)
            arrayImagesProducts.push(result.secure_url)
        }
        else {
            for (const file of fileImages) {
                const result = await cloudinary.uploader.upload(file.path);
                arrayImagesProducts.push(result.secure_url);
            }
        }
    }
    return Array.isArray(arrayImagesProducts) ? arrayImagesProducts : [arrayImagesProducts]
}

module.exports = {
    imageCloudinaryUploader
}