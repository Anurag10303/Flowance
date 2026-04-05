# Flowance — Finance Dashboard

> A premium, animated finance dashboard built for the Frontend Developer Intern assignment at [Company].
> **Live Demo:** https://flowance-bwls.vercel.app/

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Live Demo](#2-live-demo)
3. [Setup Instructions](#3-setup-instructions)
4. [Tech Stack](#4-tech-stack)
5. [Project Structure](#5-project-structure)
6. [Features & Approach](#6-features--approach)
   - Dashboard Overview
   - Transactions
   - Insights
   - Role-Based UI
   - Light / Dark Mode
   - State Management
   - Animations
7. [Design Decisions](#7-design-decisions)
8. [State Management Approach](#8-state-management-approach)
9. [RBAC Implementation](#9-rbac-implementation)
10. [Edge Cases Handled](#10-edge-cases-handled)
11. [Optional Enhancements Included](#11-optional-enhancements-included)
12. [Deployment](#12-deployment)
13. [Assumptions Made](#13-assumptions-made)

---

## 1. Project Overview

Flowance is a fully interactive finance dashboard that lets users track income, expenses, and spending patterns across multiple months. It features a premium dark/light mode, smooth animations, role-based access control, and smart auto-generated insights — all powered by React, Zustand, and Recharts.

The goal was not to build something perfect, but to demonstrate a clear, thoughtful approach to frontend architecture, UI quality, and user experience. Every feature was deliberately chosen and every design decision was intentional.

---

## 2. Live Demo

| Link                                         | Description                 |
| -------------------------------------------- | --------------------------- |
| **https://flowance-bwls.vercel.app/**      | Primary deployment (Vercel) |
| **https://github.com/Anurag10303/Flowance** | Source code repository      |

**Default state on open:**

- Role is set to **Admin** (full access)
- 45 mock transactions pre-loaded across January–April 2025
- Dark mode enabled by default (respects system preference)

**To test Viewer mode:** Click the sidebar role switcher → select "Viewer"
**To test Light mode:** Click the moon/sun icon in the sidebar or landing page nav

---

## 3. Setup Instructions

### Prerequisites

- Node.js v18 or higher
- npm v8 or higher

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Anurag10303/Flowance
cd flowance

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be running at **http://localhost:5173**

### Build for Production

```bash
npm run build
npm run preview   # preview the production build locally
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

> The included `vercel.json` handles client-side routing automatically so direct URL access works.

---

## 4. Tech Stack

| Layer       | Technology                       | Why                                              |
| ----------- | -------------------------------- | ------------------------------------------------ |
| Framework   | React 18 + Vite                  | Fast HMR, modern JSX, ES modules                 |
| Routing     | React Router v6                  | Declarative, nested-ready routing                |
| State       | Zustand v4                       | Minimal boilerplate, built-in persist middleware |
| Charts      | Recharts                         | Composable, React-native charting                |
| Styling     | CSS Variables + Inline styles    | Zero-class-conflict theming, co-located logic    |
| Fonts       | Syne + DM Sans (Google Fonts)    | Premium editorial feel                           |
| Persistence | localStorage via Zustand persist | Transactions survive page refresh                |
| Deployment  | Vercel                           | Zero-config, instant CDN                         |

---

## 5. Project Structure

```
flowance/
├── public/
├── src/
│   ├── context/
│   │   └── ThemeContext.jsx         # Light/dark mode provider + toggle
│   ├── data/
│   │   └── mockTransactions.js      # 45 transactions Jan–Apr 2025 + color maps
│   ├── store/
│   │   └── useFinanceStore.js       # Zustand store: all state, CRUD, selectors
│   ├── utils/
│   │   ├── formatters.js            # INR formatting, date helpers
│   │   └── exportCSV.js             # CSV download utility
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.jsx          # Nav, role switcher, theme toggle
│   │   │   ├── Header.jsx           # Page title, search, export, avatar
│   │   │   └── Layout.jsx           # Shell wrapper
│   │   ├── ui/
│   │   │   ├── EmptyState.jsx       # No-data fallback
│   │   │   ├── Modal.jsx            # Animated overlay modal
│   │   │   ├── CategoryBadge.jsx    # Color-coded category pill
│   │   │   └── TransactionForm.jsx  # Add/edit form with validation
│   │   ├── dashboard/
│   │   │   ├── SummaryCards.jsx     # Animated KPI cards
│   │   │   ├── BalanceTrendChart.jsx# Area chart (income/expense/net)
│   │   │   ├── SpendingBreakdownChart.jsx # Donut chart
│   │   │   └── RecentTransactions.jsx     # Last 6 transactions
│   │   ├── transactions/
│   │   │   ├── FilterBar.jsx        # Type chips + dropdowns
│   │   │   └── TransactionTable.jsx # Sortable table + modals
│   │   └── insights/
│   │       ├── InsightCards.jsx     # Top category, savings rate, MoM change
│   │       ├── MonthlyComparisonChart.jsx # Grouped bar chart
│   │       ├── CategorySpendingBar.jsx    # Horizontal bar breakdown
│   │       └── ObservationCards.jsx       # 6 auto-generated observations
│   ├── pages/
│   │   ├── LandingPage.jsx          # Marketing page with animations
│   │   ├── DashboardPage.jsx
│   │   ├── TransactionsPage.jsx
│   │   └── InsightsPage.jsx
│   ├── App.jsx                      # Router config
│   ├── main.jsx                     # React root + providers
│   └── index.css                    # CSS variables, animations, base styles
├── vercel.json                      # SPA routing config
├── vite.config.js                   # Code splitting
├── tailwind.config.js
└── README.md
```

---

## 6. Features & Approach

### Dashboard Overview

The dashboard is the first screen users see after the landing page. It answers three questions immediately: How much do I have? How much did I earn? How much did I spend?

**Summary Cards** — Three cards showing Total Balance, Total Income, and Total Expenses. Numbers animate smoothly using `requestAnimationFrame` with a cubic ease-out — whenever a transaction is added or deleted, the numbers count up/down to their new value. Cards also lift on hover with a box-shadow transition.

**Balance Trend Chart (Area Chart)** — Shows income, expenses, and net balance across all months as three overlapping area charts. Built with Recharts `AreaChart`. Gradient fills make it visually distinct. Custom tooltip shows all three values on hover.

**Spending Breakdown (Donut Chart)** — Top 5 expense categories rendered as a donut chart. Each category has a distinct color maintained consistently across dark and light mode. Legend is rendered alongside the chart, not below it, to save vertical space.

**Recent Transactions** — The 6 most recent transactions sorted by date. Shows description, category badge, amount (color-coded green for income, red for expense), and date. "See all →" navigates to the full transactions page.

---

### Transactions

The transactions page is the most feature-dense part of the app.

**Table** — A CSS Grid-based table (not an HTML `<table>`) with 4 columns for Viewer and 5 for Admin (adds an Actions column). Every column header is clickable for sorting — clicking the active column toggles direction; clicking a new column sets descending. A sort arrow icon indicates the current sort state.

**Filtering** — Three mechanisms work simultaneously:

- Type chips: All / Income / Expense
- Category dropdown: Any of 8 categories
- Month dropdown: Auto-populated from available transaction months
- Search bar in the header: Filters by description or category text

A "Clear ×" button appears when any filter is active, letting users reset everything in one click. The results count ("42 transactions matching filters") updates live.

**Add / Edit / Delete (Admin only)** — The "+ Add transaction" button and Edit/Del row actions are only rendered when `role === 'admin'`. Both Add and Edit use the same `TransactionForm` component with inline validation. Delete shows a confirmation modal before removing. All CRUD operations flow through the Zustand store and persist to localStorage.

---

### Insights

The insights page surfaces patterns that would be hard to see from the raw transaction list.

**KPI Cards** — Three top-level cards:

- _Top Spending Category_: Computed from expense aggregation. Color matches the category's color scheme.
- _Savings Rate_: `(income - expense) / income * 100`. Color-coded: green if ≥20%, amber if ≥10%, red below.
- _Expense Change_: Month-on-month percentage change. Shows +/- and color.

**Monthly Comparison Chart** — Grouped bar chart with income and expense bars side by side for each month. Tooltip shows both values plus calculated net. Built with Recharts `BarChart`.

**Category Spending Bars** — Horizontal progress bars, one per expense category. Bar width is relative to the highest-spending category (not total), making relative comparisons easy. Each bar animates from 0 to its width on mount using CSS `transition`.

**Observation Cards** — 6 auto-generated text observations computed live from transaction data:

1. Best income month
2. Largest single expense
3. Most frequently transacted category
4. Month-on-month savings direction (improved/declined)
5. Most frugal month
6. Top 2 categories' combined share of spending

These update immediately when transactions change — they are pure computations over the store, not stored state.

---

### Role-Based UI

Roles are simulated on the frontend as specified. The `role` field in the Zustand store holds either `'admin'` or `'viewer'`.

| Feature            | Viewer | Admin |
| ------------------ | ------ | ----- |
| View dashboard     | ✓      | ✓     |
| View transactions  | ✓      | ✓     |
| View insights      | ✓      | ✓     |
| Search & filter    | ✓      | ✓     |
| Add transaction    | ✗      | ✓     |
| Edit transaction   | ✗      | ✓     |
| Delete transaction | ✗      | ✓     |
| Export CSV         | ✗      | ✓     |

Switching is done via the role toggle in the sidebar bottom. The UI updates instantly — admin-only controls disappear and reappear in real time, including the Actions column in the table, the "+ Add transaction" button, and the Export CSV button in the header.

Role is persisted to localStorage so it survives page refresh.

---

### Light / Dark Mode

Built as a full CSS variable system rather than just swapping class names.

**How it works:**

- `:root` defines all colors in light mode
- `.dark` on `<html>` overrides every variable to dark values
- All components reference `var(--bg)`, `var(--text)`, `var(--accent)` etc.
- `ThemeContext` manages the boolean `dark` state, applies the class, and persists to localStorage
- On first load, the system's `prefers-color-scheme` is checked as the default

**Accent color:** `#059669` in light mode (darker green for WCAG contrast), `#6EE7B7` in dark mode (bright mint).

**Category colors:** Both dark and light modes have separate color maps for category badges and chart elements, ensuring proper contrast in both modes.

**Toggle locations:** Sidebar bottom (inside the app) and navigation bar (on the landing page).

---

### State Management

All application state lives in a single Zustand store at `src/store/useFinanceStore.js`.

**State shape:**

```js
{
  transactions: [...],   // persisted to localStorage
  role: 'admin',         // persisted to localStorage
  filters: {
    type: 'all',
    category: 'all',
    month: 'all',
    search: '',
    sortBy: 'date',
    sortDir: 'desc',
  }
}
```

**Selectors (derived computations, not stored state):**

- `getFilteredTransactions()` — applies all 4 filter dimensions + sort
- `getSummary()` — total income, expense, balance
- `getMonthlySummary()` — grouped by month
- `getCategoryBreakdown()` — aggregated expenses by category with percentages
- `getTopSpendingCategory()` — highest expense category
- `getAvailableMonths()` — unique months from transaction dates

Selectors are functions on the store, not useSelector hooks — they recompute on every call, which is efficient at this data scale and avoids stale cache issues.

---

### Animations

Every animation was implemented with intent — nothing is decorative.

| Animation                   | Where                    | Purpose                        |
| --------------------------- | ------------------------ | ------------------------------ |
| `fadeUp` (scroll-triggered) | Landing page sections    | Guide reading flow             |
| Animated counter            | Stat section on landing  | Draw attention to numbers      |
| `float` (infinite)          | Dashboard mockup in hero | Suggest the app is live/active |
| Pulse glow                  | Badge dot, mesh blobs    | Signal "live" status           |
| Page enter (`fadeUp`)       | All route transitions    | Reduce jarring jumps           |
| Number count-up             | Summary cards            | Show data changed              |
| Card lift on hover          | All cards across app     | Interactive affordance         |
| Modal scale-in              | Add/Edit/Delete modals   | Focus and depth                |
| Bar width transition        | Category bars            | Data arriving progressively    |

Scroll reveals use `IntersectionObserver` — no library dependency. Number animations use `requestAnimationFrame` for smooth 60fps counting.

---

## 7. Design Decisions

**Typography** — Syne (display/headings) paired with DM Sans (body). Syne at weight 800 creates strong visual hierarchy with minimal color usage. DM Sans at 300–500 keeps body text readable without competing with headings.

**Color system** — Two-accent system: mint green `#6EE7B7` / `#059669` for income/positive/accent, and red `#F87171` / `#DC2626` for expenses/negative/danger. Purple `#818CF8` is used for net balance (neutral third metric). These are applied consistently across charts, badges, and indicators throughout the app.

**Layout** — 220px fixed sidebar, 56px sticky header, full-height scrollable content. The dashboard mockup in the hero section intentionally shows the real app's layout at a glance — users know exactly what they're clicking into.

**CSS Grid for tables** — Using `display: grid` instead of `<table>` allows the Actions column to conditionally appear and disappear without layout shift or DOM restructuring.

**Component size** — Every component is kept under 150 lines. `TransactionTable.jsx` is the largest at ~150 lines and handles Edit + Delete modals inline to avoid prop-drilling the modal state up to the page level.

**No component library** — Zero UI component libraries were used. Every button, modal, badge, and input is hand-crafted. This demonstrates precise control over design quality and avoids dependency bloat.

---

## 8. State Management Approach

Zustand was chosen over Redux or Context for three reasons:

1. **No boilerplate.** A store is just a function. No actions, reducers, or providers needed beyond the optional `persist` middleware.
2. **Built-in persistence.** The `persist` middleware with `partialize` syncs only `transactions` and `role` to localStorage, not filters — filters are session-only.
3. **Selector co-location.** Derived computations (`getFilteredTransactions`, `getMonthlySummary`, etc.) live inside the store alongside the state they derive from, making them easy to find and test.

Filters intentionally do NOT persist. A user refreshing the page should not be surprised to see a filtered view — they should always start fresh on the full data set. Role and transactions persist because those represent intent.

---

## 9. RBAC Implementation

The role system simulates frontend RBAC as specified in the assignment. There is no backend — role is a string in Zustand state.

**Implementation pattern** — Rather than a centralized permission checker, each component reads `role` from the store directly and makes its own rendering decision:

```jsx
// TransactionsPage.jsx
{
  role === "admin" && (
    <button onClick={() => setShowAdd(true)}>+ Add transaction</button>
  );
}

// TransactionTable.jsx
const COL =
  role === "admin" ? "2.2fr 1.1fr 1fr 1fr 80px" : "2.2fr 1.1fr 1fr 1fr";
```

This is intentionally simple. A production app would have a `usePermission('transactions.write')` hook with a permissions map, but for an assignment-scale app with two roles, direct role checks are cleaner and more readable.

**What changes per role:**

In Admin mode:

- "+ Add transaction" button appears in TransactionsPage
- "Edit" and "Del" text buttons appear on every table row
- Actions column header appears in the table
- "Export CSV" button appears in the Header

In Viewer mode:

- All of the above disappear — components are not rendered, not just visually hidden. A viewer cannot trigger any mutation.

---

## 10. Edge Cases Handled

| Scenario                      | Handling                                                              |
| ----------------------------- | --------------------------------------------------------------------- |
| No transactions at all        | EmptyState component with icon and message                            |
| Filters return zero results   | EmptyState with "Try adjusting your filters" message                  |
| Only one month of data        | Expense change card shows "Need 2+ months of data"                    |
| Zero income                   | Savings rate shows 0% instead of NaN                                  |
| Long transaction descriptions | Text truncates with ellipsis in table and recent list                 |
| Form submitted empty          | Inline validation errors per field (Required / Invalid amount)        |
| Delete confirmation           | Confirmation modal before any deletion — no accidental deletes        |
| Escape key on modal           | Closes modal via `keydown` event listener                             |
| Click outside modal           | Clicking the overlay also closes the modal                            |
| localStorage missing          | Zustand gracefully falls back to initial state                        |
| Dark mode on first load       | Reads `prefers-color-scheme` before any localStorage value            |
| Amount field with letters     | Validated as `isNaN` — shows error                                    |
| Negative amount               | Validated as `<= 0` — shows error                                     |
| Page refresh                  | Role and transactions restored from localStorage instantly            |
| Very large numbers            | `Intl.NumberFormat` with `en-IN` locale formats correctly with commas |

---

## 11. Optional Enhancements Included

All of the following optional enhancements from the assignment brief were implemented:

| Enhancement             | Implementation                                                                                   |
| ----------------------- | ------------------------------------------------------------------------------------------------ |
| ✅ Dark mode            | Full CSS variable system with system preference detection and localStorage persistence           |
| ✅ Data persistence     | Zustand `persist` middleware saves transactions and role to localStorage                         |
| ✅ Animations           | Scroll-triggered reveals, animated counters, floating hero mockup, page transitions, card hovers |
| ✅ Export functionality | "Export CSV" button in header exports the currently filtered view as a .csv file                 |
| ✅ Advanced filtering   | Type + category + month + search all work simultaneously; sort by date or amount asc/desc        |
| ✅ Landing page         | Full marketing page with hero, features, how-it-works, roles, CTA, animated stats                |

---

## 12. Deployment

The app is deployed on Vercel at:

**https://flowance-bwls.vercel.app/**

### Deployment steps used

```bash
# 1. Build
npm run build

# 2. Push to GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/Anurag10303/Flowance
git push -u origin main

# 3. Import in Vercel dashboard → Deploy
# vercel.json handles the SPA routing automatically
```

### Environment

No environment variables required. The app is entirely client-side with no backend or API keys.

---

## 13. Assumptions Made

1. **No real backend** — All data is mock/static. The assignment explicitly allows this.
2. **INR currency** — Currency is formatted in Indian Rupees using `en-IN` locale, matching the internship context.
3. **Role switching via UI** — The assignment says "switch roles using a dropdown or toggle for demonstration." I implemented a two-button toggle in the sidebar.
4. **Filters are session-only** — Filters reset on page reload. Transactions and role persist. This felt like the right UX default.
5. **45 transactions pre-loaded** — More than enough to demonstrate all features, charts, and insights meaningfully.
6. **No pagination** — At 45 transactions, pagination adds complexity without benefit. The table scrolls naturally and filters reduce the result set quickly.
7. **No authentication** — The assignment does not require login. Role switching is purely demonstrational.
8. **Mobile layout** — The sidebar collapses gracefully on narrow screens. The primary evaluation target is desktop, as dashboards typically are.

---

## Author

Built by Anurag Singh for the Frontend Developer Intern assignment.
Submitted: April 2026

---
