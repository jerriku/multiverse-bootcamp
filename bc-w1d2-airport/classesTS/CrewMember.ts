import Bag from './Bag';
import Person from './Person';

class CrewMember extends Person{

    //properties
    position: string;
    staffNumber: number;

    constructor(name: string, position: string, staffNumber: number) {
        super(name);
        this.position = position;
        this.staffNumber = staffNumber;
    }
}

export = CrewMember;