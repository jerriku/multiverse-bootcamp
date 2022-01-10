const Account = require('../classesJS/Account');

describe('Account', function() {
    
    test('has a name', function() {
        const account = new Account("Jeric", 23, "email@address.com", "username123", "password456");
        expect(account.name).toBe("Jeric");
    });
        
    test('has an age', function() {
        const account = new Account("Jeric", 23, "email@address.com", "username123", "password456");
        expect(account.age).toBe(23);
    });
        
    test('has an email', function() {
        const account = new Account("Jeric", 23, "email@address.com", "username123", "password456");
        expect(account.email).toBe("email@address.com");
    });
        
    test('has a username', function() {
        const account = new Account("Jeric", 23, "email@address.com", "username123", "password456");
        expect(account.username).toBe("username123");
    });
        
    test('has a password', function() {
        const account = new Account("Jeric", 23, "email@address.com", "username123", "password456");
        expect(account.password).toBe("password456");
    });
    
    test('name is a string', function() {
        const account = new Account("Jeric", 23, "email@address.com", "username123", "password456");
        expect(typeof(account.name)).toBe("string");
    });
        
    test('age is a number', function() {
        const account = new Account("Jeric", 23, "email@address.com", "username123", "password456");
        expect(typeof(account.age)).toBe("number");
    });
        
    test('email is a string', function() {
        const account = new Account("Jeric", 23, "email@address.com", "username123", "password456");
        expect(typeof(account.email)).toBe("string");
    });
        
    test('username is a string', function() {
        const account = new Account("Jeric", 23, "email@address.com", "username123", "password456");
        expect(typeof(account.username)).toBe("string");
    });
        
    test('password is a string', function() {
        const account = new Account("Jeric", 23, "email@address.com", "username123", "password456");
        expect(typeof(account.password)).toBe("string");
    });
});