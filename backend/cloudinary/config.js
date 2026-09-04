const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const storage = multer.memoryStorage()



cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY
})

const multerStore = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024
    }
})


module.exports = { multerStore, cloudinary }