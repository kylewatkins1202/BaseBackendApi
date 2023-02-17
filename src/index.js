const express = require('express')
const app = express()
require('dotenv').config()

var request = require("request");

var options = { 
    method: 'POST',
    url: process.env.AUTH0DEVURL,
    headers: { 'content-type': 'application/json' },
    json: true,
    body: {
        "client_id": `${process.env.AUTH0CLIENTID}`,
        "client_secret": `${process.env.AUTH0CLIENTSECRET}`,
        "audience":"https://dev-8thfiirtu53kyn3d.us.auth0.com/api/v2/",
        "grant_type":"client_credentials"
    }
}

let accessToken

request(options, function (error, response, body) {
    console.log(process.env.AUTH0CLIENTID)
    if (error) throw new Error(error);
    accessToken = body['access_token']

    console.log(accessToken)
});