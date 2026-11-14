# DRIVE / VAULT

DRIVE / VAULT is a concept website for a high-performance vehicle showroom and private rental fleet. It gives visitors a way to browse curated vehicles, compare key specifications, estimate financing, and begin a test-drive or rental request.

## What is included

- A responsive showroom landing page built with Vite, HTML, CSS, and vanilla JavaScript.
- Four vehicle listings with locally hosted imagery, performance data, prices, and lease estimates.
- Vehicle-specific test-drive and rental request dialogs.
- A financing calculator that updates when a vehicle is selected.
- Digital window-sticker dialogs with the vehicle's key details.
- Keyboard focus states, reduced-motion support, and button interactions for both primary and secondary actions.

## Run locally

Install dependencies once:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Vite will print a local address, usually `http://localhost:5173/`.

## Build for production

```bash
npm run build
```

The production files are generated in `dist/`. That directory is intentionally excluded from Git because Vercel builds the project during deployment.

## Deployment

This project is ready to deploy on Vercel with these settings:

- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`

## Current scope

The request forms are front-end demonstrations. They validate input and show a confirmation message, but they do not send or save customer data. Connecting real bookings, rentals, financing applications, or trade-in requests will require a backend service.
