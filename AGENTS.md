# AGENTS.md

## Cursor Cloud specific instructions

This is a single-service Next.js 16 personal portfolio site (not a monorepo). No database, no backend API, no Docker, and no environment variables are required.

**Available scripts** are in `package.json` and documented in `README.md`:

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server on port 3000 |
| `npm run build` | Production build |
| `npm run lint` | ESLint (warnings only — no errors in the codebase) |

**Caveats:**
- No test framework is configured; there are no automated tests to run.
- Some images on `/stack` and `/track-records` are loaded from `figma.com` CDN and may not render if egress is restricted. Pages still work — only icons are missing.
- The lint output has 7 `@next/next/no-img-element` warnings; these are pre-existing and not errors.
