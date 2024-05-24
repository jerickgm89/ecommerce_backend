const cloudinary = require('cloudinary')


const imageCloudinaryUploader = async ( fileImages, image ) =>{
    const arrayImagesProducts = []
    console.log("FILES:   ", typeof fileImages === "string")
    
    try {
        if( !!fileImages || image ){
            if( typeof image === "string" ){
                const result = await cloudinary.uploader.upload(image)
                arrayImagesProducts.push(result.secure_url)
            }
            else {
                    
                    for (const file in fileImages) {
                        console.log("fileImages:   ",file.path)
                        const result = await cloudinary.uploader.upload(file.path);
                        arrayImagesProducts.push(result.secure_url);
                    }
            }
        }
    } catch (error) {
        console.log("ERROR    ->", {error: error.message})   
    }
    return Array.isArray(arrayImagesProducts) ? arrayImagesProducts : [arrayImagesProducts]
}

module.exports = {
    imageCloudinaryUploader
}