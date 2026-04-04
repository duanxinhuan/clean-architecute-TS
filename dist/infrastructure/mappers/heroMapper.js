"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.heroMapper = void 0;
const hero_1 = require("../../core/entities/hero");
const weapon_1 = require("../../core/entities/weapon");
exports.heroMapper = {
    toEntity(prismaRecord) {
        if (!prismaRecord)
            return null;
        const weapons = (prismaRecord.weapons || []).map((w) => new weapon_1.Weapon(w.id, w.externalId, w.name));
        return new hero_1.Hero(prismaRecord.id, prismaRecord.externalId, prismaRecord.name, weapons);
    },
    // Prepare payloads for Prisma create/update. For creates we don't include id/externalId so DB defaults apply.
    toPrismaPayload(entity) {
        return {
            name: entity.name,
            weapons: entity.weapons?.map(w => ({ name: w.name })) || [],
        };
    },
};
exports.default = exports.heroMapper;
