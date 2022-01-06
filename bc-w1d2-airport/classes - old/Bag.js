class Bag {

    //properties
    weight;

    constructor(weight) {
        this.weight = weight
    }

    isOverLimit() {
        return this.weight > 23;
    }
}

const mandyBag = new Bag(16);
const ucheBag = new Bag(25);

console.log(mandyBag.weight);
console.log(ucheBag.weight);
console.log(mandyBag.isOverLimit());
console.log(ucheBag.isOverLimit());

module.exports = Bag;