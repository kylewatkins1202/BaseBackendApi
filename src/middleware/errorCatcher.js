const log = require('npmlog')

const errorCatcher = (error, req, res, next) => {
    // Log error
    log.warn("Error on: " + req.method + " " + req.originalUrl + " - " + error)

    // Set response error
    res.status(400)

    // Send back error json
    res.json({
        ErrorCode: 400,
        ErrorDescription: "Bad Request",
        ErrorDetail: error.toString().replace("Error: ", ""),
        ...((error.cause)&&{...error.cause})
    })
}

module.exports = {
    errorCatcher
}