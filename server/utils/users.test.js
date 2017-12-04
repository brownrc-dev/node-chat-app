const expect = require('expect');

const {Users} = require('./users.js');

describe('Users', () => {

    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Mike',
            room: 'Node Course'
        },{
            id: '2',
            name: 'John',
            room: 'React Course'
        },{
            id: '3',
            name: 'Julie',
            room: 'React Course'
        },{
            id: '2',
            name: 'Rick',
            room: 'Node Course'
        }];
    });

    it('should add new user', () => {
        var users = new Users();
        var user = {
            id: '123',
            name: 'Robert',
            room: 'The Office Fans'
        };

        var addedUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it('should remove a user', function() {
        var userId = '1';
        var user = users.removeUser(userId);

        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(3);
    });

    it('should not remove a user', function() {
        var userId = '99';
        var user = users.removeUser(userId);

        expect(user).toNotExist();
    });

    it('should find user', function() {
        var userId = '2';
        var user = users.getUser(userId);

        expect(user.id).toBe(userId);
    });

    it('should not find user', function() {
        var userId = '13';
        var user = users.getUser(userId);

        expect(user).toNotExist();
    });

    it('should return names for node course', function() {
        var userList = users.getUserList('Node Course');

        expect(userList).toEqual(['Mike', 'Rick']);
    });

    it('should return names for react course', function() {
        var userList = users.getUserList('React Course');

        expect(userList).toEqual(['John', 'Julie']);
    });
});
