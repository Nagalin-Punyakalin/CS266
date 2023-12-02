const router = require('express').Router()
const multer = require('multer')
const Purchase = require('../../../database/Purchase')
const Order = require('../../../database/Order')
const path = require('path')

/**
 * @swagger
 * /user/slip:
 * 
 *   post:
 *     summary: Save slip image into backend/public and image name to database
 *     description: Endpoint to save a slip into MongoDB Slip schema that has order id
 *     security:
 *       - BearerAuth: []  # Set the authorization header here
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *               orderID:
 *                  type: string
 *     responses:
 *       '201':
 *         description: Image saved successfully
 *       '500':
 *         description: Internal server error, please try again later
 */

const storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,'public')
    },

    filename : (req,file,cb)=>{
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const originalFileName = path.parse(file.originalname).name;
        const newFileName = `${originalFileName}_${uniqueSuffix}${path.extname(file.originalname)}`;
        cb(null, newFileName);
    }
})

const upload = multer({storage : storage})



router.get('/order', async (req, res) => {
    try {
        const purchases = await Purchase.find().populate('products orderID');
        console.log(purchases)

        // Create a Map to store purchases grouped by orderID
        const groupedPurchases = new Map();

        purchases.forEach((purchase) => {
            const orderID = purchase.orderID ? purchase.orderID.orderID : null;

            if (!groupedPurchases.has(orderID)) {
                groupedPurchases.set(orderID, []);
            }

            const modifiedPurchase = {
                quantity: purchase.quantity,
                status: purchase.status,
                total: purchase.total,
                productName: purchase.products ? purchase.products.name : null,
                orderID: orderID,
            };

            groupedPurchases.get(orderID).push(modifiedPurchase);
        });

        // Convert the Map values to an array
        const modifiedPurchases = Array.from(groupedPurchases.values());

        res.status(200).json(modifiedPurchases);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error, please try again later' });
    }
});

router.post('/slip',upload.single('image'),async(req,res)=>{

    try {
        const orderID = parseInt(req.body.orderID)
        console.log(orderID)
    
        const order = await Order.findOne({orderID : orderID})
        if (!order) return res.status(404).json({ message: 'Order not found' });
    
        order.slipName = req.file.filename
        await order.save()
        const purchase = await Purchase.find().populate('orderID')
    
        purchase.map(async curr=>{
            if(curr.orderID.orderID === orderID) {
                curr.status='Waiting for payment verification'
                await curr.save()
            }
        })

         res.status(201).json({message : 'Your slip have been uploaded'})
        
        
    } catch (error) {
        console.error(error)
        res.status(500).json({message : 'Internal server error, please try again later'})
        
    }

})


module.exports = router