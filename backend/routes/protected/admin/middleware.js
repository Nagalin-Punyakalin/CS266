function checkProductPayload (req,res,next) {
    if(req.body === undefined){
        return res.status(400)
    }
    
    if(!req.body.name || !req.body.price || !req.file) {
        return res.status(400)
    }
    next()
}

module.exports = checkProductPayload