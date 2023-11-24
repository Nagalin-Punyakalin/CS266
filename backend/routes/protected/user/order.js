const router = require('express').Router()
const Purchase = require('../../../database/Purchase')

/**
 * @swagger
 * /user/slip:
 *   post:
 *     summary: Save slip image into backend/public and image name to database
 *     description: Endpoint to add a slip
 *     security:
 *       - jwt: []
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
 *     securitySchemes:
 *       jwt:
 *         type: apiKey
 *         in: header
 *         name: authorization
 *         description: Enter JWT token as Bearer {wer}
 */


router.get('/order', async (req, res) => {
    try {
        const purchases = await Purchase.find().populate('products'); // Populate the 'products' field

        // Now purchases array contains documents with the populated 'products' field
        const modifiedPurchases = purchases.map((purchase) => {
            const modifiedPurchase = {
                quantity: purchase.quantity,
                status: purchase.status,
                total: purchase.total,
                name: purchase.products ? purchase.products.name : null, // Access product name
            };

            return modifiedPurchase;
        });

        res.status(200).json(modifiedPurchases);
    } catch (error) {
        console.error(error);
        res.status(500).json({message : 'Internal Server Error, please try again leter'});
    }
});

module.exports = router