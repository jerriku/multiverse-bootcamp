const {sequelize, DataTypes, Model} = require('../sequelize_index');

/**
 * Represents a MenuItem
 */
class MenuItem extends Model {

    // add methods here

}
MenuItem.init({
    name: DataTypes.STRING,
    price: DataTypes.NUMBER,
}, {
    sequelize,
    timestamps: false,
});
module.exports = {
    MenuItem
};