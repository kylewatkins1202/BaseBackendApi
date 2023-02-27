const {verifyToken} = require('../controller/index')
const log = require('npmlog')

/**
 * Get cookie
 * @param {string} cookies String of cookies 
 * @param {string} name Name of cookies to get 
 * @returns Cookie w.r.t. name
 */
function getCookie(cookies, name) {
    const value = `; ${cookies}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

/**
 * Check Token
 * @param {object} req Request Object
 * @param {object} res Response Object 
 * @param {function} next Next middleWare
 */
const checkToken = async (req, res, next) => {
    let headers = req.headers
    const token = getCookie(headers.cookie, '_ms-mid')
    let response = await verifyToken({token: token})

    if (response === true) {
        next()
    }
    else {
        log.error(response)
        next('Unauthorized')
    }
}

/**
 * Auth fail catcher
 * @param {object} error Request Error Object 
 * @param {object} req Request Object
 * @param {object} res Response Object 
 * @param {function} next Next middleWare
 */
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