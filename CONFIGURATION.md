# Configuration Checklist

This document provides a step-by-step checklist for configuring Behivest for your deployment.

## 🔧 Pre-Deployment Configuration

Complete these steps before deploying to production:

### 1. Repository Setup

- [ ] Create GitHub repository
- [ ] Push code to repository
- [ ] Enable GitHub Pages in repository settings (Settings → Pages → Source: GitHub Actions)

### 2. Site Configuration

**File: `astro.config.mjs`**

```js
export default defineConfig({
  site: 'https://YOUR_GITHUB_USERNAME.github.io',
  base: '/YOUR_REPO_NAME', // or '/' for custom domain
});
```

- [ ] Update `site` with your GitHub Pages URL
- [ ] Update `base` with your repository name
  - If repo is `behivest` → use `/behivest`
  - If using custom domain → use `/`

**File: `public/robots.txt`**

```
Sitemap: https://YOUR_GITHUB_USERNAME.github.io/YOUR_REPO_NAME/sitemap-index.xml
```

- [ ] Update sitemap URL to match your site

### 3. Google Analytics Setup

**Option A: Environment Variable (Recommended)**

Create `.env` in project root:

```env
PUBLIC_GA_ID=G-XXXXXXXXXX
```

- [ ] Get GA Measurement ID from [Google Analytics](https://analytics.google.com/)
- [ ] Create `.env` file
- [ ] Add to `.gitignore` (already configured)

**Option B: Direct Configuration**

**File: `src/components/GoogleAnalytics.astro`**

```astro
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Replace
```

- [ ] Replace placeholder with your GA Measurement ID

### 4. Affiliate Link Configuration

**Find and replace across all files:**

Search: `https://fmarket.vn?ref=affiliate-demo`
Replace: `https://go.behitek.com/fmarket`

Files to update:

- [ ] `src/pages/index.astro` (home page CTA)
- [ ] `src/pages/tools/index.astro` (tools CTA)
- [ ] `src/pages/blog/[...slug].astro` (blog post CTA)
- [ ] `src/content/blog/mutual-funds.mdx` (post content)
- [ ] `src/content/blog/fmarket.mdx` (post content)

**Command to find all occurrences:**

```bash
grep -r "fmarket.vn?ref=affiliate-demo" src/
```

### 5. Giscus Comments Setup

1. **Prerequisites:**
   - [ ] Repository is public
   - [ ] Giscus app installed: [github.com/apps/giscus](https://github.com/apps/giscus)
   - [ ] Discussions enabled in repository settings

2. **Get Configuration:**
   - [ ] Visit [giscus.app](https://giscus.app/)
   - [ ] Enter your repository (e.g., `username/behivest`)
   - [ ] Choose "Discussions" mapping
   - [ ] Select theme: "Preferred color scheme"
   - [ ] Copy configuration values

3. **Update Code:**

**File: `src/pages/blog/[...slug].astro`**

Find the Giscus section and update:

```html
<div
  class="giscus"
  data-repo="YOUR_USERNAME/YOUR_REPO"
  data-repo-id="YOUR_REPO_ID"
  data-category="Comments"
  data-category-id="YOUR_CATEGORY_ID"
  ...
></div>
```

Also update the script section:

```js
script.setAttribute('data-repo', 'YOUR_USERNAME/YOUR_REPO');
script.setAttribute('data-repo-id', 'YOUR_REPO_ID');
script.setAttribute('data-category-id', 'YOUR_CATEGORY_ID');
```

- [ ] Update `data-repo`
- [ ] Update `data-repo-id`
- [ ] Update `data-category-id`

### 6. Formspree Contact Form

1. **Sign up:**
   - [ ] Create account at [formspree.io](https://formspree.io/)
   - [ ] Create a new form
   - [ ] Get form ID (looks like `mxxxxxxx`)

2. **Update Code:**

**File: `src/pages/contact.astro`**

```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST"></form>
```

- [ ] Replace `YOUR_FORM_ID` with your actual form ID

### 7. Branding Customization

**Contact Information**

**File: `src/pages/contact.astro`**

- [ ] Update email address
- [ ] Update physical address
- [ ] Update social media links (or remove if not needed)

**File: `src/components/Footer.astro`**

- [ ] Update footer description
- [ ] Update copyright year (auto-generated, but verify)
- [ ] Update footer links if needed

**About Page**

**File: `src/pages/about.astro`**

- [ ] Customize mission statement
- [ ] Update team/company information
- [ ] Modify "Why Behivest" section if needed

### 8. Visual Assets

**Logo & Favicon:**

- [ ] Replace `public/logo.svg` with your logo
  - Recommended size: 180x40px for logo
  - Must be SVG format for theme compatibility
- [ ] Replace `public/favicon.svg` with your favicon
  - Recommended size: 32x32px
  - SVG format preferred

**Blog Images:**

- [ ] Add hero images to `public/blog/` directory
- [ ] Update `heroImage` paths in blog post frontmatter
- [ ] Recommended size: 1200x630px (good for Open Graph)

### 9. README Updates

**File: `README.md`**

- [ ] Update GitHub username in URLs
- [ ] Update repository name
- [ ] Update demo links
- [ ] Update contact information
- [ ] Update badge links (CI/CD status badges)

## 🚀 Deployment Steps

### 1. Initial Deployment

```bash
# Ensure all changes committed
git add .
git commit -m "Initial configuration"

# Push to GitHub
git push origin main
```

- [ ] Push code to GitHub
- [ ] Wait for GitHub Actions to complete
- [ ] Check Actions tab for deployment status

### 2. Verify Deployment

Visit your site: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME`

- [ ] Site loads without errors
- [ ] All pages accessible
- [ ] Images load
- [ ] Calculators work
- [ ] Dark mode toggles
- [ ] Mobile responsive

### 3. Post-Deployment Checks

**Google Analytics:**

- [ ] Visit your site
- [ ] Check Google Analytics dashboard
- [ ] Verify real-time tracking works

**Giscus Comments:**

- [ ] Navigate to a blog post
- [ ] Check if comments section loads
- [ ] Try posting a test comment

**Contact Form:**

- [ ] Fill out contact form
- [ ] Submit form
- [ ] Check Formspree dashboard for submission
- [ ] Verify email notification received

**SEO:**

- [ ] Run Lighthouse audit (Chrome DevTools)
- [ ] Check SEO score > 90
- [ ] Verify sitemap: `YOUR_SITE/sitemap-index.xml`
- [ ] Verify robots.txt: `YOUR_SITE/robots.txt`

## 🔍 Verification Commands

Run these commands to verify configuration:

```bash
# Check for placeholder affiliate links
grep -r "affiliate-demo" src/

# Check for placeholder GA ID
grep -r "G-XXXXXXX" src/

# Check for placeholder Giscus config
grep -r "YOUR_REPO_ID" src/

# Check for placeholder Formspree ID
grep -r "YOUR_FORMSPREE_ID" src/

# Run all tests
npm run lint
npm run test
npm run build
npm run test:e2e
```

Expected: No matches found for placeholders.

## 📝 Environment Variables Summary

Create `.env` file in project root:

```env
# Google Analytics
PUBLIC_GA_ID=G-XXXXXXXXXX
```

Add to production (GitHub Secrets if needed):

- Currently, only `PUBLIC_GA_ID` is needed
- GitHub Pages deployment uses repository token automatically

## 🎨 Optional Customizations

### Custom Domain

1. **DNS Configuration:**
   - [ ] Add CNAME record pointing to `USERNAME.github.io`
   - [ ] Wait for DNS propagation (up to 48 hours)

2. **GitHub Settings:**
   - [ ] Go to repository Settings → Pages
   - [ ] Add custom domain
   - [ ] Enable "Enforce HTTPS"

3. **Update Configuration:**
   - [ ] Change `base: '/'` in `astro.config.mjs`
   - [ ] Update `site: 'https://yourdomain.com'`
   - [ ] Create `public/CNAME` with your domain

### Color Theme

**File: `tailwind.config.mjs`**

```js
colors: {
  primary: {
    500: '#YOUR_COLOR', // Main brand color
  },
  secondary: {
    500: '#YOUR_COLOR', // Accent color
  },
}
```

- [ ] Choose primary color (currently orange #f59300)
- [ ] Choose secondary color (currently green #22c55e)
- [ ] Generate full palette: [uicolors.app](https://uicolors.app/create)

### Font

**File: `src/components/SEO.astro`** - Google Fonts import
**File: `tailwind.config.mjs`** - Font family config

- [ ] Choose font from [Google Fonts](https://fonts.google.com/)
- [ ] Update import URL
- [ ] Update Tailwind config

## ✅ Final Checklist

Before going live:

- [ ] All placeholder text replaced
- [ ] All links tested
- [ ] All forms tested
- [ ] Analytics tracking verified
- [ ] SEO audit passed
- [ ] Mobile testing done
- [ ] Cross-browser testing done (Chrome, Firefox, Safari)
- [ ] Lighthouse scores > 90
- [ ] No console errors
- [ ] README updated
- [ ] LICENSE added (if applicable)

## 🐛 Troubleshooting

### Site Not Loading

**Issue:** 404 error on GitHub Pages
**Solution:**

1. Check GitHub Actions → Ensure deployment succeeded
2. Verify `base` path matches repository name
3. Wait 5 minutes for cache to clear

### Assets Not Loading

**Issue:** Images/CSS not loading
**Solution:**

1. Verify `base` in `astro.config.mjs`
2. Ensure assets in `public/` directory
3. Hard refresh browser (Ctrl+Shift+R)

### Analytics Not Tracking

**Issue:** No data in Google Analytics
**Solution:**

1. Verify GA_MEASUREMENT_ID is correct
2. Check that ID doesn't equal placeholder `G-XXXXXXX`
3. Wait 24-48 hours for data to appear
4. Disable ad blocker when testing

### Comments Not Loading

**Issue:** Giscus comments don't appear
**Solution:**

1. Verify repository is public
2. Check Giscus app is installed
3. Verify repo ID and category ID are correct
4. Check browser console for errors

## 📞 Need Help?

- GitHub Issues: [github.com/behitek/behivest/issues](https://github.com/behitek/behivest/issues)
- Email: hello@behivest.com
- Documentation: See README.md and TESTING.md

---

**Configuration complete?** Run `npm run build && npm run test:e2e` to verify everything works!
