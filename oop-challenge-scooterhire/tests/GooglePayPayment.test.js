const GooglePayPayment = require('../classesJS/GooglePayPayment');
const PaymentMethod = require('../classesJS/PaymentMethod');

describe('GooglePayPayment', function() {

    test('is an instance of a PaymentMethod', function() {
        const googlepay = new GooglePayPayment("Jeric Fajardo", 1234567890, "01/22", 123);
        expect(googlepay instanceof PaymentMethod).toBeTruthy();
    });
    
    test('has a card name', function() {
        const googlepay = new GooglePayPayment("Jeric Fajardo", 1234567890, "01/22", 123);
        expect(googlepay.cardName).toBe("Jeric Fajardo");
    });

    test('has a card number', function() {
        const googlepay = new GooglePayPayment("Jeric Fajardo", 1234567890, "01/22", 123);
        expect(googlepay.cardNumber).toBe(1234567890);
    });

    test('has an expiry date', function() {
        const googlepay = new GooglePayPayment("Jeric Fajardo", 1234567890, "01/22", 123);
        expect(googlepay.cardExpiry).toBe("01/22");
    });

    test('has a card verification value', function() {
        const googlepay = new GooglePayPayment("Jeric Fajardo", 1234567890, "01/22", 1234);
        expect(googlepay.cardCVV).toBe(1234);
    });
    
    test('card name is a string', function() {
        const googlepay = new GooglePayPayment("Jeric Fajardo", 1234567890, "01/22", 123);
        expect(typeof(googlepay.cardName)).toBe("string");
    });

    test('card number is a number', function() {
        const googlepay = new GooglePayPayment("Jeric Fajardo", 1234567890, "01/22", 123);
        expect(typeof(googlepay.cardNumber)).toBe("number");
    });

    test('expiry date is a string', function() {
        const googlepay = new GooglePayPayment("Jeric Fajardo", 1234567890, "01/22", 123);
        expect(typeof(googlepay.cardExpiry)).toBe("string");
    });

    test('card verification value is a number', function() {
        const googlepay = new GooglePayPayment("Jeric Fajardo", 1234567890, "01/22", 1234);
        expect(typeof(googlepay.cardCVV)).toBe("number");
    });
});