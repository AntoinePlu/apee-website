# apee website

A personal portfolio and UI playground built with Next.js, React, TypeScript, and Tailwind CSS v4. The site includes a simple landing page plus dedicated sections for an about page, track record timeline, stack overview, and a gallery of interactive design experiments.

## Overview

This repository contains a multi-page website with two main layers:

- **Portfolio content** for the home page, about page, track records, and stack.
- **Experiment demos** for animated UI patterns and motion studies such as loaders, tabs, grids, shimmers, dropdowns, and input interactions.

## Tech stack

- [Next.js 16](https://nextjs.org/)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide React](https://lucide.dev/)
- [Radix UI Slot](https://www.radix-ui.com/)

## Getting started

### Prerequisites

- Node.js 20+ recommended
- npm

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server. |
| `npm run build` | Create a production build. |
| `npm run start` | Run the production server locally. |
| `npm run lint` | Run ESLint across the project. |

## App structure

### Main routes

- `/` — landing page
- `/about` — short bio / about page
- `/track-records` — career and project timeline
- `/stack` — tools, devices, and services page
- `/experiments` — gallery of UI and interaction experiments

### Experiments currently included

The experiments gallery is driven by `src/app/experiments/experiments.config.ts`. Current demos include:

- Cursor glow
- Pulse icon + shimmer text
- AI agent loader
- Text shimmer
- Text scramble
- Animated loading breadcrumb
- Toast save
- AI input
- Filesystem tree
- Response stream
- Spotlight
- Flickering grid
- Animated grid pattern
- Display cards
- Animated card stack
- Background pattern
- Status badge
- Voice input
- Avatar circles
- Inline dropdown
- Animated tabs
- 3 dots bounce
- 3 dots move

## Project layout

```text
src/
  app/
    page.tsx                  Home page
    about/page.tsx            About page
    track-records/page.tsx    Track record page
    stack/page.tsx            Stack page
    experiments/              Experiments index and demo routes
  components/ui/              Reusable interactive UI components
  lib/utils.ts                Shared utility helpers
public/
  icons/                      SVG assets used across the site
```

## Customization notes

If you're adapting this site for your own portfolio, the most important places to update are:

- `src/app/page.tsx` for the hero content and top-level links
- `src/app/about/page.tsx` for the personal bio
- `src/app/track-records/page.tsx` for featured achievements and timeline entries
- `src/app/stack/page.tsx` for services, hardware, and software listings
- `src/app/experiments/experiments.config.ts` for the experiments directory

To add a new experiment:

1. Add a new entry to `src/app/experiments/experiments.config.ts`.
2. Create `src/app/experiments/<slug>/page.tsx`.
3. Optionally add a matching `layout.tsx` for per-demo styling.
4. Build the demo using shared primitives from `src/components/ui/` when helpful.

## Deployment

This project is ready to deploy on Vercel.

### Vercel

1. Push the repository to GitHub.
2. Import the repository into [Vercel](https://vercel.com/).
3. Use the default Next.js build settings.
4. Deploy.

## Linting

Run the project checks with:

```bash
npm run lint
```
