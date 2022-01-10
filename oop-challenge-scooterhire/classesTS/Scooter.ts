class Scooter {

    //properties
    id: string;
    battery: number = 100;
    speed: number = 0;
    static speedLimit: number = 12.5;
    damaged: boolean = false;
    locked: boolean = true;

    /**
     * 
     * @param id identification number of Scooter
     */
    constructor(id: string) {
        this.id = id;
    }

    isOverSpeedLimit(): boolean {
        return this.speed > Scooter.speedLimit;
    }

    isAvailable(): boolean {
        return this.battery === 100 && this.damaged === false ? true : false;
    }

    reportDamaged(): void {
        this.damaged = true;
    }

    lock(): void {
        this.locked = true;
    }

    unlock(): void {
        this.locked = false;
    }
}

export = Scooter;