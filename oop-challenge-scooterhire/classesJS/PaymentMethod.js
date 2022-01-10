"use strict";
class PaymentMethod {
    constructor(name, cardNumber, cardExpiry, cardCVV) {
        this.cardName = name;
        this.cardNumber = cardNumber;
        this.cardExpiry = cardExpiry;
        this.cardCVV = cardCVV;
    }
    pay() {
    }
}
module.exports = PaymentMethod;
