# Justin Cordova

CS
@ **NJIT**

SDE
@ **PureTechInc**

[View portfolio](https://www.justincordova.dev/)

## Contact

[justinavodroc@gmail.com](mailto:justinavodroc@gmail.com)

[justinalolorcordova](https://www.linkedin.com/in/justinalolorcordova/)

[justincordova](https://github.com/justincordova)

## Development

React 19, TypeScript, Tailwind CSS v4 and Vite, deployed on Vercel. Requires Node.js 22+ and [pnpm](https://pnpm.io) (the version is pinned in `package.json`).

```bash
pnpm install
cp .env.example .env   # optional: add a GITHUB_TOKEN to avoid rate limits
pnpm dev               # http://localhost:3000
```

| Command | What it does |
|---|---|
| `pnpm dev` | Dev server, including the `/api` GitHub routes |
| `pnpm build` | Type-check and build to `dist/` |
| `pnpm check` | Lint and format `src/` with Biome |
| `pnpm preview` | Serve the built site (static only, no `/api`) |
