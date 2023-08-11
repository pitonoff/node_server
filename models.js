class ChatRoomManager {
    constructor () {
        this.ChatRooms = {};
        this._nextRoomId = 0;
    }

    createRoom (name) {
        let room = new ChatRoom(this._nextRoomId++, name);
        this.ChatRooms[room.id] = room;
        return room;
    }
    
    findByName (searchSubstring) {
        let lowerSearchSubstring = searchSubstring.toLowerCase();

        let rooms = Object.keys(this.ChatRooms).map(id => this.chatRooms[id]);

        return rooms.filter(room =>
            room.name.toLowerCase().indexOf(lowerSearchSubstring) !== -1
            );
    }

    getById (id) {
        return this.chatRooms[id];
    }
}

class ChatRoom {
    constructor (id, name) {
        this.id = id;
        this.messages = [];
        this.name = name;
        this._nextMessageId = 0;
    }

    postMessage (body, username) {
        let message = new Message(this._nextMessageId++, body, username);
        this.message.push(message);
        return message;
    }

    toJson () {
        return {
            id: this.id,
            name: this.name
        };
    }
}

class Message {
    constructor (id, body, username, datetime) {
        this.id = id;
        this.body = body; 
        this.username = username;
        this.datetime = datetime || new Date();
    }

    toJson () {
        return {
            id: this.id,
            body: this.body,
            username: this.username,
            datetime: this.datetime.toUTCString()
        };
    }
}

module.exports = { ChatRoomManager, ChatRoom, Message };