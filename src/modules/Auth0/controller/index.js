const asyncRequest = require("../../../utils/asyncRequest")

async function getAccessToken({code = null}) {
    try {
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
                "scope": "read:challenges",
                "code": code,
                "grant_type": "authorization_code",
            }
        }

        // Request data
        let {response, body} = await asyncRequest(options)

        // If success
        if (response.statusCode !== 200) {
            throw response    
        }

        // Send body
        return body

    } catch (error) {
        log.error(`Authentication Error: ${error.message}`)

        return null
    }
}

module.exports = { getAccessToken }