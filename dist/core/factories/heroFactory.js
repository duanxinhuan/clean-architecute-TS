"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeroFactory = void 0;
const hero_1 = require("../entities/hero");
const weapon_1 = require("../entities/weapon");
class HeroFactory {
    createFromDto(dto) {
        const weapons = (dto.weapons || []).map(w => new weapon_1.Weapon(undefined, undefined, w.name));
        return new hero_1.Hero(undefined, undefined, dto.name, weapons);
    }
    createWeaponFromDto(dto) {
        return new weapon_1.Weapon(undefined, undefined, dto.name);
    }
}
exports.HeroFactory = HeroFactory;
exports.default = HeroFactory;
