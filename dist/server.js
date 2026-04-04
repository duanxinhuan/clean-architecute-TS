"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = require("./swagger");
const router_1 = require("./framework/router");
const heroController_1 = __importDefault(require("./api/controllers/heroController"));
const errorHandler_1 = require("./framework/errorHandler");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const swaggerSpec = (0, swagger_1.buildSwaggerSpec)();
app.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
// Register controllers (they resolve services internally via container)
(0, router_1.registerControllers)(app, [heroController_1.default]);
// Error handler
app.use(errorHandler_1.errorHandler);
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on ${port}`));
exports.default = app;
