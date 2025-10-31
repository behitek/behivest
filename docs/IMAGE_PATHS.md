# Image & Link Path Handling with Base URL

## Problem

When deploying to GitHub Pages with a base URL (e.g., `/behivest/`), image and link paths need to include the base URL. Writing `/blog/image.jpg` or `/blog/post` in markdown would fail on GitHub Pages because it looks for `/blog/...` instead of `/behivest/blog/...`.

## Solution

We've implemented an automatic path transformation system using a custom remark plugin that automatically prepends the base URL to all **images** and **internal links** in your markdown/MDX files.

## How to Use

### In Blog Posts (MDX)

Simply use normal absolute paths starting with `/` for both images and links:

```mdx
<!-- Images -->
![Alt text](/blog/my-image.jpg)

<!-- Internal links -->
[Read more](/blog/another-post)
[Check our tools](/tools/calculator)
```

These will automatically transform when deployed to GitHub Pages:
- `/blog/my-image.jpg` → `/behivest/blog/my-image.jpg`
- `/blog/another-post` → `/behivest/blog/another-post`

### Path Transformation Rules

1. **Absolute paths** (starting with `/`) → Base URL is prepended
   - Images: `/blog/image.jpg` → `/behivest/blog/image.jpg` ✅
   - Links: `/blog/post` → `/behivest/blog/post` ✅

2. **External URLs** (starting with `http://` or `https://`) → No change
   - `https://example.com/image.jpg` → No change ✅
   - `https://example.com/page` → No change ✅

3. **Hash links** (starting with `#`) → No change
   - `#section-heading` → No change ✅

4. **Relative paths** → No change (not recommended for blog posts)
   - `../images/photo.jpg` → No change
   - `./related-post` → No change

## Technical Implementation

### 1. Remark Plugin (`src/lib/remark-base-url.ts`)

The plugin traverses the markdown AST and transforms both image and link URLs:

```typescript
export function remarkBaseUrl(options: RemarkBaseUrlOptions = {}) {
  const baseUrl = options.baseUrl || '/'

  return (tree: Root) => {
    // Transform image paths
    visit(tree, 'image', (node: Image) => {
      if (node.url.startsWith('/') && !node.url.startsWith('http')) {
        node.url = `${baseUrl}${node.url}`.replace(/\/+/g, '/')
      }
    })

    // Transform internal link paths
    visit(tree, 'link', (node: Link) => {
      if (node.url.startsWith('/') && !node.url.startsWith('http')) {
        node.url = `${baseUrl}${node.url}`.replace(/\/+/g, '/')
      }
    })
  }
}
```

### 2. Configuration (`astro.config.mjs`)

The plugin is registered in the Astro config with environment-aware base URL:

```javascript
import { remarkBaseUrl } from './src/lib/remark-base-url.ts';

// Use '/' for local development, '/behivest/' for production
const BASE_URL = process.env.NODE_ENV === 'production' ? '/behivest/' : '/';

export default defineConfig({
  base: BASE_URL,
  markdown: {
    remarkPlugins: [[remarkBaseUrl, { baseUrl: BASE_URL }]],
  },
});
```

This ensures:
- **Development** (`npm run dev`):
  - Images load from `http://localhost:4321/blog/image.jpg`
  - Links point to `http://localhost:4321/blog/post`
- **Production** (`npm run build`):
  - Images transform to `/behivest/blog/image.jpg`
  - Links transform to `/behivest/blog/post`

### 3. Optional: BlogImage Component

For programmatic image rendering in Astro components:

```astro
---
import BlogImage from '@components/BlogImage.astro'
---

<BlogImage src="/blog/image.jpg" alt="Description" />
```

## Changing Base URL

### For Custom Domain (No Base Path)

Update the production base URL in `astro.config.mjs`:

```javascript
// Custom domain (no base path needed)
const BASE_URL = process.env.NODE_ENV === 'production' ? '/' : '/';
```

### For Different GitHub Pages Repository

If your repository name is different:

```javascript
// For repo name 'my-blog' on GitHub Pages
const BASE_URL = process.env.NODE_ENV === 'production' ? '/my-blog/' : '/';
```

### Override for Testing Production Locally

To test with production base URL in development:

```bash
NODE_ENV=production npm run dev
```

## MDX Syntax Notes

When writing MDX, be aware of these syntax rules:

### ❌ Avoid These Patterns

1. **Framework names with versions** can be parsed as JSX:
   ```mdx
   <!-- BAD: MDX thinks "Next.js 14" is JSX -->
   Using Next.js 14 for this project

   <!-- GOOD: Use backticks to escape -->
   Using `Next.js` v14 for this project
   ```

2. **Comparison operators** can trigger JSX parsing:
   ```mdx
   <!-- BAD: <1 triggers JSX parsing -->
   Investment period <1 year

   <!-- GOOD: Use words -->
   Investment period under 1 year

   <!-- ALSO GOOD: Escape with code -->
   Investment period `<1` year
   ```

3. **Tags or HTML-like syntax** in plain text:
   ```mdx
   <!-- BAD -->
   Use <tag> for HTML

   <!-- GOOD -->
   Use `<tag>` for HTML
   ```

### ✅ Best Practices

1. Use backticks for technical terms: `` `Next.js` ``, `` `<component>` ``
2. Use words instead of symbols: "under 1 year" instead of "<1 year"
3. Escape special characters when needed
4. Test build after adding new content

## Testing

After making changes to blog posts:

```bash
# Run build to check for MDX syntax errors
npm run build

# Start dev server to preview
npm run dev
```

## Dependencies

- `unist-util-visit`: AST traversal for remark plugins
- Installed automatically when you run `npm install`

## Benefits

✅ Write cleaner markdown without base URL clutter
✅ Automatic handling - no manual path updates needed
✅ Works with both development and production builds
✅ Easy to change base URL for different deployments
✅ External URLs are not affected

## Troubleshooting

**Images not showing in development?**
- Check that images exist in `public/blog/` directory
- Verify path starts with `/blog/` not `blog/`

**Images not showing on GitHub Pages?**
- Ensure `BASE_URL` in `astro.config.mjs` matches your repository name
- Check that the build completed successfully
- Verify the deployed site has the images in the correct location

**MDX build errors?**
- Check for unescaped special characters (< > { })
- Use backticks for technical terms like `Next.js`
- Replace `<1` with "under 1" or `<1` in text
