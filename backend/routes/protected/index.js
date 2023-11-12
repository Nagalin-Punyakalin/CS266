const router = require('express').Router()
const admin = require('./protected/admin/product')
const user = require('./protected/user/addressInput')

router.use('/admin',admin)
router.use('/user', user)

module.exports = router