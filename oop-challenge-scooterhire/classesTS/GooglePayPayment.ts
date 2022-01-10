import PaymentMethod from "./PaymentMethod";

class GooglePayPayment extends PaymentMethod {
    constructor(name: string, cardNumber: number, cardExpiry: string, cardCVV: number) {
        super(name, cardNumber, cardExpiry, cardCVV);
    }
}

export = GooglePayPayment;