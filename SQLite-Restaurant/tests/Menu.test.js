const {sequelize} = require('../sequelize/sequelize_index');
const {Menu} = require('../sequelize/classes/Menu');

describe('Menu', () => {
    /**
     * Runs the code prior to all tests
     */
     beforeEach(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await sequelize.sync({ force: true });
    })

    test('can create a Menu', async () => {
        const menu = await Menu.create({ title: 'Apptesier' })
        expect(menu.title).toBe('Apptesier')
    })
})