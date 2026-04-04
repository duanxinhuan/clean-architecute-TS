"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hero = void 0;
class Hero {
    constructor(id, externalId, name, weapons = []) {
        this.id = id;
        this.externalId = externalId;
        this.name = name;
        this.weapons = weapons;
    }
}
exports.Hero = Hero;
exports.default = Hero;
