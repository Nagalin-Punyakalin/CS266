const router = require('express').Router()
const addressInput = require('./addressInput')
const product = require('./product')

router.use(addressInput)
router.use(product)

module.exports = router