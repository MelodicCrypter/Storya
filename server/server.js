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

    // Custom Event Emitter => newMessage
    socket.emit('newMessage', {
        from: 'hugh@melodiccrypter.com',
        text: 'how are things on your end?',
        createdAt: 777
    });

    // Custom Event Listener => createMessage
    socket.on('createMessage', (msg) => {
        console.log('client wrote this message: ', msg);
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
