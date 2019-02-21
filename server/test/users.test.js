// Library Modules
const expect = require('expect');

// Local Modules
const { Users } = require('../utils/users');


describe('Users', () => {
    let users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Hugh',
            room: 'SoftDevz'
        }, {
            id: '2',
            name: 'Jean',
            room: 'Nurses'
        }, {
            id: '3',
            name: 'Kate',
            room: 'SoftDevz'
        }];
    });

    it('should add new user', () => {
        const uzers = new Users();
        const user = {
            id: '123',
            name: 'Hugh',
            room: 'SoftDevz'
        };
        const resUser = uzers.addUser(user.id, user.name, user.room);

        expect(resUser).toEqual(user);
    });

    it('should remove specific user using id', () => {
        const resUser = users.removeUser('2');

        expect(users.users.length).toBe(2);
    });

    it('should return specific user using id', () => {
        const resUser = users.getUser('1');

        expect(resUser).toEqual(users.users[0]);
    });

    it('should return users that belongs to specific room', () => {
        const userLIst = users.getUserList('SoftDevz');

        expect(userLIst).toEqual(['Hugh', 'Kate']);
    });
});
