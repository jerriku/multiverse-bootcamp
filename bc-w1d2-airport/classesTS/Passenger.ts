import Bag from './Bag';

class Passenger {
    name: string;
    passportNumber: string;
    seatNumber: string;
    bags : Bag[];

    constructor(name: string, passportNumber: string, seatNumber: string) {
        this.name = name;
        this.passportNumber = passportNumber;
        this.seatNumber = seatNumber;
        this.bags = [];
    }

    addBag(bag : Bag): void {
        this.bags.push(bag);
    }
}

export = Passenger;