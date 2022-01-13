const sqlite3 = require('sqlite3').verbose();
const fsp = require('fs').promises;

class DataAccessObject {
    data: string = "";
    file: string = "";
    database: any;
    

    constructor(data: string, file: string) {
        if(!data || !file) return;
        this.data = data;
        this.file = file;
    }

    initialise(): void {
        this.database = new sqlite3.Database(this.data);
    }

    createTable(): any {
        if(!this.database) return;
        this.database.exec( //Creates restaurant table if it doesn't exist.
            'CREATE TABLE IF NOT EXISTS RESTAURANTS (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, imagelink TEXT)'
        );
        this.database.exec( //Creates menus table if it doesn't exist.
            'CREATE TABLE IF NOT EXISTS MENUS (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, restaurant_id INTEGER, FOREIGN KEY (restaurant_id) REFERENCES RESTAURANTS(id))'
        );
        this.database.exec( //Creates menuitems table if it doesn't exist.
            'CREATE TABLE IF NOT EXISTS MENUITEMS (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, price REAL, menu_id INTEGER, FOREIGN KEY (menu_id) REFERENCES MENUS(id))'
        );
    }

    async populate(): Promise<any> {
        if(!this.database) return;
        let restaurants: Array<{ name: number, image: string, menus: []}>;
        let menus: Array<{ title: string, items: []}>
        let menuItems: Array<{ name: string, price: number}>

        const buffer = await fsp.readFile(this.file);
        restaurants = JSON.parse(String(buffer));
        
        this.database.serialize(() => {

            let restaurant_id = 1;
            let menu_id = 1;
            
            restaurants.forEach(restaurant => {
                this.database.run(
                    'INSERT INTO RESTAURANTS (name, imagelink) VALUES (?, ?)',
                    restaurant.name,
                    restaurant.image
                );
                menus = restaurant.menus;
                
                menus.forEach(menu => {
                    this.database.run(
                        'INSERT INTO MENUS (title, restaurant_id) VALUES (?, ?)',
                        menu.title,
                        restaurant_id
                    );
                    menuItems = menu.items;

                    menuItems.forEach(item => {
                        this.database.run(
                            'INSERT INTO MENUITEMS (name, price, menu_id) VALUES (?, ?, ?)',
                            item.name,
                            item.price,
                            menu_id
                        );
                    })
                    menu_id++;
                });
                restaurant_id++;
            })

        });
    }

    check(expr: string): any[] {
        let file: any[] = [];
        try {
            this.database.all(expr, (err:Error, row: any) => {
                file.push(row);
                console.log(file);
            });
        } finally {
            console.log(file);
            return file;
        }
    }

    close(): void {
        this.database.close();
    }
}

export = DataAccessObject;