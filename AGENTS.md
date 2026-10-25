<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- convex-ai-start -->

This project uses [Convex](https://convex.dev) as its backend.

When working on Convex code, **always read
`convex/_generated/ai/guidelines.md` first** for important guidelines on
how to correctly use Convex APIs and patterns. The file contains rules that
override what you may have learned about Convex from training data.

Convex agent skills for common tasks can be installed by running
`npx convex ai-files install`.

<!-- convex-ai-end -->

<!-- BEGIN:design-system-rules -->
# Design system

The Sting Runner design system lives in `docs/design/`. Read it before building any UI:

- `docs/design/Sting-Design-System.html` — full visual reference (open in browser)
- `docs/design/sting-theme.css` — token definitions and utility classes

## Non-negotiable rules

**Colours**
- One primary signal per view: `--primary` (`#2563EB` / `oklch(0.546 0.215 263)`).
- Available tokens: `--primary-tint`, `--primary-line`, `--secondary-indigo`, `--accent-light` (dark surfaces only). Use them. Do not invent new accent colours.
- Dark mode border: `oklch(1 0 0 / 8%)` (alpha). Use `--ink-border` only for defined dark finale surfaces.

**Elevation**
- No drop shadows. No glows. No gradients on surfaces.
- Depth comes from hairline borders (`0.5px solid var(--border)`) and tint fills only.

**Typography**
- Font: Google Sans (self-hosted variable font, already loaded). Do not import another sans font.
- Sentence case for all headings and CTAs. Never title case.
- Monospace (`--font-mono`) for numbers, codes, metrics, and eyebrow labels only.

**Components**
- Three card tiers only: neutral (white/`--card`), tinted (`--primary-tint` bg), emphasis (`--primary` bg). One emphasis card per view maximum.
- Eyebrow pattern: `{number} · {LABEL}` — monospace number in `--primary`, 1px tick in `--primary-line`, uppercase label in `--muted-foreground`.
- Hover: `translateY(-2px)` + border darkens toward ink. 200ms ease-out. No other hover effects.
- Border radius: `--radius` (0.625rem) for cards, 6px for chips, `999px` for pills.

**Motion**
- Entrance ease: `cubic-bezier(0.22, 1, 0.36, 1)` — use this in all framer-motion transitions.
- Enter duration: 550ms. Hover/toggle duration: 200ms.
- Entrance animation: fade up 10–24px from opacity 0. Stagger children by 0.12–0.14s.

**Layout**
- Max container width: `max-w-270` (1080px). Centred. Padding 24–48px horizontal.
- Whitespace is a feature. Do not fill space for the sake of it.

## What to avoid
- Shadows, glows, gradients on surfaces
- Multiple accent colours in one view
- Title Case headings
- Importing new fonts
- Rounded-bubbly UI (keep corners restrained)
- Dense, cramped layouts
<!-- END:design-system-rules -->
