class Bag {
    
    //properties
    weight : number;
    static LIMIT: number = 23;

    constructor(weight: number) {
        if (!weight) throw new Error("You must provide a weight.");
        this.weight = weight;
    }

    isOverLimit(): boolean {
        return this.weight > Bag.LIMIT;
    }
}

export = Bag;