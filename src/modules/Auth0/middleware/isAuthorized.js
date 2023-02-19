const expressJwt = require('express-oauth2-jwt-bearer')
const log = require('npmlog')

var jwtCheck = expressJwt.auth({
    issuerBaseURL: "https://dev-8thfiirtu53kyn3d.us.auth0.com/",
    audience: "https://www.challenges-api",
    tokenSigningAlg: 'RS256'
});

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

module.exports = [jwtCheck, authFailCatcher]