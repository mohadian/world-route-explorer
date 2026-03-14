/**
 * @module route-page.js — Shared Route Page Logic
 * 
 * Used by: capitals.html, centers.html, territories.html
 * 
 * initRoutePage(data, storageKey, labelFn):
 *   - data: array of [name, label, lat, lng, iso, ...optional]
 *   - storageKey: localStorage key for visited set (e.g. 'visitedCapitals')
 *   - labelFn: (item) => {name, sub, flag, tag?} for sidebar rendering
 * 
 * Handles:
 *   - Map creation with themed tiles
 *   - TSP route solving via solveGeneric() from data.js
 *   - Great circle arc rendering
 *   - Marker creation with country info popups
 *   - Visited state tracking (localStorage)
 *   - Sidebar with search and visited/unvisited lists
 *   - Play/Pause animation with speed control
 *   - Reset functionality
 *   - Settings button → start capital picker (clears visited on change)
 *   - Onboarding tour on first visit
 * 
 * Start capital resolution:
 *   getStartCapital() → find country in CAPITALS by capital name → match data by country name (c[0])
 *   This works across all datasets (capitals use capital names, centers use "Center", territories mixed)
 * 
 * Required HTML element IDs:
 *   loading, countStat, distStat, visitedCount, totalCount, progressFill,
 *   playBtn, resetBtn, settingsBtn, panelToggle, speedSlider, speedLabel, searchBox,
 *   countryList, sidebar, sidebarToggle, map
 * 
 * Mobile behavior:
 *   - Panel shows only core (title, distance, progress, buttons) by default
 *   - ⋯ button expands to show speed, nav, country count
 *   - Sidebar starts closed on mobile (< 768px)
 */
