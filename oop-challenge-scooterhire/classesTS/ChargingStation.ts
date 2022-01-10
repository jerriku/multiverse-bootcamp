import Scooter from './Scooter';

class ChargingStation {
    
    //properties
    location: string;
    totalScooters: number;
    availableScooters: Scooter[] = [];
    brokenScooters: Scooter[] = [];
    scootersAway: Scooter[] = [];
    scootersToCharge: Scooter[] = [];

    constructor(location: string, totalScooters: number) {
        this.location = location;
        this.totalScooters = totalScooters;
    }

    charge(scooter: Scooter): Scooter {
        return scooter;
    }

    addBrokenScooter(scooter: Scooter): void {
        this.brokenScooters.push(scooter);
    }

    addAwayScooter(scooter: Scooter): void {
        this.scootersAway.push(scooter);
    }

    addAvailableScooter(scooter: Scooter): void {
        this.availableScooters.push(scooter);
    }

    removeAvailableScooter(scooter: Scooter): void {
        this.availableScooters = this.availableScooters.filter(availableScooter => availableScooter.id !== scooter.id);
    }

    removeBrokenScooter(scooter: Scooter): void {
        this.brokenScooters = this.brokenScooters.filter(brokenScooter => brokenScooter.id !== scooter.id);
    }

    removeAwayScooter(scooter: Scooter): void {
        this.scootersAway = this.scootersAway.filter(awayScooter => awayScooter.id !== scooter.id);
    }
}


const chargingStation = new ChargingStation("Holborn WC1V", 10);
const scooterOne = new Scooter("ABC123");
const scooterTwo = new Scooter("DEF456");
const scooterThree = new Scooter("GHI789");
const scooterFour = new Scooter("JKL101112");
chargingStation.addAvailableScooter(scooterOne);
chargingStation.addAvailableScooter(scooterTwo);
chargingStation.addAvailableScooter(scooterThree);
chargingStation.addAvailableScooter(scooterFour);
console.log(chargingStation);
chargingStation.removeAvailableScooter(scooterThree);
console.log(chargingStation.availableScooters.length);

export = ChargingStation;