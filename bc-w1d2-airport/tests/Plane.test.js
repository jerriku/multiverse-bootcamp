const Plane = require('../classesJS/Plane');

describe('Plane', function() {
    
    test('plane has a type', function() {
        const plane = new Plane("Jet");
        expect(plane.type).toBe("Jet");
    });
    
    test('plane type is a string', function() {
        const plane = new Plane("Jet");
        expect(typeof(plane.type)).toBe("string");
    });
});