import Bag from './Bag';

class CrewMember {

    //properties
    name: string;
    position: string;
    staffNumber: number;
    bags: Bag[];

    constructor(name: string, position: string, staffNumber: number) {
        this.name = name;
        this.position = position;
        this.staffNumber = staffNumber;
        this.bags = []
    }

    addBag(bag: Bag): void {
        this.bags.push(bag);
    }
}

export = CrewMember;