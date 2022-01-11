const ChargingStation = require('../classesJS/ChargingStation');
const Scooter = require('../classesJS/Scooter');

describe('ChargingStation', function() {

    test('has a location', function() {
        const chargingStation = new ChargingStation("Holborn WC1V", 10);
        expect(chargingStation.location).toBe("Holborn WC1V");
        console.log(chargingStation);
    });

    test('has a total number of scooters', function() {
        const chargingStation = new ChargingStation("Holborn WC1V", 10);
        expect(chargingStation.totalScooters).toBe(10);
    });

    test('location is a string', function() {
        const chargingStation = new ChargingStation("Holborn WC1V", 10);
        expect(typeof(chargingStation.location)).toBe("string");
    });

    test('totalScooters is a number', function() {
        const chargingStation = new ChargingStation("Holborn WC1V", 10);
        expect(typeof(chargingStation.totalScooters)).toBe("number");
    });

    test('can add a scooter', function() {
        const chargingStation = new ChargingStation("Holborn WC1V", 10);
        const scooter = new Scooter("ABC123");
        chargingStation.addAvailableScooter(scooter);
        expect(chargingStation.availableScooters[0]).toBe(scooter);
    });

    test('can add multiple scooters', function() {
        const chargingStation = new ChargingStation("Holborn WC1V", 10);
        const scooterOne = new Scooter("ABC123");
        const scooterTwo = new Scooter("DEF456");
        const scooterThree = new Scooter("GHI789");
        const scooterFour = new Scooter("JKL101112");
        chargingStation.addAvailableScooter(scooterOne);
        chargingStation.addAvailableScooter(scooterTwo);
        chargingStation.addAvailableScooter(scooterThree);
        chargingStation.addAvailableScooter(scooterFour);
        expect(chargingStation.availableScooters.length).toBe(4);
    });
    
    test('can add a broken scooter', function() {
        const chargingStation = new ChargingStation("Holborn WC1V", 10);
        const scooter = new Scooter("ABC123");
        chargingStation.addBrokenScooter(scooter);
        expect(chargingStation.brokenScooters[0]).toBe(scooter);
    });

    test('can add multiple broken scooters', function() {
        const chargingStation = new ChargingStation("Holborn WC1V", 10);
        const scooterOne = new Scooter("ABC123");
        const scooterTwo = new Scooter("DEF456");
        const scooterThree = new Scooter("GHI789");
        const scooterFour = new Scooter("JKL101112");
        chargingStation.addBrokenScooter(scooterOne);
        chargingStation.addBrokenScooter(scooterTwo);
        chargingStation.addBrokenScooter(scooterThree);
        chargingStation.addBrokenScooter(scooterFour);
        expect(chargingStation.brokenScooters.length > 1).toBe(true);
    });
    
    test('can mark a scooter as away', function() {
        const chargingStation = new ChargingStation("Holborn WC1V", 10);
        const scooter = new Scooter("ABC123");
        chargingStation.addAwayScooter(scooter);
        expect(chargingStation.scootersAway[0]).toBe(scooter);
    });

    test('can mark multiple scooters as away', function() {
        const chargingStation = new ChargingStation("Holborn WC1V", 10);
        const scooterOne = new Scooter("ABC123");
        const scooterTwo = new Scooter("DEF456");
        const scooterThree = new Scooter("GHI789");
        const scooterFour = new Scooter("JKL101112");
        chargingStation.addAwayScooter(scooterOne);
        chargingStation.addAwayScooter(scooterTwo);
        chargingStation.addAwayScooter(scooterThree);
        chargingStation.addAwayScooter(scooterFour);

        expect(chargingStation.scootersAway.length > 1).toBe(true);
    });

    test('can remove scooters from the available list', function() {
        const chargingStation = new ChargingStation("Holborn WC1V", 10);
        const scooterOne = new Scooter("ABC123");
        const scooterTwo = new Scooter("DEF456");
        const scooterThree = new Scooter("GHI789");
        const scooterFour = new Scooter("JKL101112");
        chargingStation.addAvailableScooter(scooterOne);
        chargingStation.addAvailableScooter(scooterTwo);
        chargingStation.addAvailableScooter(scooterThree);
        chargingStation.addAvailableScooter(scooterFour);
        
        chargingStation.removeAvailableScooter(scooterThree);
        expect(chargingStation.availableScooters.length).toBe(3);
    });

    test('can remove scooters from the broken list', function() {
        const chargingStation = new ChargingStation("Holborn WC1V", 10);
        const scooterOne = new Scooter("ABC123");
        const scooterTwo = new Scooter("DEF456");
        const scooterThree = new Scooter("GHI789");
        const scooterFour = new Scooter("JKL101112");
        chargingStation.addBrokenScooter(scooterOne);
        chargingStation.addBrokenScooter(scooterTwo);
        chargingStation.addBrokenScooter(scooterThree);
        chargingStation.addBrokenScooter(scooterFour);

        chargingStation.removeBrokenScooter(scooterTwo);
        expect(chargingStation.brokenScooters.length).toBe(3);
    });

    test('can remove scooters from the away list', function() {
        const chargingStation = new ChargingStation("Holborn WC1V", 10);
        const scooterOne = new Scooter("ABC123");
        const scooterTwo = new Scooter("DEF456");
        const scooterThree = new Scooter("GHI789");
        const scooterFour = new Scooter("JKL101112");
        chargingStation.addAwayScooter(scooterOne);
        chargingStation.addAwayScooter(scooterTwo);
        chargingStation.addAwayScooter(scooterThree);
        chargingStation.addAwayScooter(scooterFour);
        
        chargingStation.removeAwayScooter(scooterOne);
        expect(chargingStation.scootersAway.length).toBe(3);
    });
});