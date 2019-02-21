// This is the client side
// as much as possible, use regular function cause some browsers might not work yet with ES6
// Instance of io inside server.js
const socket = io();
const $ = jQuery;

// Functions => scrollToBottom()
function scrollToBottom() {
    // The messages' box
    const msgBox = $('#messages');
    // selector for the very last message or latest one
    const newMessage = msgBox.children('li:last-child');
    // Heights
    const clientHeight = msgBox.prop('clientHeight');
    const scrollTop = msgBox.prop('scrollTop');
    const scrollHeight = msgBox.prop('scrollHeight');
    const newMessageHeight = newMessage.innerHeight();
    const prevMessageHeight = newMessage.prev().innerHeight(); // height of the previous message
    // Setting
    if (clientHeight + scrollTop + newMessageHeight + prevMessageHeight >= scrollHeight) {
        msgBox.scrollTop(scrollHeight);
    }
}

// SOCKET.IO STUFFS ***********************************
// Event Listener => CONNECT
socket.on('connect', () => {
    // user parameters: name and room
    const params = $.deparam(window.location.search);

    // Custom event => join
    socket.emit('join', params, (err) => {
        // after checking the params at the server
        if (err) {
            // redirect to index
            window.location.href = '/?err=t';
        } else {

        }
    });
});

// Event Listener => DISCONNECT
socket.on('disconnect', () => {
    console.log('You disconnected from the server');
});

// CUSTOM Event Listener => newMessage
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

    // show new messages if the user if near the bottom
    scrollToBottom();
});

// CUSTOM Event Listener => newLocationMessage
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

// CUSTOM Event Listener => updateUserList
// This will be the list of active users in a specific room
socket.on('updateUserList', (users) => {
    // Create an Ordered List element
    const ol = $('<ol></ol>');

    // Append to ol each user as a list, ex: <ol><li>James</li></ol>
    users.forEach((user) => {
        ol.append($('<li></li>').text(user));
    });

    // Wipe all data on the #users' area and put the updated list
    $('#users').html(ol);
});

// DOM EVENTS ******************************************
// When submit button on message-form Form is submitted
$('#message-form').on('submit', (e) => {
    // prevent the button from submitting
    e.preventDefault();

    // the message input element
    const msgTextbox = $('[name=message]');

    socket.emit('createMessage', {
        text: msgTextbox.val()
    }, () => {
        // this is the acknowledgment callback
        // upon successfully sending message clear the text box
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
