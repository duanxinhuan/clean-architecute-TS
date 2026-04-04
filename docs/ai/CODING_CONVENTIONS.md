# Coding Conventions & Architecture Notes

Overview
- Follow the existing Clean Architecture layering: `core` (domain), `application` (services/dtos), `infrastructure` (repositories/mappers), `api` (controllers).

TypeScript & style
- Keep `strict` typing; prefer explicit types for exported functions/DTOs.
- Keep files small and focused (one entity/service per file where reasonable).
- Follow existing naming: PascalCase for classes/entities, camelCase for variables/functions.

Repositories & DB
- Use repository implementations in `src/infrastructure/database` for DB access.
- Map DB rows → domain entities via mappers in `src/infrastructure/mappers`.
- Public APIs should use `externalId` (UUID), not internal DB `id`.

Services & Controllers
- Services accept DTOs (from `src/application/dtos`) and return domain-safe results.
- Controllers should convert HTTP payloads → DTOs, call services, and return DTOs only.

Testing & CI
- Add unit tests for non-trivial logic; keep side-effecting code in integration tests.
- Do not commit code that breaks existing tests or lint rules.

Logging & Errors
- Return typed errors where appropriate; use the framework error handler in `src/framework/errorHandler.ts`.
- Avoid leaking internal stack traces in API responses.

Safety
- Do not change the DI cradle shape in `src/container.ts` without updating dependent code.
- Keep migrations additive and reversible.
