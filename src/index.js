const express = require('express')
const log = require("npmlog")
const app = express()
const helmet = require('helmet')
require('dotenv').config()

const startServer = async () => {
    // Use express json
    app.use(express.json())

    // Use helmet
    app.use(helmet())

    // Create api router
    const api = require('./router')

    // Create api
    app.use('/api', api)

    // Use error catching
    const {errorCatcher} = require('./middleware/errorCatcher')
    app.use(errorCatcher)

    // Start server
    var server = app.listen(8081, function () {
        var host = "localhost"
        var port = server.address().port
        
        log.notice(`Server Started http://${host}:${port}`)
    })
}

startServer()