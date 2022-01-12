const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./restaurants.db', sqlite3.OPEN_READONLY, err => {
    if (err) {
        return console.error(err.message);
    }
    console.log("Connected to the restaurants database.");
});

try {
    db.serialize(() => {
        // db.each("SELECT * FROM RESTAURANTS", (err, rows) => {
        //     console.log(rows);
        // });
        
        // db.each("SELECT * FROM MENUS", (err, rows) => {
        //     console.log(rows);
        // });

        // db.each(`"SELECT * FROM MENUITEMS"`, (err, rows) => {
        //     console.log(rows);
        // });
        
        db.each(`SELECT RESTAURANTS.name AS Restaurant, MENUS.title AS Menu, MENUITEMS.name AS Item
                 FROM RESTAURANTS
                 JOIN MENUS ON RESTAURANTS.id = MENUS.restaurant_id 
                 JOIN MENUITEMS ON MENUS.id = MENUITEMS.menu_id`, (err, rows) => {
            if (err) {
                return console.error(err.message);
            }
            console.log(rows);
        });
    });
} finally {
    db.close(err => {
        if (err) {
            return console.error(err.message);
        }
        console.log("Closed the database connection.");
    })
}