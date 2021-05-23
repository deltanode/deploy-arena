const login = document.querySelector("#login")
const chat = document.querySelector("#chat")
const loginBtn = document.querySelector("#loginBtn")
const sendBtn = document.querySelector("#sendBtn")
const username = document.querySelector("#username")
const msg = document.querySelector("#msg")
const list = document.querySelector("ul")


const socket = io()

loginBtn.addEventListener("click",(e)=>{
    e.preventDefault()
    socket.emit("login",{
        name:username.value
    })
    login.classList.add("d-none")
    chat.classList.remove("d-none")
})

sendBtn.addEventListener("click",(e)=>{
    e.preventDefault()
    socket.emit("sendMsg",{
        msg:msg.value
    })
    // msg.value = ""
    document.querySelector(".emojionearea-editor").innerText = ""
    // $(".emojionearea-editor").text("")
})

socket.on("receivedMsg",(data)=>{
    const li = document.createElement("li")
    li.innerHTML = `<b>${data.name}</b>:  ${data.msg}`
    li.classList.add("list-group-item")
    li.classList.add("mb-2")
    li.classList.add("text-break")
    list.append(li)
})

// console.log(socket.id)