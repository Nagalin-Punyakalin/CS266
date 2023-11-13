const router = require('express').Router()
const admin = require('./protected/admin/index')
const user = require('./protected/user/index')

router.use('/admin',admin)
router.use('/user', user)

module.exports = router