/**
 * @module theme.js — Theme System
 * 
 * THEMES: Object with 5 themes (midnight, ocean, ember, aurora, daylight)
 * Each theme has: name, bg, card, accent, accent2, text, muted, dim, marker, visited, route, tiles, mapBg
 * 
 * - getTheme() → current theme key from localStorage (default: 'midnight')
 * - setTheme(name) → save and apply
 * - applyTheme(name) → set CSS custom properties on :root
 * - currentThemeObj() → returns the active theme object
 * - renderThemePicker(onChange?) → creates DOM element with theme buttons
 */
