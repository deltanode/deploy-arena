if(process.env.NODE_ENV !== "production"){
  require('dotenv').config()
}

const express = require("express")
const mongoose = require("mongoose")
const path = require("path")
const methodOveride = require("method-override")
const session = require("express-session")
const flash = require("connect-flash")
const passport = require("passport")
const LocalStrategy = require("passport-local")
const User = require("./models/users")
// const seedDB = require("./seed")

// Routes
const productRoutes = require("./routes/product")
const authRoutes = require("./routes/auth")
const cartRoutes = require("./routes/cart")

const app = express()
app.set("view engine", "ejs")
app.set("views"), path.join(__dirname, "views")
app.use(express.static("public"))
app.use(express.urlencoded({extended:true}))
app.use(methodOveride("_method"))

const sessionOptions = {
  secret:"weak secret",
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000*60*60 }
}   
app.use(session(sessionOptions))
app.use(flash())

// Initilising the passport and sessions for storing the users info
app.use(passport.initialize())
app.use(passport.session())

// Configuring the passport to use local strategy
// Authenticate generates a function  that is used in Passport's LocalStrategy
passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser()) 

// Middleware
app.use((req,res,next)=>{
  res.locals.success = req.flash("success")
  res.locals.error = req.flash("error")
  res.locals.currentUser = req.user
  next()
})

// Database connection
mongoose
  .connect(process.env.CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false  })
  .then(() => {
    console.log("DB Connected")
  })
  .catch(err => {
    console.log("Connection Error: ", err)
  })

// Seed Database
// seedDB()

// Routes
app.use(productRoutes)
app.use(authRoutes)
app.use(cartRoutes)

app.listen(process.env.PORT || "3000", () => {
  console.log("Server started at port 3000")
})
