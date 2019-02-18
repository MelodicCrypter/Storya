// This is the client side
// uses regular function cause some browsers might not work yet with ES6

// Instance of io inside server.js
const socket = io();

// Event Listener => connect
socket.on('connect', () => {
    console.log('On Client => you are connected to the server');

    // Do all Emits here so that it is surely connected
    // Custom Event Emitter => createMessage
    socket.emit('createMessage', {
        to: 'jean@sample.com',
        text: 'How is Xander doing bilabs?',
        subject: 'Sent from MAC laptop'
    });
});

// Custom Event Listener => newMessage
socket.on('newMessage', (msg) => {
    console.log('You have a new message', msg);
});

// Event Listener => disconnect
socket.on('disconnect', () => {
    console.log('On Client => you disconnected from the server');
});
