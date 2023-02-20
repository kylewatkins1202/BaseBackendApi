const asyncHandler = require('express-async-handler')
const router = require('express').Router()
const log = require("npmlog")
const auth0Controller = require('./controller')

router.get('/login', asyncHandler(async (req, res) => {
    // Get code from query
    var code = req.query.code
    
    // Get result from controller
    let result = await auth0Controller.getAccessToken({
        code: code
    })

    // If success
    if (result !== null) {
        // Send body
        res.send(result)
    }
    else {
        // Log error
        log.error(result)

        // Throw error
        throw `Bad Request`
    }
}))

router.post('/refresh', asyncHandler(async (req, res) => {
    // Get code from query
    var refreshToken = req.body.refreshToken
    
    // Get result from controller
    let result = await auth0Controller.refreshToken({
        refreshToken: refreshToken
    })

    // If success
    if (result !== null) {
        // Send body
        res.send(result)
    }
    else {
        // Log error
        log.error(result)

        // Throw error
        throw `Bad Request`
    }
}))

module.exports = router