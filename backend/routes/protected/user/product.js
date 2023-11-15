const router = require('express').Router()
const Product = require('../../../database/Product')
const Purchase = require('../../../database/Purchase')

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
        res.status(500)
        .json({message : 'Unable to fetch data, please try again later'});
    }
});

router.put('/purchase',async(req,res)=>{
    const payload = req.body
    payload.map(async currPayload=>{
        const product = await Product.findById(currPayload.id)
        if(product) {
            const newPurchase = new Purchase({
                quantity : currPayload.quantity,
                status : 'Pending payment',
                total : currPayload.total,
                products : currPayload.id

            })

            await newPurchase.save()
           return res.sendStatus(200)
        }
        res.sendStatus(404)
        
        
    })
})


module.exports = router