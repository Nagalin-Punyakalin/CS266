function checkProductPayload (req,res,next) {
    if(req.body === undefined){
        return res.status(400)
        .json({message: 'Something went wrong , please try again later'})
    }
    
    if(!req.body.name || !req.body.price || !req.file) {
        return res.status(400)
        .json({message: 'Something went wrong , please try again later'})
    }
    next()
}

module.exports = checkProductPayload