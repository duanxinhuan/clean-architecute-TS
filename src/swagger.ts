import swaggerJsdoc from 'swagger-jsdoc';
import fs from 'fs';
import path from 'path';

type ControllerCtor = Function & { __basePath?: string; __routes?: Array<any> };

function generateSchemasFromDtoFiles(dtoFiles: string[]) {
  try {
    try { require('fs').writeFileSync('/tmp/_swagger_dto_files.json', JSON.stringify(dtoFiles, null, 2)); } catch (e) {}
    // load typescript-json-schema dynamically (optional dependency)
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const TJS = require('typescript-json-schema');

    const settings = { required: true };
    const compilerOptions = { strictNullChecks: true };

    const absFiles = dtoFiles.map(f => path.isAbsolute(f) ? f : path.join(process.cwd(), f)).filter(f => fs.existsSync(f));
    if (!absFiles.length) return undefined;

    const program = TJS.getProgramFromFiles(absFiles, compilerOptions);
    const generator = TJS.buildGenerator(program, settings);
    if (!generator) return undefined;

    const symbols = generator.getUserSymbols();
    const schemas: any = {};
    const targets = ['CreateHeroDTO', 'CreateWeaponDTO', 'HeroDTO', 'WeaponDTO'];
    for (const s of targets) {
      if (!symbols.includes(s)) continue;
      try {
        const schema = generator.getSchemaForSymbol(s);
        if (schema && (schema.$schema !== undefined || typeof schema === 'object')) schemas[s] = schema;
      } catch (e) {
        // ignore symbol errors
      }
    }

    try { require('fs').writeFileSync('/tmp/_swagger_generated_raw.json', JSON.stringify(Object.keys(schemas), null, 2)); } catch (e) {}
    return schemas;
  } catch (err) {
    try { require('fs').writeFileSync('/tmp/_swagger_gen_error.txt', String(err)); } catch (e) {}
    return undefined;
  }
}

export function buildSwaggerSpec(controllers?: ControllerCtor[]) {
  const options = {
    definition: {
      openapi: '3.0.0',
      info: { title: 'TypeScript AI Template API', version: '0.1.0' },
    },
    apis: ['./src/api/controllers/*.ts', './src/application/dtos/*.ts'],
  } as any;

  const doc = swaggerJsdoc(options) as any;

  // Try to generate component schemas from DTO TS files if possible
  const dtoDir = path.join(process.cwd(), 'src', 'application', 'dtos');
  let dtoFiles: string[] = [];
  try {
    dtoFiles = require('fs').readdirSync(dtoDir).filter((f: string) => f.endsWith('.ts')).map((f: string) => path.join(dtoDir, f));
  } catch (e) {
    dtoFiles = ['./src/application/dtos/heroDto.ts'];
  }

  const generated = generateSchemasFromDtoFiles(dtoFiles);
  if (generated) {
    doc.components = doc.components || {};
    doc.components.schemas = doc.components.schemas || {};

    for (const [name, schema] of Object.entries(generated)) {
      try {
        // stringify and replace internal definitions $refs to components path
        const s = JSON.stringify(schema).replace(/#\/definitions\//g, '#/components/schemas/');
        const parsed = JSON.parse(s);

        // Merge any nested definitions into components.schemas
        if ((parsed as any).definitions) {
          for (const [dname, dschema] of Object.entries((parsed as any).definitions)) {
            const ds = JSON.parse(JSON.stringify(dschema).replace(/#\/definitions\//g, '#/components/schemas/'));
            doc.components.schemas[dname] = ds;
          }
          delete (parsed as any).definitions;
        }

        doc.components.schemas[name] = parsed;
      } catch (err) {
        // ignore per-schema failures
      }
    }
    try {
      require('fs').writeFileSync('/tmp/_swagger_generated_components.json', JSON.stringify(Object.keys(doc.components.schemas), null, 2));
    } catch (e) {}
  }

  // If controllers are provided, infer simple path entries from their metadata
  if (controllers && controllers.length) {
    doc.paths = doc.paths || {};

    for (const Ctor of controllers) {
      const basePath = (Ctor as any).__basePath || '';
      const routes = (Ctor as any).__routes || [];
      const tag = (Ctor as any).name ? (Ctor as any).name.replace(/Controller$/, '') : 'Controller';

      for (const r of routes) {
        const raw = (basePath + r.path).replace(/\/+/g, '/');
        const pathStr = raw.replace(/:([a-zA-Z0-9_]+)/g, '{$1}');

        // collect path parameters
        const params: any[] = [];
        const paramMatches = pathStr.matchAll(/\{([^}]+)\}/g);
        for (const m of paramMatches) {
          params.push({ name: m[1], in: 'path', required: true, schema: { type: 'string' } });
        }

        doc.paths[pathStr] = doc.paths[pathStr] || {};

        // add stub operation only when missing
        if (!doc.paths[pathStr][r.method]) {
          const operation: any = {
            tags: [tag],
            summary: r.handlerName,
            parameters: params.length ? params : undefined,
            responses: { '200': { description: 'OK' } },
          };

          // Add common request/response mappings by handler name
          if (r.method === 'post') {
            if (r.handlerName === 'create' || pathStr === '/heroes/' && r.handlerName === 'create') {
              operation.requestBody = {
                required: true,
                content: { 'application/json': { schema: { $ref: '#/components/schemas/CreateHeroDTO' } } },
              };
              operation.responses = {
                '201': { description: 'Created', content: { 'application/json': { schema: { $ref: '#/components/schemas/HeroDTO' } } } },
              };
            } else if (r.handlerName === 'appendWeapon' || pathStr.endsWith('/weapons')) {
              operation.requestBody = {
                required: true,
                content: { 'application/json': { schema: { $ref: '#/components/schemas/CreateWeaponDTO' } } },
              };
              operation.responses = {
                '200': { description: 'OK', content: { 'application/json': { schema: { $ref: '#/components/schemas/HeroDTO' } } } },
                '404': { description: 'Not found' },
              };
            }
          }

          // For get by id, add 404 and 200 with HeroDTO
          if (r.method === 'get' && (r.handlerName === 'getByExternal' || pathStr.match(/\{.+\}/))) {
            operation.responses = {
              '200': { description: 'OK', content: { 'application/json': { schema: { $ref: '#/components/schemas/HeroDTO' } } } },
              '404': { description: 'Not found' },
            };
          }

          doc.paths[pathStr][r.method] = operation;
        }
      }
    }
  }

  return doc;
}
