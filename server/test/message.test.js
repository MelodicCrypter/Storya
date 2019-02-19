// Library Modules
const expect = require('expect');

// Local Modules
const { generateMessage } = require('../utils/message');

// Tests
describe('generateMessage', () => {
    it('should generate correct message object', () => {
        const from = 'Hugh';
        const text = 'sample text';
        const message = generateMessage(from, text);

        expect(message.createdAt).not.toBeNaN();
        expect(message).toMatchObject({ from, text });
    });
});
