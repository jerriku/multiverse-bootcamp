"use strict";
class Account {
    constructor(name, age, email, username, password) {
        this.name = name;
        this.age = age;
        this.email = email;
        this.username = username;
        this.password = password;
    }
    static checkAge(age) {
        return age >= Account.ageLimit;
    }
}
Account.ageLimit = 18;
module.exports = Account;
