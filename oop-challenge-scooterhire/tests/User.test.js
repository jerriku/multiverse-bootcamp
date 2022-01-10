const User = require('../classesJS/User');
const Scooter = require('../classesJS/Scooter');
const Account = require('../classesJS/Account');

describe('User', function() {

    test('has a name', function() {
        const user = new User("Jeric", 23);
        expect(user.name).toBe("Jeric");
    });

    test('has an age', function() {
        const user = new User("Jeric", 23);
        expect(user.age).toBe(23);
    });

    test('name is a string', function() {
        const user = new User("Jeric", 23);
        expect(typeof(user.name)).toBe("string");
    });

    test('age is a number', function() {
        const user = new User("Jeric", 23);
        expect(typeof(user.age)).toBe("number");
    });

    test('can add a scooter', function() {
        const user = new User("Jeric", 23);
        const scooter = new Scooter("ABC123");
        user.rentScooter(scooter);
        expect(user.scooters.length).toBe(1);
    });
    
    test('can have multiple scooters', function() {
        const user = new User("Jeric", 23);
        const scooterOne = new Scooter("ABC123");
        const scooterTwo = new Scooter("DEF456");
        const scooterThree = new Scooter("GHI789");
        const scooterFour = new Scooter("JKL101112");
        user.rentScooter(scooterOne);
        user.rentScooter(scooterTwo);
        user.rentScooter(scooterThree);
        user.rentScooter(scooterFour);
        expect(user.scooters.length > 1).toBe(true);
    });

    test('is old enough to register an account', function() {
        const user = new User("Jeric", 23);
        expect(user.register("email@address.com", "username123", "password456")).toBe("Account created.");
    });
    
    test('is not old enough to register an account', function() {
        const user = new User("Jeric", 15);
        expect(user.register("email@address.com", "username123", "password456")).toBe("Registration cancelled, age does not meet the requirement.");
    });
});