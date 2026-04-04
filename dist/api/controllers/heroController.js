"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeroController = void 0;
const decorators_1 = require("../../framework/decorators");
const container_1 = require("../../container");
let HeroController = class HeroController {
    constructor() {
        this.service = container_1.container.resolve('heroService');
    }
    async create(req, res) {
        /**
         * @openapi
         * /heroes:
         *   post:
         *     tags:
         *       - Hero
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             $ref: '#/components/schemas/CreateHeroDTO'
         *     responses:
         *       '201':
         *         description: Created
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/HeroDTO'
         */
        const request = req.body;
        if (!request || !request.name) {
            res.status(400).json({ error: 'Invalid payload: name is required' });
            return;
        }
        const response = await this.service.createHero(request);
        res.status(201).json(response);
        return;
    }
    /**
     * @openapi
     * /heroes:
     *   get:
     *     tags:
     *       - Hero
     *     responses:
     *       '200':
     *         description: OK
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/HeroDTO'
     */
    async list(req, res) {
        const list = await this.service.getAllHeroes();
        res.json(list);
        return;
    }
    /**
     * @openapi
     * /heroes/{externalId}:
     *   get:
     *     tags:
     *       - Hero
     *     parameters:
     *       - in: path
     *         name: externalId
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       '200':
     *         description: OK
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/HeroDTO'
     *       '404':
     *         description: Not found
     */
    async getByExternal(req, res) {
        const externalId = req.params.externalId;
        const response = await this.service.getByExternalId(externalId);
        if (!response) {
            res.status(404).json({ error: 'Not found' });
            return;
        }
        res.json(response);
        return;
    }
    async appendWeapon(req, res) {
        /**
         * @openapi
         * /heroes/{externalId}/weapons:
         *   post:
         *     tags:
         *       - Hero
         *     parameters:
         *       - in: path
         *         name: externalId
         *         required: true
         *         schema:
         *           type: string
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             $ref: '#/components/schemas/CreateWeaponDTO'
         *     responses:
         *       '200':
         *         description: OK
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/HeroDTO'
         */
        const externalId = req.params.externalId;
        const request = req.body;
        if (!request || !request.name) {
            res.status(400).json({ error: 'Invalid payload: name is required' });
            return;
        }
        const response = await this.service.appendWeaponByExternalId({ externalId, body: request });
        if (!response) {
            res.status(404).json({ error: 'Hero not found' });
            return;
        }
        res.json(response);
        return;
    }
};
exports.HeroController = HeroController;
__decorate([
    (0, decorators_1.Post)('/')
], HeroController.prototype, "create", null);
__decorate([
    (0, decorators_1.Get)('/')
    /**
     * @openapi
     * /heroes:
     *   get:
     *     tags:
     *       - Hero
     *     responses:
     *       '200':
     *         description: OK
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/HeroDTO'
     */
], HeroController.prototype, "list", null);
__decorate([
    (0, decorators_1.Get)('/:externalId')
    /**
     * @openapi
     * /heroes/{externalId}:
     *   get:
     *     tags:
     *       - Hero
     *     parameters:
     *       - in: path
     *         name: externalId
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       '200':
     *         description: OK
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/HeroDTO'
     *       '404':
     *         description: Not found
     */
], HeroController.prototype, "getByExternal", null);
__decorate([
    (0, decorators_1.Post)('/:externalId/weapons')
], HeroController.prototype, "appendWeapon", null);
exports.HeroController = HeroController = __decorate([
    (0, decorators_1.Controller)('/heroes')
], HeroController);
exports.default = HeroController;
