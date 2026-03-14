# 🌍 World Route Explorer

An interactive web app that visualizes optimized routes through every country on Earth. Choose your starting capital, play geography games, track your progress, and challenge friends.

## Quick Start

```bash
npm install
npm start
# Open http://localhost:3000
```

## Features

### Choose Your Starting Point
Pick any of 195 countries from the home page — the route optimizes from that country's capital. Change it anytime with the ⚙ button.

### 3 Route Modes
| Route | Description | Stops |
|-------|-------------|-------|
| **Capital Cities** | Optimized path through all world capitals with great circle arcs | 195 |
| **Country Centers** | Route through geographic centroids | 195 |
| **All Territories** | Sovereign nations + overseas territories | 247 |

### Interactive Controls
- 🔍 Search countries by name or capital
- 🖱️ Click markers to toggle visited — see population, language, currency, and fun facts
- ▶️ Animated route playback with speed control
- 💾 Progress saved to localStorage
- 🏳️ Flag emojis throughout

### 7 Geography Games
| Game | How it works |
|------|-------------|
| 🧠 **Quiz** | Identify capitals and flags — 15 rounds |
| ⚡ **Speed Click** | Find 20 countries on the map, timed |
| 🔧 **Optimize** | Drag-reorder cities to beat the AI optimizer |
| 📍 **Pin Drop** | Click where a country is — scored by km error |
| 🧭 **Distance Guess** | Estimate distance between two capitals |
| 🗺️ **Region Race** | Click all countries in a continent, timed |
| 🎯 **Closest Capital** | Pick which capital is nearest |

Games include score sharing (native share / Twitter), streak tracking, and local leaderboards.

### 5 Color Themes
Midnight · Ocean · Ember · Aurora · Daylight — selectable from the home page.

### Country Info
Click any marker to see:
- 👥 Population · 🗣 Language · 💰 Currency
- 💡 Fun facts (3 per country, randomized — 585 total)

## Project Structure

```
world-map-app/
├── server.js              # Express static server
├── package.json
├── .gitignore
├── README.md
└── public/
    ├── index.html         # Landing page (start point picker, theme picker)
    ├── capitals.html      # Capital cities route
    ├── centers.html       # Country centers route
    ├── territories.html   # All territories route (247)
    ├── games.html         # 7 geography games
    ├── css/
    │   └── style.css      # Shared styles (CSS custom properties for themes)
    └── js/
        ├── data.js        # 195 capitals, TSP solver, utilities
        ├── theme.js       # 5 color themes
        ├── route-page.js  # Shared route page logic
        ├── games.js       # 7 game modes
        ├── country-info.js # Population, language, currency, fun facts
        ├── social.js      # Score sharing + streak tracking
        └── onboarding.js  # First-visit tour
```

## How It Works

### TSP Optimization
1. **Nearest Neighbor** heuristic builds initial route from chosen start
2. **2-opt improvement** (80 iterations) reduces total distance
3. **Great circle arcs** render geodesic paths, not straight Mercator lines
4. Runs entirely client-side — no server computation

### Architecture
- **ES Modules** — clean imports, no globals, no build step
- **Event delegation** — no inline `onclick`, all events bound via `addEventListener`
- **CSS custom properties** — theme system with 5 schemes
- **localStorage** — persists visited state, scores, start capital, theme, streaks
- **Safe storage** — graceful fallback if localStorage is full or corrupted

### Extensibility
- **New route**: create HTML with shared template, call `initRoutePage(data, key, labelFn)`
- **New game**: add entry to `GAMES` array, add `games.newgame` function
- **New theme**: add object to `THEMES` in theme.js
- **New country info**: add entry to `INFO` in country-info.js

## Tech Stack
- **Express** — Static file server
- **Leaflet.js** — Maps (OpenStreetMap/CARTO tiles, no API key needed)
- **Vanilla JS ES Modules** — No frameworks, no build step
- **CSS Custom Properties** — Theme system

## License

MIT
