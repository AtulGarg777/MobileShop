const { productModel } = require('../models/Product');
const { multerStore, cloudinary } = require('../cloudinary/config')
const router = require('express').Router()

router.post('/addProduct',
    multerStore.fields([{ name: 'mainImage', maxCount: 1 }, { name: 'images', maxCount: 5 }])
    , async (req, res) => {

        try {
            let { title, description, price, brand, stock, category } = req.body;
            let { mainImage, images } = req.files;

            if (!mainImage[0]) {
                res.json({ message: 'files doesn\'t exist', success: false })
            }

            //convert image buffer to base64
            let fileBase64 = mainImage[0].buffer.toString('base64');
            let fileUri = `data:${mainImage[0].mimetype};base64,${fileBase64}`;

            //upload main image to cloudinary
            let addFile = await cloudinary.uploader.upload(fileUri);



            //uploading product images to cloudinary
            let imagesUpload = await Promise.all(images.map(async (img) => {
                let fileBase64 = img.buffer.toString('base64');
                let fileUri = `data:${img.mimetype};base64,${fileBase64}`

                return await cloudinary.uploader.upload(fileUri);
            }))

            if (!imagesUpload) {
                res.json({ message: 'images not exist', success: false })
            }

            let newProduct = new productModel({
                name: title,
                brand: brand,
                category: category,
                price: price,
                description: description,
                mainImage: {
                    secure_url: addFile.secure_url,
                    public_id: addFile.public_id
                },
                images: imagesUpload.map((obj, ind) => {
                    return {
                        secure_url: obj.secure_url,
                        public_id: obj.public_id
                    }

                }),
                // features: {
                //     processor: String,
                //     ram: String,
                //     storage: String,
                //     display: String,
                //     battery: String,
                //     operatingSystem: String,
                //     connectivity: [String],
                //     biometrics: String
                // },
                // colors: [String],
                // rating: { type: Number, default: 0 },
                // reviewCount: { type: Number, default: 0 },
                stock: stock,
                // isFeatured: { type: Boolean, default: false }
            })

            newProduct.images.unshift({
                secure_url: addFile.secure_url,
                public_id: addFile.public_id
            })

            // let validateError=newProduct.valida

            await newProduct.save();

            res.status(200).json({ message: "product added", addFile: addFile, success: true })
        }
        catch (err) {
            console.log(err);

            res.status(500).json({ message: 'An Error Occured', success: false, err })
        }
    })

module.exports = router


// {
//       fieldname: 'mainImage',
//       originalname: 'Screenshot 2026-07-27 204145.png',
//       encoding: '7bit',
//       mimetype: 'image/png',
//       buffer: <Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 05 6e 00 00 02 af 08 06 00 00 00 fa 27 56 81 00 00 00 01 73 52 47 42 00 ae ce 1c e9 00 00 00 04 ... 72030 more bytes>,
//       size: 72080
//     }


// features

// colors
// rating
// reviewCount
// isFeatured





// cloudinary uploaded metadata
// {
//   asset_id: 'd63228e97679e6afdb9fbd733a717b5c',
//   public_id: 'f63hgtpuvnug9skxxgl4',
//   version: 1788179976,
//   version_id: '0b57f4822a60c1fae44246a7d2c71467',
//   signature: 'efcf4c288dff1db3c21c4816bd93de69a75ac5df',
//   width: 612,
//   height: 826,
//   format: 'png',
//   resource_type: 'image',
//   created_at: '2026-08-31T12:39:36Z',
//   tags: [],
//   bytes: 34773,
//   type: 'upload',
//   etag: '1325b901626b6cc5d6614e6fd0b5950d',
//   placeholder: false,
//   url: 'http://res.cloudinary.com/dxnrjccxm/image/upload/v1788179976/f63hgtpuvnug9skxxgl4.png',
//   secure_url: 'https://res.cloudinary.com/dxnrjccxm/image/upload/v1788179976/f63hgtpuvnug9skxxgl4.png',
//   asset_folder: '',
//   display_name: 'f63hgtpuvnug9skxxgl4',
//   api_key: '785883495714686'
// }