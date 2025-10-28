# Otter Coin — Admin Dashboard (React + Vite)

A lightweight React admin/dashboard scaffold built with Vite, React Router and CSS Modules. Intended as a starting point for an internal admin interface for the Otter Coin project.

## Features

- React + Vite dev experience (fast HMR)
- React Router for client routing
- CSS Modules for scoped styles
- Responsive admin layout (sidebar, cards, tables, modals)
- Simple in-app admin login (dev-only credential check)
- Accessibility & reduced-motion support improvements

## Tech

- React
- Vite
- React Router
- CSS Modules
- (Optional) ESLint / Prettier / Vitest

## Quick start

Requirements:

- Node.js 16+ (recommend latest LTS)
- npm, yarn or pnpm

1. Clone
   git clone <repo-url> otter-coin
   cd otter-coin

2. Install
   npm install

   # or

   yarn

   # or

   pnpm install

3. Run dev server
   npm run dev

   # or

   yarn dev

   # or

   pnpm dev

4. Build for production
   npm run build

   # or

   yarn build

   # or

   pnpm build

5. Preview production build
   npm run preview
   # or
   yarn preview
   # or
   pnpm preview

Note: confirm available scripts in package.json — adjust commands if you use a package manager alias.

## Available scripts (common)

- dev — start Vite dev server
- build — build production bundle
- preview — preview the built bundle locally
- lint — run ESLint (if configured)
- test — run unit tests (if configured)

## Environment

If the project requires environment variables, prefix them with VITE\_ (Vite requirement). Example:

- VITE_API_URL=https://api.example.com

Create a `.env` file in the project root or set these variables in your environment.

## Bitquery integration (Pump tokens)

This project includes a lightweight Bitquery client at `src/services/bitquery.js` and a UI at `/pumps`.

1. Get a Bitquery API key: https://bitquery.io/ (create an account and generate an API key)
2. Copy `.env.example` to `.env` and set `VITE_BITQUERY_API_KEY`.
3. Start the dev server and open `/pumps`.

Usage notes:
- The Pump Tokens page (`src/components/PumpTokens.jsx`) accepts a full Bitquery GraphQL query (paste from your Bitquery IDE or use the placeholder) and runs it. The page supports polling (30s) and shows parsed results for common `dexTrades` shapes or falls back to raw JSON.
- If you have a specific Bitquery GraphQL query (like the one from your IDE link), paste it into the textarea on the page and click Run.
- You can either set the API key in a `.env` file (`VITE_BITQUERY_API_KEY`) or enter it in the Pumps UI — the page lets you save the key to `localStorage` for convenience (only on your machine).


## Admin login (development only)

The demo admin login lives in src/components/AdminLogin.jsx and uses a simple client-side check. Do NOT use for production.

Default credentials in the demo:

- Username login: admin / admin123
- Email login: admin@otter-coin.com / admin123

Replace with proper server-side authentication before deploying.

## Styling

- CSS Modules are in `src/styles/` (e.g. AdminPanel.module.css, NewPasswordPage.module.css).
- Responsive breakpoints and tokens are included; customize variables at the top of each stylesheet.

## Folder structure (typical)

- src/
  - components/ (React components)
  - styles/ (CSS Modules)
  - pages/ (route pages)
  - assets/ (images, icons)
  - App.jsx / main.jsx
- public/ (static assets)
- index.html

Adjust to your own conventions as needed.

## Accessibility & performance notes

- Reduced-motion support provided (prefers-reduced-motion).
- Tables become horizontally scrollable on small screens.
- Buttons & interactive controls include focus-visible styles.

## Contributing

- Fork, create a branch, submit PRs.
- Keep changes small and documented.
- Add unit tests for new features where appropriate.

## Security & deployment

- This repo contains a demo client-side admin check — remove before production.
- Use HTTPS and a secure backend for authentication.
- Deploy static build to any static host (Netlify, Vercel, S3 + CloudFront) or serve via a Node backend.

## License

Specify your project license here (e.g. MIT). Replace this line with the actual license text or file.

---

If you want, I can:

- Add a sample package.json scripts section
- Add a checklist for production hardening (auth, CORS, CSP)
