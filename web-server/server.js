const express = require('express');
const { sequelize } = require('./sequelize/sequelize_index');
const { Restaurant } = require('./sequelize/classes/Restaurant');
const { Menu } = require('./sequelize/classes/Menu');
const { MenuItem } = require('./sequelize/classes/MenuItem');
const { check, validationResult } = require('express-validator');
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

app.post('/restaurants', [
    check('name').trim().notEmpty().isLength({max: 50}).whitelist('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ '),
    check('image').trim().isURL()
    ], async (request, response) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) return response.status(400).json({ errors: errors.array() });
        await Restaurant.create({name: request.body.name, image: request.body.image});
        response.sendStatus(201);
    }
);

app.post('/restaurants/menus', [
    check('title').trim().notEmpty().isLength({max: 50}),
    check('restaurant_id').trim().isInt()
    ], async (request, response) => {
        console.log(request.body);
        const errors = validationResult(request);
        if (!errors.isEmpty()) return response.status(400).json({ errors: errors.array() });
        await Menu.create({title: request.body.title, restaurant_id: request.body.restaurant_id});
        response.sendStatus(201);
    }
)

app.post("/restaurants/menus/items", [
    check('name').trim().notEmpty().isLength({max: 50}),
    check('price').trim().isCurrency({allow_negatives: false}),
    check('menu_id').trim().isInt()
    ], async (request, response) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) return response.status(400).json({ errors: errors.array() });
        await MenuItem.create({name: request.body.name, price: request.body.price, menu_id: request.body.menu_id});
        response.sendStatus(201);
    }
);

app.put("/restaurants", [
    check('id').trim().isInt()
    ], async (request, response) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) return response.status(400).json({ errors: errors.array() });
        if (request.body.name) await Restaurant.update(
            { name: request.body.name }, 
            { where: { id: request.body.id } }
        );

        if (request.body.image) await Restaurant.update(
            { image: request.body.image }, 
            { where: { id: request.body.id } }
        );
        
        response.sendStatus(201);
    }
);

app.delete("/restaurants", [
    check('id').trim().isInt()
    ], async (request, response) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) return response.status(400).json({ errors: errors.array() });
        const restaurant = await Restaurant.findByPk(request.body.id);
        restaurant.destroy();
        response.sendStatus(201);
    }
);

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})