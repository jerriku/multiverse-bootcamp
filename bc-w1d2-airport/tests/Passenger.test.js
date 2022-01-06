const Passenger = require('../classesJS/Passenger');
const Bag = require('../classesJS/Bag');

describe('Passenger', function() {

    test('passeger has a name', function() {
        const passenger = new Passenger("Jeric", "P1234", "S56");
        expect(passenger.name).toBe("Jeric");
    });
    
    test('passeger has a passport number', function() {
        const passenger = new Passenger("Jeric", "P1234", "S56");
        expect(passenger.passportNumber).toBe("P1234");
    });
    
    test('passeger has a seat number', function() {
        const passenger = new Passenger("Jeric", "P1234", "S56");
        expect(passenger.seatNumber).toBe("S56");
    });

    test('passeger name is a string', function() {
        const passenger = new Passenger("Jeric", "P1234", "S56");
        expect(typeof(passenger.name)).toBe("string");
    });
    
    test('passeger passport number is a string', function() {
        const passenger = new Passenger("Jeric", "P1234", "S56");
        expect(typeof(passenger.passportNumber)).toBe("string");
    });
    
    test('passeger seat number is a string', function() {
        const passenger = new Passenger("Jeric", "P1234", "S56");
        expect(typeof(passenger.seatNumber)).toBe("string");
    });

    test('passenger can add a bag', function() {
        const passenger = new Passenger("Jeric", "P1234", "S56");
        const bag = new Bag(15);
        passenger.addBag(bag);
        expect(passenger.bags.length).toBe(1);
    });

    test('passenger has added the correct bag', function() {
        const passenger = new Passenger("Jeric", "P1234", "S56");
        const bag = new Bag(15);
        passenger.addBag(bag);
        expect(passenger.bags[0].weight).toBe(15);
    });
    
    test('passenger can add multiple bags', function() {
        const passenger = new Passenger("Jeric", "P1234", "S56");
        const bagOne = new Bag(15);
        const bagTwo = new Bag(20);
        const bagThree = new Bag(25);
        const bagFour = new Bag(5);
        passenger.addBag(bagOne);
        passenger.addBag(bagTwo);
        passenger.addBag(bagThree);
        passenger.addBag(bagFour);
        expect(passenger.bags.length).toBe(4);
    });
});