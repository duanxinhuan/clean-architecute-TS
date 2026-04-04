import type { ICradle } from '../../container';
import type { Hero as HeroEntity } from '../../core/entities/hero';
import type { Weapon as WeaponEntity } from '../../core/entities/weapon';
import type { IHeroRepository } from '../../core/interfaces/iHeroRepository';

export class HeroRepository implements IHeroRepository {
  constructor(private cradle: ICradle) {}

  async create(hero: HeroEntity): Promise<HeroEntity> {
    const payload = this.cradle.heroMapper.toPrismaPayload(hero as any);
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

  async appendWeapon(heroId: number, weapon: WeaponEntity): Promise<HeroEntity | null> {
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

  async findById(id: number): Promise<HeroEntity | null> {
    const found = await this.cradle.prisma.hero.findUnique({ where: { id }, include: { weapons: true } });
    return this.cradle.heroMapper.toEntity(found);
  }

  async findByExternalId(externalId: string): Promise<HeroEntity | null> {
    const found = await this.cradle.prisma.hero.findUnique({ where: { externalId }, include: { weapons: true } });
    return this.cradle.heroMapper.toEntity(found);
  }

  async findAll(): Promise<HeroEntity[]> {
    const rows = await this.cradle.prisma.hero.findMany({ include: { weapons: true } });
    return rows.map(r => this.cradle.heroMapper.toEntity(r));
  }
}

export default HeroRepository;
