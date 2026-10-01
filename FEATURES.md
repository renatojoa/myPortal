# Feature List

## Navigation
- Anchor-based navigation (`#home`, `#about`, `#companies`, `#projects`, `#skills`, `#experience`, `#contact`)
- Bootstrap ScrollSpy active nav highlighting
- Navbar shrinks on scroll

## Hero
- Background video (`assets/videos/bg_homepage.mp4`)
- Profile photo

## Companies / Timeline
- Dynamic loading from Supabase
- Toggle expand/collapse hidden companies
- Animated timeline line draw on scroll
- Duration chip per company
- "Current" badge
- Click company card → modal with Wikipedia info
- `wiki_title` field controls exact Wikipedia page per company (null = skip Wikipedia, show description only)
- Admin panel: set `wiki_title` per company

## Skills
- Dynamic loading from Supabase, grouped by category
- IDE skills category

## Projects
- Dynamic loading from Supabase (`js/data.js` `fetchProjects()`), rendered via `js/projects-section.js`
- Project cards with store badges (App Store, Play Store, Web, Unavailable)
- Company logo thumbnails
- Project detail modal

## Experience
- Dedicated section with experience content

## Contact
- Dedicated contact section

## CV Download
- PDF available at `assets/pdf/Renato Araújo - EN.pdf`

## Guardian Narrative
- Site-wide "last line of defense" narrative voice: hero rewrite + uppercase section kickers reframing each section (About, Companies, Skills, Experience) around the QA-as-guardian metaphor
- Hero terminal widget — typed `whoami` → name, a `pytest tests/hero_stats.py` step asserting the hero stats, then a simulated `hire_renato.py --dry-run` run that steps a tiny mock browser (styled like the real site, home screen uses real nav/copy text) through Home → Projects → CV → Contact → Hired, logged like a passing test run; the mock browser only appears while the automation runs
- About section info grid replaced with a themed `assert` block (location/experience/email as passing asserts, education as a deliberately failing assert with an `AssertionError` + `FAILED` summary — a joke that learning never completes)
- Trust wall — logo strip reusing company logos from Supabase, placed between Hero and About
- Case File — deep-dive section auto-featuring the project flagged `currently_working` in Supabase, with a representative Appium command + assert snippet
- "Still on Duty" CTA section before Contact, linking to the contact form
- Lenis-powered smooth scroll (CDN, no build step) wired into existing anchor navigation and `IntersectionObserver` fade-in reveals
- Full PT/EN i18n coverage for all new copy
