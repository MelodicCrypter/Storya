// This is the client side
// as much as possible, use regular function cause some browsers might not work yet with ES6

// Instance of io inside server.js
const socket = io();
const $ = jQuery;

// SOCKET.IO STUFFS ***********************************
// Event Listener => connect
socket.on('connect', () => {
    console.log('You are connected to the server');
});

// Custom Event Listener => newMessage
socket.on('newMessage', (msg) => {
    // create a formatted time
    const formatedTime = moment(msg.createdAt).format('h:mm a');
    // create an li element
    const li = $('<li></li>');
    li.text(`${msg.from} ${formatedTime}: ${msg.text}`);

    // append to the ol list inside the DOM
    $('#messages').append(li);
});

// Custom Event Listener => newLocationMessage
// This will be the user's location
socket.on('newLocationMessage', (msg) => {
    // create li tag
    const li = $('<li></li>');
    // create anchor tag
    const a = $('<a target="_blank">My Current Location</a>');

    li.text(`${msg.from}: `);
    a.attr('href', msg.url);
    li.append(a);
    $('#messages').append(li);
});

// Event Listener => disconnect
socket.on('disconnect', () => {
    console.log('You disconnected from the server');
});

// DOM EVENTS ******************************************
// When submit button on message-form Form is submitted
$('#message-form').on('submit', (e) => {
    e.preventDefault();

    const msgTextbox = $('[name=message]');

    socket.emit('createMessage', {
        from: 'testUser',
        text: msgTextbox.val()
    }, () => {
        // this is the acknowledgment callback
        msgTextbox.val('');
    });
});

// Location button => sends location of the user
const locationBtn = $('#send-location');
locationBtn.on('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
    }

    // Disable button while it's being processed
    locationBtn.attr('disabled', 'disabled').text('Sending Location...');

    navigator.geolocation.getCurrentPosition((position) => {
        // re-enable button again
        locationBtn.removeAttr('disabled').text('Send Location');

        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, () => {
        // re-enable button
        locationBtn.removeAttr('disabled').text('Send Location');
        alert('Unable to fetch location.');
    });
});
