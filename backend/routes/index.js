const router = require('express').Router()
const admin = require('./protected/admin')
router.use(admin)

module.exports = router