abstract class PaymentMethod {

    //properties
    cardName: string;
    cardNumber: number;
    cardExpiry: string;
    cardCVV: number;

    constructor(name: string, cardNumber: number, cardExpiry: string, cardCVV: number) {
        this.cardName = name;
        this.cardNumber = cardNumber;
        this.cardExpiry = cardExpiry
        this.cardCVV = cardCVV;
    }

    pay() {

    }
}

export = PaymentMethod