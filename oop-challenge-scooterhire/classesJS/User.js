"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Account_1 = __importDefault(require("./Account"));
class User {
    /**
     *
     * @param name name of the user
     * @param age age of the user
     */
    constructor(name, age) {
        this.scooters = [];
        this.accounts = [];
        this.name = name;
        this.age = age;
    }
    register(email, username, password) {
        if (!Account_1.default.checkAge(this.age))
            return "Registration cancelled, age does not meet the requirement.";
        this.accounts.push(new Account_1.default(this.name, this.age, email, username, password));
        return "Account created.";
    }
    login() {
    }
    /**
     *
     * @param scooter scooter to be rented
     */
    rentScooter(scooter) {
        this.scooters.push(scooter);
    }
}
module.exports = User;
