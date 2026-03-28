# AGENTS.md

Agent instructions for the **Behivest** repository — a Vietnamese personal finance blog and affiliate
marketing site built with **Astro 4.x**, **TailwindCSS 3.x**, **MDX**, and **TypeScript**.

---

## Build, Lint & Test Commands

```bash
# Development
npm run dev              # Start dev server at http://localhost:4321
npm run build            # Type-check (astro check) then build for production
npm run preview          # Serve the production build locally

# Testing — unit
npm run test             # Run all Vitest unit tests once
npm run test:watch       # Run unit tests in watch mode

# Testing — single unit test file
npx vitest run tests/unit/calculators.test.ts

# Testing — single unit test by name pattern
npx vitest run --reporter=verbose -t "calculateSIP"

# Testing — E2E (requires a built preview server)
npm run build && npm run test:e2e
npm run test:e2e:ui      # Interactive Playwright UI
npx playwright test tests/e2e/home.spec.ts          # Single E2E file
npx playwright test --debug tests/e2e/home.spec.ts  # Debug single E2E file

# Code quality
npm run lint             # ESLint on .js/.jsx/.ts/.tsx/.astro
npm run format           # Auto-fix formatting with Prettier
npm run format:check     # Verify formatting without writing
```

> **Note:** `npm run build` runs `astro check` first. All TypeScript errors must be fixed before the
> build succeeds. CI runs `npm ci` (not `npm install`); always commit an updated `package-lock.json`.

---

## Project Structure

```
src/
  components/   # Reusable Astro components (Header, Footer, SEO, …)
  content/      # MDX blog posts + FAQ data; schema in content/config.ts
  layouts/      # Layout.astro — base wrapper for all pages
  lib/          # remark-base-url.ts — rewrites asset paths for base path
  pages/        # File-based routing; tools/ sub-dir for calculators
  styles/       # global.css
  types/        # Shared TypeScript interfaces (fund.ts, …)
  utils/        # Pure utility functions (calculators.ts, fundApi.ts)
tests/
  unit/         # Vitest unit tests (pure functions only)
  e2e/          # Playwright E2E tests (run against preview build)
docs/superpowers/
  specs/        # Design documents (YYYY-MM-DD-*.md)
  plans/        # Implementation plans (YYYY-MM-DD-*.md)
```

---

## TypeScript

- **Strict mode** — config extends `astro/tsconfigs/strict`; never use `any`.
- **Path aliases** (use these instead of deep relative imports):
  - `@/*` → `src/*`
  - `@components/*` → `src/components/*`
  - `@layouts/*` → `src/layouts/*`
  - `@utils/*` → `src/utils/*`
- Export a dedicated `interface` alongside every function that has a non-trivial signature.
- Use `export interface Props` inside Astro component frontmatter for typed props.
- Content schemas are validated with **Zod** in `src/content/config.ts` — update the schema when
  adding new frontmatter fields.

---

## Code Style

### Formatting (Prettier)

- **Semicolons**: required
- **Quotes**: single quotes for JS/TS; Astro template attributes use double quotes
- **Indent**: 2 spaces
- **Trailing commas**: `es5` (objects, arrays; not function params)
- **Print width**: 80 characters
- Tailwind classes are auto-sorted by `prettier-plugin-tailwindcss` — do not manually order them.
- Run `npm run format` before committing; CI will fail `format:check` otherwise.

### ESLint Rules

- Unused variables produce a **warning** — prefix intentionally unused vars/params with `_`.
- `console.log` is **warned**; use `console.warn` or `console.error` for permanent logging.
- ESLint flat config (v9) is in `eslint.config.js` — do not create `.eslintrc` files.

---

## Naming Conventions

| Item                     | Convention                                                                  | Example                                  |
| ------------------------ | --------------------------------------------------------------------------- | ---------------------------------------- |
| Files & directories      | kebab-case                                                                  | `mutual-funds.mdx`, `remark-base-url.ts` |
| Astro components         | PascalCase                                                                  | `Header.astro`, `ThemeToggle.astro`      |
| TypeScript interfaces    | PascalCase                                                                  | `FundData`, `SIPResult`                  |
| Functions & variables    | camelCase                                                                   | `calculateSIP`, `formatCurrency`         |
| Constants (module-level) | UPPER_SNAKE_CASE                                                            | `BASE_URL_PROD`                          |
| Blog post slugs          | kebab-case English                                                          | `mutual-funds`, not `quy-mo-chung`       |
| CSS class selectors      | Tailwind utilities only; no custom class names unless added to `global.css` |

---

## Astro Components

- All logic lives in the **frontmatter** (`---` fences); keep the template declarative.
- Import order in frontmatter: external packages first, then internal path-alias imports, then
  relative imports, then CSS.
- Use `<slot />` for layout composition; named slots for complex layouts.
- Always use `export interface Props` — never use untyped `Astro.props`.
- Dark mode: add `dark:` Tailwind variants; do **not** use JavaScript class toggling directly
  (the `ThemeToggle.astro` component handles this via `localStorage`).

---

## Calculator / Utility Functions

- **Pure functions only** — no side effects, no I/O, no module-level mutable state.
- Add JSDoc comments on every exported function.
- Input validation: throw `Error` with a descriptive message for invalid inputs (e.g. negative
  amounts). Never silently return `NaN` or `0`.
- Numeric output: use `Math.round()` for VND amounts; avoid floating-point accumulation.
- Locale formatting: `Intl.NumberFormat('vi-VN', ...)` for Vietnamese-formatted numbers and
  currency; use the helpers `formatCurrency()` and `formatNumber()` in `calculators.ts`.

---

## Testing

### Unit Tests (Vitest)

- Location: `tests/unit/**/*.test.ts`
- `globals: true` in vitest config — use `describe`, `it`, `expect` without imports.
- One `describe` block per exported function; include: happy path, boundary values, zero values,
  error-throwing cases.
- Import source via relative path: `../../src/utils/calculators`.
- Use realistic VND amounts (e.g. `10_000_000` = 10 million VND).
- **Do not** test UI or side effects in unit tests.

### E2E Tests (Playwright)

- Location: `tests/e2e/**/*.spec.ts`
- Must run against the **preview build** (`npm run build && npm run preview`).
- Base URL: `http://localhost:4321/behivest` (set in `playwright.config.ts`).
- Only Chromium is tested in CI; add other browsers locally as needed.
- Verify: navigation, calculator inputs/outputs, dark mode toggle, responsive widths (375px, 768px,
  1920px), and accessibility basics.

---

## Content (Blog Posts & FAQ)

- Blog posts: `src/content/blog/<slug>.mdx` with required frontmatter:
  ```mdx
  ---
  title: 'Title'
  description: 'SEO description (≤160 chars)'
  pubDate: 2024-01-20
  heroImage: '/blog/image.jpg' # absolute path — remark plugin rewrites for base path
  tags: ['investment']
  author: 'Behivest Team'
  ---
  ```
- Internal image and link paths in MDX should be **absolute** (e.g. `/blog/image.jpg`). The
  `remark-base-url` plugin prepends the base path automatically — never hardcode `/behivest/`.
- Affiliate links must use `target="_blank" rel="noopener noreferrer"`.

---

## Routing & Base Path

- Dev server uses `base: '/'`; production build uses `base: '/behivest/'`.
- Never hardcode `/behivest/` in source; use `Astro.url` or the remark plugin for paths.
- For a custom domain, change `base` to `'/'` and `site` in `astro.config.mjs`.

---

## Environment Variables

| Variable       | Required | Purpose                           |
| -------------- | -------- | --------------------------------- |
| `PUBLIC_GA_ID` | No       | Google Analytics 4 measurement ID |

- Use `.env.example` as the template; never commit real values to `.env`.
- Prefix browser-accessible vars with `PUBLIC_`; server-only vars have no prefix.

---

## Important Don'ts

- Do **not** add side effects to calculator functions — keep them pure for testability.
- Do **not** use `console.log` in committed code (use `console.warn`/`error`).
- Do **not** commit `.env`, credential files, or real GA/Formspree IDs.
- Do **not** hardcode the `/behivest` base path — use the remark plugin or Astro utilities.
- Do **not** skip `astro check` (`npm run build` includes it); fix all TypeScript errors first.
- Do **not** manually order Tailwind class names; Prettier handles this automatically.
