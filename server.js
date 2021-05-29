const express = require("express")
const path = require("path")
const dotenv = require("dotenv")
dotenv.config()
const db = require("./db")
const methodOverride = require("method-override")
const blogRouter =  require("./routes/blogRoutes")


const app = express()

app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))

app.use(express.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname,"public")))
app.use(methodOverride("_method"))

// Routes
app.use(blogRouter)

app.listen(process.env.PORT, ()=>{
    console.log(`Server running at port ${process.env.PORT}`)
})