import PaymentMethod from "./PaymentMethod";

class CardPayment extends PaymentMethod {
    constructor(name: string, cardNumber: number, cardExpiry: string, cardCVV: number) {
        super(name, cardNumber, cardExpiry, cardCVV);
    }
}

export = CardPayment;