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
        res.status(500).json('Error occurs on the server side, please try again later');
    }
});

router.put('/purchase',async(req,res)=>{
    const payload = req.body
   

    payload.map(async currPayload=>{
        console.log(currPayload.id)
        const product = await Product.find()
        console.log(product)

        if(product) {
            const newPurchase = new Purchase({
                quantity : payload.quantity,
                total : payload.total,
                product : product.id,
                status : 'Pending payment'
            })
            return res.status(200).end()
        }
    })
    
   
    res.status(404).end()

   
})


module.exports = router