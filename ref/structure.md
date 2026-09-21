restaurant-customer-pwa/
│
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   │
│   ├── r/
│   │   └── [restaurantSlug]/
│   │       └── t/
│   │           └── [tableCode]/
│   │               ├── page.tsx
│   │               ├── menu/
│   │               │   └── page.tsx
│   │               ├── cart/
│   │               │   └── page.tsx
│   │               ├── checkout/
│   │               │   └── page.tsx
│   │               └── order/
│   │                   └── [orderId]/
│   │                       └── page.tsx
│   │
│   ├── orders/
│   │   └── [orderId]/
│   │       └── page.tsx
│   │
│   ├── account/
│   │   └── page.tsx
│   │
│   └── manifest.ts
│
├── components/
│   ├── ui/
│   │
│   ├── restaurant/
│   │   ├── restaurant-header.tsx
│   │   └── table-info.tsx
│   │
│   ├── menu/
│   │   ├── menu-header.tsx
│   │   ├── menu-search.tsx
│   │   ├── category-tabs.tsx
│   │   ├── menu-item-card.tsx
│   │   ├── menu-item-details.tsx
│   │   ├── variant-selector.tsx
│   │   ├── modifier-selector.tsx
│   │   └── quantity-selector.tsx
│   │
│   ├── cart/
│   │   ├── floating-cart.tsx
│   │   ├── cart-drawer.tsx
│   │   ├── cart-item.tsx
│   │   └── cart-summary.tsx
│   │
│   ├── checkout/
│   │   ├── order-summary.tsx
│   │   ├── customer-details.tsx
│   │   └── place-order-button.tsx
│   │
│   ├── order/
│   │   ├── order-status.tsx
│   │   ├── order-timeline.tsx
│   │   └── order-items.tsx
│   │
│   └── pwa/
│       ├── install-prompt.tsx
│       ├── offline-banner.tsx
│       └── update-prompt.tsx
│
├── lib/
│   ├── api/
│   │   ├── client.ts
│   │   ├── restaurant.ts
│   │   ├── menu.ts
│   │   ├── orders.ts
│   │   └── customers.ts
│   │
│   ├── api.json
│   └── utils.ts
│
├── store/
│   ├── cart.store.ts
│   └── restaurant.store.ts
│
├── hooks/
│   ├── use-menu.ts
│   ├── use-restaurant.ts
│   ├── use-cart.ts
│   └── use-order.ts
│
├── types/
│   ├── restaurant.ts
│   ├── menu.ts
│   ├── cart.ts
│   └── order.ts
│
├── public/
│   ├── icons/
│   │   ├── icon-192.png
│   │   ├── icon-512.png
│   │   └── maskable-512.png
│   │
│   └── screenshots/
│
├── .env.local
├── .env.example
├── next.config.ts
├── tsconfig.json
├── package.json
└── README.md