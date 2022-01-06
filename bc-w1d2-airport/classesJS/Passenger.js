"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Person_1 = __importDefault(require("./Person"));
class Passenger extends Person_1.default {
    constructor(name, passportNumber, seatNumber) {
        super(name);
        this.name = name;
        this.passportNumber = passportNumber;
        this.seatNumber = seatNumber;
    }
}
module.exports = Passenger;
