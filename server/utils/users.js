class Users {
    constructor () {
        this.users = [];
    }

    addUser (id, name, room) {
        const user = { id, name, room };
        this.users.push(user);

        return user;
    }

    removeUser (id) {
        const user = this.getUser(id);

        if (user) {
            this.users = this.users.filter(usr => usr.id !== id);
        }

        return user;
    }

    // return only the user that matches the id
    getUser (id) {
        return this.users.filter(user => user.id === id)[0];
    }

    // return users that belongs to same room
    getUserList (room) {
        return this.users
            .filter(user => user.room === room)
            .map(user => user.name);
    }
}

module.exports = { Users };
