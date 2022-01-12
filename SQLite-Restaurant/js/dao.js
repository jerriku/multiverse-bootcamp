"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const sqlite3 = require('sqlite3').verbose();
const fsp = require('fs').promises;
class RestaurantDAO {
    constructor(file, data) {
        this.data = data;
        this.file = file;
    }
    initialise() {
        const db = new sqlite3.Database(this.data, (error) => {
            if (error)
                return console.error(error.message);
            console.log(`Connected to -- ${this.data} -- database.`);
        });
        try {
            db.serialize(() => {
                db.run(`CREATE TABLE IF NOT EXISTS RESTAURANTS (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, imagelink TEXT)`);
                db.run(`CREATE TABLE IF NOT EXISTS MENUS (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, restaurant_id INTEGER, FOREIGN KEY (restaurant_id) REFERENCES RESTAURANTS(id))`);
                db.run(`CREATE TABLE IF NOT EXISTS MENUITEMS (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, price REAL, menu_id INTEGER, FOREIGN KEY (menu_id) REFERENCES MENUS(id))`);
            });
        }
        finally {
            db.close((error) => {
                if (error)
                    return console.error(error.message);
                console.log(`Closed the -- ${this.data} -- database.`);
            });
        }
    }
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            const buffer = yield fsp.readFile(this.file);
            return JSON.parse(String(buffer));
        });
    }
    populateTable(restaurantsData) {
        const db = new sqlite3.Database(this.data, (error) => {
            if (error)
                return console.error(error.message);
            console.log(`Connected to -- ${this.data} -- database.`);
        });
        let restaurants;
        let menus;
        let menuItems;
        restaurants = restaurantsData;
        try {
            db.serialize(() => {
                let restaurantStmt, menuStmt, menuItemStmt;
                try {
                    restaurantStmt = db.prepare('INSERT INTO RESTAURANTS (name, imagelink) VALUES (?, ?)');
                    menuStmt = db.prepare('INSERT INTO MENUS (title, restaurant_id) VALUES (?, ?)');
                    menuItemStmt = db.prepare('INSERT INTO MENUITEMS (name, price, menu_id) VALUES (?, ?, ?)');
                    let restaurant_id = 1;
                    let menu_id = 1;
                    restaurants.forEach(restaurant => {
                        restaurantStmt.run(restaurant.name, restaurant.image);
                        menus = restaurant.menus;
                        menus.forEach(menu => {
                            menuStmt.run(menu.title, restaurant_id);
                            menuItems = menu.items;
                            menuItems.forEach(item => {
                                menuItemStmt.run(item.name, item.price, menu_id);
                            });
                            menu_id++;
                        });
                        restaurant_id++;
                    });
                }
                finally {
                    restaurantStmt.finalize();
                    menuStmt.finalize();
                    menuItemStmt.finalize();
                }
            });
        }
        finally {
            db.close((error) => {
                if (error)
                    return console.error(error.message);
                console.log(`Closed the -- ${this.data} -- database.`);
            });
        }
    }
    populate() {
        this.load().then(restaurants => this.populateTable(restaurants))
            .catch(error => console.error(error.message));
    }
    getFile() {
        return this.file;
    }
    getData() {
        return this.data;
    }
}
module.exports = RestaurantDAO;
