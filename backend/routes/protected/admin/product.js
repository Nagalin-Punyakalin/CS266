const router = require('express').Router()
const multer = require('multer')
const path = require('path')
const fs = require('fs');
const Product = require('../../../database/Product')
const checkProductPayload = require('./middleware')

/**
 * @swagger
 * /admin/add-product:
 *   put:
 *     summary: Add a new product if it not already exists
 *     description: Endpoint to add a new product with image.
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '201':
 *         description: Product added successfully
 *       '409':
 *         description: Product already exists in the store
 *       '500':
 *         description: Internal server error, please try again later
 */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const originalFileName = path.parse(file.originalname).name;
        const newFileName = `${originalFileName}_${uniqueSuffix}${path.extname(file.originalname)}`;
        cb(null, newFileName);
    }
});

  
const upload = multer({ storage: storage })


router.put('/add-product',upload.single('image'),checkProductPayload ,async (req, res) => {
    const {name,price} = req.body
    const fileName = req.file.filename

    try {
        const oldProduct = await Product.findOne({name : name})

        if(oldProduct) {
        const testFiles = fs.readdirSync(path.join(__dirname, '../../../public'));
            testFiles.forEach(file => {
                if(file === fileName) {
                    const filePath = path.join(path.join(__dirname, '../../../public'), file);
                    fs.unlinkSync(filePath);
                }
            });
            return res.status(409)
            .json({message : 'Your product is already exists in the store'})
        }

        const product = new Product({
            name : name,
            price : price,
            imageName : fileName
        })

        await product.save()
        res.status(201).json({ message: 'Product added successfully' });

        
    } catch (error) {
        console.log(error)
        res.status(500)
        .json({message: 'Internal server error, please try again later'})
    }
});

module.exports = router