class Chatroom{
    constructor(room,username){
        this.room=room;
        this.username=username;
        this.chats=db.collection("chat");
        this.rset;
    }
    //adding chat to data base
    async addChat(message){
        //format a chat object
        const now = new Date();
        console.log(firebase.firestore.Timestamp.fromDate(now))
        const chat = {
            message:message,
            room:this.room,
            username:this.username,
            created_at:firebase.firestore.Timestamp.fromDate(now)
        }
        const response = await this.chats.add(chat)
        return response
    }

    //geting a real time listener for chats
    getChats(callback){
        this.rset = this.chats
            .where("room", "==" , this.room)
            .orderBy("created_at")
            .onSnapshot(snapshot=>{
                snapshot.docChanges().forEach(change =>{
                    if(change.type === "added"){
                        //updated the chat UI
                        callback(change.doc.data())
                    } 
                })
            })
    }
    updateName(username){
        this.username=username;
        localStorage.setItem("username",username)
    }
    updateRoom(room){
        this.room = room;
        console.log("room updated")
        if(this.rset){
            this.rset()
        }
    }
    deletechat(x){
        this.chats.where("room", "==" , this.room).get().then((querySnapshot) => {
            var str = "";
            querySnapshot.forEach((doc) => {
                str = doc.data().username+": "+doc.data().message+"  ";
                const when = dateFns.distanceInWordsToNow(
                    doc.data().created_at.toDate(),
                    {addSuffix: true}
                )
                str+=when;
                if (x == str){
                    doc.ref.delete();
                }
            })
        })      
    }
    
}




