const express = require("express")
const http = require("http")
const socketio = require("socket.io")
const path = require("path")
// const socket = require("./socket")

const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use(express.static(path.join(__dirname,"public")))

app.use((req,res)=>{
    res.status(404).send("Page not found")
})

let user = {}

io.on("connection",(socket)=>{
    socket.emit("recEvent",{
        name: "Server",
        msg: "Welcome to the Chat App"
    })
    
    socket.on("msgEvent",(data)=>{
        user[socket.id] = data.name

        io.emit("recEvent",{
            name:user[socket.id],
            msg:data.message
        })
        // console.log(user)
    })
})



server.listen(process.env.PORT || 3000, ()=>{
    console.log("Server running at port 3000")
})
