"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = exports.Get = void 0;
exports.Controller = Controller;
function Controller(basePath = '') {
    return function (constructor) {
        constructor.__basePath = basePath;
        if (!(constructor.__routes))
            constructor.__routes = [];
    };
}
function route(method, path) {
    return function (target, propertyKey) {
        const ctor = target.constructor;
        const routes = ctor.__routes = ctor.__routes || [];
        routes.push({ path, method, handlerName: propertyKey });
    };
}
const Get = (path) => route('get', path);
exports.Get = Get;
const Post = (path) => route('post', path);
exports.Post = Post;
