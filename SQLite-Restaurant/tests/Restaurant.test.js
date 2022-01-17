const {sequelize} = require('../sequelize/sequelize_index');
const {Restaurant} = require('../sequelize/classes/Restaurant');
const {Menu} = require('../sequelize/classes/Menu');

describe('Restaurant', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeEach(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await sequelize.sync({ force: true });
    })

    test('can create a restaurant', async () => {
        const restaurant = await Restaurant.create({ name: 'Ippudo', image: 'http://some.image.url' })
        expect(restaurant.name).toBe('Ippudo')
    })

    test('has menus', async () => {
        const restaurant = await Restaurant.create({name: 'Ronalds', image: 'http://some.image.url'})
        const menu = await Menu.create({title: 'set 1'});
        await restaurant.addMenu(menu);
        const menus = await restaurant.getMenus();
        expect(menus[0].title).toBe('set 1');
    })
})