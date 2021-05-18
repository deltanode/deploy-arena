const express = require("express")
const app = express()
const session = require("express-session")
const flash = require("connect-flash")

app.set("view engine","ejs")
app.set("views", "folder")


app.use((req,res,next)=>{
    console.log(req.session)
    next()
})

app.use(session({
    secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000*60*60 }
}))


app.use(flash())

app.use((req,res,next)=>{
    console.log("Running :---")
    // console.log(req.session)
    // console.log("flash---",req.flash(""))
    console.log(req.session)
    next()
})


app.get("/",(req,res)=>{
    console.log(req.flash("success"))
    res.render("index")
    console.log("index ends :------------- \n")
})

app.get("/home",(req,res)=>{
    req.session.user = "yogi"
    res.render("home")
    console.log(req.session)
    console.log("home ends :-------------\n")
})

app.get("/flash",(req,res)=>{
   console.log(req.flash)
   res.send("flash done")
})

app.get("/empty",(req,res)=>{
    res.send("empty running")
 })

app.listen("4000", ()=>{
    console.log("Server listening at port 4000")
})