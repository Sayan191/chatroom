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
            <span class="username">${data.username}:   </span>
            <span class="message">${data.message}</span>
            <span  style="text-align:right;font-size:1.5em"><ion-icon name="trash-outline" class="delete"></ion-icon></span>
            <span class="time">${when}</span>

        </li>`;

        this.list.innerHTML += html
    }
    
}