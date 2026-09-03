# Future Minds Robotics

Future Minds Robotics is a student-led nonprofit website connecting grades 4–8 students with coding and robotics learning through FIRST LEGO League Challenge Team 62281.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/future-minds-robotics/src/App.tsx` — single-page nonprofit website experience and interactions
- `artifacts/future-minds-robotics/src/index.css` — visual theme, responsive layout, and motion styles
- `artifacts/future-minds-robotics/index.html` — document metadata and social sharing descriptions

## Architecture decisions

- The public experience is a frontend-only single page because the first goal is communicating the mission and driving community engagement.
- Contact, volunteer, and support flows use accessible in-page interactions so visitors can take action without leaving the site.
- The visual language intentionally combines workshop energy with a clear editorial reading experience to reflect both student creativity and nonprofit credibility.

## Product

Visitors can understand the Future Minds mission, explore the grades 4–8 learning experience, meet Team 62281, and open contact, volunteer, or support flows.

## User preferences

- The organization is called Future Minds Robotics and competes in FIRST LEGO League Challenge as Team 62281.

## Gotchas

- Keep the site copy grounded in the provided organization details; do not invent program claims, schedules, contact details, or impact metrics.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
