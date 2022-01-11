const sqlite3 = require('sqlite3').verbose();

function initialise() {
    const db = new sqlite3.Database('./restaurants.db', (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Connected to restaurants database.');
    });

    try {
        db.serialize(() => {
            //Creating RESTAURANTS, MENUS and MENUITEMS tables.
            db.run("CREATE TABLE RESTAURANTS (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, imagelink TEXT)");
            db.run("CREATE TABLE MENUS (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, restaurant_id INTEGER, FOREIGN KEY (restaurant_id) REFERENCES RESTAURANTS(id))");
            db.run("CREATE TABLE MENUITEMS (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, price REAL, menu_id INTEGER, FOREIGN KEY (menu_id) REFERENCES MENUS(id))");
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

initialise();