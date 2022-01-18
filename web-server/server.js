const express = require('express');
const { sequelize } = require('./sequelize/sequelize_index');
const { Restaurant } = require('./sequelize/classes/Restaurant');
const { Menu } = require('./sequelize/classes/Menu');
const { MenuItem } = require('./sequelize/classes/MenuItem');
const fs = require('fs').promises;

const app = express();
const port = 3000;

const load = async() => {
    const buffer = await fs.readFile('./restaurants.json');
    const restaurants = JSON.parse(String(buffer));
    await sequelize.sync({ force: true });

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

load()
.catch(error => console.error(error.message));

app.use(express.static('src'));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.get("/now", (request, response) => {
    const date = new Date();
    response.send(date);
});

app.get("/flipcoin", (request, response) => {
    const fiftyFifty = Math.floor(Math.random() * 2) + 1;
    response.send(fiftyFifty > 1 ? "heads" : "tails");
});

app.get("/restaurants", async (request, response) => {
    const restaurants = await Restaurant.findAll({ include: { model: Menu, as: 'menus', include: { model: MenuItem, as: 'items' } } });
    response.json(restaurants);
});

app.get("/restaurants/id=:id", async (request, response) => {
    const restaurant = await Restaurant.findByPk(request.params.id, { include: { model: Menu, as: 'menus', include: { model: MenuItem, as: 'items' } } });
    response.json(restaurant);
});

app.post("/restaurants", async (request, response) => {
    if (!request.body.name || !request.body.image) return response.sendStatus(400);
    await Restaurant.create({name: request.body.name, image: request.body.image});
    response.sendStatus(201);
});

app.post("/restaurants/menus", async (request, response) => {
    if (!request.body.title || !request.body.restaurant_id) return response.sendStatus(400);
    await Menu.create({title: request.body.title, restaurant_id: request.body.restaurant_id});
    response.sendStatus(201);
});

app.post("/restaurants/menus/items", async (request, response) => {
    if (!request.body.name || !request.body.price || !request.body.menu_id) return response.sendStatus(400);
    await MenuItem.create({name: request.body.name, price: request.body.price, menu_id: request.body.menu_id});
    response.sendStatus(201);
});

app.put("/restaurants", async (request, response) => {
    if (!request.body.id) return response.sendStatus(400);
    if (request.body.name) await Restaurant.update(
        { name: request.body.name }, 
        { where: { id: request.body.id } }
    );

    if (request.body.image) await Restaurant.update(
        { image: request.body.image }, 
        { where: { id: request.body.id } }
    );
    
    response.sendStatus(201);
});

app.delete("/restaurants", async (request, response) => {
    if (!request.body.id) return response.sendStatus(400);
    const restaurant = await Restaurant.findByPk(request.body.id);
    restaurant.destroy();
    response.sendStatus(201);
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})