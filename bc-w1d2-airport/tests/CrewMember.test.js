const CrewMember = require('../classesTS/CrewMember');
const Bag = require('../classesTS/Bag');

describe('CrewMember', function() {
    
    test('crew member has a name', function() {
        const crew = new CrewMember("John", "Pilot", 1);
        expect(crew.name).toBe("John");
    });

    test('crew member has a position', function() {
        const crew = new CrewMember("John", "Pilot", 1);
        expect(crew.position).toBe("Pilot");
    });
    
    test('crew member has a staff number', function() {
        const crew = new CrewMember("John", "Pilot", 1);
        expect(crew.staffNumber).toBe(1);
    });
    
    test('crew member name is a string', function() {
        const crew = new CrewMember("John", "Pilot", 1);
        expect(typeof(crew.name)).toBe("string");
    });

    test('crew member position is a string', function() {
        const crew = new CrewMember("John", "Pilot", 1);
        expect(typeof(crew.position)).toBe("string");
    });
    
    test('crew member staff number is a number', function() {
        const crew = new CrewMember("John", "Pilot", 1);
        expect(typeof(crew.staffNumber)).toBe("number");
    });

    test('crew member can add a bag', function() {
        const crew = new CrewMember("John", "Pilot", 1);
        const bag = new Bag(10);
        crew.addBag(bag);
        expect(crew.bags.length).toBe(1);
    });

    test('crew member can add the correct bag', function() {
        const crew = new CrewMember("John", "Pilot", 1);
        const bag = new Bag(10);
        crew.addBag(bag);
        expect(crew.bags[0].weight).toBe(10);
    });
    
    test('crew member can add multiple bags', function() {
        const crew = new CrewMember("John", "Pilot", 1);
        const bagOne = new Bag(15);
        const bagTwo = new Bag(20);
        const bagThree = new Bag(25);
        const bagFour = new Bag(5);
        crew.addBag(bagOne);
        crew.addBag(bagTwo);
        crew.addBag(bagThree);
        crew.addBag(bagFour);
        expect(crew.bags.length).toBe(4);
    });
});