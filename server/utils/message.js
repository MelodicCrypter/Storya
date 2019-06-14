// Library Modules
const moment = require('moment');

// A function for creating simple messages
const generateMessage = (from, text) => ({
    from,
    text,
    createdAt: moment().valueOf()
});

// A function for sending location messages
const generateLocationMessage = (from, lat, long) => ({
    from,
    url: `https://www.google.com/maps?q=${lat},${long}`,
    createdAt: moment().valueOf()
});

module.exports = { generateMessage, generateLocationMessage };
