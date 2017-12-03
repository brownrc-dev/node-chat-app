
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');

var app = express();

app.use(express.static(publicPath));

var port = process.env.PORT || 3000;

var server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});