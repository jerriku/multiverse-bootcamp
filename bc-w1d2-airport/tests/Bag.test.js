const Bag = require('../classesTS/Bag');

describe('Bag', function() { //bag suite

    test('has the correct weight', function() {
        const bag = new Bag(15);
        expect(bag.weight).toBe(15);
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
        expect(() => Bag()).toThrowError();
    });
});