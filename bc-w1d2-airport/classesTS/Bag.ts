class Bag {
    
    //properties
    weight : number;

    constructor(weight: number) {
        if (!weight) throw new Error("You must provide a weight.");
        this.weight = weight;
    }

    isOverLimit(): boolean {
        return this.weight > 23;
    }
}

export = Bag;