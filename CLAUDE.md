# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Behivest is a Vietnamese personal finance blog and affiliate marketing website built with Astro. It provides financial education content, interactive calculators, and promotes the Fmarket investment app through affiliate links.

**Tech Stack**: Astro 4.x, TailwindCSS 3.x, MDX, TypeScript

**Target Audience**: Vietnamese users interested in personal finance and mutual fund investing

## Essential Commands

### Development

```bash
npm run dev          # Start dev server at http://localhost:4321
npm run build        # Build for production (includes type checking)
npm run preview      # Preview production build locally
```

### Testing

```bash
npm run test              # Run unit tests (Vitest)
npm run test:watch        # Run unit tests in watch mode
npm run test:e2e          # Run E2E tests (Playwright)
npm run test:e2e:ui       # Run E2E tests with UI for debugging
npx playwright test --debug tests/e2e/home.spec.ts  # Debug specific E2E test
```

### Code Quality

```bash
npm run lint              # Run ESLint
npm run format            # Auto-fix formatting with Prettier
npm run format:check      # Check code formatting
```

## Architecture & Key Concepts

### 1. Content Architecture

**Blog Posts**: Located in `src/content/blog/` as MDX files

- Content schema defined in `src/content/config.ts` using Zod validation
- Required frontmatter: `title`, `description`, `pubDate`
- Optional: `heroImage`, `tags`, `author`, `updatedDate`
- Use kebab-case English slugs (e.g., `mutual-funds.mdx` → `/blog/mutual-funds`)
- Rendered via dynamic route: `src/pages/blog/[...slug].astro`

**Financial Calculators**: Pure functions in `src/utils/calculators.ts`

- All calculator logic is separated from UI components for testability
- Each calculator exports TypeScript interfaces for type safety
- Functions include: `calculateCompoundInterest()`, `calculateSIP()`, `calculateBudgetAllocation()`, `compareInvestmentVsSavings()`
- UI pages in `src/pages/tools/` consume these utilities

### 2. Component Structure

**Layout System**:

- `src/layouts/Layout.astro`: Base layout with Header, Footer, SEO, and GoogleAnalytics
- Accepts props: `title`, `description`, `image`, `article`, `publishedTime`, `modifiedTime`
- All pages should use this layout for consistency

**Core Components**:

- `SEO.astro`: Meta tags, Open Graph, structured data for articles
- `GoogleAnalytics.astro`: GA4 tracking (reads `PUBLIC_GA_ID` from env or uses hardcoded fallback)
- `Header.astro`: Navigation with mobile menu and dark mode toggle
- `Footer.astro`: Site footer with links and branding
- `ThemeToggle.astro`: Dark mode switcher (uses localStorage)

### 3. Routing

Astro file-based routing:

- `src/pages/index.astro` → `/` (home page)
- `src/pages/about.astro` → `/about`
- `src/pages/contact.astro` → `/contact`
- `src/pages/blog/index.astro` → `/blog` (blog listing)
- `src/pages/blog/[...slug].astro` → `/blog/*` (individual posts)
- `src/pages/tools/*.astro` → `/tools/*` (calculator pages)

**Base Path Handling**:

- Configured in `astro.config.mjs` as `base: '/behivest'` for GitHub Pages
- Change to `base: '/'` for custom domain deployment
- All internal links should use base path-aware URL construction

### 4. Styling System

**TailwindCSS Configuration** (`tailwind.config.mjs`):

- Custom color palette: Primary (orange/amber), Secondary (green)
- Typography plugin enabled for prose content
- Dark mode: `class` strategy (toggle via `.dark` class on `<html>`)

**Global Styles** (`src/styles/global.css`):

- Custom CSS variables for theming
- Base styles and utility classes
- Dark mode color overrides

### 5. Deployment & CI/CD

**GitHub Actions Workflows**:

1. **CI Workflow** (`.github/workflows/ci.yml`): Runs on push/PR
   - Lint → Unit Tests → Build → E2E Tests (in parallel where possible)
   - E2E tests run against built artifacts to ensure production-like testing

2. **Deploy Workflow** (`.github/workflows/deploy.yml`): Runs on push to `main`
   - Test job: Full test suite must pass
   - Deploy job: Builds and deploys to GitHub Pages (only if tests pass)

**Important**: The build command (`npm run build`) includes `astro check` for type validation. Build will fail on TypeScript errors.

### 6. Configuration Requirements

Before deployment, these must be configured:

1. **Site URL & Base Path** (`astro.config.mjs`):
   - Update `site` to actual GitHub Pages URL or custom domain
   - Update `base` to match repository name (or `/` for custom domain)
   - Update `public/robots.txt` sitemap URL accordingly

2. **Affiliate Links**: Search and replace `https://fmarket.vn?ref=affiliate-demo` with actual affiliate ID across:
   - `src/pages/index.astro`
   - `src/pages/tools/index.astro`
   - `src/pages/blog/[...slug].astro`
   - All blog post MDX files

3. **Analytics** (optional): Set `PUBLIC_GA_ID` in `.env` or update `src/components/GoogleAnalytics.astro`

4. **Comments** (optional): Configure Giscus in `src/pages/blog/[...slug].astro` with repo ID and category ID

5. **Contact Form** (optional): Add Formspree form ID to `src/pages/contact.astro`

See `CONFIGURATION.md` for detailed checklist.

## Testing Strategy

### Unit Tests (`tests/unit/`)

- Test pure calculator functions in isolation
- 100% coverage of calculator logic
- Run before build in CI to catch calculation errors early

### E2E Tests (`tests/e2e/`)

- Test complete user workflows: navigation, calculators, forms, dark mode
- Run against production build to ensure build artifacts work correctly
- Use Playwright with Chromium browser
- Tests are organized by page/feature: `home.spec.ts`, `blog.spec.ts`, `tools.spec.ts`, `contact.spec.ts`

**Test Development Pattern**:

1. Write/modify calculator function in `src/utils/calculators.ts`
2. Add/update unit tests in `tests/unit/calculators.test.ts`
3. Verify E2E tests pass (they use the UI which consumes the functions)
4. Run `npm run build` to ensure no type errors

## Common Development Tasks

### Adding a New Blog Post

1. Create file: `src/content/blog/your-slug.mdx`
2. Add frontmatter:

```mdx
---
title: 'Your Title'
description: 'SEO description'
pubDate: 2024-01-20
heroImage: '/blog/image.jpg'
tags: ['investment', 'finance']
author: 'Behivest Team'
---
```

3. Write content in MDX (supports JSX components)
4. Test locally: `npm run dev` → visit `/blog/your-slug`

### Adding a New Calculator

1. Add pure function to `src/utils/calculators.ts` with TypeScript interface
2. Create unit tests in `tests/unit/calculators.test.ts`
3. Create UI page in `src/pages/tools/calculator-name.astro`
4. Import and use calculator function in the Astro component
5. Add calculator card to `src/pages/tools/index.astro`
6. Add E2E test case to `tests/e2e/tools.spec.ts`

### Modifying Styles

- **Component-specific**: Add Tailwind classes directly in `.astro` files
- **Global styles**: Edit `src/styles/global.css`
- **Theme colors**: Update `tailwind.config.mjs` colors object
- **Dark mode**: Add dark mode variants using `dark:` prefix in Tailwind classes

### Working with Type Safety

- All calculator functions have strict TypeScript types
- Content schema validated via Zod in `src/content/config.ts`
- Type checking runs during build (`astro check`)
- Types for Astro components use `export interface Props` pattern

## Vietnamese Language Considerations

- Primary language is Vietnamese (`<html lang="vi">`)
- Use Vietnamese currency formatting: `formatCurrency()` uses `vi-VN` locale
- Use Vietnamese number formatting with dot separators: `formatNumber()`
- Blog slugs should be kebab-case English (e.g., `mutual-funds`, not `mutualFunds`)
- Keep English technical terms where commonly used (e.g., "SIP", "compound interest")

## Important Notes

- **Never commit sensitive data**: GA IDs, Formspree IDs, etc. should use env vars or be added during deployment
- **Base path awareness**: All internal URLs must respect the `base` path from Astro config
- **Pure functions**: Keep calculator logic pure (no side effects) for testability
- **MDX content**: Blog posts can use JSX components, but keep them simple for maintainability
- **Affiliate links**: Must open in new tab (`target="_blank"`) with `rel="noopener noreferrer"`
- **Accessibility**: Maintain ARIA labels, semantic HTML, and keyboard navigation support
- **Mobile-first**: All pages must be responsive and tested at 375px, 768px, 1920px widths

## Troubleshooting

**Build fails with module not found**:

```bash
rm -rf node_modules package-lock.json
npm install
```

**E2E tests fail locally**:

```bash
npx playwright install --with-deps chromium
```

**Assets not loading on GitHub Pages**:

- Verify `base` in `astro.config.mjs` matches repository name exactly
- Check that all asset paths use base-aware URL construction

**TypeScript errors**:

- Run `npm run build` to see all type errors
- Fix issues before committing (CI will fail on type errors)
