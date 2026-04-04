import type { Hero } from '../entities/hero';
import type { Weapon } from '../entities/weapon';

export interface IHeroRepository {
  create(hero: Partial<Hero>): Promise<Hero>;
  appendWeapon(heroId: number, weapon: Partial<Weapon>): Promise<Hero | null>;
  findById(id: number): Promise<Hero | null>;
  findByExternalId(externalId: string): Promise<Hero | null>;
  findAll(): Promise<Hero[]>;
}

export default IHeroRepository;
