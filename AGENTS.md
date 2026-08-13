# NewsFixd Design-First Rules

These instructions apply to every person or agent working in this repository.

## Canonical design source

The approved Stitch exports in `stitch_newsfixd.zip` are the source of truth for NewsFixd's visual design, page structure, responsive behavior, component language, typography, color, spacing, and interaction patterns.

The installed routes derived from those exports are approved implementations:

- `/`
- `/search/`
- `/tech/`
- `/article/`
- `/welcome/`
- `/local/`
- `/newsletter/`
- `/politics/`
- `/business/`
- `/science/`
- `/global/`

## No design without approval

Do not create, redesign, restyle, or materially rearrange a page or component unless at least one of these is available:

1. A design explicitly approved by the owner.
2. An existing approved NewsFixd Stitch screen or component to replicate.
3. A specific external reference the owner explicitly requested to replicate.

If none is available, stop before implementation and request design approval.

## How to expand NewsFixd

When a new page, state, or component is needed:

1. Find the closest approved Stitch screen.
2. Copy its shell, grid, tokens, typography, spacing, and component patterns.
3. Recompose existing approved patterns before adding anything new.
4. Keep new behavior visually consistent with the source screen.
5. Present any materially new visual direction for approval before building it.

Functional wiring, accessibility fixes, content replacement, data integration, and responsive corrections may be implemented without a new visual approval only when they preserve the approved design.

## Prohibited changes

- Do not replace the Stitch design with a new framework, theme, or design system.
- Do not create an alternate homepage or parallel application shell.
- Do not introduce new fonts, colors, radii, shadows, navigation patterns, or card styles without approval.
- Do not use generic templates or AI-generated UI patterns to fill design gaps.
- Do not treat a written feature request as approval for an unreviewed visual design.
- Do not overwrite approved Stitch screens when adding backend, pipeline, analytics, advertising, or monetization features.

## Required handoff

For any visual change, state which approved screen or approved reference was used. If the work required a new visual decision, record the owner's approval before implementation.
