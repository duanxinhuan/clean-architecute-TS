"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const heroController_1 = require("./api/controllers/heroController");
async function main() {
    const controller = new heroController_1.HeroController();
    // Lightweight mock `res` used by controllers in this example
    const res = {
        status: (_) => ({ json: (obj) => obj }),
        json: (obj) => obj,
    };
    // Example: create a hero via DTO (controller writes to `res`)
    await controller.create({ body: { name: 'Eris', weapons: [] } }, res);
    // Example: append weapon by externalId
    await controller.appendWeapon({ params: { externalId: 'h1' }, body: { name: 'Night Blade' } }, res);
}
main().catch(err => console.error(err));
