class Account {
    
    //properties
    name: string;
    age: number;
    email: string;
    username: string;
    password: string;
    static ageLimit = 18;

    constructor(name: string, age: number, email: string, username: string, password: string) {
        this.name = name;
        this.age = age;
        this.email = email;
        this.username = username;
        this.password = password;
    }

    static checkAge(age: number): boolean {
        return age >= Account.ageLimit;
    }

}

export = Account;