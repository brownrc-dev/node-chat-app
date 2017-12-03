
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require("./utils/message");
const publicPath = path.join(__dirname, '../public');
var port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', function(socket) {
    console.log('New user connected');

    socket.emit('newMessage', generateMessage('Admin', "Welcome to the chat app!"));

    socket.broadcast.emit('newMessage', generateMessage('Admin', "New user joined chat room."));

    /*
    socket.emit('newEmail', {
        from: "brownrc@live.com",
        message: "This is a test email",
        createdAt: new Date()
    });
    */

    socket.on('createMessage', (message, callback) => {
        console.log("Message: ", message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback('This is from the server.');

        /*
        // Send to everyone but current user
        socket.broadcast.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
        */
    });

    socket.on('createEmail', function(newEmail) {
        console.log('createEmail', newEmail);
    });

    socket.on('disconnect', function() {
        console.log('User was disconnected');
    });

    socket.on('join', function(params, callback) {
        
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
