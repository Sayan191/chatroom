//DOM queries
const chatlist = document.querySelector(".chat-list")
const newChatForm = document.querySelector(".new-chat")
const newNameForm = document.querySelector(".new-name")
const updateMsg = document.querySelector(".update-msg")
const rooms =document.querySelector(".chat-rooms")
const roomName = document.querySelector(".chatroom-name")


//add a new chat
newChatForm.addEventListener("submit", e =>{
    e.preventDefault();
    const message = newChatForm.message.value.trim();
    chatroom.addChat(message)
        .then(()=> newChatForm.reset())
        .catch(err=>console.log(err))
})


//deleting a chat
chatlist.addEventListener("click", e=>{
    if(e.target.classList.contains("delete")){
        const x= e.target.parentElement.parentElement.innerText;
        console.log(x)
           
        chatroom.deletechat(x)
        console.log("back")
        //setTimeout(chatroom.getChats(chats => chatUI.render(chats)),2000)
    }
    
})


//updating the name
newNameForm.addEventListener("submit",e=>{
    e.preventDefault();
    const newName = newNameForm.name.value.trim();
    chatroom.updateName(newName)
    newNameForm.reset()

    //updating notification
    updateMsg.innerText = `Your name was updated to ${newName}`
    setTimeout(()=> updateMsg.innerText="" , 3000)
})

//updating the rooms
rooms.addEventListener("click", e=>{
    if(e.target.tagName === "BUTTON"){
        chatUI.clear();
        roomName.innerText= `Chatroom: ${e.target.id}`  
        chatroom.updateRoom(e.target.id)
        //getting the chats
        chatroom.getChats(chats => chatUI.render(chats))
    }
})

//checking localstorage for username
const username = localStorage.username ? localStorage.username : "unknown"

//class instances
const chatUI = new ChatUI(chatlist)
const chatroom = new Chatroom('general',username);




