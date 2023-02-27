const memberstackAdmin = require("@memberstack/admin")

const memberstack = memberstackAdmin.init(process.env.MEMBERSTACKSECRET)

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