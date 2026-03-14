/**
 * @module country-info.js — Country Facts & Info
 * 
 * INFO: Object keyed by ISO code with {pop, lang, cur, fact: [3 strings]}
 * All 195 countries have 3 fun facts each (585 total). Random fact shown per popup.
 * 
 * - getInfo(iso) → info object or null
 * - renderInfoPopup(iso, name, capital) → HTML string for Leaflet popup
 *   Shows: name, capital, population, language, currency, random fun fact
 */

/**
 * @module social.js — Sharing & Streaks
 * 
 * - shareScore(game, score, unit) → native Web Share API or Twitter fallback
 * - renderShareBtn(game, score, unit) → button HTML with data-share attribute
 *   (requires event delegation listener in games.js)
 * - recordPlay() → updates daily streak in localStorage
 * - getStreak() → {last, count, best}
 * - renderStreak() → HTML string showing streak if 2+ days
 */

/**
 * @module onboarding.js — First-Visit Tour
 * 
 * - showOnboarding(onDone) → 3-step overlay (Welcome, Click to Explore, Watch it Animate)
 *   Shows once, remembered in localStorage key 'onboardingSeen'
 *   Calls onDone() when dismissed or skipped
 */
