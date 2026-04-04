# TypeScript AI Template

## 🚀 Purpose

A compact, opinionated TypeScript starter optimized for fast AI-assisted development. Clone the repo and focus on business logic — the template provides DI, Prisma (Postgres), Swagger, and a Clean Architecture scaffold.

---

## ✨ Quick Highlights

- One-command setup: `npm run setup` for deps, DB, and migrations.  
- Clean Architecture: `core` (domain), `application` (services/DTOs), `infrastructure` (repositories/mappers), `api` (controllers).  
- DI: Awilix cradle (`src/container.ts`) is pre-wired.  
- API docs: Swagger available at `/docs`.

<!-- AI-ONLY: MUST READ docs/ai/* — CODING_CONVENTIONS.md, TOOL_USAGE.md, AI_DEV_GUIDELINES.md -->

---



---

## ⚡ Quickstart (2 minutes)

1. Start Postgres (background):

```bash
docker compose up -d
```

2. Run the helper to install deps, generate Prisma client, and apply dev migration:

```bash
npm run setup
```

3. Start the dev server (auto-reload):

```bash
npm run dev
```

Open docs: http://localhost:3000/docs

<!-- AI-ONLY: MUST READ docs/ai/* — CODING_CONVENTIONS.md, TOOL_USAGE.md, AI_DEV_GUIDELINES.md -->

---

## 📁 Project Structure (overview)

```
src/
	api/                # Controllers (decorator-based) and request handling
	application/        # Services and DTOs (business logic)
	core/               # Domain entities, factories, interfaces
	infrastructure/     # Prisma repositories & mappers
	framework/          # Decorators, router registrar, error handler
	container.ts        # Awilix container and ICradle registration
prisma/               # Prisma schema and migrations
```

Key files:
- `src/container.ts` — DI cradle registration
- `src/swagger.ts` — OpenAPI spec builder
- `src/framework/errorHandler.ts` — centralized error handling

---

## 🛠️ Development Workflow

- Use short-lived branches: `feature/<what-you-build>` or `fix/<short-desc>`.  
- For schema changes: add a Prisma migration and run `npx prisma generate`.  
- Keep PRs focused and include a short changelog entry.

Automated checks you should run locally:

```bash
npm run lint    # if configured
npm run build
npm run dev
```

---

## 🧭 API & DTOs

- Controllers live in `src/api/controllers`. Controllers map HTTP requests to application DTOs; application services live in `src/application` and return domain-safe results.
- DTOs are defined in `src/application/dtos` and are used by the runtime Swagger generator when `typescript-json-schema` is available.

Common endpoints in this template:

- `GET /heroes` — list heroes
- `POST /heroes` — create a hero
- `GET /heroes/{externalId}` — get hero by external UUID
- `POST /heroes/{externalId}/weapons` — append a weapon to a hero

---

## 🧾 Swagger / OpenAPI

- The OpenAPI spec is assembled in `src/swagger.ts`. The Swagger UI is mounted at `/docs` and the raw spec JSON is available at `/docs/spec.json`.
- To generate richer component schemas from TypeScript DTOs, install the optional generator:

```bash
npm install --save-dev typescript-json-schema
```

- After changing DTOs, restart the dev server so the spec can refresh. The generator may write debug artifacts to `/tmp` (see `src/swagger.ts`).

Files involved in OpenAPI generation:

- `src/swagger.ts` — spec assembly and schema merging
- `src/framework/decorators.ts` — controller metadata used for path inference
- `src/api/controllers/*.ts` — route handlers and JSDoc comments

---

## 🔎 Debugging & artifacts

- During OpenAPI generation the runtime may write debug files to `/tmp` to aid diagnosis. Examples:
  - `_swagger_generated_components.json`
  - `_swagger_gen_error.txt`
  - `_swagger_dto_files.json`

- If the spec looks stale after changing DTOs or controllers, restart the dev server:

```bash
npm run dev
```

Quick checks:

```bash
curl http://localhost:3000/docs/spec.json
# or open the UI at http://localhost:3000/docs
```

---

## 📝 Notes & acknowledgements

- Internal DB `id` fields are integer autoincrement values for relations; use `externalId` (UUID) for public references.
- Repositories map DB rows → domain entities; services operate on DTOs/entities; controllers expose DTOs only.

Thanks to the authors and maintainers of the libraries used in this template: Awilix, Prisma, Express, and swagger-ui-express.

---

## 🔧 Want more?

- I can add stricter validation (Zod/Joi), automatic Swagger generation from types, unit tests, or GitHub Actions CI. Tell me which and I'll implement it.

