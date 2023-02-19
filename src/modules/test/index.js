const asyncHandler = require('express-async-handler')
const router = require('express').Router()
const log = require("npmlog")

router.get('/', asyncHandler(async (req, res) => {
    res.send("Hello World")
}))

module.exports = router