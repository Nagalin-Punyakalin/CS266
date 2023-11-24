const router = require('express').Router()
const Purchase = require('../../../database/Purchase')

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