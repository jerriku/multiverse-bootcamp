const {sequelize} = require('../sequelize/sequelize_index');
const {MenuItem} = require('../sequelize/classes/MenuItem');

describe('MenuItem', () => {
    /**
     * Runs the code prior to all tests
     */
     beforeEach(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await sequelize.sync({ force: true });
    })

    test('can create a MenuItem', async () => {
        const item = await MenuItem.create({ name: 'Karaage', price: 5.00 })
        expect(item.name).toBe('Karaage')
    })
})