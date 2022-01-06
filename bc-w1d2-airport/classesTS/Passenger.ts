import Person from './Person';
import Bag from './Bag';

class Passenger extends Person {

    //properties
    passportNumber: string;
    seatNumber: string;

    constructor(name: string, passportNumber: string, seatNumber: string) {
        super(name);
        this.name = name;
        this.passportNumber = passportNumber;
        this.seatNumber = seatNumber;
    }
}

export = Passenger;