const express = require("express")
const router = express.Router()
const {Posts} = require("../models")

router.get("/",async (req, res) => {
    const listOfPost = await Posts.findAll()
    return res.json(listOfPost)
})

router.get("/byId/:id", async (req, res) => {
    const id = req.params.id
    const post = await Posts.findByPk(id)
    return res.json(post)
})

router.post("/", async (req, res) => {
    const post = req.body
    await Posts.create(post)
    return res.json(post)
})

module.exports = router