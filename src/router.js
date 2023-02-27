const router = require('express').Router()

// Middleware
const isAuthorized = require('./modules/Memberstack/middleware/isAuthorized')

// Authorized Routes
router.use('/test', isAuthorized, require('./modules/test'))

module.exports = router