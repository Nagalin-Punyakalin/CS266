const router = require('express').Router()
const admin = require('./protected/admin/product')

router.use(admin)

module.exports = router