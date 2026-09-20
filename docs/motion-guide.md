# Motion guide — Atatakai

How animation works on this site. Written to be read by whoever (or whatever) touches
`css/`, `js/app.js` or `index.html` next.

The living version, with every animation running side by side, is a design canvas:
<https://claude.ai/artifact/CBhsRTJFwCcxWNML2stPM3> (private — open it while logged in as
the site owner; it needs sharing before anyone else can see it).

**Status:** the tokens and the reduced-motion rules in `css/motion.css` are live. The
component animations below are specified but **not yet built**. Nothing in this file is
implemented in the markup yet.

## The idea in one paragraph

Atatakai is a small restaurant with an open kitchen. The motion should behave like the
service: anticipating, quiet, never demanding attention. One continuous ambient layer
(steam, a slow drift on a photograph), one entrance moment, and everything else at or
under 320 ms. Three Japanese ideas carry it — *ma* (間, pacing by emptiness: stagger and
let a beat pass), *sei* (静, stillness: never more than two things moving at once), and
*te* (手, the hand: prefer ink, brush and fabric behaviour over geometric slides).

No bounce. No spring overshoot. Overshoot reads as playful, and this brand is not.

## Tokens

All of them live at the top of `css/motion.css`. Use the variables, never a literal
duration or `cubic-bezier()` in a component.

| Token | Value | Used for |
| --- | --- | --- |
| `--dur-tap` | 120ms | button press |
| `--dur-hover` | 180ms | hover, focus, tab switch |
| `--dur-card` | 320ms | card lift, panel open, accordion |
| `--dur-reveal` | 560ms | scroll reveal, ink stroke |
| `--dur-entrance` | 900ms | the noren entrance, once per visit |
| `--amb-drift` | 20s | steam, photo drift — the only loops |
| `--ease-noren` | `.22, .61, .36, 1` | things that arrive and settle |
| `--ease-ink` | `.65, 0, .35, 1` | brush pressure, strokes being drawn |
| `--ease-shoji` | `.4, 0, .2, 1` | sliding panels |
| `--stagger` | 90ms | between siblings in a group reveal |

Colour comes from the existing brand variables in `css/styles.css` — `--accent`
(#be1d2d, from the logo) for fills, `--accent-2` (#f08a86) for thin strokes, because a
2–4 px line in `--accent` disappears against `--ink`.

## Per-component spec

Selectors below are the ones that already exist in `index.html`.

### `.site-header` — condense on scroll

Full height at the top of the page; past a threshold it shrinks and takes a background.
Toggle a single `.is-condensed` class from JS at **64 px** of scroll with **12 px of
hysteresis** (condense at 64, expand at 52) so it cannot flicker. Animate height and
`background-color` over `--dur-hover`; the header is fixed, so height costs no layout.
Background goes to `--ink` at 96 % with a `--line` bottom border.

Do not drive it from `scroll` position on every frame. One class, one threshold.

### `.primary-nav a` — brush underline

A tapered *fude* stroke wipes in from the left over `--dur-hover` on `--ease-ink` and
retreats to the right. Ready as `.u-stroke` in `css/motion.css`; add the class to the nav
links. The current section gets `.is-active` (stroke stays, 55 % opacity) so hover still
reads as a change.

`.nav-cta` is the exception — it is a button, so it gets `.u-pour` instead.

### `.menu-tabs button` — ink slider

The three tabs (`data-tab="sushi|ramen|korea"`) share one underline that slides between
them rather than three that fade. Stretch it to ~1.5× width mid-travel and let it settle:
that stretch is what makes it read as ink rather than a rectangle. `--dur-hover`, `--ease-ink`.

Panel switch in `js/app.js` (the `.menu-panel.is-active` toggle around line 230):
outgoing panel fades in 120 ms, incoming rises 8 px over 260 ms. **Hold the container
height** across the swap or the page jumps under the reader's thumb.

### `.gallery`, `.review-grid`, `.hours` — scroll reveal

`[data-reveal]` on the element, `[data-reveal-group]` on the parent when children should
stagger. Both are already styled in `css/motion.css`; they need JS:

- Set `document.documentElement.classList.add('has-motion')` first — without it nothing
  hides, which is the correct behaviour when JS fails.
- `IntersectionObserver` with `rootMargin: '0px 0px -12% 0px'`, `threshold: 0.15`.
- Add `.is-revealed`, then **unobserve**. Re-animating on scroll-back makes a site feel cheap.
- Anything already in view at load gets `.is-revealed` immediately — never animate what
  the visitor has not scrolled to.
- Cap a stagger at six children. Past that, reveal by row.

Never put `[data-reveal]` on `.visit`, the address, the hours, or the booking form.
Utility never waits.

### `.book-card` — the booking flow

This is where motion earns money, and it is the one place worth doing carefully.

- **Field focus.** Label lifts and shrinks, the hairline under the field is drawn left to
  right over 240 ms on `--ease-ink`.
- **Errors.** Slide down and stay. Never shake the field.
- **Submit.** After `BOOKING_ENDPOINT` is real: show a loader only after **400 ms** of
  waiting, so a fast response never flashes it. The house loader is a pair of chopsticks
  that close and lift, 2.4 s, looping while pending.
- **Confirmation.** `.form-status.is-ok` rises 26 px and the tick is stroked in over
  240 ms. It must also be announced — the element needs `aria-live="polite"`.

### `.hero` — the noren entrance

The signature piece, and the last thing to build. Five cloth panels over the hero image
lift on `translateY(0 → -112%)` over `--dur-entrance`, staggered 70 ms left to right so
they read as separate strips. The headline lines are masked by `overflow: hidden` parents
and pushed up from 112 %, 120 ms apart, **starting under the curtain, not after it**.

Rules: fire once per session (store a flag), never on back-navigation, and the headline
must be readable if JS never loads. `.hero-media` gets the ambient drift — scale 1 → 1.09
over `--amb-drift`, `alternate`, never restarting.

### Ambient

Steam (`steam-drift`) belongs on hot dishes only — ramen, Korean chicken — as three
blurred shapes, never a video. Pause it with an observer when its dish scrolls out of view.

## Accessibility and performance

- Animate `transform`, `opacity` and `clip-path`. Never `top`, `width` or `box-shadow` —
  layer a shadow pseudo-element and fade it (`.u-lift` shows the pattern).
- Two moving elements on screen at a time. That is the budget.
- `will-change` only on the hero panels and a hovered card.
- `prefers-reduced-motion` is handled globally in `css/motion.css`, including overriding
  the `scroll-behavior: smooth` in `styles.css`. Test it by toggling the OS setting, not
  by trusting the query. The page must land **finished**, never frozen half-animated.
- Keep focus visible throughout; `.u-lift` and `.u-stroke` both respond to `:focus-visible`
  and `:focus-within`, not only hover.

## Deliberately not on this site

- Scroll-jacking or pinned full-screen sequences. People come here for the opening hours.
- Horizontal scroll galleries on desktop.
- Parallax beyond 12 % of a section's height, and none at all on text.
- View Transitions. This is one page; the nav is anchor links.
- Autoplaying video behind text, cursor-following effects, looping logo animations, or a
  preloader over a page that is already fast.

## Build order

1. Header condense + nav brush underline. Half a day, seen by every visitor on every scroll.
2. Scroll reveal on gallery, reviews and hours. One observer, one class.
3. Booking micro-interactions.
4. Noren hero + ink rules — needs the real photography first (see README, placeholder content).
5. Steam and the ambient drift. Cut any of it without regret if the frame rate dips on a
   mid-range Android.

One test before launch: open the site on a phone, one-handed, looking for tonight's
opening hours. If any animation delays that answer by more than 200 ms, remove it.
