import { Weapon } from './weapon';

export class Hero {
  constructor(
    public id: number | undefined,
    public externalId: string | undefined,
    public name: string,
    public weapons: Weapon[] = [],
  ) {}
}

export default Hero;
