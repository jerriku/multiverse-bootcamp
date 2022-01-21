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
    const restaurants = await Restaurant.findAll();
    response.json(restaurants);
});

app.get("/restaurants/:id", async (request, response) => {
    const restaurant = await Restaurant.findByPk(request.params.id);
    response.json(restaurant);
});

app.get("/menus", async (request, response) => {
    const restaurants = await Restaurant.findAll();
    response.json(restaurants);
});

app.get("/menus/:id", async (request, response) => {
    const restaurant = await Restaurant.findByPk(request.params.id);
    response.json(restaurant);
});

app.get("/menuitems", async (request, response) => {
    const restaurants = await Menu.findAll();
    response.json(restaurants);
});

app.get("/menuitems/:id", async (request, response) => {
    const restaurant = await Restaurant.findByPk(request.params.id);
    response.json(restaurant);
});

app.post('/restaurants', [
    check('name').trim().notEmpty().isLength({max: 50}).whitelist('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ '),
    check('image').trim().isURL()
    ], async (request, response) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            console.log(errors.array());
            return response.status(400).json({ errors: errors.array() })
        };
        await Restaurant.create({name: request.body.name, image: request.body.image});
        response.sendStatus(201);
    }
);

app.post('/restaurants/:id/menus', [
    check('title').trim().notEmpty().isLength({max: 50})
    ], async (request, response) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) return response.status(400).json({ errors: errors.array() });
        await Menu.create({title: request.body.title, restaurant_id: request.params.id});
        response.sendStatus(201);
    }
)

app.post("menus/:menuid/items", [
    check('name').trim().notEmpty().isLength({max: 50}),
    check('price').trim().isCurrency({allow_negatives: false})
    ], async (request, response) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) return response.status(400).json({ errors: errors.array() });
        await MenuItem.create({name: request.body.name, price: request.body.price, menu_id: request.params.menuid});
        response.sendStatus(201);
    }
);

app.patch("/restaurants/:id", [
    check('name').trim().notEmpty().isLength({max: 50}).whitelist('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ ').exists(),
    check('image').trim().isURL().exists()
    ], async (request, response) => {
        if(!parseInt(request.params.id)) return response.sendStatus(400);

        let nameExist = true;
        let imageExist = true;
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            const allErrors = errors.array();
            for (let i = 0; i < allErrors.length; i++) {
                if (allErrors[i].param === "name") nameExist = false;
                if (allErrors[i].param === "image") imageExist = false;
            }
            if (!nameExist && !imageExist) return response.status(400).json({ errors: allErrors });
        }

        if (nameExist) await Restaurant.update(
            { name: request.body.name }, 
            { where: { id: request.params.id } }
        );

        if (imageExist) await Restaurant.update(
            { image: request.body.image }, 
            { where: { id: request.params.id } }
        );
        
        response.sendStatus(201);
    }
);

app.patch("/restaurants/:id/menus/:menuid", [
    check('title').trim().notEmpty().isLength({max: 50})
    ], async (request, response) => {
        if(!parseInt(request.params.id) || !parseInt(request.params.menuid)) return response.sendStatus(400);
        const errors = validationResult(request);
        if(!errors.isEmpty()) return response.status(400).json({ errors: errors.array() });

        if (request.body.title) await Menu.update(
            { title: request.body.title }, 
            { where: { id: request.params.menuid } }
        );
        
        if (request.params.id) await Menu.update(
            { restaurant_id: request.params.id }, 
            { where: { id: request.params.menuid } }
        );
        
        response.sendStatus(201);
    }
);

app.patch("menus/:menuid/menuitems/:itemid", [
    check('name').trim().notEmpty().isLength({max: 50}),
    check('price').trim().isCurrency({allow_negatives: false})
    ], async (request, response) => {
    if(!parseInt(request.params.itemid) || !parseInt(request.params.menuid)) return response.sendStatus(400);
    
    let nameExist = true;
    let priceExist = true;
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        const allErrors = errors.array();
        for (let i = 0; i < allErrors.length; i++) {
            if (allErrors[i].param === "name") nameExist = false;
            if (allErrors[i].param === "image") priceExist = false;
        }
        if (!nameExist && !priceExist) return response.status(400).json({ errors: allErrors });
    }

    if (nameExist) await MenuItem.update(
        { title: request.body.name }, 
        { where: { id: request.params.itemid } }
    );

    if (priceExist) await MenuItem.update(
        { price: request.body.price },
        { where: { id: request.params.itemid } }
    );

    if (request.params.menuid) await MenuItem.update(
        { menu_id: request.params.menuid }, 
        { where: { id: request.params.itemid } }
    );
    
    response.sendStatus(201);
}
);

app.delete("/restaurants/:id", async (request, response) => {
    if(!parseInt(request.params.id)) return response.sendStatus(400);

    const restaurant = await Restaurant.findByPk(request.params.id);
    restaurant.destroy();
    response.sendStatus(201);
});

app.delete("/menus/:id", async (request, response) => {
    if(!parseInt(request.params.id)) return response.sendStatus(400);

    const menu = await Menu.findByPk(request.params.id);
    menu.destroy();
    response.sendStatus(201);
});

app.delete("/menuitems/:id", async (request, response) => {
    if(!parseInt(request.params.id)) return response.sendStatus(400);

    const menuItem = await MenuItem.findByPk(request.params.id);
    menuItem.destroy();
    response.sendStatus(201);
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})