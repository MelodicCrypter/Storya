// This is the client side
// uses regular function cause some browsers might not work yet with ES6

// Instance of io inside server.js
const socket = io();
const $ = jQuery;

// Event Listener => connect
socket.on('connect', () => {
    console.log('You are connected to the server');
});

// Custom Event Listener => newMessage
socket.on('newMessage', (msg) => {
    const li = $('<li></li>');
    li.text(`${msg.from}: ${msg.text}`);

    $('#messages').append(li);
});

// Event Listener => disconnect
socket.on('disconnect', () => {
    console.log('You disconnected from the server');
});

$('#message-form').on('submit', (e) => {
    e.preventDefault();

    socket.emit('createMessage', {
        from: $('[name=nickname]').val(),
        text: $('[name=message]').val()
    }, () => {
        // this is the acknowledgment callback
    });

    $('[name=message]').val('');
});
