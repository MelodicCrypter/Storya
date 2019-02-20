// A function for creating simple messages
const generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: new Date().getTime()
    };
};

// A function for sending location messages
const generateLocationMessage = (from, lat, long) => {
    return {
        from,
        url: `https://www.google.com/maps?q=${lat},${long}`,
        createdAt: new Date().getTime()
    };
};

module.exports = { generateMessage, generateLocationMessage };
