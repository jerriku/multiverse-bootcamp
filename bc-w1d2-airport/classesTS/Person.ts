import Bag from "./Bag";

/** https://www.tutorialsteacher.com/typescript/abstract-class
 * Define an abstract class in Typescript using the abstract keyword. 
 * Abstract classes are mainly for inheritance where other classes may derive from them. 
 * We cannot create an instance of an abstract class. 
 */
abstract class Person {

    //properties
    name: string;
    bags: Bag[];

    constructor(name: string) {
        this.name = name;
        this.bags = [];
    }

    addBag(bag: Bag): void {
        this.bags.push(bag);
    }
}

export = Person;