---
name: start-backend
description: "Skill to start the backend from scratch: install deps, start DB, apply migrations, and run server. Step-by-step, short commands."
---

# Start Backend (Step-by-step)

Purpose: small, deterministic checklist to get the backend running locally from a fresh clone.

Prerequisites
- Docker and Docker Compose available OR a reachable Postgres instance
- Node.js and npm installed

Steps
1. Install dependencies
   - Run: `npm install`

2. Prepare environment
   - Copy example env: `cp .env.example .env` (edit if needed)

3. Start Postgres (recommended via docker-compose)
   - Run: `docker compose up -d`
   - Wait until healthy: `docker compose exec -T postgres pg_isready -U postgres`
   - If Docker unavailable, point `DATABASE_URL` in `.env` to your Postgres host

4. Generate Prisma client
   - Run: `npx prisma generate`

5. Push schema (no migrations)
   - Run: `npx prisma deploy`
   - This pushes the Prisma schema to the database without creating migration files. Leave detailed migration management to the developer (use `npx prisma migrate` locally when appropriate).
   - If `P1001` error, replace `postgres` host in `.env` with `localhost` (Docker maps ports)

6. Start backend
   - Dev: `npm run dev` (uses `ts-node-dev`)
   - Prod: `npm run build && npm start`

Checks / Quality
- Server logs: should show `Server listening on <port>`
- Prisma: migrations applied folder exists under `prisma/migrations`
- DB: connect with `psql` or a GUI to confirm `badgesafety` database exists

Decision points
- If migrations are already applied, step 5 is a no-op; run `npx prisma migrate status` to inspect.
- If port 5432 is in use or Postgres not starting, retry with a different host/port and update `.env`.

Examples (short)
- Fresh start (docker), schema pushed (no migrations):
   1. `npm install`
   2. `cp .env.example .env`
   3. `docker compose up -d`
   4. `npx prisma generate`
   5. `npx prisma deploy`
   6. `npm run dev`

Troubleshooting tips (short)
- `P1001`: Host unreachable — try `localhost` in `.env` or `docker compose up`.
- `permission denied`: check Postgres credentials in `.env` match `docker-compose.yml`.

Prompt examples to use this skill
- "Start the backend from scratch"
- "Bring up database and run migrations"

Notes
- Keep commands short; avoid embedding long shell scripts. Follow the steps in order.
