# Changelog

## [Unreleased]
### Added
- "My Availability" now embeds a Cal.com inline booking widget instead of a read-only Google Calendar view — synced with Google Calendar, visitors can book a real slot (`cal.com/renatojoa`)
- Contact section's Email/Phone/LinkedIn/Location block restyled as a Python REPL (`>>> print(email)` style), matching the About assert block
- Hero terminal now types `whoami` (outputs name) then runs a simulated `hire_renato.py` automation that steps a mock mini-browser through Home → Projects → CV → Contact → Hired, restyled to match the real site's look (dark hero, gradient project thumbnails, light sections)
- About section info grid restyled as a themed `assert` block, with the Education line a deliberately failing assertion

### Fixed
- Local CSS/JS assets now cache-busted (`?v=`) — stale cached `i18n.js` was leaving untranslated i18n keys visible on screen after deploys
- Hero terminal's internal command log is now exempted from Lenis (`data-lenis-prevent`) — its own scrollbar was likely trapping page scroll when the cursor hovered it, blocking scroll back to the top
- Mini-browser now collapses to 0 height (not just opacity) when hidden — it was leaving a reserved blank box in the terminal card between runs; the terminal card itself now visibly grows/shrinks with it
- Terminal log no longer reserves a fixed 150px of empty space at the start of each cycle — it now sizes to its actual content and only caps/scrolls once it gets long

### Changed
- Hero terminal: mini-browser now stays hidden until `hire_renato.py --dry-run` runs, and fades out again once the run finishes (instead of sitting empty/visible the whole time)
- Hero terminal: added a `pytest tests/hero_stats.py` step asserting the hero's years/projects/companies stat text
- Hero terminal's "home" mock screen now shows the real nav links, hero kicker, title, subtitle and stats as miniature text instead of abstract bars
- Hero terminal now loops: after the hire_renato.py run, types `/clean`, clears the log, and restarts the whole demo from `whoami`

## [2026-10-01]
### Added
- Guardian narrative redesign: hero rewrite and section kickers reframing the site around a "last line of defense" QA voice
- Trust wall section (company logo strip) between Hero and About
- Case File section — deep-dive on the current (`currently_working`) project, including an Appium command + assert snippet
- "Still on Duty" CTA section before Contact
- Lenis smooth scroll, wired into existing anchor navigation and scroll reveals
- PT/EN translations for all new copy

## [2026-06-07]
### Added
- `wiki_title` column to companies Supabase schema — admin sets exact Wikipedia page title per company
- `wiki_title` input field in admin company form
- Company modal now uses `wiki_title` for Wikipedia lookup; null value skips Wikipedia entirely and falls back to description
- `scripts/wiki-autofill.js` — Node 18+ script to auto-populate wiki_title from Wikipedia for all companies

### Fixed
- Duration chip showing "NaN yr" — `calcDuration` now parses "Mon YYYY" strings properly instead of relying on `new Date()`

## [2026-06-06]
### Fixed
- Profile image path corrected
- Header layout adjustments

## [2026-05-xx]
### Added
- New project entry to projects section
- Contact section
- Experience section
- Projects section with card model and content
- Skills module with toggle and show/less button
- Companies/timeline module
- IDE skills to skills section
- "Currently working" label to companies timeline
- Background video on hero section

### Fixed
- Skills show/less button position
- Experience button styling
- Company journey English content
- Code typos
