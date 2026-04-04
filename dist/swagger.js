"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildSwaggerSpec = buildSwaggerSpec;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
function buildSwaggerSpec() {
    const options = {
        definition: {
            openapi: '3.0.0',
            info: { title: 'TypeScript AI Template API', version: '0.1.0' },
            components: {
                schemas: {
                    WeaponDTO: {
                        type: 'object',
                        properties: { id: { type: 'number' }, externalId: { type: 'string' }, name: { type: 'string' } },
                        required: ['id', 'externalId', 'name'],
                    },
                    HeroDTO: {
                        type: 'object',
                        properties: {
                            id: { type: 'number' },
                            externalId: { type: 'string' },
                            name: { type: 'string' },
                            weapons: { type: 'array', items: { $ref: '#/components/schemas/WeaponDTO' } },
                        },
                        required: ['id', 'externalId', 'name'],
                    },
                },
            },
            paths: {
                '/heroes': {
                    get: {
                        tags: ['Hero'],
                        summary: 'List heroes',
                        responses: { '200': { description: 'OK' } },
                    },
                    post: {
                        tags: ['Hero'],
                        summary: 'Create hero',
                        requestBody: {
                            required: true,
                            content: { 'application/json': { schema: { type: 'object', properties: { name: { type: 'string' }, weapons: { type: 'array', items: { type: 'object', properties: { name: { type: 'string' } }, required: ['name'] } } }, required: ['name'] } } },
                        },
                        responses: { '201': { description: 'Created' } },
                    },
                },
                '/heroes/{externalId}': {
                    get: {
                        tags: ['Hero'],
                        summary: 'Get hero by externalId',
                        parameters: [{ name: 'externalId', in: 'path', required: true, schema: { type: 'string' } }],
                        responses: { '200': { description: 'OK' }, '404': { description: 'Not found' } },
                    },
                },
                '/heroes/{externalId}/weapons': {
                    post: {
                        tags: ['Hero'],
                        summary: 'Append weapon to hero by externalId',
                        parameters: [{ name: 'externalId', in: 'path', required: true, schema: { type: 'string' } }],
                        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', properties: { name: { type: 'string' } }, required: ['name'] } } } },
                        responses: { '200': { description: 'OK' }, '404': { description: 'Not found' } },
                    },
                },
            },
        },
        apis: ['./src/api/controllers/*.ts', './src/application/dtos/*.ts'],
    };
    return (0, swagger_jsdoc_1.default)(options);
}
