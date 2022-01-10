const PaypalPayment = require('../classesJS/PaypalPayment');
const PaymentMethod = require('../classesJS/PaymentMethod');

describe('PaypalPayment', function() {

    test('is an instance of a PaymentMethod', function() {
        const paypal = new PaypalPayment("Jeric Fajardo", 1234567890, "01/22", 123);
        expect(paypal instanceof PaymentMethod).toBeTruthy();
    });
    
    test('has a card name', function() {
        const paypal = new PaypalPayment("Jeric Fajardo", 1234567890, "01/22", 123);
        expect(paypal.cardName).toBe("Jeric Fajardo");
    });

    test('has a card number', function() {
        const paypal = new PaypalPayment("Jeric Fajardo", 1234567890, "01/22", 123);
        expect(paypal.cardNumber).toBe(1234567890);
    });

    test('has an expiry date', function() {
        const paypal = new PaypalPayment("Jeric Fajardo", 1234567890, "01/22", 123);
        expect(paypal.cardExpiry).toBe("01/22");
    });

    test('has a card verification value', function() {
        const paypal = new PaypalPayment("Jeric Fajardo", 1234567890, "01/22", 1234);
        expect(paypal.cardCVV).toBe(1234);
    });
    
    test('card name is a string', function() {
        const paypal = new PaypalPayment("Jeric Fajardo", 1234567890, "01/22", 123);
        expect(typeof(paypal.cardName)).toBe("string");
    });

    test('card number is a number', function() {
        const paypal = new PaypalPayment("Jeric Fajardo", 1234567890, "01/22", 123);
        expect(typeof(paypal.cardNumber)).toBe("number");
    });

    test('expiry date is a string', function() {
        const paypal = new PaypalPayment("Jeric Fajardo", 1234567890, "01/22", 123);
        expect(typeof(paypal.cardExpiry)).toBe("string");
    });

    test('card verification value is a number', function() {
        const paypal = new PaypalPayment("Jeric Fajardo", 1234567890, "01/22", 1234);
        expect(typeof(paypal.cardCVV)).toBe("number");
    });
});