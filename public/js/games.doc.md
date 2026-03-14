/**
 * @module games.js — Geography Games
 * 
 * 7 game modes registered in GAMES array and games object:
 *   quiz     — Capital/flag identification, 15 rounds, 4 choices
 *   speed    — Click 20 random countries on map, timed. Easy (highlight + zoom to continent) / Hard (no hints). Skip button available.
 *   optimize — Drag-reorder 20 cities, compare to AI 2-opt solution
 *   pindrop  — Click map where country is, scored by km error
 *   distance — Guess km between two capitals, scored 0-100 per round
 *   region   — Click all countries in a continent, timed
 *   closest  — Pick nearest capital from 4 choices, 12 rounds
 *   scramble — Unscramble anagrammed capital names, 12 rounds, hint shows flag+country
 *   hilo     — Higher or Lower population, streak-based scoring
 *   sort     — Sort 20 random countries into correct continent buckets. Ready screen, reveal on answer, reset button.
 * 
 * Shared helpers:
 *   resetMarkers() — reset all markers to theme default
 *   highlightMarker(idx, color, radius) — highlight a specific marker
 *   drawRoute(route, color) — draw polylines for a route
 *   clearLines() — remove all route lines and misc layers
 *   addMiscLayer(layer) — track a temporary layer for cleanup
 * 
 * Score system:
 *   addScore(game, val) — saves to localStorage, records play streak
 *   renderLB(game, unit, order) — renders leaderboard HTML
 *   renderShareBtn(game, score, unit) — share button with data-share attribute
 *   renderStreak() — shows streak if 2+ days
 * 
 * UI structure:
 *   #currentGame — shows active game icon + name
 *   #moreGames — collapsible section with game buttons
 *   #gameArea — game content area (innerHTML replaced per game)
 * 
 * Required HTML IDs: hud, gameSelect, gameArea, currentGame, moreGamesToggle, moreArrow, map
 */
