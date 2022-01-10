import Scooter from './Scooter';
import Account from './Account';

class User {

    //properties
    name: string;
    age: number;
    scooters: Scooter[] = [];
    accounts: Account[] = [];

    /**
     * 
     * @param name name of the user
     * @param age age of the user
     */

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    register(email: string, username: string, password: string): string {
        if (!Account.checkAge(this.age)) return "Registration cancelled, age does not meet the requirement.";
        this.accounts.push(new Account(this.name, this.age, email, username, password));
        return "Account created.";
    }
    
    login(): void {
    }

    /**
     * 
     * @param scooter scooter to be rented
     */

    rentScooter(scooter: Scooter): void {
        this.scooters.push(scooter);
    }
}

export = User;