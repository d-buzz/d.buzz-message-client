import * as io from 'socket.io-client';
import config from "./../config"
const events = require('events');

class ChatSocketServer {

    socket = null
    eventEmitter = new events.EventEmitter();

    // Connecting to Socket Server
    establishSocketConnection(username) {
        try {
            this.socket = io(`${config.SOCKET_HOST}`, {
                query: `username=${username}`
            });
        } catch (error) {
            console.log(error)
        }
    }

    getChatList(token) {
        this.socket.emit('chat-list', {
            token: token
        });
        this.socket.on('chat-list-response', (data) => {
            this.eventEmitter.emit('chat-list-response', data);
        });
    }

    sendMessage(message) {
        this.socket.emit('add-message', message);
    }

    receiveMessage() {
        this.socket.on('add-message-response', (data) => {
            this.eventEmitter.emit('add-message-response', data);
        });
    }

    logout(username) {
        this.socket.emit('logout', username);
        this.socket.on('logout-response', (data) => {
            this.eventEmitter.emit('logout-response', data);
        });
    }

}

export default new ChatSocketServer()