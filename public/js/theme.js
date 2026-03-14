// World Route Explorer — Theme System

export const THEMES = {
  midnight: {
    name: 'Midnight',
    bg: '#1a1a2e', card: 'rgba(16,16,40,0.92)', accent: '#00ffcc',
    accent2: '#00ff88', text: '#e0e0e0', muted: '#889', dim: '#556',
    marker: '#ff6b6b', visited: '#00ff88', route: '#00ffcc',
    tiles: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    mapBg: '#0a0a1a'
  },
  ocean: {
    name: 'Ocean',
    bg: '#0b1628', card: 'rgba(8,24,56,0.92)', accent: '#4fc3f7',
    accent2: '#81d4fa', text: '#e0e8f0', muted: '#7899aa', dim: '#4a6070',
    marker: '#ff8a65', visited: '#66bb6a', route: '#4fc3f7',
    tiles: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    mapBg: '#060e1a'
  },
  ember: {
    name: 'Ember',
    bg: '#1c1210', card: 'rgba(40,20,16,0.92)', accent: '#ffab40',
    accent2: '#ff6e40', text: '#f0e0d8', muted: '#aa8877', dim: '#705040',
    marker: '#ef5350', visited: '#66bb6a', route: '#ffab40',
    tiles: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    mapBg: '#120a08'
  },
  aurora: {
    name: 'Aurora',
    bg: '#0a1a0a', card: 'rgba(10,30,16,0.92)', accent: '#69f0ae',
    accent2: '#b9f6ca', text: '#e0f0e4', muted: '#78aa88', dim: '#406850',
    marker: '#ff80ab', visited: '#69f0ae', route: '#69f0ae',
    tiles: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    mapBg: '#040e04'
  },
  daylight: {
    name: 'Daylight',
    bg: '#f5f5f5', card: 'rgba(255,255,255,0.95)', accent: '#1976d2',
    accent2: '#0d47a1', text: '#212121', muted: '#757575', dim: '#9e9e9e',
    marker: '#e53935', visited: '#2e7d32', route: '#1976d2',
    tiles: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    mapBg: '#e0e0e0'
  }
};

export function getTheme() {
  return localStorage.getItem('theme') || 'midnight';
}

export function setTheme(name) {
  localStorage.setItem('theme', name);
  applyTheme(name);
}

export function applyTheme(name) {
  const t = THEMES[name] || THEMES.midnight;
  const r = document.documentElement.style;
  r.setProperty('--bg', t.bg);
  r.setProperty('--card', t.card);
  r.setProperty('--accent', t.accent);
  r.setProperty('--accent2', t.accent2);
  r.setProperty('--text', t.text);
  r.setProperty('--muted', t.muted);
  r.setProperty('--dim', t.dim);
  r.setProperty('--marker', t.marker);
  r.setProperty('--visited', t.visited);
  r.setProperty('--route', t.route);
  r.setProperty('--map-bg', t.mapBg);
  document.body.style.background = t.bg;
  document.body.style.color = t.text;
}

export function currentThemeObj() {
  return THEMES[getTheme()] || THEMES.midnight;
}

export function renderThemePicker(onChange) {
  const el = document.createElement('div');
  el.style.cssText = 'display:flex;gap:4px;flex-wrap:wrap;margin:6px 0';
  Object.entries(THEMES).forEach(([key, t]) => {
    const btn = document.createElement('button');
    btn.textContent = t.name;
    btn.className = 'btn' + (getTheme() === key ? ' active' : '');
    btn.style.cssText = `font-size:10px;padding:3px 8px;border-color:${t.accent}40;color:${t.accent}`;
    btn.onclick = () => {
      setTheme(key);
      el.querySelectorAll('.btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if (onChange) onChange(key);
    };
    el.appendChild(btn);
  });
  return el;
}
