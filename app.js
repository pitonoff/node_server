const express = require('express');
const bodyParser = require('body-parser');

const models = require('./models');

class Application {
    constructor () {
        this.expressApp = express();
        this.manager = new models.ChatRoomManager();
        this.attachRoutes();
    }

    attachRoutes () {
        let app = this.expressApp; 
        let jsonParser = bodyParser.json();

        app.get('/rooms', this.roomSearchHandler.bind(this));
        app.post('/rooms', jsonParser, this.createRoomHandler.bind(this));
        app.get('/rooms/:roomId/messages', this.getMessagesHandler.bind(this));
        app.post('/rooms/:roomId/messages', jsonParser, this.postMessageHandler.bind(this));
    }

    createRoomHandler (req, res) {
        if (!req.body.name) {
            res.status(400).json({});
        } else {
            let room = this.manager.createRoom(req.body.name);
            let response = {
                room: room.toJson()
            };
            res.json(response);
        }
    }

    getMessagesHandler (req, res) {
        let room = this.manager.getById(req.params.roomId);
        if (!room) {
            res.status(404).json({});
        } else {
            let messagesJson = room.messages.map(message = message.toJson());
            let response = {
                messages: messagesJson
            };

            res.json(response);
        }
    }

    postMessageHandler (req, res) {
        let room = this.manager.getById(req.params.roomId);

        if (!room) {
            res.status(404).json({});
        } else if (!req.body.body || !req.body.username) {
            res.status(400).json({});
        } else {
            let message = room.postMessage(req.body.body, req.body.username);
            let response = {
                message: message.toJson()
            };
            res.json(response);
        }
    }

    roomSearchHandler (req, res) {
        let searchString = req.query.searchString || '';
        let rooms = this.manager.findByName(searchString);
        let roomsJson = rooms.map(room=> room.toJson());
        let response = {
            rooms: roomsJson
        };
        res.json(response);
    }
}

module.exports = Application;