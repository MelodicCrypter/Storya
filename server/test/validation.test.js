// Library Modules
const expect = require('expect');

// Local Modules
const { isRealString } = require('../utils/validation');

describe('isRealString', () => {
    it('should reject non-string values', () => {
        const param = 4;
        const res = isRealString(param);

        expect(res).toBe(false);
    });

    it('should reject string with only space', () => {
        const param = '';
        const res = isRealString(param);

        expect(res).toBe(false);
    });

    it('should allow string with non-space characters', () => {
        const param = 'HughCaluscusin';
        const res = isRealString(param);

        expect(res).toBe(true);
    });
});
