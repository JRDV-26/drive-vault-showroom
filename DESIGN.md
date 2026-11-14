# DRIVE / VAULT — Design Direction

## Purpose
Create a private digital showroom for rare, high-performance vehicles. It should feel discreet, engineered, and exclusive—not like a mass-market dealership or a typical vehicle listing site.

## Core Feeling
- Near-black, cinematic, quiet, and precise.
- Vehicles are treated as collectible objects and performance machines.
- The experience should filter for serious buyers through restraint, clarity, and confidence.

## Visual Foundations
- Background: rich near-black or onyx (`#0A0B0D` / `#000000`), never flat generic dark gray.
- Surfaces: only subtle tonal shifts; avoid bright cards sitting on dark backgrounds.
- Dividers: 1px lines using low-opacity white.
- Accent: acid yellow only for the primary action, key state, or selected detail. Never use it decoratively everywhere.
- Images: large, cinematic, high-quality vehicle photography. Let an image dominate before adding more UI around it.

## Typography
- Keep DM Sans for display headings and editorial vehicle names.
- Keep DM Mono for navigation, labels, filters, specifications, and technical metadata.
- Headings: oversized, decisive, tight tracking when appropriate.
- Labels: uppercase or restrained casing with wide letter spacing.
- Treat text as structure: use scale, alignment, and empty space rather than extra effects.

## Layout
- Use an asymmetric, grid-locked editorial layout—not a repeated card grid.
- Use large blocks of negative space. Do not fill every area.
- Build one focal point per section: a vehicle image, a name, a performance number, or a service action.
- Use offsets, full-bleed photography, large type, and thin dividers to create hierarchy.
- Avoid generic Bootstrap, dashboard, or SaaS card patterns.

## Vehicle and Data Presentation
- Present key details as purposeful micro-specifications: model year, power, acceleration, serial/edition, provenance, or availability status.
- Use tight bordered spec rows, small mono labels, and prominent numeric values.
- Prefer a few meaningful facts over dense tables.
- Any live telemetry, verification, availability, finance, or booking information must be clearly presented as a demo unless real data exists.

## Buttons and Interactions
- Primary action: acid-yellow surface with dark text; deliberate and high contrast.
- Secondary action: transparent or black surface with a thin border; subtle border-draw or fill interaction is acceptable.
- Button radius: minimal or square-leaning. Avoid soft pill-shaped controls unless there is a clear reason.
- Use motion sparingly: reveal, image scale, and state change should feel mechanical and intentional.
- Respect `prefers-reduced-motion`.

## Mobile
- Preserve the dramatic visual hierarchy on mobile; do not simply shrink desktop into crowded stacks.
- Keep text readable over photography using controlled overlays only where necessary.
- Make all navigation, dialogs, buttons, and filters comfortably touchable.
- Remove or simplify low-value controls before crowding the screen.

## Avoid
- Generic dealership banners or promotional badges.
- Glassmorphism, neon glows, loud gradients, or excessive shadows.
- Multiple accent colors competing with acid yellow.
- Rounded-card overload.
- Busy dashboards, cluttered filters, or redundant calls to action.
- Copying the layouts, copy, logos, imagery, or user flows of the reference sites.

## Reference Direction Only
- Rimac Nevera: cinematic product storytelling, performance specifications, technical precision, and deep visual immersion.
- antoni / Mercedes-AMG: confident editorial restraint and campaign-like vehicle presentation.
- DB Longbow Speedster: focused automotive art direction and product-first presentation.

Use these references only for visual language. DRIVE / VAULT must have its own page architecture, copy, imagery, and interactions.
