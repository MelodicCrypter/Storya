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

// SOCKET.IO Event listeners
io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});
// io.on('disconnection')


// App ready to run
server.listen(port, () => {
    console.log(`Server up on port: ${port}`);
});
