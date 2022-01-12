"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dao_1 = __importDefault(require("./dao"));
const restaurant = new dao_1.default('../restaurants.json', '../restaurants.db');
restaurant.initialise();
restaurant.populate();
