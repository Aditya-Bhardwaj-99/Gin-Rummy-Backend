class classGameObjects{
    constructor(){
        this._websocketObject = {}
        this._rooms = {}
        this._playerCards = {}
    }

    _removeCardPlayerCards=(PlayerCards,number,face)=>{
        var i = PlayerCards.length;
        while(i--){
           if(PlayerCards[i] && (PlayerCards[i].number === number && PlayerCards[i].face === face)){
               arr.splice(i,1);
               return arr
           }
        }
    }

    getWebsocket=(userid)=>{
        return this._websocketObject[userid]
    }
    getRoomData=(roomid)=>{
        return this._rooms[roomid]
    }
    getPlayerCards=(userid)=>{
        return this._playerCards[userid]
    }

    updateWebsocketObject=(userid,ws)=> {
        this._websocketObject[userid]=ws
    }
    updateRoomUser=(roomid,userid)=>{
        this._rooms[roomid].users?this._rooms[roomid].users.push(userid):this._rooms[roomid].users=[userid]
    }
    updateRoomDeck=(roomid)=>{
        this._rooms[roomid].deck.pop()
    }
    updateRoomTableCard=(roomid,card)=>{
        this._rooms[roomid].tableCard = card
    }
    updatePlayerCards=(userid,removeCard,addCard)=>{
        this._playerCards[userid]=_removeCardPlayerCards(this._playerCards[userid],removeCard.number,removeCard.face)
        this._playerCards[userid].push(addCard)
    }

    addPlayerCards=(userid,userDeck)=>{
        this._playerCards[userid]=userDeck
    }
    addRoomDeck=(roomid,deck)=>{
        this._rooms[roomid].deck=deck
    }

    removeRoom=(roomid)=>{
        this._rooms[roomid]=undefined
    }
    removePlayerCards=(userid)=>{
        this._playerCards[userid]=undefined
    }
    removeWebsocket=(userid)=>{
        this._websocketObject[userid]=undefined
    }
}

const GameObjects = new classGameObjects
module.exports = GameObjects