const Bag = require("./Bag");

class Passenger {

    //properties
    name;
    passportNumber;
    seatNumber;

    constructor(name, passportNumber, seatNumber) {
        this.name = name;
        this.passportNumber = passportNumber;
        this.seatNumber = seatNumber;
        this.bag;
    }
    
    addBag(bag) {
        this.bag = bag;
    }
}

const firstPassenger = new Passenger("Jeric", 123456, 1);
console.log(firstPassenger.name);
console.log(firstPassenger.passportNumber);
console.log(firstPassenger.seatNumber);
const passengerBag = new Bag(10);
firstPassenger.addBag(passengerBag);
console.log(firstPassenger.bag);