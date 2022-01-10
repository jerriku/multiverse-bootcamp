const Scooter = require('../classesJS/Scooter');

describe('Scooter', function() {

    test('has a name', function() {
        const scooter = new Scooter("ABC123");
        expect(scooter.id).toBe("ABC123");
    });

    test('under speed limit', function() {
        const scooter = new Scooter("ABC123");
        scooter.speed = 10;
        expect(scooter.isOverSpeedLimit()).toBe(false);
    });

    test('over speed limit', function() {
        const scooter = new Scooter("ABC123");
        scooter.speed = 13;
        expect(scooter.isOverSpeedLimit()).toBe(true);
    });

    test('unlocked', function() {
        const scooter = new Scooter("ABC123");
        scooter.unlock();
        expect(scooter.locked).toBe(false);
    });

    test('locked', function() {
        const scooter = new Scooter("ABC123");
        scooter.unlock();
        scooter.lock()
        expect(scooter.locked).toBe(true);
    });

    test('is reported damaged', function() {
        const scooter = new Scooter("ABC123");
        scooter.reportDamaged();
        expect(scooter.damaged).toBe(true);
    });

    test('battery low', function() {
        const scooter = new Scooter("ABC123");
        scooter.battery = 10;
        expect(scooter.isAvailable()).toBe(false);
    });

    test('is available', function() {
        const scooter = new Scooter("ABC123");
        expect(scooter.isAvailable()).toBe(true);
    });
});