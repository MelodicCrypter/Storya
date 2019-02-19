// Library Modules
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

// Local Modules
const { generateMessage } = require('./utils/message');

// Express, http, and socketIO
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Port
const port = process.env.PORT || 3000;

// Setting for public routes
const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));

// SOCKET.IO Event
io.on('connection', (socket) => {
    // Event Listener => connection
    console.log('On Server => The user has connected to the server');

    // Welcome message to the user
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to Storya app'));

    // Broadcast a message to everyone
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

    // Custom Event Listener => createMessage
    // when the user creates a message an emit inside this listener will be triggered
    socket.on('createMessage', (msg) => {
        // Custom Event Emitter => newMessage
        io.emit('newMessage', generateMessage(msg.from, msg.text));
    });

    // Event Listener => disconnect
    socket.on('disconnect', () => {
        console.log('On Server => The user disconnected from server');
    });
});

// App ready to run
server.listen(port, () => {
    console.log(`Server up on port: ${port}`);
});
