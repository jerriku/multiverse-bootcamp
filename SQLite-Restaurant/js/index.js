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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dao_1 = __importDefault(require("./dao"));
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        const dao = new dao_1.default('../restaurants.db', '../restaurants.json');
        try {
            dao.initialise();
            //await dao.createTable();
            //await dao.populate();
            dao.check(`SELECT Restaurants.name AS Restaurant, Menus.title AS Menu, MenuItems.name AS Item
                   FROM Restaurants
                   JOIN Menus ON Restaurants.id = Menus.restaurant_id
                   JOIN MenuItems ON Menus.id = MenuItems.menu_id`);
        }
        finally {
            dao.close();
        }
    });
}
;
start();
