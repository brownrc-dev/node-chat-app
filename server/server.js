const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require("./utils/message");
const {isRealString} = require("./utils/validation");
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
var port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', function(socket) {
    console.log('New user connected');

    socket.on('createMessage', (message, callback) => {
        var user = users.getUser(socket.id);

        if (user && isRealString(message.text)) {
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
        }

        callback();
    });

    socket.on('createEmail', function(newEmail) {
        console.log('createEmail', newEmail);
    });

    socket.on('disconnect', function() {
        console.log('User was disconnected');
        var user = users.removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('(System)', `${user.name} has left the room.`));
        }
    });

    socket.on('join', function(params, callback) {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback("Name and room are required.");
        }

        var username = params.name;
        var roomName = params.room;

        socket.join(roomName); // Socket.IO Room
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(roomName).emit('updateUserList', users.getUserList(params.room));
        socket.emit('newMessage', generateMessage('(System)', "Welcome to the chat app!"));
        socket.broadcast.to(roomName).emit('(newMessage)', generateMessage('System', `${params.name} has joined.`));

        callback();
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
