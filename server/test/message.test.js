// Library Modules
const expect = require('expect');

// Local Modules
const { generateMessage, generateLocationMessage } = require('../utils/message');

// Tests
// => generateMessage test
describe('generateMessage', () => {
    it('should generate correct message object', () => {
        const from = 'Hugh';
        const text = 'sample text';
        const message = generateMessage(from, text);

        expect(message.createdAt).not.toBeNaN();
        expect(message).toMatchObject({ from, text });
    });
});

// => generateLocationMessage
describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        const from = 'Hugh';
        const lat = '1';
        const long = '1';
        const url = 'https://www.google.com/maps?q=1,1';
        const message = generateLocationMessage(from, lat, long);

        expect(message.url).toEqual(url);
        expect(message).toMatchObject({ from, url });
    });
});
