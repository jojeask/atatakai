# Atatakai — website

One-page site for Atatakai, a Japanese and Korean restaurant at Storgatan 5, Hörby.
Plain HTML, CSS and JavaScript — no build step, no dependencies.

## Run it

Open `index.html` in a browser. There is nothing to install or compile.

## Files

| Path | What it is |
| --- | --- |
| `index.html` | The whole page. Swedish is the default; English lives in `js/app.js`. |
| `css/styles.css` | Layout and design. Brand colours are the variables at the top. |
| `css/fonts.css` | Self-hosted Google Fonts (generated — see GDPR below). |
| `css/motion.css` | Animation tokens, keyframes and opt-in classes. Inert until markup uses them. |
| `docs/motion-guide.md` | How animation should work on the site, component by component. |
| `js/app.js` | Opening hours, Swedish/English text, menu tabs, map consent, booking form. |
| `img/` | Logo, share image and icon, cropped from the restaurant's logo. |
| `fonts/` | Font files, so no visitor data goes to Google. |
| `robots.txt`, `sitemap.xml` | Both contain a placeholder domain. |

## Placeholder content — must be replaced before launch

1. **Photos.** Every photo is a stock image loaded from Unsplash. Replace them with
   real photos of the food and the dining room, save them in `img/`, compress them,
   and write real `alt` text for each.
2. **Menu.** The three tabs list only dishes mentioned in Google reviews, with no
   prices. Replace with the real menu once the restaurant sends it.
3. **Domain.** `https://atatakai.example.se` appears in `index.html` (canonical,
   og:url, og:image), `robots.txt` and `sitemap.xml`. Replace all five.
4. **Bookings.** `BOOKING_ENDPOINT` at the top of `js/app.js` is empty, so the form
   only saves to the visitor's own browser and **nobody at the restaurant sees it**.
   Paste in a Formspree or Web3Forms address to make it real.

## Facts the site states

Address Storgatan 5, 242 31 Hörby. Phone 073-905 08 79. Open Tue–Fri 11–20,
Sat–Sun 15–20, closed Mondays. These appear in the page text, in `js/app.js`
(the `hours` array) and in the schema.org block in `index.html`. If they change,
update all three — and Google Business Profile, which matters most for search.

The review quotes are real Google reviews, shortened to what was publicly visible,
credited by first name and last initial.

## GDPR

The site sets no cookies and uses no analytics, so it needs no cookie banner.
Two deliberate choices keep it that way:

- **Fonts are self-hosted** in `fonts/`, so visitors' IP addresses never reach
  Google. To change fonts, download the new files rather than linking to Google.
- **The map only loads when clicked.** The Google Maps embed sets cookies as soon
  as it loads, so it sits behind a consent button.

Adding analytics, a Facebook pixel, or a Google-hosted script would change this and
require a cookie banner. The booking form will also need a short privacy policy
once it really sends names and email addresses to a form service — pick one that
stores data in the EU and offers a DPA.

## Deploying to GitHub Pages

1. Push the repo to GitHub. It must be public for Pages to be free.
2. Settings → Pages → deploy from the `main` branch, root folder.
3. The site appears at `https://<username>.github.io/<repo>/` — good enough to demo.
4. With a custom domain: add it under Settings → Pages, point the domain's DNS at
   GitHub, and tick "Enforce HTTPS".
