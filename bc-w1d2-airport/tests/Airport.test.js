const Airport = require('../classesJS/Airport');

describe('Airport', function() {

    test('airport has a name', function() {
        const airport = new Airport("Heathrow");
        expect(airport.name).toBe("Heathrow");
    });

    test('airport name is a string', function() {
        const airport = new Airport("Heathrow");
        expect(typeof(airport.name)).toBe("string");
    });
});