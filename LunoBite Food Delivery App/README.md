# LunoBite

**Let Us Crave With You.**

LunoBite is a portfolio-ready, mobile-first food-delivery prototype built with React, TypeScript, Vite, and Tailwind CSS. It demonstrates a complete ordering journey using fictional restaurants, sample business information, simulated payments, and non-live order tracking.

## Features

- Welcome and validated demonstration login
- Searchable catalogue with 20 sample products across 17 food categories
- Category filtering, restaurant discovery, sorting, and favourites
- Product options, extras, quantity selection, and special instructions
- Shared cart with configuration-aware line items and live totals
- `LUNO10` demonstration promo code and a consistent delivery-fee rule
- Editable delivery addresses and shared checkout address state
- Validated checkout with simulated payment methods
- Order confirmation, details, and simulated status timeline
- Editable session profile, favourite foods, and order history
- Contact details, validated contact form, and FAQ
- Responsive 390 × 844 px mobile-first layout

## Design system

| Token | Value | Use |
| --- | --- | --- |
| Primary purple | `#6C3FC5` | Primary actions and active states |
| Soft lavender | `#CDB8FF` | Brand highlights |
| Soft white | `#FAF9F6` | App background |
| Charcoal | `#292633` | Primary text |
| Light lavender | `#F0E9FF` | Secondary surfaces |
| White | `#FFFFFF` | Cards |
| Muted text | `#716B7C` | Supporting copy |
| Success green | `#238636` | Success feedback |
| Error red | `#D93636` | Validation and destructive actions |

Poppins is used for headings and controls, with Inter for body copy. Components use an 8-point-inspired spacing rhythm, large touch targets, visible focus treatments, rounded surfaces, and restrained elevation.

## UX rationale

### Target users

The experience is designed for students, young adults, families, and time-conscious food lovers. The tone is friendly and playful while pricing, restaurant metadata, and checkout details remain clear and trustworthy.

### Navigation

A five-item persistent navigation provides direct access to Home, Restaurants, Favourites, Cart, and Profile. Contextual back controls preserve the previous screen. The primary journey is:

`Welcome → Home → Restaurant/category → Product → Cart → Checkout → Confirmation → Order details`

### Ordering friction

Guests can browse and complete the demonstration journey without creating an account. Quick-add controls support repeat choices, while the product screen provides configuration when needed. Cart totals update from one shared source of truth. Checkout groups address, recipient, delivery, payment, and summary information into clear sections with inline validation.

### Accessibility and readability

- High-contrast charcoal text on soft-white surfaces
- Minimum 42–52 px primary control targets
- Keyboard focus rings on all interactive elements
- Text labels for icon-only controls
- Inline, adjacent form errors
- Motion limited to subtle transitions and feedback
- Interactive elements use semantic controls

### Component reuse

Buttons, icon buttons, form fields, headers, food cards, restaurant cards, quantity steppers, price summaries, empty states, navigation, and toast feedback are reusable local React components.

## Demonstration rules

- Restaurants, products, addresses, orders, contact details, and prices are sample data.
- Delivery costs R29 below R350 and is free from R350.
- `LUNO10` applies a 10% discount capped at R50.
- Authentication, payment, contact delivery, GPS, and courier tracking are not connected.
- Data is held for the active browser session and is not persisted to a backend.
- Food photography is sourced from Unsplash.

## Run locally

```bash
pnpm install
pnpm dev
```

Production validation:

```bash
pnpm build
pnpm exec tsc --noEmit
```

## Prototype and screenshots

Use the Figma Make preview panel for the live clickable prototype. Main mobile screens can be captured at 2× from a 390 × 844 viewport for portfolio presentation. Reusable vector logo assets are available in `public/lunobite-logo.svg` and `public/lunobite-app-icon.svg`.

## Implemented acceptance flows

- Search, clear search, and all category filters
- Restaurant search, sorting, favourites, and menu navigation
- Product option pricing, extras, quantity, and separate configurations
- Add, update, remove, empty-cart, promo, fee, and total calculations
- Address add, select, remove, and checkout sharing
- Invalid and valid login, checkout, and contact forms
- Demonstration checkout through confirmation and order details
- Every bottom-navigation destination and contextual back navigation
