# AGENT.MD — World Route Explorer

## Project Overview
Interactive web app showing optimized TSP routes through world countries with geography games. Node.js/Express serving static files. No build step. Vanilla JS ES Modules.

## Critical Rules
- **ALWAYS update documentation** when making any code change. Update the relevant `.doc.md` file AND `AGENT.md` if architecture/patterns change. This is non-negotiable.
- **NEVER remove cache-bust query strings** (`?v=`) from HTML imports without replacing them with new ones. Browser caching WILL serve stale files.
- **NEVER rewrite entire files** when making small changes. Use targeted `str_replace` to avoid reverting other improvements.
- **Always hard-test** after CSS/JS changes by checking the actual served content, not just the file on disk.
- **All event binding via `addEventListener`** — no inline `onclick` in HTML.
- **No `window.*` globals** — use event delegation with `data-*` attributes for dynamically generated HTML.
- **All colors in JS must use `currentThemeObj()`** — never hardcode hex colors.
- **localStorage access must use `safeGet`/`safeSet`** from route-page.js pattern.

## Architecture

```
server.js          → Express static server (public/)
public/
  index.html       → Landing page (country picker, theme picker, animated map bg)
  capitals.html    → Route page using shared route-page.js
  centers.html     → Route page using shared route-page.js  
  territories.html → Route page using shared route-page.js
  games.html       → Geography games page using games.js
  css/style.css    → ALL shared styles, CSS custom properties for theming
  js/
    data.js        → CAPITALS array, TSP solver, haversine, flag(), start capital config
    theme.js       → 5 themes, applyTheme(), renderThemePicker()
    route-page.js  → Shared logic for all 3 route pages (map, sidebar, animation, visited tracking)
    games.js       → 7 game modes, score tracking, share buttons
    country-info.js → Population, language, currency, 3 fun facts per country (585 total)
    social.js      → Score sharing (Web Share API / Twitter), streak tracking
    onboarding.js  → First-visit 3-step tour
```

## How Route Pages Work
All 3 route pages (capitals, centers, territories) share identical HTML structure and call:
```js
initRoutePage(data, storageKey, labelFn)
```
- `data`: array of `[name, label, lat, lng, iso, ...]`
- `storageKey`: localStorage key for visited state
- `labelFn`: function returning `{name, sub, flag, tag?}` for sidebar display

The start country is resolved by: `getStartCapital()` → find country name in CAPITALS → find that country name in `data[i][0]`.

## How Games Work
Games are registered in the `GAMES` array and `games` object. Each game function takes over `#gameArea` innerHTML and binds map click events. `startGame()` cleans up previous game state (markers, lines, click handlers).

## Key Patterns

### Adding a new route page
1. Copy `capitals.html` template
2. Change title, h1, data array, and `labelFn`
3. Call `initRoutePage(data, 'uniqueKey', labelFn)`
4. Add nav links to/from other pages

### Adding a new game
1. Add entry to `GAMES` array in games.js
2. Add `games.newid = () => { ... }` function
3. Use `resetMarkers()`, `clearLines()`, `highlightMarker()`, `drawRoute()` helpers
4. Call `addScore(id, value)` on completion
5. Include `renderShareBtn()`, `renderStreak()`, `renderLB()` in completion screen

### Adding a new theme
Add object to `THEMES` in theme.js with keys: `name, bg, card, accent, accent2, text, muted, dim, marker, visited, route, tiles, mapBg`

### Adding country info
Add entry to `INFO` in country-info.js: `ISO: {pop, lang, cur, fact: [3 strings]}`

## UI Conventions
- Panel: top-left, class `panel panel-tl`
- Buttons: `▶ Play` | `↺ Reset` | `⚙` (in that order)
- Speed: default value `2`, range 1-10
- Nav: pill buttons for sibling pages in `.nav-row`, then `← Back to Home` in `.nav-home`
- Games: current game label in `#currentGame`, game list in collapsible "More Games" section
- Country picker: modal overlay with searchable list, stores capital name via `setStartCapital()`

## File Modification Checklist
When changing shared CSS (`style.css`):
- [ ] Update cache-bust `?v=` in ALL HTML files that import it

When changing `route-page.js`:
- [ ] Update cache-bust `?v=` in capitals.html, centers.html, territories.html

When changing `data.js`:
- [ ] Update cache-bust `?v=` on route-page.js and games.js in their HTML files
- [ ] **NEVER** add `?v=` to JS-to-JS imports (e.g. `from './data.js?v=...'`) — this breaks ES module resolution on Vercel/CDNs. Only HTML `<script src>` and HTML `import from` can have query strings.

When changing `games.js`:
- [ ] Update cache-bust `?v=` in games.html

When adding a button/control to route pages:
- [ ] Add to ALL 3 route pages (capitals, centers, territories)
- [ ] Bind event in route-page.js with `document.getElementById().addEventListener()`

## UI Regression Testing Protocol
Before AND after every change:
1. Record line counts of ALL files (`wc -l`)
2. Verify key HTML element IDs exist (`grep -c` for playBtn, resetBtn, settingsBtn, nav-row, nav-home, etc.)
3. Verify unchanged files have SAME line count as before
4. Verify all files serve with HTTP 200
5. After CSS/JS changes, update cache-bust `?v=` in importing HTML files
6. **NEVER rewrite entire files** — use targeted `str_replace` to avoid reverting other improvements
7. If a `str_replace` fails due to multiple matches, use more context in `old_str` to make it unique
