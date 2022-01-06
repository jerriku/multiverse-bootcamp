const Bag = require('../classesJS/Bag');

describe('Bag', function() { //bag suite

    test('has the correct weight', function() {
        const bag = new Bag(15);
        expect(bag.weight).toBe(15);
    });
    
    test('weight is a number', function() {
        const bag = new Bag(15);
        expect(typeof(bag.weight)).toBe("number");
    });

    test('overweight bag', function() {
        const bag = new Bag(25);
        expect(bag.isOverLimit()).toBe(true);
    });

    test('lighter bag', function() {
        const bag = new Bag(15);
        expect(bag.isOverLimit()).toBe(false);
    });

    test('bag has no weight', function() {
        expect(() => new Bag()).toThrowError("You must provide a weight.");
    });
});