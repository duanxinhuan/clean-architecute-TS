"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
const awilix_1 = require("awilix");
const client_1 = require("@prisma/client");
const heroRepository_1 = require("./infrastructure/database/heroRepository");
const heroService_1 = require("./application/services/heroService");
const heroFactory_1 = require("./core/factories/heroFactory");
const heroMapper_1 = require("./infrastructure/mappers/heroMapper");
exports.container = (0, awilix_1.createContainer)({
    injectionMode: awilix_1.InjectionMode.PROXY,
});
exports.container.register({
    // Create PrismaClient lazily to avoid runtime issues before `prisma generate` or engine availability.
    prisma: (0, awilix_1.asFunction)(() => new client_1.PrismaClient()).singleton(),
    heroMapper: (0, awilix_1.asValue)(heroMapper_1.heroMapper),
    heroFactory: (0, awilix_1.asClass)(heroFactory_1.HeroFactory).singleton(),
    heroRepository: (0, awilix_1.asClass)(heroRepository_1.HeroRepository).scoped(),
    heroService: (0, awilix_1.asClass)(heroService_1.HeroService).scoped(),
});
exports.default = exports.container;
