# Atatakai — working notes

One-page site for a Japanese and Korean restaurant in Hörby. Plain HTML, CSS and
vanilla JS. **No build step, no dependencies, no package manager** — `index.html` opens
straight in a browser. Do not introduce a bundler, a framework or a library without
being asked.

Read `README.md` first: it lists what each file does and the placeholder content that
must be replaced before launch (photos, menu, domain, booking endpoint).

## Conventions

- Swedish is the site's default language; English strings live in `js/app.js`. Any new
  user-facing text needs both, via `data-i18n`.
- Code comments in this project are written in Swedish. Docs (`README.md`,
  `docs/`) are in English.
- Brand colours, fonts and radii are the variables at the top of `css/styles.css`.
  Reuse them rather than adding new ones.
- Fonts are self-hosted in `fonts/` on purpose (GDPR — no visitor data to Google).
  Never swap them for a Google Fonts `<link>`.

## Motion

Animation on this site follows `docs/motion-guide.md`. Tokens and opt-in utility classes
live in `css/motion.css`; use the tokens rather than literal durations or easing curves.
The component animations described in the guide are **specified but not yet built**.

## Watch out

- Opening hours, address and phone appear in three places: the page text, the `hours`
  array in `js/app.js`, and the schema.org block in `index.html`. Change all three
  together.
- The placeholder domain `atatakai.example.se` appears in five places across
  `index.html`, `robots.txt` and `sitemap.xml`.
