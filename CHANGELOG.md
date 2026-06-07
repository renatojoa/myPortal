# Changelog

## [Unreleased]

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
