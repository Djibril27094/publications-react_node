const express = require("express")
const router = express.Router()
const {Users} = require("../models")
const bcrypt = require("bcrypt")
const {sign} = require("jsonwebtoken")
const { validateToken } = require("../middleware/AuthMiddleware")


router.post("/"  ,async (req, res)=>{
    const {username , password} = req.body
    bcrypt.hash(password , 10)
    .then(hash => {
        Users.create({
            username: username,
            password: hash
        });
        return res.json("Success")
    })
})

router.post("/login", async(req ,res)=> {
    const {username, password} = req.body

    const user = await Users.findOne({where: {username: username}})
    if (!user) return res.json({error: "User Doesn't exist"})
    bcrypt.compare(password , user.password)
    .then(match=> {
        if (!match) return res.json({error: "Wrong username and password combinaison"})
        const accesToken = sign(
            {username: user.username, id:user.id},
            "importantsecret"    
        )
        return res.json({token:accesToken ,username:username,  id:user.id })
    })
     
   
})

router.get("/auth" , validateToken , (req , res)=> {
    return res.json(req.user)
})


module.exports = router
