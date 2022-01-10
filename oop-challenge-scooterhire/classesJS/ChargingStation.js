"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Scooter_1 = __importDefault(require("./Scooter"));
class ChargingStation {
    constructor(location, totalScooters) {
        this.availableScooters = [];
        this.brokenScooters = [];
        this.scootersAway = [];
        this.scootersToCharge = [];
        this.location = location;
        this.totalScooters = totalScooters;
    }
    charge(scooter) {
        return scooter;
    }
    addBrokenScooter(scooter) {
        this.brokenScooters.push(scooter);
    }
    addAwayScooter(scooter) {
        this.scootersAway.push(scooter);
    }
    addAvailableScooter(scooter) {
        this.availableScooters.push(scooter);
    }
    removeAvailableScooter(scooter) {
        this.availableScooters = this.availableScooters.filter(availableScooter => availableScooter.id !== scooter.id);
    }
    removeBrokenScooter(scooter) {
        this.brokenScooters = this.brokenScooters.filter(brokenScooter => brokenScooter.id !== scooter.id);
    }
    removeAwayScooter(scooter) {
        this.scootersAway = this.scootersAway.filter(awayScooter => awayScooter.id !== scooter.id);
    }
}
const chargingStation = new ChargingStation("Holborn WC1V", 10);
const scooterOne = new Scooter_1.default("ABC123");
const scooterTwo = new Scooter_1.default("DEF456");
const scooterThree = new Scooter_1.default("GHI789");
const scooterFour = new Scooter_1.default("JKL101112");
chargingStation.addAvailableScooter(scooterOne);
chargingStation.addAvailableScooter(scooterTwo);
chargingStation.addAvailableScooter(scooterThree);
chargingStation.addAvailableScooter(scooterFour);
console.log(chargingStation);
chargingStation.removeAvailableScooter(scooterThree);
console.log(chargingStation.availableScooters.length);
module.exports = ChargingStation;
