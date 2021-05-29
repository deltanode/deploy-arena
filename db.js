const mongoose = require("mongoose")

mongoose
    .connect(process.env.DB_HOST || "mongodb://localhost:27017/practice_app",{useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
        console.log("Database connected successfully")
    })
    .catch((error)=>{
        console.log("Database Error:",error)
    })

module.exports = mongoose