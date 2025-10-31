# Testing Documentation

This document describes the testing strategy, coverage, and manual QA procedures for the Behivest project.

## Testing Strategy

The project uses a multi-layered testing approach:

1. **Unit Tests** - Test individual calculator functions in isolation
2. **End-to-End (E2E) Tests** - Test complete user workflows across pages
3. **Linting** - Ensure code quality and consistency
4. **Manual QA** - Verify critical paths before production deployment

## Unit Tests (Vitest)

### What's Tested

All calculator functions in `src/utils/calculators.ts` are tested:

- ✅ `calculateCompoundInterest()` - Compound interest with monthly contributions
- ✅ `calculateSIP()` - Systematic Investment Plan calculator
- ✅ `calculateBudgetAllocation()` - 50/30/20 budget rule
- ✅ `compareInvestmentVsSavings()` - Investment vs savings comparison
- ✅ `formatCurrency()` - Vietnamese currency formatting
- ✅ `formatNumber()` - Number formatting with separators

### Test Coverage

Each function is tested for:

- ✅ **Happy path** - Standard inputs with expected outputs
- ✅ **Edge cases** - Zero values, minimum/maximum values
- ✅ **Error handling** - Negative inputs, invalid values
- ✅ **Precision** - Rounding and calculation accuracy
- ✅ **Data structures** - Correct output format and types

### Running Unit Tests

```bash
# Run all unit tests
npm run test

# Run in watch mode (for development)
npm run test:watch

# Generate coverage report
npm run test -- --coverage
```

### Example Test Cases

**Compound Interest Calculator:**

```
Test: 10M VND at 10% for 5 years
Input: principal=10000000, rate=10, years=5, monthly=0
Expected: finalAmount ≈ 16,105,100 VND

Test: With monthly contributions
Input: principal=10M, rate=10, years=10, monthly=1M
Expected: finalAmount > totalContributions > initialPrincipal
```

**SIP Calculator:**

```
Test: 1M VND/month for 10 years at 12%
Input: monthly=1000000, rate=12, years=10
Expected:
  - totalInvested = 120,000,000
  - finalAmount > 200,000,000
  - totalReturns > 80,000,000
```

**Budget Allocator:**

```
Test: 20M VND income
Input: monthlyIncome=20000000
Expected:
  - needs = 10,000,000 (50%)
  - wants = 6,000,000 (30%)
  - savings = 4,000,000 (20%)
```

## End-to-End Tests (Playwright)

### What's Tested

E2E tests verify complete user workflows:

#### Home Page (`tests/e2e/home.spec.ts`)

- ✅ Page loads successfully
- ✅ Hero section displays branding
- ✅ CTA links to Fmarket affiliate
- ✅ Featured blog posts displayed
- ✅ Tool cards navigation
- ✅ Dark mode toggle works
- ✅ Mobile menu functionality

#### Blog (`tests/e2e/blog.spec.ts`)

- ✅ Blog listing displays posts
- ✅ Navigate to single post
- ✅ Post metadata visible (date, tags, author)
- ✅ Share buttons present
- ✅ Reading progress bar updates
- ✅ Affiliate links in content
- ✅ Comments section (Giscus placeholder)
- ✅ SEO meta tags

#### Tools (`tests/e2e/tools.spec.ts`)

- ✅ Tools listing page loads
- ✅ Navigate to each calculator
- ✅ **Compound Interest**: Calculation with default/custom values
- ✅ **SIP Calculator**: Result updates on input change
- ✅ **Budget Allocator**: 50/30/20 allocation correct
- ✅ **Investment Comparison**: Shows difference correctly
- ✅ Back navigation to tools page
- ✅ Informational content present

#### Contact (`tests/e2e/contact.spec.ts`)

- ✅ Contact form displayed
- ✅ Required field validation
- ✅ Form can be filled
- ✅ Contact information visible
- ✅ Email link works
- ✅ Help information present

### Running E2E Tests

```bash
# Run all E2E tests (headless)
npm run test:e2e

# Run with UI (for debugging)
npm run test:e2e:ui

# Run specific test file
npx playwright test tests/e2e/home.spec.ts

# Run in headed mode (see browser)
npx playwright test --headed

# Debug mode (step through tests)
npx playwright test --debug
```

### E2E Test Reports

After running tests, view the HTML report:

```bash
npx playwright show-report
```

## Linting & Formatting

### ESLint

Checks for code quality issues:

```bash
npm run lint
```

Common issues caught:

- Unused variables
- Missing imports
- TypeScript type errors
- Astro component issues

### Prettier

Ensures consistent code formatting:

```bash
# Check formatting
npm run format:check

# Auto-fix formatting
npm run format
```

## Manual QA Checklist

Before deploying to production, manually verify the following:

### 🏠 Home Page

- [ ] Page loads without errors
- [ ] Hero section displays correctly
- [ ] CTA button links to Fmarket affiliate
- [ ] Featured blog posts displayed (3 posts)
- [ ] Tool cards link to correct pages
- [ ] Footer links work
- [ ] Dark mode toggle works
- [ ] Mobile responsive (test on 375px, 768px, 1920px)

### 📝 Blog

- [ ] Blog listing shows all posts
- [ ] Posts sorted by date (newest first)
- [ ] Click post → navigates to single post page
- [ ] Post content renders correctly (headings, lists, links)
- [ ] Images load (if present)
- [ ] Reading progress bar updates on scroll
- [ ] Share buttons work (Facebook, Twitter, Copy link)
- [ ] Affiliate links open in new tab
- [ ] Tags displayed
- [ ] Author and date visible
- [ ] Mobile responsive

### 🧮 Tools

- [ ] Tools page lists all 4 calculators
- [ ] Click each tool → navigates correctly

**Compound Interest:**

- [ ] Form pre-fills with defaults
- [ ] Calculation auto-runs on load
- [ ] Results update when inputs change
- [ ] Yearly breakdown displays
- [ ] Numbers formatted with Vietnamese separators

**SIP Calculator:**

- [ ] Default calculation runs
- [ ] Results show total invested, returns, final amount
- [ ] Ratio bar displays
- [ ] Input validation (no negative numbers)

**Budget Allocator:**

- [ ] 50/30/20 allocation calculates correctly
- [ ] Visual chart displays
- [ ] Test with 20M → should show 10M/6M/4M

**Investment Comparison:**

- [ ] Shows investment vs savings
- [ ] Difference calculated correctly
- [ ] Percentage difference displayed
- [ ] Investment amount > savings (with default rates)

### 📞 Contact

- [ ] Form fields present (name, email, subject, message)
- [ ] Required fields validated
- [ ] Email link clickable
- [ ] Social media icons present
- [ ] Help information visible

### 🎨 Design & UX

- [ ] Light mode: All text readable, good contrast
- [ ] Dark mode: All text readable, good contrast
- [ ] Smooth transitions (theme toggle, hover effects)
- [ ] No layout shift (CLS issues)
- [ ] Images have alt text
- [ ] Focus indicators visible (keyboard navigation)

### 📱 Mobile (375px width)

- [ ] Navigation collapses to hamburger menu
- [ ] Menu opens/closes correctly
- [ ] All pages scrollable
- [ ] Touch targets large enough (min 44px)
- [ ] Forms usable
- [ ] Calculators functional
- [ ] Tables/charts responsive

### 🔍 SEO & Performance

- [ ] Every page has unique `<title>`
- [ ] Every page has meta description
- [ ] Open Graph tags present
- [ ] Canonical URLs correct
- [ ] Sitemap accessible at `/sitemap-index.xml`
- [ ] Robots.txt accessible at `/robots.txt`
- [ ] favicon loads
- [ ] Logo loads
- [ ] No console errors
- [ ] Lighthouse score: Performance > 90, SEO > 90

### 🔗 Links & Navigation

- [ ] All internal links work
- [ ] All external links open in new tab
- [ ] Affiliate links include `?ref=affiliate-demo` (or your ID)
- [ ] Back navigation works
- [ ] Breadcrumbs work (if applicable)

### ⚙️ Configuration

- [ ] Google Analytics tracking (check in GA dashboard)
- [ ] Giscus comments load (if configured)
- [ ] Formspree form submits (if configured)
- [ ] Base URL correct for deployment
- [ ] Site URL correct in `astro.config.mjs`

## Test Scenarios

### Scenario 1: First-Time Visitor

1. Land on homepage
2. Read hero section
3. Scroll to featured posts
4. Click on "Quỹ mở là gì?"
5. Read article
6. Click Fmarket CTA
7. Verify affiliate link opens

**Expected**: Smooth flow, no errors, affiliate link works

### Scenario 2: Using Calculators

1. Navigate to Tools page
2. Click "Tính lãi kép"
3. Use default values
4. Verify result ≈ 16M after 5 years
5. Change principal to 20M
6. Submit
7. Verify result doubled

**Expected**: Calculations accurate, instant updates

### Scenario 3: Mobile User

1. Open site on 375px width
2. Open mobile menu
3. Navigate to Blog
4. Read a post
5. Share on Facebook
6. Use compound interest calculator

**Expected**: Fully functional on mobile, no horizontal scroll

### Scenario 4: Dark Mode User

1. Toggle dark mode
2. Navigate through all pages
3. Verify text readability
4. Check calculator results visibility
5. Reload page
6. Verify dark mode persists

**Expected**: Dark mode applies everywhere, persists on reload

## Known Limitations

1. **Giscus Comments**: Requires GitHub authentication, won't work unless configured
2. **Formspree**: Contact form won't submit unless Formspree ID is configured
3. **Google Analytics**: Won't track unless GA ID is set
4. **E2E Tests**: Don't actually submit forms (to avoid spamming Formspree)
5. **Base Path**: Site assumes GitHub Pages deployment with `/behivest` base

## Continuous Integration

GitHub Actions automatically runs tests on:

- Every push to `main`
- Every pull request

**CI Pipeline:**

1. Lint code (ESLint + Prettier)
2. Run unit tests (Vitest)
3. Build project (Astro)
4. Run E2E tests (Playwright)
5. Deploy to GitHub Pages (on `main` only)

View workflow status in GitHub Actions tab.

## Debugging Tips

### Unit Tests Failing

```bash
# Run specific test file
npm run test tests/unit/calculators.test.ts

# Watch mode with filter
npm run test:watch -- calculators
```

### E2E Tests Failing

```bash
# Run with UI to see what's happening
npm run test:e2e:ui

# Run in debug mode
npx playwright test --debug tests/e2e/home.spec.ts

# Take screenshots on failure (auto-enabled)
# Check: test-results/[test-name]/[screenshot].png
```

### Linter Errors

```bash
# See all issues
npm run lint

# Auto-fix some issues
npm run lint -- --fix
```

## Test Coverage Goals

- **Unit Tests**: 100% of calculator functions
- **E2E Tests**: All critical user paths
- **Code Coverage**: > 80% for business logic

## Adding New Tests

### Adding Unit Tests

1. Create test file: `tests/unit/[module].test.ts`
2. Import function to test
3. Write test cases with `describe` and `it`
4. Run `npm run test` to verify

### Adding E2E Tests

1. Create test file: `tests/e2e/[page].spec.ts`
2. Use Playwright `test` and `expect`
3. Navigate with `page.goto()`
4. Assert with `await expect(locator).toBeVisible()`
5. Run `npm run test:e2e` to verify

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Playwright Documentation](https://playwright.dev/)
- [Astro Testing Guide](https://docs.astro.build/en/guides/testing/)

---

**Questions?** Open an issue or contact the team at hello@behivest.com
