"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeroService = void 0;
class HeroService {
    constructor(cradle) {
        this.cradle = cradle;
    }
    async createHero(request) {
        const entity = this.cradle.heroFactory.createFromDto(request);
        const created = await this.cradle.heroRepository.create(entity);
        const response = this.entityToDto(created);
        return response;
    }
    async appendWeapon(heroId, request) {
        const weaponEntity = this.cradle.heroFactory.createWeaponFromDto(request);
        const updated = await this.cradle.heroRepository.appendWeapon(heroId, weaponEntity);
        return updated ? this.entityToDto(updated) : null;
    }
    async appendWeaponByExternalId(request) {
        const { externalId, body } = request;
        const hero = await this.cradle.heroRepository.findByExternalId(externalId);
        if (!hero)
            return null;
        const updated = await this.cradle.heroRepository.appendWeapon(hero.id, body);
        return updated ? this.entityToDto(updated) : null;
    }
    async getAllHeroes() {
        const entities = await this.cradle.heroRepository.findAll();
        return (entities || []).map(e => this.entityToDto(e));
    }
    async getByExternalId(externalId) {
        const entity = await this.cradle.heroRepository.findByExternalId(externalId);
        return entity ? this.entityToDto(entity) : null;
    }
    entityToDto(entity) {
        return {
            id: entity.id,
            externalId: entity.externalId,
            name: entity.name,
            weapons: (entity.weapons || []).map((w) => ({ id: w.id, externalId: w.externalId, name: w.name })),
        };
    }
}
exports.HeroService = HeroService;
exports.default = HeroService;
