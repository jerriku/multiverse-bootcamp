"use strict";
/** https://www.tutorialsteacher.com/typescript/abstract-class
 * Define an abstract class in Typescript using the abstract keyword.
 * Abstract classes are mainly for inheritance where other classes may derive from them.
 * We cannot create an instance of an abstract class.
 */
class Person {
    constructor(name) {
        this.name = name;
        this.bags = [];
    }
    addBag(bag) {
        this.bags.push(bag);
    }
}
module.exports = Person;
