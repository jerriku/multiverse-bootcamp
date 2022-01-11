const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./restaurants.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to restaurants database.');
});

try {
    db.serialize(() => {
        let restaurantInserts, menuInserts, menuItemInserts;
        let restaurants = [{name: "Nandos", imageLink: "https://brewerysquare.com/wp-content/uploads/2019/08/nandos-feat-img-01-brewery-square-dorchester-1024x539.jpg"},
                           {name: "Ippudo", imageLink: "https://www.ippudo.co.uk/wordpress/wp-content/themes/ippudo-theme/images/ogp_image.png"}
                          ];
        let menus = [{title: "Starters", restaurant_id: 1}, 
                     {title: "Peri-Peri Chicken", restaurant_id: 1},
                     {title: "Appetisers", restaurant_id: 2},
                     {title: "Ramen", restaurant_id: 2}
                    ];
        let menuItems = [{name: "Halloumi Sticks & Dip", price: 4.25, menu_id: 1},
                         {name: "Dare to share", price: 9.95, menu_id: 1},
                         {name: "Chicken Butterfly", price: 8.25, menu_id: 2},
                         {name: "10 Chicken Wings", price: 10.95, menu_id: 2},
                         {name: "Chicken Kara-Age", price: 5.00, menu_id: 3},
                         {name: "Age-Tako Yaki", price: 5.00, menu_id: 3},
                         {name: "Shiromaru Classic", price: 11.50, menu_id: 4},
                         {name: "Akamaru Modern", price: 12.50, menu_id: 4}
                        ];
        try{
            restaurantInserts = db.prepare('INSERT INTO RESTAURANTS (name, imagelink) VALUES (?, ?)');
            menuInserts = db.prepare('INSERT INTO MENUS (title, restaurant_id) VALUES (?, ?)');
            menuItemInserts = db.prepare('INSERT INTO MENUITEMS (name, price, menu_id) VALUES (?, ?, ?)');
            restaurants.forEach(restaurant => {
                restaurantInserts.run(restaurant.name, restaurant.imageLink);
            });
            menus.forEach(menu => {
                menuInserts.run(menu.title, menu.restaurant_id);
            });
            menuItems.forEach(menuItem => {
                menuItemInserts.run(menuItem.name, menuItem.price, menuItem.menu_id);
            });
        } finally {
            restaurantInserts.finalize();
            menuInserts.finalize();
            menuItemInserts.finalize();
        }

        db.each("SELECT * FROM RESTAURANTS", (err, rows) => {
            console.log(rows);
        });
        
        db.each("SELECT * FROM MENUS", (err, rows) => {
            console.log(rows);
        });

        db.each("SELECT * FROM MENUITEMS", (err, rows) => {
            console.log(rows);
        });
        
    });
} finally {
    db.close((err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Closed the database connection.');
    });
}