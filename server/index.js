const express = require("express")
// L'utilisatio du cors pour interagir avec le backend

const cors = require("cors")
const db = require("./models")
const app = express()

app.use(cors())
app.use(express.json())

// Routers
const postRouter = require("./routes/Posts")
app.use("/posts", postRouter);
const commentRouters = require("./routes/Comments")
app.use("/comments", commentRouters)
const usersRouters = require("./routes/Users")
app.use("/auth/users", usersRouters)
db.sequelize.sync().then(()=> {
    app.listen(3001,()=>{
        console.log("Serveur en marche sur le port 3000")
    })
})