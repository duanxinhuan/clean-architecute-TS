type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

interface RouteDefinition {
  path: string;
  method: HttpMethod;
  handlerName: string;
}

export function Controller(basePath = '') {
  return function (constructor: Function) {
    (constructor as any).__basePath = basePath;
    if (!((constructor as any).__routes)) (constructor as any).__routes = [];
  };
}

function route(method: HttpMethod, path: string) {
  return function (target: any, propertyKey: string) {
    const ctor = target.constructor;
    const routes: RouteDefinition[] = ctor.__routes = ctor.__routes || [];
    routes.push({ path, method, handlerName: propertyKey });
  };
}

export const Get = (path: string) => route('get', path);
export const Post = (path: string) => route('post', path);

export type { RouteDefinition };
