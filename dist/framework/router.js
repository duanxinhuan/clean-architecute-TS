"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerControllers = registerControllers;
function registerControllers(app, controllers) {
    for (const Ctor of controllers) {
        const basePath = Ctor.__basePath || '';
        const routes = Ctor.__routes || [];
        // instantiate controller (it may resolve services internally via container)
        const instance = new Ctor();
        for (const r of routes) {
            const fullPath = (basePath + r.path).replace(/\/+/g, '/');
            app[r.method](fullPath, async (req, res, next) => {
                try {
                    const result = await instance[r.handlerName](req, res, next);
                    if (res.headersSent)
                        return;
                    res.json(result);
                }
                catch (err) {
                    next(err);
                }
            });
        }
    }
}
