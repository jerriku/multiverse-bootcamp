"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const PaymentMethod_1 = __importDefault(require("./PaymentMethod"));
class GooglePayPayment extends PaymentMethod_1.default {
    constructor(name, cardNumber, cardExpiry, cardCVV) {
        super(name, cardNumber, cardExpiry, cardCVV);
    }
}
module.exports = GooglePayPayment;
