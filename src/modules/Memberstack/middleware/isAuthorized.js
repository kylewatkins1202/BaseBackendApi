const {verifyToken} = require('../controller/index')
const log = require('npmlog')
const checkToken = async (req, res, next) => {
    let headers = req.headers
    let token = (headers?.authorization ?? '').replace('Bearer ', '')
    let response = await verifyToken({token: token})
    if (response === true) {
        next()
    }
    else {
        log.error(response)
        next('Unauthorized')
    }
}

const authFailCatcher = (error, req, res, next) => {
    if (error !== undefined) {
        // Log error
        log.warn("Error on: " + req.method + " " + req.originalUrl + " - " + error)
        
        // Set response error
        res.status(401)

        // Send back error json
        res.json({
            ErrorCode: 401,
            ErrorDescription: "Unauthorized",
            ErrorDetail: error.toString().replace("Error: ", ""),
            ...((error.cause)&&{...error.cause})
        })
    }
    else {
        next()
    }
}

module.exports = [checkToken, authFailCatcher]