/**
 * DTO interfaces for heroes and weapons.
 */
export interface CreateWeaponDTO {
  name: string;
}

export interface CreateHeroDTO {
  name: string;
  weapons?: CreateWeaponDTO[];
}

export interface WeaponDTO {
  id: number; // internal id
  externalId: string;
  name: string;
}

export interface HeroDTO {
  id: number; // internal id
  externalId: string;
  name: string;
  weapons?: WeaponDTO[];
}

export default HeroDTO;
