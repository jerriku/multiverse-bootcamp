"use strict";
class Bag {
    constructor(weight) {
        if (!weight)
            throw new Error("You must provide a weight.");
        this.weight = weight;
    }
    isOverLimit() {
        return this.weight > Bag.LIMIT;
    }
}
Bag.LIMIT = 23;
module.exports = Bag;
