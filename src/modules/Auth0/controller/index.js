const asyncRequest = require("../../../utils/asyncRequest")
const log = require('npmlog')
async function getAccessToken({code = null}) {
    if (code === null) {throw 'Requires code'}

    // If no code throw error
    if (!code) {
        res.status(401).send("Missing authorization code")
    }

    // Declare options
    const options = { 
        method: 'POST',
        url: `https://${process.env.AUTH0DEVDOMAIN}/oauth/token`,
        headers: { 'content-type': 'application/json' },
        json: true,
        body: {
            "client_id": process.env.AUTH0CLIENTID,
            "client_secret": process.env.AUTH0SECRET,
            "audience": process.env.AUTH0IDENTIFIER,
            "redirect_uri": process.env.AUTH0REDIRECT,
            "scope": "offline_access",
            "code": code,
            "grant_type": "authorization_code",
        }
    }

    // Request data
    let {response, body} = await asyncRequest(options)

    // If success
    if (response.statusCode !== 200 || body === null) {
        log.error(`Authentication Error: ${error.message}`)
        throw response    
    }

    // Send body
    return body
}

async function refreshToken({refreshToken = null}) {
    if (!refreshToken) {throw 'Requires refresh token'}

    // Declare options
    const options = { 
        method: 'POST',
        url: `https://${process.env.AUTH0DEVDOMAIN}/oauth/token`,
        headers: { 'content-type': 'application/json' },
        json: true,
        body: {
            "client_id": process.env.AUTH0CLIENTID,
            "client_secret": process.env.AUTH0SECRET,
            "scope": "offline_access",
            "grant_type": "refresh_token",
            "refresh_token": refreshToken
        }
    }

    // Request data
    let {response, body} = await asyncRequest(options)

    // If success
    if (response.statusCode !== 200 || body === null) {
        throw "AUTH: " + response.statusMessage    
    }

    return body
}

module.exports = { getAccessToken, refreshToken }