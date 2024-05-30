const cloudinary = require('cloudinary')


const imageCloudinaryUploader = async ( fileImages, image ) =>{
    const arrayImagesProducts = []
    try {
        if( !!fileImages || image ){
            if( typeof image === "string" ){
                // console.log("images -> ", image)
                const result = await cloudinary.uploader.upload(image)
                arrayImagesProducts.push(result.secure_url)
            }
            // if( fileImages?.path){
            //     // console.log("FILE-> ", fileImages)
            //     const result = await cloudinary.uploader.upload(fileImages.path)
            //     arrayImagesProducts.push(result.secure_url)
            // }
            if( Array.isArray(fileImages) ){
                // console.log("FILES IMAGES -> ", fileImages)
                const uploadPromises = fileImages.map(async ({ path }) => {
                    const result = await cloudinary.uploader.upload(path);
                    return result.secure_url;
                });

                const uploadedUrls = await Promise.all(uploadPromises);
                arrayImagesProducts.push(...uploadedUrls);
            }
        }
    } catch (error) {
        console.log("ERROR    ->", {error: error.message})   
    }
    // console.log("ARRAY FINAL -> ", arrayImagesProducts)
    // return Array.isArray(arrayImagesProducts) ? arrayImagesProducts : arrayImagesProducts
    
    return arrayImagesProducts
}

module.exports = {
    imageCloudinaryUploader
}