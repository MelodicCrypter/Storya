class Users {
    constructor () {
        this.users = [];
    }

    addUser (id, name, room) {
        if (this.users.includes(name)) {
            return false;
        }

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

    // check if user has the same name with other user inside specific room
    checkUserDuplicate (name, room) {
        if (this.users.filter(user => user.name === name)[0] && this.users.filter(user => user.room === room)[0]) {
            return true;
        }

        return false;
    }

    // return users that belongs to same room
    getUserList (room) {
        return this.users
            .filter(user => user.room === room)
            .map(user => user.name);
    }
}

module.exports = { Users };
