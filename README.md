<div align="center">

# z-cal.ai

Minimalist AI nutrition experience built with Next.js 16 and React 19.

</div>

## Overview

z-cal.ai focuses on two flows:

- **Nutri Scan** – upload or snap a meal photo to get calories, macros, and quick insights.
- **Fridge Chef** – chat with an assistant that suggests healthy recipes based on whatever is in your fridge.

It is powered by the App Router, React Query for data fetching, Tailwind CSS for styling, and subtle motion cues to keep everything feeling smooth.

## Stack

- Next.js 16 (App Router) + React 19
- Tailwind CSS 4 + utility animations
- React Query (@tanstack/react-query) for async state
- Sonner for toast notifications

## Requirements

- Node.js **>= 18.18** (20+ recommended)
- npm 10+, pnpm 9+, or yarn 1.x/4.x

## Environment variables

Create `.env.local` at the project root:

```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

- `NEXT_PUBLIC_API_URL` points the frontend to your backend (defaults to `http://localhost:8000`).
- The backend must expose `/api/identify-food` and `/api/generate-recipe`.

## Install & run

```bash
# install dependencies
npm install

# development mode
npm run dev

# production build
npm run build

# serve built app
npm run start

# lint check
npm run lint
```

After `npm run dev`, open `http://localhost:3000`.

## Project structure

```
app/
  page.tsx        # landing page with quick entry points
  scan/           # Nutri Scan experience
  fridge/         # Fridge Chef chat
lib/
  api/            # backend calls + types
  hooks/          # React Query hooks
```

## Development flow

1. Set up `.env.local` with your API URL.
2. Run `npm run dev`.
3. Iterate on UI in `app/` and logic in `lib/`.
4. For a production smoke test, run `npm run build && npm run start`.
