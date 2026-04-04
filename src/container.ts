import { createContainer, asClass, asValue, asFunction, InjectionMode } from 'awilix';
import { PrismaClient } from '@prisma/client';

import { HeroRepository } from './infrastructure/database/heroRepository';
import { HeroService } from './application/services/heroService';
import { HeroFactory } from './core/factories/heroFactory';
import { heroMapper } from './infrastructure/mappers/heroMapper';
import type { IHeroRepository } from './core/interfaces/iHeroRepository';

export interface ICradle {
  prisma: PrismaClient;
  heroRepository: IHeroRepository;
  heroService: HeroService;
  heroFactory: HeroFactory;
  heroMapper: typeof heroMapper;
}

export const container = createContainer<ICradle>({
  injectionMode: InjectionMode.PROXY,
});

container.register({
  // Create PrismaClient lazily to avoid runtime issues before `prisma generate` or engine availability.
  prisma: asFunction(() => new PrismaClient()).singleton(),
  heroMapper: asValue(heroMapper),
  heroFactory: asClass(HeroFactory).singleton(),
  heroRepository: asClass(HeroRepository).scoped(),
  heroService: asClass(HeroService).scoped(),
});

export default container;
