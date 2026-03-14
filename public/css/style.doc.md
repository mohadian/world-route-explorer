/**
 * style.css — Shared Stylesheet
 * 
 * Uses CSS custom properties set by theme.js:
 *   --bg, --card, --accent, --accent2, --text, --muted, --dim,
 *   --marker, --visited, --route, --map-bg
 * 
 * Sections:
 *   :root defaults     — fallback values for midnight theme
 *   * reset             — box-sizing, margin, padding
 *   body, #map          — base layout
 *   .leaflet-container  — map background color
 *   Leaflet overrides   — zoom controls moved to right, popup theming
 *   Accessibility       — focus-visible outlines on interactive elements
 *   .panel              — floating control panel (route pages)
 *   .panel-tl           — positions panel top:16px left:16px
 *   .panel .nav-row     — pill-button navigation to sibling pages
 *   .panel .nav-home    — centered "Back to Home" link
 *   .btn                — primary button style
 *   .btn.danger         — red destructive button
 *   .cpill              — continent filter pill buttons
 *   .progress-*         — progress bar and text
 *   .controls-row       — button row layout
 *   .speed-row          — speed slider layout
 *   #sidebar            — collapsible right sidebar
 *   .search-box         — search input styling
 *   .ci                 — country list item
 *   .list-section       — visited/unvisited section headers
 *   #loading            — loading overlay
 *   .modal-overlay      — modal backdrop
 *   .start-picker       — start capital picker modal
 *   .game-btn           — game answer buttons
 *   .score-big          — large score display
 *   .timer-big          — large timer display
 *   .correct/.wrong     — feedback colors
 *   @keyframes fadeIn   — entrance animation
 */
