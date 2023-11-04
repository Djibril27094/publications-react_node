const { verify } = require("jsonwebtoken")
const validateToken = (req , res , next) => {
    console.log('====================================');
    console.log(req.header("accessToken"));
    console.log('====================================');
    const accessToken = req.header("accessToken")

    if (!accessToken) return res.json({error: "User is not logged in"})

    try {
        const validateToken = verify(accessToken, "importantsecret")
        req.user=validateToken
        if (validateToken) {
            return next()
        }
    }catch(err) {

        return res.json({error: "erreur"})
    }
}

module.exports = {validateToken}