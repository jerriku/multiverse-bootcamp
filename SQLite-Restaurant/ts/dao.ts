const sqlite3 = require('sqlite3').verbose();
const fsp = require('fs').promises;

class RestaurantDAO {
    private data: string;
    private file: string;

    constructor(file: string, data: string) {
        this.data = data;
        this.file = file;
    }

    initialise(): void {
        const db = new sqlite3.Database(this.data, (error: Error) => {
            if (error) return console.error(error.message);
            console.log(`Connected to -- ${this.data} -- database.`);
        });

        try {
            db.serialize(() => {
                db.run(`CREATE TABLE IF NOT EXISTS RESTAURANTS (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, imagelink TEXT)`);
                db.run(`CREATE TABLE IF NOT EXISTS MENUS (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, restaurant_id INTEGER, FOREIGN KEY (restaurant_id) REFERENCES RESTAURANTS(id))`);
                db.run(`CREATE TABLE IF NOT EXISTS MENUITEMS (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, price REAL, menu_id INTEGER, FOREIGN KEY (menu_id) REFERENCES MENUS(id))`);
            });
        } finally {
            db.close((error: Error) => {
                if (error) return console.error(error.message);
                console.log(`Closed the -- ${this.data} -- database.`);
            });
        }
    }

    private async load(): Promise<any> {
        const buffer: any = await fsp.readFile(this.file);
        return JSON.parse(String(buffer));
    }

    private populateTable(restaurantsData: []): void {
        const db = new sqlite3.Database(this.data, (error: Error) => {
            if (error) return console.error(error.message);
            console.log(`Connected to -- ${this.data} -- database.`);
        });
        
        let restaurants: Array<{ name: number, image: string, menus: []}>;
        let menus: Array<{ title: string, items: []}>
        let menuItems: Array<{ name: string, price: number}>
        restaurants = restaurantsData;
        try {
            db.serialize(() => {
                let restaurantStmt: any, menuStmt: any, menuItemStmt: any;
                try {
                    restaurantStmt = db.prepare('INSERT INTO RESTAURANTS (name, imagelink) VALUES (?, ?)');
                    menuStmt = db.prepare('INSERT INTO MENUS (title, restaurant_id) VALUES (?, ?)');
                    menuItemStmt = db.prepare('INSERT INTO MENUITEMS (name, price, menu_id) VALUES (?, ?, ?)');
                    let restaurant_id: number = 1;
                    let menu_id:number  = 1;
                    restaurants.forEach(restaurant => {
                        restaurantStmt.run(restaurant.name, restaurant.image)
                        menus = restaurant.menus;
                        menus.forEach(menu => {
                            menuStmt.run(menu.title, restaurant_id);
                            menuItems = menu.items;
                            menuItems.forEach(item => {
                                menuItemStmt.run(item.name, item.price, menu_id);
                            });
                            menu_id++;
                        });
                        restaurant_id++;
                    });
                } finally {
                    restaurantStmt.finalize();
                    menuStmt.finalize();
                    menuItemStmt.finalize();
                }
            });
        } finally {
            db.close((error: Error) => {
                if (error) return console.error(error.message);
                console.log(`Closed the -- ${this.data} -- database.`);
            });
        }
    }

    populate(): void {
        this.load().then(restaurants => this.populateTable(restaurants))
                   .catch(error => console.error(error.message));
    }

    getFile(): string {
        return this.file;
    }

    getData(): string {
        return this.data;
    }
}

export = RestaurantDAO;