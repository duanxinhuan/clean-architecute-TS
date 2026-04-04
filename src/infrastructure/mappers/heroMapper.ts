import { Hero } from '../../core/entities/hero';
import { Weapon } from '../../core/entities/weapon';

export const heroMapper = {
  toEntity(prismaRecord: any): Hero {
    if (!prismaRecord) return null as any;
    const weapons = (prismaRecord.weapons || []).map((w: any) => new Weapon(w.id as number, w.externalId, w.name));
    return new Hero(prismaRecord.id as number, prismaRecord.externalId, prismaRecord.name, weapons);
  },

  // Prepare payloads for Prisma create/update. For creates we don't include id/externalId so DB defaults apply.
  toPrismaPayload(entity: Hero): any {
    return {
      name: entity.name,
      weapons: entity.weapons?.map(w => ({ name: w.name })) || [],
    };
  },
};

export default heroMapper;
