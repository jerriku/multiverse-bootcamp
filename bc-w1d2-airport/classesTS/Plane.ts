class Plane {
    
    //properties
    type: string;
    passengers: []

    constructor(planeType: string) {
        this.type = planeType;
        this.passengers = []
    }

    boardPassenger(passenger: []): void {}
}

export = Plane;