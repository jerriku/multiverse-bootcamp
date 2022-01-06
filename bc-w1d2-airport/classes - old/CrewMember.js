class CrewMember {

    //properties
    name;
    position;
    staffNumber;

    constructor(name, position, staffNumber) {
        this.name = name;
        this.position = position;
        this.staffNumber = staffNumber;
        this.bag;
    }

    addBag(bag) {
    }
}

const pilot = new CrewMember("John", "Pilot", 123);
console.log(pilot.name);
console.log(pilot.position);
console.log(pilot.staffNumber);