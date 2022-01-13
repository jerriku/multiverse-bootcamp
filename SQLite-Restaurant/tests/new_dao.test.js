const sqlite3 = require('sqlite3').verbose();
const RestaurantDAO = require('../js/new_dao');
const restaurant_dao = new RestaurantDAO('./restaurants.db', './restaurants.json');

describe('Sqlite3', () => {
    beforeAll(async () => {
        restaurant_dao.initialise();
        await restaurant_dao.createTable();
        await restaurant_dao.populate();
    });

    afterAll(() => {
        restaurant_dao.close();
    })

    test('can load restaurants into the database', async () => {
        const result = await restaurant_dao.check("SELECT * FROM RESTAURANTS");
        expect(result.length).toBe(8);
    });
});