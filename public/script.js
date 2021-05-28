const socket = io()
const nameInput = document.querySelector("input")
const msgInput = document.querySelector("textarea")
const btn = document.querySelector("button")
const list = document.querySelector("ul")

msgInput.addEventListener("keydown",(e)=>{
    // console.log(e.keyCode)
    if(e.keyCode === 13){
        btn.click()
        // if(nameInput.value){
        //     socket.emit("msgEvent",{
        //         name: nameInput.value,
        //         message: msgInput.value
        //     })
        //     msgInput.value = ""
        //     nameInput.disabled = true
        // }else{
        //     nameInput.focus()
        // }
    }
})

btn.addEventListener("click",(e)=>{
    e.preventDefault()
    msgInput.value.slice(0, -1)
    if(nameInput.value){
        socket.emit("msgEvent",{
            name: nameInput.value,
            message: msgInput.value
        })
        msgInput.value = ""
        nameInput.disabled = true
    }else{
        nameInput.focus()
    }
})

socket.on("recEvent",(data)=>{
    const li = document.createElement("li")
    li.innerText = `${data.name} : ${data.msg}`
    list.append(li)
})