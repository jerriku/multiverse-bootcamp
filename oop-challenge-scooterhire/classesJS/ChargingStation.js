"use strict";
class ChargingStation {
    /**
     *
     * @param location location of the charging station
     * @param totalScooters total number of scooters in the charging station
     */
    constructor(location, totalScooters) {
        this.availableScooters = [];
        this.brokenScooters = [];
        this.scootersAway = [];
        this.scootersToCharge = [];
        this.location = location;
        this.totalScooters = totalScooters;
    }
    // async charge(): Promise<void> {
    //     if (this.scootersToCharge.length < 1) console.log("No scooters to charge.");
    //     else {
    //         console.log("Starting to charge..");
    //         await new Promise(resolve => {
    //             this.scootersToCharge.forEach(async scooter => {
    //                 // this is to simulate how long it would take to charge per scooter.
    //                 scooter.battery = 100;
    //                 setTimeout(resolve, 2000);
    //             });
    //         });
    //         console.log("Done charging");
    //     }
    // }
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
module.exports = ChargingStation;
