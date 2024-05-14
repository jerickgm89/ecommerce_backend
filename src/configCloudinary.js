require('dotenv').config();

const {CloudinaryStorage} = require('multer-storage-cloudinary')
const cloudinary = require('cloudinary').v2;
const multer = require('multer')

const {CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME} = process.env;


cloudinary.config({ 
  cloud_name: CLOUDINARY_CLOUD_NAME, 
  api_key: CLOUDINARY_API_KEY, 
  api_secret: CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads',
    allowed_formats: ['jpg', 'png'],
    resource_type: 'auto'
  }
})
const upload = multer({storage: storage})

module.exports = upload;