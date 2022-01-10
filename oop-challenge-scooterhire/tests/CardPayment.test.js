const CardPayment = require('../classesJS/CardPayment');
const PaymentMethod = require('../classesJS/PaymentMethod');

describe('CardPayment', function() {

    test('is an instance of a PaymentMethod', function() {
        const card = new CardPayment("Jeric Fajardo", 1234567890, "01/22", 123);
        expect(card instanceof PaymentMethod).toBeTruthy();
    });
    
    test('has a card name', function() {
        const card = new CardPayment("Jeric Fajardo", 1234567890, "01/22", 123);
        expect(card.cardName).toBe("Jeric Fajardo");
    });

    test('has a card number', function() {
        const card = new CardPayment("Jeric Fajardo", 1234567890, "01/22", 123);
        expect(card.cardNumber).toBe(1234567890);
    });

    test('has an expiry date', function() {
        const card = new CardPayment("Jeric Fajardo", 1234567890, "01/22", 123);
        expect(card.cardExpiry).toBe("01/22");
    });

    test('has a card verification value', function() {
        const card = new CardPayment("Jeric Fajardo", 1234567890, "01/22", 1234);
        expect(card.cardCVV).toBe(1234);
    });
    
    test('card name is a string', function() {
        const card = new CardPayment("Jeric Fajardo", 1234567890, "01/22", 123);
        expect(typeof(card.cardName)).toBe("string");
    });

    test('card number is a number', function() {
        const card = new CardPayment("Jeric Fajardo", 1234567890, "01/22", 123);
        expect(typeof(card.cardNumber)).toBe("number");
    });

    test('expiry date is a string', function() {
        const card = new CardPayment("Jeric Fajardo", 1234567890, "01/22", 123);
        expect(typeof(card.cardExpiry)).toBe("string");
    });

    test('card verification value is a number', function() {
        const card = new CardPayment("Jeric Fajardo", 1234567890, "01/22", 1234);
        expect(typeof(card.cardCVV)).toBe("number");
    });
});