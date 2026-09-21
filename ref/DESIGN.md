---
name: Warm Culinary POS
colors:
  surface: '#f9f9ff'
  surface-dim: '#d7dae3'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f3fd'
  surface-container: '#ebeef7'
  surface-container-high: '#e5e8f2'
  surface-container-highest: '#dfe2ec'
  on-surface: '#181c23'
  on-surface-variant: '#5b403b'
  inverse-surface: '#2d3138'
  inverse-on-surface: '#eef0fa'
  outline: '#8f7069'
  outline-variant: '#e3beb6'
  surface-tint: '#b52606'
  primary: '#b52606'
  on-primary: '#ffffff'
  primary-container: '#ff5a38'
  on-primary-container: '#5a0b00'
  inverse-primary: '#ffb4a4'
  secondary: '#555f71'
  on-secondary: '#ffffff'
  secondary-container: '#dae2f9'
  on-secondary-container: '#5b6577'
  tertiary: '#665c5a'
  on-tertiary: '#ffffff'
  tertiary-container: '#9b908e'
  on-tertiary-container: '#312a28'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad3'
  primary-fixed-dim: '#ffb4a4'
  on-primary-fixed: '#3e0500'
  on-primary-fixed-variant: '#8c1700'
  secondary-fixed: '#dae2f9'
  secondary-fixed-dim: '#bec7dc'
  on-secondary-fixed: '#121c2c'
  on-secondary-fixed-variant: '#3e4759'
  tertiary-fixed: '#ede0dd'
  tertiary-fixed-dim: '#d0c4c1'
  on-tertiary-fixed: '#211a19'
  on-tertiary-fixed-variant: '#4d4543'
  background: '#f9f9ff'
  on-background: '#181c23'
  surface-variant: '#dfe2ec'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 28px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  title-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '600'
    lineHeight: 22px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 22px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  space-2xs: 0.25rem
  space-xs: 0.5rem
  space-sm: 0.75rem
  space-md: 1rem
  space-lg: 1.25rem
  space-xl: 1.5rem
  space-2xl: 2rem
  space-3xl: 2.5rem
  space-4xl: 3rem
  gutter-pos: 1rem
  margin-screen: 1.5rem
---

## Brand & Style

This design system powers a high-velocity, multi-tenant restaurant management and Point of Sale (POS) platform. It balances rapid operational ergonomics (kitchen tickets, floor-level ordering, quick billing) with executive-level clarity across multi-unit franchise hierarchies (Organization → Branches/Locations → Staff/Role-based access).

### Visual Philosophy & Style
The aesthetic adopts a modern, warm-tactile SaaS model:
- **Calm, High-Readability Foundations**: Soft off-white canvas `#F7F8FA` paired with pure white `#FFFFFF` cards prevents eye fatigue during 12-hour kitchen or register shifts.
- **Energizing Appetite Primary**: High-chroma warm coral `#FF5A38` and spicy persimmon `#E84E2E` provide high-contrast call-to-actions, active state highlights, and status accents without inducing the harsh urgency of emergency red.
- **Controlled Density**: Touch targets adhere to a minimum 44px height for fast finger-tapping on countertop tablets, while desktop administrative tables feature tight, clear information hierarchies.
- **Multi-Tenant Structure**: Consistent ambient badges and tenant selectors ensure operators always know their scope (e.g., Global HQ vs. "Downtown Flagship - Terminal 02").

## Colors

The color palette prioritizes quick optical scanning, culinary warmth, and clear tenant boundary identification.

### Palette Architecture
- **Primary (`#FF5A38`, Hover: `#E84E2E`)**: Reserved for immediate conversion points, active states, active tab strokes, and table ready states.
- **Secondary (`#2B3445`)**: Used for secondary actions, navigational active markers, category indicators, and metadata pills.
- **Tertiary / Tint Layer (`#FFF1EE`)**: Soft coral wash applied behind active navigation items, active category pill filters, and selected product cards.
- **Neutrals**:
  - **Background / Canvas**: `#F7F8FA` provides gentle contrast behind surface cards.
  - **Surface Container (Default)**: `#FFFFFF` for product tiles, checkouts, drawers, and modal panels.
  - **Borders & Dividers**: `#EDEFF2` for standard separators; `#FFDCD4` for focused/active outlines.
  - **Text Primary**: `#1E2229` (high-contrast charcoal).
  - **Text Muted**: `#687182` (secondary labels, price baselines, SKU indicators).
- **System States**:
  - **Success / Paid**: `#10B981` (tint `#ECFDF5`)
  - **Pending / Kitchen Prep**: `#F59E0B` (tint `#FFFBEB`)
  - **Danger / Voided**: `#EF4444` (tint `#FEF2F2`)

## Typography

The type system relies entirely on **Plus Jakarta Sans**, a humanist grotesque whose geometric foundation and wide apertures ensure instant readability under kitchen glare or rapid cashier scanning.

### Numerical Data & Prices
All currency values and POS ticket counts must employ tabular figures (`font-feature-settings: 'tnum' 1`) to guarantee columnar alignment across checkout summaries and receipts.

### Hierarchy Guidelines
- **Headlines (`headline-xl`, `headline-lg`)**: Store stats, branch gross totals, and primary billing drawers.
- **Product Titles (`title-md`)**: Two-line truncation clamp (`line-clamp: 2`) to maintain consistent grid heights on dish catalogs.
- **Prices (`label-lg`)**: Highlighted in `#FF5A38` for easy glanceability, paired with strikethrough original prices using `body-sm` in `#687182`.
- **Badges & Role Tags (`label-sm`)**: Uppercase tracking (`+0.02em`) for staff permission scopes (e.g., "SUPER ADMIN", "FLOOR MANAGER", "CASHIER").

## Layout & Spacing

The POS workspace operates on a three-pane fluid architecture tailored for countertop displays (1024px tablet landscape up to 4K register terminals):

1. **Left Navigation (Global Rail & Switcher)**: Fixed 220px on desktop (collapsible to 72px icon rail on tablet). Houses organization selector, active branch pill, and functional modules.
2. **Center Canvas (Catalog / Operations)**: Fluid grid with a minimum 4-column layout on standard displays, auto-fitting menu items between 180px and 240px wide.
3. **Right Panel (Order Slip / Cart / Invoice)**: Fixed 360px on desktop (collapsible slide-over drawer on screens < 1200px), maintaining immediate access to bill calculations and payment methods.

### Rhythmic Scaling
- Base increment: 4px / 8px.
- Compact gaps inside order items: `0.5rem` (8px).
- Internal container padding for item cards and billing widgets: `1rem` to `1.25rem` (16px–20px).
- Screen safe zones: 24px margins around desktop containers.

## Elevation & Depth

This system avoids heavy, muddy drop shadows in favor of crisp containment, tinted ambient glows, and high-clarity surface separation.

### Elevation Hierarchy
- **Level 0 (Canvas Base)**: `#F7F8FA` background with 0px offset.
- **Level 1 (Card & Section Containers)**: `#FFFFFF` surface with a delicate perimeter border (`1px solid #EDEFF2`) and an ambient micro-shadow: `box-shadow: 0 2px 8px -2px rgba(30, 34, 41, 0.04), 0 1px 4px -1px rgba(30, 34, 41, 0.02)`.
- **Level 2 (Active Dish / Hovered Element)**: Border changes to `1px solid #FF5A38`, accompanied by a warm primary glow: `box-shadow: 0 8px 24px -4px rgba(255, 90, 56, 0.12)`.
- **Level 3 (Sticky Drawer / Invoice Summary / Modals)**: Floated checkout slip and permission sheets use `box-shadow: 0 16px 32px -8px rgba(30, 34, 41, 0.08), 0 4px 12px -2px rgba(30, 34, 41, 0.03)`.

## Shapes

The design uses balanced, modern radii (`roundedness: 2`) to evoke warmth and approachability while preserving screen space on packed inventory screens.

- **Primary Cards & Modals**: 16px corner radius (`rounded-2xl` / 1rem).
- **Interactive Buttons, Search Inputs, and Category Tabs**: 12px corner radius (`rounded-xl` / 0.75rem).
- **Micro-Elements (Badges, Quantity Increments, Checkboxes)**: 6px to 8px corner radius (`rounded-md` / 0.375rem–0.5rem).
- **Pills / Status Chips**: Fully rounded pill shapes (`9999px`) reserved for item counts, live order stages, and table seat indicators.

## Components

### Buttons
- **Primary**: Solid `#FF5A38` background, `#FFFFFF` text, 12px radius, 44px min-height. Hover triggers `#E84E2E` with smooth 150ms ease transition. Active state shifts down by 1px.
- **Secondary / Action Ghost**: `#FFF1EE` soft tint fill, `#FF5A38` text, zero border. Used for secondary inline actions (e.g., "Wishlist", "Add Note", "Discount").
- **Outline / Filter**: Pure `#FFFFFF` background with `1px solid #EDEFF2`, `#1E2229` text. Hover brings `1px solid #FF5A38` and primary text tint.

### Category Chips & Horizontal Nav
- Unselected chips feature `#FFFFFF` background, `#687182` neutral text, and 12px border radius.
- Selected / Active chips feature a 1px border of `#FF5A38` with an interior soft background of `#FFF1EE`, displaying an integrated icon or emoji alongside `#1E2229` medium weight typography.

### Product / Menu Catalog Cards
- Pure white background `#FFFFFF`, 16px radius, enclosed by `1px solid #EDEFF2`.
- High-res dish image container with `aspect-ratio: 4/3`, framed inside an inner neutral padding or border-radius matching the outer card minus 4px.
- Selected/Added state: The card boundary shifts to `1px solid #FF5A38` with a warm coral tinted checkbox indicator at the top left.
- Bottom actions: Side-by-side action row with secondary action button ("Wishlist" or "Options") and primary action button ("Order Now" / "Add").

### Order Invoice & Slip Module
- Fixed right container with pure white surface, top order identifier (`Invoice #POS-2041`), table designation, and customer selector.
- Line items feature thumbnail (44x44px, 8px radius), item name, quantity control pills, and bold tabular currency.
- Bottom receipt summary uses a subtle dashed divider (`1px dashed #EDEFF2`) separating subtotal, applied taxes, gratuity, and total.
- Payment method selector grid (Credit Card, Cash, Split, Wallet) with clear visual selected outline (`1.5px solid #FF5A38`).

### Tenant & Branch Switcher
- Placed prominently atop the left navigation drawer.
- Shows current active Organization avatar and name, nested Branch name, and a dual chevron.
- Modal dropdown permits fast switching between operational entities with instant badge confirmation of the current user's role (e.g., "Super Admin", "General Manager", "Terminal Operator").

### Inputs & Search
- Surface `#FFFFFF` with `1px solid #EDEFF2`, inner height 44px, 12px radius.
- Search icon affixed left in muted `#687182`. Active focus switches outline to `#FF5A38` with a zero-spread 3px ring of `rgba(255, 90, 56, 0.15)`.