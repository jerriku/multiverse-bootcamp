const express = require('express');
const { sequelize } = require('./sequelize/sequelize_index');
const { Restaurant } = require('./sequelize/classes/Restaurant');
const { Menu } = require('./sequelize/classes/Menu');
const { MenuItem } = require('./sequelize/classes/MenuItem');
const fs = require('fs').promises;

const app = express();
const port = 3000;


const createTable = async() => {
    await sequelize.sync({ force: true });
}

const load = async() => {
    const buffer = await fs.readFile('./restaurants.json');
    return JSON.parse(String(buffer));
}

const populate = async(restaurants) => {
    let restaurant_id = 1;
    let menu_id = 1;
    for (let i = 0; i < restaurants.length; i++) {
        await Restaurant.create({name: restaurants[i].name, image: restaurants[i].image});
        const menus = restaurants[i].menus;

        for (let j = 0; j < menus.length; j++) {
            await Menu.create({title: menus[j].title, restaurant_id: restaurant_id});
            const menuItems = menus[j].items;

            for (let k = 0; k < menuItems.length; k++) {
                await MenuItem.create({name: menuItems[k].name, price: menuItems[k].price, menu_id: menu_id});
            }
            menu_id++;
        }
        restaurant_id++;
    }

}

createTable().then(() => {
    load()
    .then(response => {
        populate(response);
    })
    .catch(error => console.error(error.message));
})
.catch(error => console.error(error.message));

app.use(express.static('src'));

app.get("/now", (request, response) => {
    const date = new Date();
    response.send(date);
});

app.get("/flipcoin", (request, response) => {
    const fiftyFifty = Math.floor(Math.random() * 2) + 1;
    response.send(fiftyFifty > 1 ? "heads" : "tails");
});

app.get("/restaurants", async (request, response) => {
    const restaurants = await Restaurant.findAll();
    response.json(restaurants);
});

app.get("/restaurants/:id", async (request, response) => {
    const restaurants = await Restaurant.findAll();
    response.json(restaurants);
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})