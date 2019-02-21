// Library Modules
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

// Local Modules
const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');
const { Users } = require('./utils/users');

// Express, http, and socketIO
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Port
const port = process.env.PORT || 3000;

// Setting for public routes
const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));

// Instance of Users
const users = new Users();

// SOCKET.IO
io.on('connection', (socket) => {
    // Event Listener => connection
    console.log('On Server => New user connected');

    // Listener for Join
    socket.on('join', (params, callback) => {
        // => halt process if params are not strings or empty
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room are required');
        }

        // => Set the specific room the user joined
        socket.join(params.room);

        // => Remove user first in previous rooms
        users.removeUser(socket.id);

        // => Add the user the room he/she just joined
        users.addUser(socket.id, params.name, params.room);

        // => Emit the updated user list to the room
        io.to(params.room).emit('updateUserList', users.getUserList(params.room));

        // => Welcome message to the user inside specific room
        socket.emit('newMessage', generateMessage('Storya', `Welcome to <b class="vital">${params.room}</b> outpost.`));

        // => Broadcast a message to everyone inside the specific room
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Storya', `${params.name} has joined.`));

        // => return callback to chat.js letting know that everything is fine
        callback();
    });

    // Custom Event Listener => createMessage
    // when the user sends a new message
    socket.on('createMessage', (msg, callback) => {
        // Custom Event Emitter => newMessage, broadcast the new message
        io.emit('newMessage', generateMessage(msg.from, msg.text));

        // Callback
        callback();
    });

    // Custom Event Listener => createLocationMessage
    // when the user send his/her coordinates
    socket.on('createLocationMessage', (coords) => {
        // Custom Event Emitter => newMessage, broadcast the location message
        io.emit('newLocationMessage', generateLocationMessage(coords.from, coords.latitude, coords.longitude));
    });

    // Event Listener => disconnect
    socket.on('disconnect', () => {
        // when user leaves the chat room
        const user = users.removeUser(socket.id);

        // if successfully deleted
        if (user) {
            // update the user list for that specific room
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            // print a message inside that specific room that the user has left
            io.to(user.room).emit('newMessage', generateMessage('Storya', `${user.name} has left.`));
        }
    });
}); // END OF SOCKET.IO


// App ready to run
server.listen(port, () => {
    console.log(`Server up on port: ${port}`);
});
