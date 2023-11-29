const router = require('express').Router()
const Purchase = require('../../../database/Purchase')

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
 *     responses:
 *       '201':
 *         description: Image saved successfully
 *       '500':
 *         description: Internal server error, please try again later
 */



router.get('/order', async (req, res) => {
    try {
        const purchases = await Purchase.find().populate('products orderID');

        // Create a Map to store purchases grouped by orderID
        const groupedPurchases = new Map();

        purchases.forEach((purchase) => {
            const orderID = purchase.orderID ? purchase.orderID._id : null;

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


module.exports = router