const memberstackAdmin = require("@memberstack/admin")

const memberstack = memberstackAdmin.init(process.env.MEMBERSTACKSECRET)

/**
 * Verify token
 * @param {object} params Verify token options
 * @param {string} params.token Token to verify 
 * @returns True if token is verified false if otherwise
 */
const verifyToken = async ({token}) => {
    try {
        let res = await memberstack.verifyToken({token: token})
        
        return true
    } 
    catch (error) {
        return error
    }
}

module.exports = {verifyToken}