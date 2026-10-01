# Guardian Narrative Redesign — Design Spec

Date: 2026-10-01

## Context

Inspiration: gubarcaro.com.br (React/Framer Motion/Lenis SPA). Its approach: confident
first-person manifesto voice, uppercase "chapter kicker" labels tied to a conceptual
metaphor ("descend the stack"), stat counters, one deep case-study walkthrough, a
"trusted by" logo wall, an explicit "what I'm looking for" block, and scroll-driven
reveal animations via Lenis + Framer Motion.

This site (`myPortal`) is Renato Araújo's existing QA-engineer portfolio — plain
HTML/CSS/JS, Bootstrap 5, no build step, bilingual (PT/EN via `js/i18n.js`), dark/light
theme via CSS custom properties, project data fetched from Supabase
(`fetchProjects()` in `js/data.js`).

Goal: apply the same *kind* of narrative/animation approach, with a distinct
personality so it doesn't read as a copy, across the whole site (not just a bolted-on
section).

## Personality: "Guardian" (Linha de Defesa)

QA framed as the last line of defense before release — serious, responsible tone, not
playful. First-person voice throughout hero/section kickers/CTA.

Chapter-kicker labels (uppercase, tracked-out, small — same visual role as his
"DESCEND THE STACK" labels):

| Section | Kicker |
|---|---|
| Hero | `THE LAST LINE BEFORE SHIP` |
| About | `WHY I HOLD THE LINE` |
| Trust wall | `LINES I'VE HELD` |
| Companies | `WHERE I STOOD GUARD` |
| Case File | `CASE FILE — OPEN` |
| Skills/Experience | `WHAT I BRING TO THE LINE` |
| CTA (final) | `STILL ON DUTY` |

## Hero rewrite

```
THE LAST LINE BEFORE SHIP
I hold the line.
Before bugs reach the people who trusted you.
```

Keeps existing hero-stats (10+ years / 14 projects / 8 companies) and existing CTA
buttons (Download CV / View Projects) — those already match the "stat counter" pattern
from the reference site, no redesign needed there.

## New sections

### 1. Trust wall
Placement: after Hero, before About.
Content: horizontal logo strip reusing existing logos from
`assets/img/companies/thumbnails/` (no new assets). Kicker: `LINES I'VE HELD`.
Lead-in line: "Teams that shipped with me watching the line."

### 2. Case File (project deep-dive)
Placement: between Projects and Skills.
Data source: existing `fetchProjects()` — picks the project where
`currently_working === true`. No new Supabase field, no multi-screenshot schema
(current data model has one `image_url` per project, so the case-file stays
single-image + narrative text rather than a screenshot carousel).
If no project currently has `currently_working: true`, the section does not render
(no synthetic fallback).
Content: large `image_url`, `title`, `description`, `technologies` tags, `company`,
framed as a case-report rather than a generic project card.

### 3. CTA — "Still on duty"
Placement: before Contact.
Placeholder copy (Renato reviews/edits before publish):
```
STILL ON DUTY
Looking for teams that ship fast but still want someone watching the line.
Open to remote QA leadership / automation roles.
```

## Animation / technical approach

- **Smooth scroll:** Lenis added via CDN `<script>` tag (no bundler, matches
  "no build system" constraint in CLAUDE.md). Initialized in `js/scripts.js` with a
  standard `requestAnimationFrame` loop.
- **Reveals:** keep the existing `IntersectionObserver` + `.fade-in` pattern; add
  `.reveal-up` and `.reveal-stagger` variants (CSS `transition-delay` computed from
  `nth-child`) for the trust wall and case-file. No Framer Motion / React — incompatible
  with the vanilla stack.
- **Theming:** all new markup uses existing CSS custom properties
  (`var(--text-primary)` etc.) from `css/styles.css` — dark/light mode works without
  extra styling.
- **i18n:** every new string (hero, kickers, case-file labels, CTA) gets PT + EN keys
  in `js/i18n.js`, following the existing `data-i18n` / `data-i18n-html` pattern.

## Files touched

- `index.html` — hero copy rewrite, 3 new sections inserted. No new nav links (keeps
  nav from bloating; new sections are reachable by scroll, not menu items).
- `css/styles.css` and/or new `css/guardian-section.css` — styles for trust wall,
  case-file, CTA block, and the new reveal variants.
- `js/i18n.js` — new PT/EN keys.
- `js/scripts.js` — Lenis init, reveal-stagger wiring, case-file render (fetch +
  pick `currently_working` project).

Not touched: `partials/companies-section.html`, Supabase schema, `js/projects-section.js`
project card logic.

## Out of scope

- Multi-screenshot carousel for the case-file (would need a new DB field; deferred).
- Redesigning Companies timeline, Skills grid, or Experience bars — kept as-is,
  just gets the new kicker label styling applied for visual continuity.
- New nav items for the new sections.
