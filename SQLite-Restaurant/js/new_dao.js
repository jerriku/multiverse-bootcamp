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
class DataAccessObject {
    constructor(data, file) {
        this.data = "";
        this.file = "";
        this.results = [];
        if (!data || !file)
            return;
        this.data = data;
        this.file = file;
    }
    initialise() {
        this.database = new sqlite3.Database(this.data);
    }
    createTable() {
        if (!this.database)
            return;
        this.database.exec(//Creates restaurant table if it doesn't exist.
        'CREATE TABLE IF NOT EXISTS RESTAURANTS (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, imagelink TEXT)');
        this.database.exec(//Creates menus table if it doesn't exist.
        'CREATE TABLE IF NOT EXISTS MENUS (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, restaurant_id INTEGER, FOREIGN KEY (restaurant_id) REFERENCES RESTAURANTS(id))');
        this.database.exec(//Creates menuitems table if it doesn't exist.
        'CREATE TABLE IF NOT EXISTS MENUITEMS (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, price REAL, menu_id INTEGER, FOREIGN KEY (menu_id) REFERENCES MENUS(id))');
    }
    populate() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.database)
                return;
            let restaurants;
            let menus;
            let menuItems;
            const buffer = yield fsp.readFile(this.file);
            restaurants = JSON.parse(String(buffer));
            this.database.serialize(() => {
                let restaurant_id = 1;
                let menu_id = 1;
                restaurants.forEach(restaurant => {
                    this.database.run('INSERT INTO RESTAURANTS (name, imagelink) VALUES (?, ?)', restaurant.name, restaurant.image);
                    menus = restaurant.menus;
                    menus.forEach(menu => {
                        this.database.run('INSERT INTO MENUS (title, restaurant_id) VALUES (?, ?)', menu.title, restaurant_id);
                        menuItems = menu.items;
                        menuItems.forEach(item => {
                            this.database.run('INSERT INTO MENUITEMS (name, price, menu_id) VALUES (?, ?, ?)', item.name, item.price, menu_id);
                        });
                        menu_id++;
                    });
                    restaurant_id++;
                });
            });
        });
    }
    check(expr) {
        try {
            this.database.all(expr, (err, row) => {
                this.results.push(row);
                console.log(this.results);
            });
            console.log(this.results);
        }
        finally {
            console.log(this.results);
            return this.results;
        }
    }
    close() {
        this.database.close();
    }
}
module.exports = DataAccessObject;
