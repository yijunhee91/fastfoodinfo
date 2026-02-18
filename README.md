This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Product UI Usage

- Search: use the product name input at the top of the list. It uses a 250ms debounce and syncs to `?q=...`.
- Filter: use brand/category checkboxes in the sticky filter area. Multi-select is supported and syncs to repeated query params (`?brand=A&brand=B&category=Burger`).
- Sort: choose one of the nutrition sort options from the dropdown. It syncs to `?sort=...`.
- Combination: search/filter/sort are combined together and survive refresh/share via URL query string.
- Cart: click `담기` on any product row, then adjust quantities (`+/-`) in cart panel/drawer. Cart totals (kcal/protein/carbs/fat/sodium) are persisted in localStorage.
- Responsive detail:
  - Desktop: split view with sticky right detail panel.
  - Mobile: tap a product row to open nutrition detail sheet; press `ESC` or `닫기` to close.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
