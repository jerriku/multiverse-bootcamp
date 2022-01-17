const sqlite3 = require('sqlite3').verbose();
const fs = require('fs').promises;

// const load = async() => {
//     const buffer = await fs.readFile('./restaurants.json');
//     return JSON.parse(String(buffer));
// }

async function initialise() {
    let restaurants;

    const buffer = await fs.readFile('./restaurants.json');
    restaurants = JSON.parse(String(buffer));

    const db = new sqlite3.Database('./restaurants.db', (err) => {
        if (err) {
            return console.error(err.message);
        }
        // console.log('Connected to restaurants database.');
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
    
            // db.each("SELECT * FROM RESTAURANTS", (err, rows) => {
            //     console.log(rows);
            // });
            
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
            // console.log('Closed the database connection.');
        });
    }
}

initialise();
// function loadAndInsert() {
//     load().then(restaurants => initialise(restaurants))
//           .catch(error => console.error(error.message));
// }

module.exports = initialise;