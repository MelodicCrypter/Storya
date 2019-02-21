// This is the client side
// as much as possible, use regular function cause some browsers might not work yet with ES6

// Instance of io inside server.js
const socket = io();
const $ = jQuery;

// Functions
function scrollToBottom() {
    // messages box
    const msgBox = $('#messages');
    // selector for the very last message or latest one
    const newMessage = msgBox.children('li:last-child');
    // Heights
    const clientHeight = msgBox.prop('clientHeight');
    const scrollTop = msgBox.prop('scrollTop');
    const scrollHeight = msgBox.prop('scrollHeight');
    const newMessageHeight = newMessage.innerHeight();
    const prevMessageHeight = newMessage.prev().innerHeight(); // height of the previous message
    // setting
    if (clientHeight + scrollTop + newMessageHeight + prevMessageHeight >= scrollHeight) {
        msgBox.scrollTop(scrollHeight);
    }
}

// SOCKET.IO STUFFS ***********************************
// Event Listener => connect
socket.on('connect', () => {
    console.log('You are connected to the server');
});

// Custom Event Listener => newMessage
socket.on('newMessage', (msg) => {
    // create a formatted time
    const formatedTime = moment(msg.createdAt).format('h:mm a');

    // setting up mustache template
    const template = $('#message-template').html();
    const html = Mustache.render(template, {
        from: msg.from,
        text: msg.text,
        createdAt: formatedTime
    });

    // append to the ol list
    $('#messages').append(html);

    // show new messages always
    scrollToBottom();
});

// Custom Event Listener => newLocationMessage
// This will be the user's location
socket.on('newLocationMessage', (msg) => {
    // create a formatted time
    const formatedTime = moment(msg.createdAt).format('h:mm a');

    // setting up mustache template
    const template = $('#location-message-template').html();
    const html = Mustache.render(template, {
        from: msg.from,
        url: msg.url,
        createdAt: formatedTime
    });

    // append to the ol list
    $('#messages').append(html);
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
            from: 'AdminTest',
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, () => {
        // re-enable button
        locationBtn.removeAttr('disabled').text('Send Location');
        alert('Unable to fetch location.');
    });
});
