import PaymentMethod from "./PaymentMethod";

class PayPalPayment extends PaymentMethod {
    constructor(name: string, cardNumber: number, cardExpiry: string, cardCVV: number) {
        super(name, cardNumber, cardExpiry, cardCVV);
    }
}

export = PayPalPayment;