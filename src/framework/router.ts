import type { Express, Request, Response, NextFunction } from 'express';
import type { RouteDefinition } from './decorators';

export function registerControllers(app: Express, controllers: Function[]) {
  for (const Ctor of controllers) {
    const basePath: string = (Ctor as any).__basePath || '';
    const routes: RouteDefinition[] = (Ctor as any).__routes || [];

    // instantiate controller (it may resolve services internally via container)
    const instance: any = new (Ctor as any)();

    for (const r of routes) {
      const fullPath = (basePath + r.path).replace(/\/+/g, '/');
      (app as any)[r.method](fullPath, async (req: Request, res: Response, next: NextFunction) => {
        try {
          const result = await instance[r.handlerName](req, res, next);
          if (res.headersSent) return;
          res.json(result);
        } catch (err) {
          next(err);
        }
      });
    }
  }
}
