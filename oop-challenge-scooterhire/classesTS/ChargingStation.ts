import Scooter from './Scooter';

class ChargingStation {
    
    //properties
    location: string;
    totalScooters: number;
    availableScooters: Scooter[] = [];
    brokenScooters: Scooter[] = [];
    scootersAway: Scooter[] = [];
    scootersToCharge: Scooter[] = [];
    /**
     * 
     * @param location location of the charging station
     * @param totalScooters total number of scooters in the charging station
     */
    constructor(location: string, totalScooters: number) {
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

export = ChargingStation;