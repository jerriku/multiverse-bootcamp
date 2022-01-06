"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Person_1 = __importDefault(require("./Person"));
class CrewMember extends Person_1.default {
    constructor(name, position, staffNumber) {
        super(name);
        this.position = position;
        this.staffNumber = staffNumber;
    }
}
module.exports = CrewMember;
