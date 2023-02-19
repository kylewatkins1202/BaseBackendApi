const router = require('express').Router()
const guard = require("express-jwt-permissions")()

// Middleware
const isAuthorized = require('./modules/Auth0/middleware/isAuthorized')

// Routes
router.use('/auth', require('./modules/Auth0'))

// Authorized Routes
router.use('/test', isAuthorized, require('./modules/test'))

module.exports = router