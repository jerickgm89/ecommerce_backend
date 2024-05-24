const cloudinary = require('cloudinary')


const imageCloudinaryUploader = async ( fileImages, image ) =>{
    const arrayImagesProducts = []
    // console.log("FILES IMAGES -> ", fileImages, "images -> ", image)
    try {
        if( !!fileImages || image ){
            if( typeof image === "string" ){
                const result = await cloudinary.uploader.upload(image)
                arrayImagesProducts.push(result.secure_url)
            }
            if( fileImages?.path){
                const result = await cloudinary.uploader.upload(fileImages.path)
                arrayImagesProducts.push(result.secure_url)
            }
            if( Array.isArray(fileImages) ){
                fileImages.map( async ( file ) => {
                    const result = await cloudinary.uploader.upload(file.path);
                    arrayImagesProducts.push(result.secure_url);
                })
            }
        }
    } catch (error) {
        console.log("ERROR    ->", {error: error.message})   
    }
    return Array.isArray(arrayImagesProducts) ? arrayImagesProducts : arrayImagesProducts
}

module.exports = {
    imageCloudinaryUploader
}