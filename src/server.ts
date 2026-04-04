import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { buildSwaggerSpec } from './swagger';
import { registerControllers } from './framework/router';
import HeroController from './api/controllers/heroController';
import { collectControllers } from './framework/autoControllers';
import { container } from './container';
import { errorHandler } from './framework/errorHandler';

const app = express();
app.use(express.json());

const controllers = collectControllers();
const swaggerSpec = buildSwaggerSpec(controllers);

// expose raw spec for debugging/consumption
app.get('/docs/spec.json', (_req, res) => res.json(swaggerSpec));

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Register controllers (they resolve services internally via container)
registerControllers(app, controllers);

// Error handler
app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on ${port}`));

export default app;
