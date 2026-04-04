import type { ICradle } from '../../container';
import type { CreateHeroDTO, HeroDTO, CreateWeaponDTO } from '../dtos/heroDto';

export class HeroService {
  constructor(private cradle: ICradle) {}

  async createHero(request: CreateHeroDTO): Promise<HeroDTO> {
    const entity = this.cradle.heroFactory.createFromDto(request);
    const created = await this.cradle.heroRepository.create(entity as any);
    const response = this.entityToDto(created);
    return response;
  }

  async appendWeapon(heroId: number, request: CreateWeaponDTO): Promise<HeroDTO | null> {
    const weaponEntity = this.cradle.heroFactory.createWeaponFromDto(request);
    const updated = await this.cradle.heroRepository.appendWeapon(heroId, weaponEntity as any);
    return updated ? this.entityToDto(updated) : null;
  }

  async appendWeaponByExternalId(request: { externalId: string; body: CreateWeaponDTO }): Promise<HeroDTO | null> {
    const { externalId, body } = request;
    const hero = await this.cradle.heroRepository.findByExternalId(externalId);
    if (!hero) return null;
    const updated = await this.cradle.heroRepository.appendWeapon(hero.id as number, body as any);
    return updated ? this.entityToDto(updated) : null;
  }

  async getAllHeroes(): Promise<HeroDTO[]> {
    const entities = await this.cradle.heroRepository.findAll();
    return (entities || []).map(e => this.entityToDto(e));
  }

  async getByExternalId(externalId: string): Promise<HeroDTO | null> {
    const entity = await this.cradle.heroRepository.findByExternalId(externalId);
    return entity ? this.entityToDto(entity) : null;
  }

  private entityToDto(entity: any): HeroDTO {
    return {
      id: entity.id as number,
      externalId: entity.externalId,
      name: entity.name,
      weapons: (entity.weapons || []).map((w: any) => ({ id: w.id, externalId: w.externalId, name: w.name })),
    };
  }
}

export default HeroService;
