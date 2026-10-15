# apee — Personal Website

Personal site and design playground for Antoine, built with [Next.js 16](https://nextjs.org) (App Router), React 19, Tailwind CSS 4 and Framer Motion. Deployed on [Vercel](https://vercel.com).

## Getting started

Requires Node.js 20.9+.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Pages

| Route            | File                              | Description                                         |
|------------------|-----------------------------------|-----------------------------------------------------|
| `/`              | `src/app/page.tsx`                | Home                                                |
| `/about`         | `src/app/about/page.tsx`          | About                                               |
| `/track-records` | `src/app/track-records/page.tsx`  | Companies worked with, with filters                 |
| `/stack`         | `src/app/stack/page.tsx`          | Tools and services, with a platform filter          |
| `/experiments`   | `src/app/experiments/page.tsx`    | Index of UI and motion experiments                  |

## Experiments

`/experiments` is a gallery of small interaction and animation studies — loaders, shimmer text, AI input, animated grids, cursor effects, card stacks, and more. Each one lives at `/experiments/<slug>`.

To add a new experiment:

1. Add an entry (`slug`, `title`, `description`) to `src/app/experiments/experiments.config.ts`.
2. Create `src/app/experiments/<slug>/page.tsx` and a `layout.tsx` that reads its title from the config (copy an existing one, e.g. `cursor-glow/layout.tsx`).
3. Put reusable components in `src/components/ui/`.

## Project structure

```
src/
├── app/
│   ├── layout.tsx            Root layout, fonts (Geist) and metadata
│   ├── globals.css           Global styles and CSS variables
│   ├── page.tsx              Home
│   ├── about/  stack/  track-records/
│   └── experiments/
│       ├── experiments.config.ts   Experiment registry
│       └── <slug>/                 One folder per experiment
├── components/ui/            Shared UI and animation components
└── lib/utils.ts              `cn()` class-name helper
public/                       Static assets (icons, reference video)
```

## Tech stack

- **Framework:** Next.js 16.1, React 19.2, TypeScript 5
- **Styling:** Tailwind CSS 4, `class-variance-authority`
- **Motion:** Framer Motion / Motion 12
- **Icons:** Remix Icon, Lucide, React Icons
- **Linting:** ESLint 9 with `eslint-config-next`

## Scripts

| Command         | Description                       |
|-----------------|-----------------------------------|
| `npm run dev`   | Start dev server (localhost:3000) |
| `npm run build` | Production build                  |
| `npm run start` | Run production build locally      |
| `npm run lint`  | Run ESLint                        |

## Deployment

The repo ([AntoinePlu/apee-website](https://github.com/AntoinePlu/apee-website)) is connected to Vercel: pushes to `main` deploy to production, and other branches get preview deployments. Run `npm run build` locally before pushing to catch type errors that would fail the Vercel build.
