const router = require('express').Router()
const address = require('./address')
const product = require('./product')
const order = require('./order')

router.use(address)
router.use(product)
router.use(order)
module.exports = router