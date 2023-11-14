const router = require('express').Router()
const Address = require('../../../database/Address')
const address = require('./address')
const product = require('./product')

router.use(address)
router.use(product)

module.exports = router