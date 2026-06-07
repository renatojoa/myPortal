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
- Dynamic partial loading (`partials/skills-section.html`)
- Toggle show/hide details on button click
- IDE skills category

## Projects
- Hardcoded JS array in `js/projects-section.js`, rendered in reverse
- Project cards with store badges (App Store, Play Store, Web, Unavailable)
- Company logo thumbnails

## Experience
- Dedicated section with experience content

## Contact
- Dedicated contact section

## CV Download
- PDF available at `assets/pdf/Renato Araújo - EN.pdf`
