function checkProductPayload (req,res,next) {
    if(req.body === undefined){
        return res.status(400)
        .json({ error: 'Name, price, and image are required fields.' });
    }
    
    if(!req.body.name || !req.body.price || !req.file) {
        return res.status(400)
        .json({ error: 'Name, price, and image aertre required fields.' });
    }
    next()
}

module.exports = checkProductPayload