const router = require('express').Router()
const Product = require('../../../database/Product')

router.get('/product', async (req, res) => {
    try {
        const result = await Product.find();

        // Map the result to transform _id to id
        const modifiedResult = result.map(product => ({
            id: product._id,
            name: product.name,
            price: product.price,
            imageName: product.imageName,
            // Include other fields if needed
        }));

        res.status(200).json(modifiedResult);

    } catch (error) {
        console.error(error);
        res.status(500).json('Error occurs on the server side, please try again later');
    }
});


module.exports = router