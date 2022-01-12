const sqlite3 = require('sqlite3').verbose();
const fs = require('fs').promises;

describe('Sqlite3', () => {
    beforeAll(() => {
        const db = new sqlite3.Database('./restaurants.db', error => {
            if (error) return console.error(error.message);
        });
        try {
            db.exec("CREATE TABLE IF NOT EXISTS RESTAURANTS (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, imagelink TEXT)");
            db.exec("CREATE TABLE IF NOT EXISTS MENUS (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, restaurant_id INTEGER, FOREIGN KEY (restaurant_id) REFERENCES RESTAURANTS(id))");
            db.exec("CREATE TABLE IF NOT EXISTS MENUITEMS (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, price REAL, menu_id INTEGER, FOREIGN KEY (menu_id) REFERENCES MENUS(id))");
        } finally {
            db.close();
        }
        
    });

    test('can load restaurants into the database', async () => {
        const load = async() => {
            const buffer = await fs.readFile('./restaurants.json');
            return JSON.parse(String(buffer));
        }
        
        function initialise(restaurants) {
            const db = new sqlite3.Database('./restaurants.db', (err) => {
                if (err) {
                    return console.error(err.message);
                }
                console.log('Connected to restaurants database.');
            });
            
            try {
                db.serialize(() => {
                    let restaurantInserts, menuInserts, menuItemInserts;
                    try {
                        restaurantInserts = db.prepare('INSERT INTO RESTAURANTS (name, imagelink) VALUES (?, ?)');
                        menuInserts = db.prepare('INSERT INTO MENUS (title, restaurant_id) VALUES (?, ?)');
                        menuItemInserts = db.prepare('INSERT INTO MENUITEMS (name, price, menu_id) VALUES (?, ?, ?)');
        
                        let restaurant_id = 1;
                        let menu_id = 1;
                        restaurants.forEach(restaurant => {
                            restaurantInserts.run(restaurant.name, restaurant.image);
                            const menus = restaurant.menus;
                            menus.forEach(menu => {
                                menuInserts.run(menu.title, restaurant_id);
                                const menuItems = menu.items;
                                menuItems.forEach(item => {
                                    menuItemInserts.run(item.name, item.price, menu_id);
                                });
                                menu_id++;
                            });
                            restaurant_id++;
                        });
        
                    } finally {
                        restaurantInserts.finalize();
                        menuInserts.finalize();
                        menuItemInserts.finalize();
                    }
            
                    const result = db.each("SELECT * FROM RESTAURANTS", (err, rows) => rows);
                    expect(result.length).toBe(8);
                    
                    // db.each("SELECT * FROM MENUS", (err, rows) => {
                    //     console.log(rows);
                    // });
            
                    // db.each("SELECT * FROM MENUITEMS", (err, rows) => {
                    //     console.log(rows);
                    // });
                    
                });
            } finally {
                db.close((err) => {
                    if (err) {
                        return console.error(err.message);
                    }
                    console.log('Closed the database connection.');
                });
            }
        }

        load().then(restaurants => initialise(restaurants))
              .catch(error => console.error(error.message));
    });
});