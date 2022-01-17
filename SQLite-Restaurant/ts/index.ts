import RestaurantDAO from './dao';

async function start() {
    const dao = new RestaurantDAO('../restaurants.db', '../restaurants.json');
    try {
        dao.initialise();
        await dao.createTable();
        await dao.populate();
        dao.check(`SELECT Restaurants.name AS Restaurant, Menus.title AS Menu, MenuItems.name AS Item
                   FROM Restaurants
                   JOIN Menus ON Restaurants.id = Menus.restaurant_id
                   JOIN MenuItems ON Menus.id = MenuItems.menu_id`
        );
    } finally {
        dao.close();
    }
};

start();