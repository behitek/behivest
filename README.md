# Behivest

![CI](https://github.com/yourusername/behivest/workflows/CI/badge.svg)
![Deploy](https://github.com/yourusername/behivest/workflows/Deploy%20to%20GitHub%20Pages/badge.svg)

**Đầu tư dễ hiểu, sinh lời bền vững**

Behivest is a modern, production-ready Vietnamese personal finance blog and affiliate marketing website built with Astro, TailwindCSS, and MDX. The site provides financial education content, interactive financial calculators, and promotes the Fmarket investment app through affiliate marketing.

## ✨ Features

- 📝 **Blog System** - MDX-powered blog with Vietnamese content and sample posts
- 🧮 **Financial Calculators** - Interactive tools (compound interest, SIP, budget allocation, investment comparison)
- 🎨 **Modern UI** - Responsive design with light/dark mode toggle
- 🚀 **Performance** - Static site generation with Astro for optimal speed
- ♿ **Accessible** - WCAG compliant with proper ARIA labels and semantic HTML
- 🔍 **SEO Optimized** - Meta tags, Open Graph, sitemap, and robots.txt
- 💬 **Comments** - Giscus integration for blog discussions
- 📊 **Analytics** - Google Analytics ready
- 🧪 **Tested** - Comprehensive unit and E2E test coverage
- 🔄 **CI/CD** - Automated testing and deployment via GitHub Actions

## 🛠️ Tech Stack

- **Framework**: [Astro](https://astro.build/) 4.x
- **Styling**: [TailwindCSS](https://tailwindcss.com/) 3.x with Typography plugin
- **Content**: [MDX](https://mdxjs.com/) for blog posts
- **Testing**: [Vitest](https://vitest.dev/) (unit) + [Playwright](https://playwright.dev/) (E2E)
- **Linting**: ESLint + Prettier
- **Deployment**: GitHub Pages via GitHub Actions
- **Forms**: Formspree integration
- **Comments**: Giscus

## 📦 Project Structure

```
behivest/
├── .github/
│   └── workflows/          # CI/CD workflows
│       ├── ci.yml          # Test and lint workflow
│       └── deploy.yml      # Deploy to GitHub Pages
├── public/                 # Static assets
│   ├── favicon.svg
│   ├── logo.svg
│   └── robots.txt
├── src/
│   ├── components/         # Reusable components
│   │   ├── Footer.astro
│   │   ├── GoogleAnalytics.astro
│   │   ├── Header.astro
│   │   ├── SEO.astro
│   │   └── ThemeToggle.astro
│   ├── content/           # Content collections
│   │   ├── blog/          # Blog posts (MDX)
│   │   └── config.ts      # Content schema
│   ├── layouts/           # Page layouts
│   │   └── Layout.astro
│   ├── pages/             # Routes
│   │   ├── blog/
│   │   │   ├── [...slug].astro    # Blog post template
│   │   │   └── index.astro        # Blog listing
│   │   ├── tools/
│   │   │   ├── budget-allocator.astro
│   │   │   ├── compound-interest.astro
│   │   │   ├── investment-comparison.astro
│   │   │   ├── sip-calculator.astro
│   │   │   └── index.astro
│   │   ├── about.astro
│   │   ├── contact.astro
│   │   └── index.astro
│   ├── styles/
│   │   └── global.css
│   └── utils/
│       └── calculators.ts  # Pure calculator functions
├── tests/
│   ├── e2e/               # Playwright E2E tests
│   └── unit/              # Vitest unit tests
├── astro.config.mjs
├── package.json
├── tailwind.config.mjs
├── tsconfig.json
└── vitest.config.ts
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/behivest.git
cd behivest
```

2. **Install dependencies**

```bash
npm install
```

3. **Start development server**

```bash
npm run dev
```

The site will be available at `http://localhost:4321`

### Available Scripts

| Command                | Description                      |
| ---------------------- | -------------------------------- |
| `npm run dev`          | Start development server         |
| `npm run build`        | Build for production             |
| `npm run preview`      | Preview production build locally |
| `npm run test`         | Run unit tests                   |
| `npm run test:watch`   | Run unit tests in watch mode     |
| `npm run test:e2e`     | Run E2E tests                    |
| `npm run test:e2e:ui`  | Run E2E tests with UI            |
| `npm run lint`         | Run ESLint                       |
| `npm run format`       | Format code with Prettier        |
| `npm run format:check` | Check code formatting            |

## 🧪 Testing

### Unit Tests

Unit tests cover all calculator logic functions:

```bash
npm run test
```

Tests are located in `tests/unit/` and use Vitest. All calculator functions in `src/utils/calculators.ts` have comprehensive test coverage including edge cases.

### E2E Tests

E2E tests verify critical user flows:

```bash
npm run test:e2e
```

Tests cover:

- Home page loads and displays content
- Blog listing and single post pages
- All calculator tools function correctly
- Contact form validation
- Navigation and mobile menu
- Dark mode toggle

Run with UI for debugging:

```bash
npm run test:e2e:ui
```

## 📝 Content Management

### Adding Blog Posts

Create a new MDX file in `src/content/blog/`:

```mdx
---
title: 'Your Post Title'
description: 'Post description for SEO'
pubDate: 2024-01-20
heroImage: '/blog/your-image.jpg'
tags: ['tag1', 'tag2']
author: 'Author Name'
---

# Your Content Here

Write your post content in MDX format...
```

The slug will be automatically generated from the filename.

### Vietnamese Slugs

Use kebab-case Vietnamese slugs for SEO:

- ✅ Good: `quy-mo-la-gi.mdx` → `/blog/quy-mo-la-gi`
- ❌ Avoid: `quy_mo_la_gi.mdx` or `QuỹMởLàGì.mdx`

## ⚙️ Configuration

### 1. Update Site URL and Base Path

Edit `astro.config.mjs`:

```js
export default defineConfig({
  site: 'https://yourusername.github.io',
  base: '/behivest', // Change to '/' for custom domain
  // ...
});
```

Also update `public/robots.txt`:

```
Sitemap: https://yourusername.github.io/behivest/sitemap-index.xml
```

### 2. Configure Google Analytics

**Option A: Environment Variable (Recommended)**

Create `.env` file:

```env
PUBLIC_GA_ID=G-XXXXXXXXXX
```

**Option B: Direct Edit**

Edit `src/components/GoogleAnalytics.astro`:

```astro
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Replace with your ID
```

Get your GA ID from [Google Analytics](https://analytics.google.com/).

### 3. Update Affiliate Link

Replace the placeholder affiliate link throughout the project:

**Find and replace:**

- Search: `https://fmarket.vn?ref=affiliate-demo`
- Replace: `https://go.behitek.com/fmarket`

Files to update:

- `src/pages/index.astro`
- `src/pages/tools/index.astro`
- `src/pages/blog/[...slug].astro`
- `src/content/blog/*.mdx`

### 4. Configure Giscus Comments

1. Go to [giscus.app](https://giscus.app/)
2. Follow the setup instructions
3. Get your repository ID and category ID
4. Edit `src/pages/blog/[...slug].astro`:

```js
data-repo="yourusername/behivest"
data-repo-id="YOUR_REPO_ID"
data-category="Comments"
data-category-id="YOUR_CATEGORY_ID"
```

### 5. Set Up Formspree for Contact Form

1. Create account at [formspree.io](https://formspree.io/)
2. Create a new form
3. Get your form ID
4. Edit `src/pages/contact.astro`:

```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST"></form>
```

### 6. Update Brand Information

Edit the following files to customize branding:

- `src/components/Footer.astro` - Footer content
- `src/pages/about.astro` - About page content
- `src/pages/contact.astro` - Contact information
- `public/logo.svg` - Replace with your logo
- `public/favicon.svg` - Replace with your favicon

## 🚢 Deployment to GitHub Pages

### Prerequisites

1. Push your code to GitHub
2. Enable GitHub Pages in repository settings:
   - Go to **Settings** → **Pages**
   - Source: **GitHub Actions**

### Automatic Deployment

The site automatically deploys when you push to `main`:

1. **CI Workflow** runs on every push/PR:
   - Lints code
   - Runs unit tests
   - Builds project
   - Runs E2E tests

2. **Deploy Workflow** runs only on push to `main`:
   - Runs all tests
   - Builds production bundle
   - Deploys to GitHub Pages

### Manual Deployment

To trigger deployment manually:

```bash
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main
```

Wait for the GitHub Actions workflow to complete. Your site will be available at:

```
https://yourusername.github.io/behivest
```

### Custom Domain

To use a custom domain:

1. Add a `CNAME` file to `public/`:

```
yourdomain.com
```

2. Update `astro.config.mjs`:

```js
export default defineConfig({
  site: 'https://yourdomain.com',
  base: '/', // Change to root
});
```

3. Configure DNS settings with your domain provider

## 🎨 Customization

### Colors

Edit `tailwind.config.mjs` to customize the color palette:

```js
colors: {
  primary: {
    // Orange/amber theme
    500: '#f59300',
    // ...
  },
  secondary: {
    // Green theme
    500: '#22c55e',
    // ...
  },
}
```

### Fonts

The site uses Inter font by default. To change:

1. Update font import in `src/components/SEO.astro`
2. Update `fontFamily` in `tailwind.config.mjs`

## 🐛 Troubleshooting

### Build Fails

**Issue**: Build fails with module not found
**Solution**: Delete `node_modules` and reinstall

```bash
rm -rf node_modules package-lock.json
npm install
```

### Base Path Issues on GitHub Pages

**Issue**: Assets not loading on GitHub Pages
**Solution**: Ensure `base` in `astro.config.mjs` matches your repository name

```js
base: '/behivest', // Must match repo name
```

### E2E Tests Fail Locally

**Issue**: Playwright tests fail
**Solution**: Install browsers

```bash
npx playwright install --with-deps chromium
```

### Dark Mode Not Working

**Issue**: Theme toggle doesn't persist
**Solution**: Check browser localStorage is enabled and not blocked

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Contact

- Website: [https://behivest.com](https://yourusername.github.io/behivest)
- Email: hello@behivest.com

## 🙏 Acknowledgments

- [Astro](https://astro.build/)
- [TailwindCSS](https://tailwindcss.com/)
- [Fmarket](https://fmarket.vn/) - Vietnamese mutual fund investment platform

---

Made with ❤️ by Behivest Team | **Đầu tư dễ hiểu, sinh lời bền vững**
