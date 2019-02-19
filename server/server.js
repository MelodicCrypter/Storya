// Library Modules
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

// Local Modules

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
    socket.emit('newMessage', {
        from: 'Admin',
        text: 'Welcome to Storya app',
        createdAt: new Date().getTime()
    });

    // Broadcast a message to everyone
    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'New user joined',
        createdAt: new Date().getTime()
    });

    // Custom Event Listener => createMessage
    socket.on('createMessage', (msg) => {
        console.log('client wrote this message: ', msg);

        // Custom Event Emitter => newMessage
        io.emit('newMessage', {
            from: msg.from,
            text: msg.text,
            createdAt: new Date().getTime()
        });
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
