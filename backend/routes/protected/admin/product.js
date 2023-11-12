const router = require('express').Router()
const multer = require('multer')
const path = require('path')
const fs = require('fs');
const Product = require('../../../database/Product')
const checkProductPayload = require('./middleware')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/shop');
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
        const testFiles = fs.readdirSync(path.join(__dirname, '../../../public/shop'));
            testFiles.forEach(file => {
                if(file === fileName) {
                    const filePath = path.join(path.join(__dirname, '../../../public/shop'), file);
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