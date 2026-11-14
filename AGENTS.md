# DRIVE / VAULT — Frontend Remodel Rules

## Project Purpose
DRIVE / VAULT is an ultra-luxury concept showroom for rare, high-performance vehicles.

The website is designed for serious collectors and high-net-worth clients. It should feel exclusive, precise, discreet, and editorial — more like a private automotive gallery than a typical car marketplace.

## Current Technical Scope
- Frontend only.
- Static Vite website using HTML, CSS, and vanilla JavaScript.
- Do not add or modify a backend, database, authentication, payment system, API, Supabase, or environment variables.
- Current forms, finance tools, rental requests, and trade-in requests are visual demonstrations only. Do not make them collect, store, email, or submit real customer data.

## Before Editing
- Inspect the relevant HTML, CSS, JavaScript, images, and current responsive behavior before changing anything.
- Read `DESIGN.md` before redesign work.
- Preserve the Vite project setup and existing build commands.
- Do not add packages unless the user explicitly approves them.

## Remodel Permission
The user is intentionally remodeling the frontend, not only restyling it.

When requested, you may:
- Remove unnecessary buttons, links, sections, interactions, dialogs, filters, or components.
- Replace existing components with a new concept.
- Restructure page sections and navigation when required by the new design.
- Remove unused JavaScript, CSS, images, and imports that belonged only to deleted components.
- Simplify or replace demonstration-only flows when they no longer support the new website direction.

Do not preserve an existing component solely because it already works.

## What Must Be Protected
- Do not introduce real payment, booking, rental, finance, trade-in, authentication, or customer-data functionality.
- Do not make false claims that vehicle stock, live telemetry, verification, prices, availability, or financing are real.
- If a presentation claim could mislead visitors, use clearly demo-oriented wording or flag it for user approval.
- Do not change unrelated pages or sections unless explicitly requested.
- Do not commit, push, create branches, open pull requests, deploy, or alter Vercel settings unless explicitly asked.

## Design Direction
- Follow `DESIGN.md` and attached reference images for visual direction only.
- Do not copy a reference website’s layout, wording, logos, imagery, or business flow.
- Prioritize visual hierarchy, restraint, strong typography, premium spacing, and one clear focal point per section.
- Avoid generic dealership layouts, crowded cards, unnecessary UI controls, and decorative effects without purpose.
- Keep visible copy editable in HTML; do not place text inside generated images.
- Retain or improve accessibility: keyboard focus, readable contrast, semantic controls, and reduced-motion support.

## Responsive Requirements
- Check every changed section at desktop, tablet, and mobile widths.
- Navigation, buttons, forms, dialogs, cards, and vehicle images must remain usable on mobile.
- Do not allow horizontal scrolling, clipped content, overlapping text, or inaccessible controls.

## Verification and Handoff
After each completed task:
1. Run `npm run build`.
2. Fix build errors caused by the requested work.
3. Report the exact files changed.
4. State which components, sections, or interactions were intentionally removed or replaced.
5. Do not claim the public Vercel site changed unless the user explicitly asked to commit, push, and deploy.