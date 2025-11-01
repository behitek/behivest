# FundPerformance Component Usage Guide

## Overview

The `FundPerformance` component is a reusable Astro component that fetches and displays mutual fund performance data from the Fmarket API. It can be used in both regular Astro pages and MDX blog posts.

## Features

- ✅ Real-time data from Fmarket API
- ✅ Filterable by fund type (All, Stock funds, Bond funds)
- ✅ **Sortable by performance** (1 month, 1 year, 3 years)
- ✅ **Smart N/A handling** - funds without data appear at the bottom when sorting
- ✅ Visual sort indicators with ascending/descending arrows
- ✅ Responsive table design with dark mode support
- ✅ Configurable page size and initial filter
- ✅ Loading states and error handling
- ✅ Can be embedded in MDX blog posts

## Basic Usage

### In Astro Pages

```astro
---
import FundPerformance from '../components/FundPerformance.astro';
---

<FundPerformance />
```

### In MDX Blog Posts

```mdx
---
title: 'My Blog Post'
---

import FundPerformance from '../../components/FundPerformance.astro';

# My Blog Content

Here are the current mutual funds:

<FundPerformance />
```

## Props

| Prop            | Type                         | Default | Description                                                      |
| --------------- | ---------------------------- | ------- | ---------------------------------------------------------------- |
| `initialFilter` | `'ALL' \| 'STOCK' \| 'BOND'` | `'ALL'` | Initial filter to apply when component loads                     |
| `pageSize`      | `number`                     | `20`    | Number of funds to display                                       |
| `showFilters`   | `boolean`                    | `true`  | Whether to show filter buttons                                   |
| `showActionCol` | `boolean`                    | `false` | Whether to show action column with buy buttons (affiliate links) |

## Examples

### Show only stock funds without filter buttons

```astro
<FundPerformance initialFilter="STOCK" showFilters={false} />
```

### Show top 10 bond funds

```astro
<FundPerformance initialFilter="BOND" pageSize={10} showFilters={false} />
```

### Show all funds with custom page size

```astro
<FundPerformance pageSize={50} />
```

## Data Displayed

For each fund, the component displays:

- Fund code and issuer name
- Fund type (Stock, Bond, Balanced, Other)
- Latest NAV (Net Asset Value) with date
- Performance metrics:
  - 1 month return
  - 1 year return
  - 3 year annualized return
- Buy button with affiliate link

## Sorting

The table is sortable by clicking on the performance column headers:

- **1 tháng** (1 month) - Click to sort by 1-month performance
- **1 năm** (1 year) - Click to sort by 1-year performance (default)
- **3 năm** (3 years) - Click to sort by 3-year performance

### Sorting Behavior

- **First click**: Sorts descending (highest performance first)
- **Second click**: Sorts ascending (lowest performance first)
- **Click different column**: Switches to that column, descending by default
- **N/A handling**: Funds without performance data always appear at the bottom, regardless of sort direction
- **Visual indicators**: Active column is highlighted in orange with an arrow (up for ascending, down for descending)

## Styling

The component uses TailwindCSS classes and automatically adapts to:

- Light/dark mode
- Mobile/desktop screens
- Your site's existing color scheme (uses orange primary colors)

## API Integration

The component fetches data from:

- **Endpoint**: `https://api.fmarket.vn/res/products/filter`
- **Method**: POST
- **Headers**: Includes Vietnamese language preference

See `apis.md` for detailed API documentation.

## TypeScript Types

All types are defined in `src/types/fund.ts`:

- `FundData`: Individual fund information
- `FundFilterParams`: API request parameters
- `FundApiResponse`: API response structure
- `FundAssetFilter`: Filter options ('ALL' | 'STOCK' | 'BOND')

## Utilities

Helper functions in `src/utils/fundApi.ts`:

- `fetchFunds(params)`: Fetch fund data from API
- `formatPercentage(value)`: Format performance as percentage
- `formatCurrencyVND(value)`: Format currency in Vietnamese format
- `formatDate(dateString)`: Format date in Vietnamese locale

## Example: Blog Post Integration

Here's a complete example of using the component in a blog post about stock funds:

```mdx
---
title: 'Top Stock Funds 2024'
description: 'Best performing stock funds in Vietnam'
pubDate: 2024-01-20
---

import FundPerformance from '../../components/FundPerformance.astro';

# Top Stock Funds 2024

Stock funds offer high growth potential. Here are the current top performers:

<FundPerformance initialFilter="STOCK" pageSize={10} />

## How to Choose

When selecting a fund, consider...
```

## Browser Support

The component uses modern JavaScript features and requires:

- ES6+ support
- Fetch API
- Async/await
- Modern CSS (Grid, Flexbox)

All modern browsers are supported (Chrome, Firefox, Safari, Edge).

## Notes

- The component initializes on page load and when Astro navigates between pages
- Each instance maintains its own state
- Multiple instances can be used on the same page
- Loading state is shown while fetching data
- Error messages are displayed if the API fails
- All affiliate links open in new tabs with proper security attributes
