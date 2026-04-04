"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeroRepository = void 0;
class HeroRepository {
    constructor(cradle) {
        this.cradle = cradle;
    }
    async create(hero) {
        const payload = this.cradle.heroMapper.toPrismaPayload(hero);
        console.log('PRISMA CREATE PAYLOAD:', JSON.stringify(payload));
        const created = await this.cradle.prisma.hero.create({
            data: {
                name: payload.name,
                weapons: {
                    create: payload.weapons,
                },
            },
            include: { weapons: true },
        });
        return this.cradle.heroMapper.toEntity(created);
    }
    async appendWeapon(heroId, weapon) {
        await this.cradle.prisma.weapon.create({
            data: {
                name: weapon.name,
                hero: { connect: { id: heroId } },
            },
        });
        const updated = await this.cradle.prisma.hero.findUnique({
            where: { id: heroId },
            include: { weapons: true },
        });
        return this.cradle.heroMapper.toEntity(updated);
    }
    async findById(id) {
        const found = await this.cradle.prisma.hero.findUnique({ where: { id }, include: { weapons: true } });
        return this.cradle.heroMapper.toEntity(found);
    }
    async findByExternalId(externalId) {
        const found = await this.cradle.prisma.hero.findUnique({ where: { externalId }, include: { weapons: true } });
        return this.cradle.heroMapper.toEntity(found);
    }
    async findAll() {
        const rows = await this.cradle.prisma.hero.findMany({ include: { weapons: true } });
        return rows.map(r => this.cradle.heroMapper.toEntity(r));
    }
}
exports.HeroRepository = HeroRepository;
exports.default = HeroRepository;
