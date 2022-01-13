import RestaurantDAO from './dao';

async function start() {
    const dao = new RestaurantDAO('../restaurants.db', '../restaurants.json');
    try {
        dao.initialise();
        await dao.createTable();
        await dao.populate();
        const result = dao.check("SELECT * FROM MENUS");
        console.log(result);
    } finally {
        dao.close();
    }
};

start();