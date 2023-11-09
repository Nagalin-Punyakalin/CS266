const router = require('express').Router()
const multer =  require('multer')
const path = require('path')
const Product = require('../../database/Product')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + " _ " + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage })

router.put('/add-product', upload.single('test'), async (req, res) => {
    try {
        const product = await Product.findOne({ name: req.body.name })
        if (product) {
            return res.status(409).send({ error: 'Your product is already exists in the store' });
        }
        
         res.status(201).send({ success: 'Product added successfully' });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: 'Internal server error, please try again later' });
    }
});


module.exports = router