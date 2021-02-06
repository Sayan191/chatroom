//render chat templates to the DOM
//clear chat list (when window changes)

class ChatUI{
    constructor(list){
        this.list= list
    }
    //to clear all the chat within the window
    clear(){
        this.list.innerHTML = ""
    }

    //to display all the chats
    render(data){
        const when = dateFns.distanceInWordsToNow(
            data.created_at.toDate(),
            {addSuffix: true}
        )
        const html= `
        <li class="list-group-item">
            <span class="username">${data.username}:</span>
            <span class="message">${data.message}</span>
            <div class="time">${when}</div>
        </li>`;

        this.list.innerHTML += html
    }
    
}