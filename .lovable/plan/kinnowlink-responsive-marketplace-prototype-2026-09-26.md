# KinnowLink responsive marketplace prototype

## What will be built

- A mobile-first KinnowLink welcome experience using the supplied logo concept and citrus/glass visual direction.
- Role-aware navigation and dashboards for Growers and Buyers, with role choice remembered locally and switchable from Profile.
- Complete working pages for lots, buyer requirements, personalized matches, offers, messages, and profile/settings.
- Validated lot and requirement forms, marketplace search/filter/sort, saved lots, listing status controls, offer negotiation actions, message sending, and demo-data reset.
- A transparent local matching engine that explains variety, quantity, grade, location, date, and price compatibility without claiming certainty.
- Light, Dark, and System themes, applied before display where practical and persisted across refreshes.

## Experience structure

- `/` — role selection and product introduction before onboarding; role dashboard afterward.
- `/lots` — Grower “My Lots” or Buyer “Find Lots,” adapted to the active role.
- `/requirements` — Grower “Buyer Needs” or Buyer “Requirements,” adapted to the active role.
- `/matches`, `/offers`, `/messages`, `/profile` — shared destinations with role-aware content and actions.
- `/lots/new` and `/requirements/new` — focused creation forms.
- Detail pages for individual lots, requirements, offers, and conversations.

## Design and responsiveness

- Warm ivory, forest green, mint, citrus orange, and warm yellow semantic tokens, with the requested deep green-black dark palette.
- Manrope typography, restrained glass surfaces, citrus spheres, botanical accents, crisp functional panels, and consistent Lucide icons.
- Fixed six-item mobile navigation with safe-area spacing; a compact desktop sidebar and top context bar at wider widths.
- Accessible contrast, focus states, validation, touch targets, status labels, and layouts tested at mobile and desktop sizes.

## Technical approach

- A typed central React store backed by local browser persistence; all records are fictional demo data and UI labels will say so.
- Shared domain models and selectors keep dashboard counts, matches, offers, messages, saved items, and status changes consistent.
- Theme and marketplace state providers remain separate from visual components.
- Reusable cards, buttons, fields, filters, status badges, empty states, and app-shell elements avoid page duplication.
- No live accounts, remote messaging, transactions, verification, or production persistence will be claimed or added.

## Verification

- Validate both role journeys from onboarding through creation, matching, offers/messages, status changes, and reset.
- Check filters, sorting, validation, role switching, theme persistence, and System theme response.
- Inspect mobile and desktop renders for overflow, navigation coverage, contrast, and functional errors.
