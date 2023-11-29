const router = require('express').Router()
const Order = require('../../../database/Order');
const Product = require('../../../database/Product')
const Purchase = require('../../../database/Purchase')

/**
 * @swagger
 * /user/product:
 *   get:
 *     summary: all products data in database
 *     description: fetch all the products in database
 *     
 *     responses:
 *       '200':
 *         description: OK
 *       '500':
 *         description: Internal server error, please try again later
 */

router.get('/product', async (req, res) => {
    try {
        const result = await Product.find();

        // Map the result to transform _id to id
        const modifiedResult = result.map(product => ({
            id: product._id,
            name: product.name,
            price: product.price,
            imageName: product.imageName,
        }));

        res.status(200).json(modifiedResult);

    } catch (error) {
        console.error(error);
        res.status(500)
        .json({message : 'Unable to fetch data, please try again later'});
    }
});


router.put('/purchase', async (req, res) => {
    const payload = req.body;
    
    try {
        const order = new Order()
        console.log(order._id)
        await order.save()
        for (const currPayload of payload) {
                const newPurchase = new Purchase({
                    quantity: currPayload.quantity,
                    status: 'Pending payment',
                    total: currPayload.total,
                    products: currPayload.id,
                    orderID: order._id
                })
                await newPurchase.save();
            } 
            res.status(201).json({ message: 'Your orders have been confirmed' });
        }

    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error, please try again later' });
    }
});



module.exports = router