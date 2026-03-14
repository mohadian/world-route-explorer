// Shared route page logic — used by capitals, centers, and territories pages
import { gcArc, solveGeneric, getStartCapital, setStartCapital, CAPITALS, F, flag } from './data.js';
import { applyTheme, getTheme, currentThemeObj } from './theme.js';
import { renderInfoPopup } from './country-info.js';
import { showOnboarding } from './onboarding.js';

function safeGet(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) || fallback; }
  catch { return fallback; }
}

function safeSet(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); }
  catch { /* storage full */ }
}

function showStartPicker(onDone) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  const current = getStartCapital();
  const opts = CAPITALS.map(c =>
    `<option value="${c[F.CAPITAL]}" ${c[F.CAPITAL] === current ? 'selected' : ''}>${flag(c[F.ISO])} ${c[F.NAME]} — ${c[F.CAPITAL]}</option>`
  ).join('');
  overlay.innerHTML = `<div class="start-picker">
    <h2>📍 Choose Your Starting Point</h2>
    <p>Where do you want to begin your journey?</p>
    <input type="text" class="search-box" id="startSearch" placeholder="🔍 Search countries..." autocomplete="off">
    <select id="startSelect" size="8">${opts}</select>
    <div class="start-picker-actions">
      <button class="btn" id="startConfirm">Start from <span id="startPreview">${current}</span> →</button>
    </div>
  </div>`;
  document.body.appendChild(overlay);

  const select = overlay.querySelector('#startSelect');
  const preview = overlay.querySelector('#startPreview');
  const search = overlay.querySelector('#startSearch');

  select.addEventListener('change', () => {
    preview.textContent = select.value;
  });

  search.addEventListener('input', () => {
    const s = search.value.toLowerCase();
    [...select.options].forEach(o => {
      o.hidden = s && !o.textContent.toLowerCase().includes(s);
    });
  });

  overlay.querySelector('#startConfirm').addEventListener('click', () => {
    setStartCapital(select.value);
    overlay.remove();
    onDone();
  });

  search.focus();
}

export function initRoutePage(data, storageKey, labelFn) {
  applyTheme(getTheme());

  const visited = new Set(safeGet(storageKey, []));
  let markers = [], route = [], map, animTimer = null, animIdx = 0, playing = false, searchTerm = '';

  function save() { safeSet(storageKey, [...visited]); }

  function updateUI() {
    const n = data.length, v = visited.size, t = currentThemeObj();
    document.getElementById('visitedCount').textContent = v;
    document.getElementById('totalCount').textContent = n;
    document.getElementById('progressFill').style.width = (v / n * 100) + '%';
    markers.forEach((m, i) => {
      const isV = visited.has(i);
      m.setStyle({ color: isV ? t.visited : t.marker, fillColor: isV ? t.visited : t.marker });
    });
    renderList();
  }

  function renderList() {
    const vList = [], uList = [], s = searchTerm.toLowerCase();
    data.forEach((c, i) => {
      if (s && !c[0].toLowerCase().includes(s) && !c[1].toLowerCase().includes(s)) return;
      const label = labelFn(c);
      (visited.has(i) ? vList : uList).push({ ...label, idx: i });
    });
    vList.sort((a, b) => a.name.localeCompare(b.name));
    uList.sort((a, b) => a.name.localeCompare(b.name));
    const tag = c => c.tag ? ` <span class="ci-tag">(${c.tag})</span>` : '';
    const row = (c, cls) => `<div class="ci ${cls}" data-idx="${c.idx}"><span>${c.flag ? c.flag + ' ' : ''}${c.name}${tag(c)}</span><span class="cap">${c.sub}</span></div>`;
    document.getElementById('countryList').innerHTML =
      `<div class="list-section visited"><h3>Visited (${vList.length})</h3>${vList.map(c => row(c, 'v')).join('')}</div>` +
      `<div class="list-section unvisited"><h3>Not Visited (${uList.length})</h3>${uList.map(c => row(c, 'u')).join('')}</div>`;
  }

  function goTo(idx) { toggleVisit(idx); map.flyTo([data[idx][2], data[idx][3]], 5, { duration: 0.8 }); markers[idx].openPopup(); }
  function toggleVisit(idx) { visited.has(idx) ? visited.delete(idx) : visited.add(idx); save(); updateUI(); }

  function togglePlay() {
    if (playing) { stopPlay(); return; }
    playing = true; animIdx = 0;
    document.getElementById('playBtn').textContent = '⏸ Pause';
    visited.clear(); save(); updateUI(); stepAnim();
  }
  function stopPlay() { playing = false; clearTimeout(animTimer); document.getElementById('playBtn').textContent = '▶ Play'; }
  function stepAnim() {
    if (!playing || animIdx >= route.length) { stopPlay(); return; }
    const ci = route[animIdx]; visited.add(ci); save(); updateUI();
    map.flyTo([data[ci][2], data[ci][3]], 4, { duration: 0.3 }); markers[ci].openPopup();
    animIdx++; animTimer = setTimeout(stepAnim, 1200 / parseInt(document.getElementById('speedSlider').value));
  }
  function resetVisited() { stopPlay(); visited.clear(); save(); updateUI(); }
  function toggleSidebar() {
    const sb = document.getElementById('sidebar');
    const open = sb.classList.toggle('open');
    document.getElementById('sidebarToggle').textContent = open ? '▶' : '◀';
  }

  // Event delegation
  document.getElementById('countryList').addEventListener('click', e => {
    const el = e.target.closest('.ci[data-idx]');
    if (el) goTo(parseInt(el.dataset.idx));
  });
  document.getElementById('playBtn').addEventListener('click', togglePlay);
  document.getElementById('resetBtn').addEventListener('click', resetVisited);
  document.getElementById('sidebarToggle').addEventListener('click', toggleSidebar);
  document.getElementById('speedSlider').addEventListener('input', e => document.getElementById('speedLabel').textContent = e.target.value + 'x');
  document.getElementById('searchBox').addEventListener('input', e => { searchTerm = e.target.value; renderList(); });

  function rebuildMap() { if (map) { map.remove(); map = null; } markers = []; buildMap(); }

  function buildMap() {
    const t = currentThemeObj();
    const startName = getStartCapital();
    // Find the country that has this capital, then find that country in the current dataset
    const srcCountry = CAPITALS.find(c => c[F.CAPITAL] === startName);
    const countryName = srcCountry ? srcCountry[F.NAME] : 'United Kingdom';
    let startIdx = data.findIndex(c => c[0] === countryName);
    if (startIdx < 0) startIdx = 0;

    const result = solveGeneric(data, startIdx);
    route = result.route;

    document.getElementById('loading').style.display = 'none';
    document.getElementById('countStat').textContent = data.length;
    document.getElementById('distStat').textContent = Math.round(result.totalD).toLocaleString() + ' km';

    // Always mark start as visited
    visited.add(startIdx); save();

    map = L.map('map', { center: [20, 0], zoom: 2 });
    L.tileLayer(t.tiles, { attribution: '© OpenStreetMap © CARTO', maxZoom: 18 }).addTo(map);

    for (let i = 0; i < route.length - 1; i++) {
      const a = data[route[i]], b = data[route[i + 1]];
      L.polyline(gcArc(a[2], a[3], b[2], b[3]), { color: t.route, weight: 1.3, opacity: 0.6 }).addTo(map);
    }

    for (let i = 0; i < data.length; i++) {
      const c = data[i], label = labelFn(c);
      markers.push(
        L.circleMarker([c[2], c[3]], { radius: 5, color: t.marker, fillColor: t.marker, fillOpacity: 0.9, weight: 1 })
          .bindPopup(renderInfoPopup(c[4], c[0], c[1]))
          .bindTooltip(`${label.flag || ''} ${c[0]}`, { direction: 'top', offset: [0, -6] })
          .on('click', () => toggleVisit(i))
          .addTo(map)
      );
    }
    updateUI();
    if (!document.getElementById('sidebar').classList.contains('open')) toggleSidebar();
  }

  // Settings button to change start capital
  const settingsBtn = document.getElementById('settingsBtn');
  if (settingsBtn) {
    settingsBtn.addEventListener('click', () => showStartPicker(() => {
      stopPlay(); visited.clear(); save(); rebuildMap();
    }));
  }

  showOnboarding(() => buildMap());
}
