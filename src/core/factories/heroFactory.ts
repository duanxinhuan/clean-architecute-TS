import { Hero } from '../entities/hero';
import { Weapon } from '../entities/weapon';
import type { CreateHeroDTO, CreateWeaponDTO } from '../../application/dtos/heroDto';

export class HeroFactory {
  createFromDto(dto: CreateHeroDTO): Hero {
    const weapons = (dto.weapons || []).map(w => new Weapon(undefined, undefined, w.name));
    return new Hero(undefined, undefined, dto.name, weapons);
  }

  createWeaponFromDto(dto: CreateWeaponDTO): Weapon {
    return new Weapon(undefined, undefined, dto.name);
  }
}

export default HeroFactory;
