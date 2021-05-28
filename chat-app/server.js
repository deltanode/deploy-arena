const express = require("express")
const http = require("http")
const path = require("path")
const socketio = require("socket.io")

const app = express()
const server = http.createServer(app)
const io = socketio(server)
const user={}

app.use("/",express.static(path.join(__dirname,"public")))

io.on("connection",(socket)=>{
    // console.log(socket.id)
    socket.on("login",(data)=>{
        // console.log(data.name)
        user[socket.id] = data.name
    })

    socket.on("sendMsg",(data)=>{
        io.emit("receivedMsg",{
            msg:data.msg,
            name:user[socket.id]
        })
    })
})

server.listen(process.env.PORT || 3000,()=>{
    console.log("Server running at port 3000")
})
