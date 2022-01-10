"use strict";
class Scooter {
    /**
     *
     * @param id identification number of Scooter
     */
    constructor(id) {
        this.battery = 100;
        this.speed = 0;
        this.damaged = false;
        this.locked = true;
        this.id = id;
    }
    isOverSpeedLimit() {
        return this.speed > Scooter.speedLimit;
    }
    isAvailable() {
        return this.battery === 100 && this.damaged === false ? true : false;
    }
    reportDamaged() {
        this.damaged = true;
    }
    lock() {
        this.locked = true;
    }
    unlock() {
        this.locked = false;
    }
}
Scooter.speedLimit = 12.5;
module.exports = Scooter;
