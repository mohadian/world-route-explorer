import { CAPITALS as C, F, flag, havIdx, totalDist, shuffle, getStartIdx } from './data.js?v=1773500951';
import { applyTheme, getTheme, currentThemeObj } from './theme.js';
import { shareScore, renderShareBtn, recordPlay, renderStreak } from './social.js';
import { INFO } from './country-info.js';

// Delegate share button clicks
document.addEventListener('click', e => {
  const btn = e.target.closest('[data-share]');
  if (btn) {
    const { game, score, unit } = JSON.parse(btn.dataset.share);
    shareScore(game, score, unit);
  }
});

applyTheme(getTheme());

const map = L.map('map', { center: [20, 0], zoom: 2 });
let tileLyr = L.tileLayer(currentThemeObj().tiles, { attribution: '© OpenStreetMap © CARTO', maxZoom: 18 }).addTo(map);
const mks = C.map(c => L.circleMarker([c[F.LAT], c[F.LNG]], { radius: 5, color: currentThemeObj().marker, fillColor: currentThemeObj().marker, fillOpacity: 0.8, weight: 1 })
  .bindTooltip(`${flag(c[F.ISO])} ${c[F.NAME]}`, { direction: 'top' }).addTo(map));
let routeLines = [];

let miscLayers = [];
function clearLines() { routeLines.forEach(l => map.removeLayer(l)); routeLines = []; miscLayers.forEach(l => map.removeLayer(l)); miscLayers = []; }
function addMiscLayer(l) { miscLayers.push(l); return l; }
function drawRoute(r, color) {
  clearLines();
  for (let i = 0; i < r.length - 1; i++) {
    const l = L.polyline([[C[r[i]][F.LAT], C[r[i]][F.LNG]], [C[r[i+1]][F.LAT], C[r[i+1]][F.LNG]]], { color, weight: 1.5, opacity: 0.6 }).addTo(map);
    routeLines.push(l);
  }
}
function resetMarkers() { const t = currentThemeObj(); mks.forEach(m => m.setStyle({ color: t.marker, fillColor: t.marker, radius: 5 })); }
function highlightMarker(idx, color, r = 7) { mks[idx].setStyle({ color, fillColor: color, radius: r }); }

const scores = JSON.parse(localStorage.getItem('gameScores') || '{}');
function saveScores() { localStorage.setItem('gameScores', JSON.stringify(scores)); }
function addScore(game, val) { if (!scores[game]) scores[game] = []; scores[game].push(val); scores[game] = scores[game].slice(-10); saveScores(); recordPlay(); }
function renderLB(game, unit = 'pts', order = 'desc') {
  const s = scores[game] || []; if (!s.length) return '';
  const sorted = [...s].sort((a, b) => order === 'asc' ? a - b : b - a);
  return `<div class="lb"><b>Best scores:</b>${sorted.slice(0, 5).map((v, i) => `<div class="entry"><span>#${i + 1}</span><span>${v} ${unit}</span></div>`).join('')}</div>`;
}

const GAMES = [
  { id: 'quiz', icon: '🧠', name: 'Quiz' },
  { id: 'speed', icon: '⚡', name: 'Speed Click' },
  { id: 'optimize', icon: '🔧', name: 'Optimize' },
  { id: 'pindrop', icon: '📍', name: 'Pin Drop' },
  { id: 'distance', icon: '🧭', name: 'Distance Guess' },
  { id: 'region', icon: '🗺️', name: 'Region Race' },
  { id: 'closest', icon: '🎯', name: 'Closest Capital' },
  { id: 'scramble', icon: '🧩', name: 'Capital Scramble' },
  { id: 'hilo', icon: '🌡️', name: 'Higher or Lower' },
  { id: 'sort', icon: '🗂️', name: 'Continent Sort' },
];

let curGame = 'quiz';
const selDiv = document.getElementById('gameSelect');
GAMES.forEach(g => {
  const b = document.createElement('button');
  b.className = 'btn' + (g.id === curGame ? ' active' : '');
  b.textContent = `${g.icon} ${g.name}`;
  b.onclick = () => { curGame = g.id; selDiv.querySelectorAll('.btn').forEach(x => x.classList.remove('active')); b.classList.add('active'); startGame(); };
  selDiv.appendChild(b);
});

const ga = document.getElementById('gameArea');
function startGame() {
  resetMarkers(); clearLines(); mks.forEach(m => m.off('click')); map.off('click');
  const g = GAMES.find(x => x.id === curGame);
  document.getElementById('currentGame').textContent = g ? `${g.icon} ${g.name}` : '';
  // Collapse the game list after selection
  document.getElementById('gameSelect').style.display = 'none';
  document.getElementById('moreArrow').textContent = '▸';
  games[curGame]();
}

// Toggle more games
document.getElementById('moreGamesToggle').addEventListener('click', () => {
  const sel = document.getElementById('gameSelect');
  const open = sel.style.display === 'none';
  sel.style.display = open ? 'flex' : 'none';
  document.getElementById('moreArrow').textContent = open ? '▾' : '▸';
});

const games = {};

// ===== QUIZ =====
games.quiz = () => {
  let score = 0, round = 0, total = 15, answer = -1;
  function next() {
    if (round >= total) { addScore('quiz', score); ga.innerHTML = `<div class="score-big">${score}/${total}</div><p class="note">Quiz complete!</p>${renderStreak()}${renderLB('quiz')}${renderShareBtn('Quiz', `${score}/${total}`, '')} <button class="btn" id="qAgain">Play Again</button>`; document.getElementById('qAgain').onclick = () => games.quiz(); return; }
    const idx = Math.floor(Math.random() * C.length); answer = idx;
    const mode = Math.random() > 0.5 ? 'cap' : 'flag';
    const opts = shuffle([idx, ...shuffle(Array.from({ length: C.length }, (_, i) => i).filter(i => i !== idx)).slice(0, 3)]);
    resetMarkers(); highlightMarker(idx, currentThemeObj().accent, 8);
    map.flyTo([C[idx][F.LAT], C[idx][F.LNG]], 4, { duration: 0.4 });
    if (mode === 'cap') {
      ga.innerHTML = `<div class="note">Q${round + 1}/${total} · Score: ${score}</div><div class="prompt">Capital of ${flag(C[idx][F.ISO])} <b>${C[idx][F.NAME]}</b>?</div><div id="feedback"></div><div id="answerBtns">${opts.map(o => `<button class="game-btn" data-i="${o}">${C[o][F.CAPITAL]}</button>`).join('')}</div>`;
    } else {
      ga.innerHTML = `<div class="note">Q${round + 1}/${total} · Score: ${score}</div><div class="prompt">Which country? <span style="font-size:32px">${flag(C[idx][F.ISO])}</span></div><div id="feedback"></div><div id="answerBtns">${opts.map(o => `<button class="game-btn" data-i="${o}">${C[o][F.NAME]}</button>`).join('')}</div>`;
    }
    ga.querySelectorAll('.game-btn').forEach(b => b.onclick = () => {
      round++; const ok = parseInt(b.dataset.i) === answer; if (ok) score++;
      document.getElementById('feedback').innerHTML = ok ? `<span class="correct">✓ Correct!</span>` : `<span class="wrong">✗ ${C[answer][F.NAME]} — ${C[answer][F.CAPITAL]}</span>`;
      setTimeout(next, ok ? 700 : 1400);
    });
  }
  next();
};

// ===== SPEED CLICK =====
games.speed = () => {
  const targets = shuffle(Array.from({ length: C.length }, (_, i) => i)).slice(0, 20);
  let cur = 0, start = null, timer = null, hard = false;

  // Ready screen with difficulty choice
  map.setView([20, 0], 2);
  resetMarkers();
  ga.innerHTML = `<div class="prompt" style="text-align:center;margin:16px 0"><b>Speed Click</b><br>Find 20 countries as fast as you can!</div><div style="text-align:center;display:flex;gap:8px;justify-content:center"><button class="btn" id="sEasy" style="font-size:14px;padding:10px 20px">🟢 Easy</button><button class="btn" id="sHard" style="font-size:14px;padding:10px 20px">🔴 Hard</button></div><div class="note" style="text-align:center;margin-top:8px">Easy: country highlighted · Hard: find it yourself</div>`;
  document.getElementById('sEasy').onclick = () => beginGame(false);
  document.getElementById('sHard').onclick = () => beginGame(true);

  function beginGame(isHard) {
    hard = isHard;
    start = Date.now();
    map.setView([20, 0], 2);
    resetMarkers();
    ga.innerHTML = `<div class="prompt">Click <b>20 countries</b> — ${hard ? '🔴 Hard' : '🟢 Easy'}</div><div class="timer-big" id="sTimer">0.0s</div><div class="note">Find: <span id="sTarget"></span></div><div style="margin-top:8px"><button class="btn" id="sSkip">Skip →</button> <button class="btn danger" id="sReset">↺ Reset</button></div>`;
    timer = setInterval(() => { const el = document.getElementById('sTimer'); if (el) el.textContent = ((Date.now() - start) / 1000).toFixed(1) + 's'; }, 100);
    document.getElementById('sReset').onclick = () => { clearInterval(timer); mks.forEach(m => m.off('click')); games.speed(); };
    document.getElementById('sSkip').onclick = () => { cur++; showTarget(); };
    mks.forEach((m, i) => m.on('click', () => {
      if (i === targets[cur]) { highlightMarker(i, currentThemeObj().visited, 5); cur++; showTarget(); }
    }));
    showTarget();
  }

  function showTarget() {
    if (cur >= targets.length) {
      clearInterval(timer); const t = ((Date.now() - start) / 1000).toFixed(1);
      const label = hard ? 'Speed Click (Hard)' : 'Speed Click';
      addScore('speed', parseFloat(t));
      mks.forEach(m => m.off('click'));
      ga.innerHTML = `<div class="score-big">${t}s</div><p class="note">20 countries found! ${hard ? '🔴 Hard' : '🟢 Easy'}</p>${renderStreak()}${renderLB('speed', 's', 'asc')}${renderShareBtn(label, t, 's')} <button class="btn" id="sAgain">Play Again</button>`;
      document.getElementById('sAgain').onclick = () => games.speed(); return;
    }
    const idx = targets[cur];
    // Easy: zoom to continent level and highlight; Hard: stay zoomed out, no highlight
    if (!hard) {
      highlightMarker(idx, currentThemeObj().accent, 8);
      map.flyTo([C[idx][F.LAT], C[idx][F.LNG]], 4, { duration: 0.3 });
    }
    document.getElementById('sTarget').innerHTML = `${flag(C[idx][F.ISO])} ${C[idx][F.NAME]} (${cur + 1}/20)`;
  }
};

// ===== OPTIMIZE =====
games.optimize = () => {
  const subset = shuffle(Array.from({ length: C.length }, (_, i) => i)).slice(0, 20);
  const si = getStartIdx(); if (!subset.includes(si)) subset[0] = si;
  const li = subset.indexOf(si); subset.splice(li, 1); subset.unshift(si);
  let optRoute = [...subset];
  function render() {
    const d = Math.round(totalDist(optRoute)).toLocaleString();
    ga.innerHTML = `<div class="prompt">Drag to reorder & minimize distance!</div><div class="note">Distance: <span style="color:var(--accent);font-weight:600" id="optDist">${d} km</span></div>
      <button class="btn" id="optAI">🤖 Compare to AI</button>
      <div id="routeList">${optRoute.map((idx, pos) => `<div class="ritem" draggable="${pos === 0 ? 'false' : 'true'}" data-pos="${pos}"><span>${flag(C[idx][F.ISO])} ${C[idx][F.NAME]}</span><span style="font-size:10px;color:var(--dim)">${pos === 0 ? 'START' : pos}</span></div>`).join('')}</div>${renderLB('optimize', 'km', 'asc')}`;
    drawRoute(optRoute, currentThemeObj().accent);
    document.getElementById('optAI').onclick = autoOpt;
    const list = document.getElementById('routeList');
    let dragIdx = null, touchEl = null;
    list.querySelectorAll('.ritem[draggable=true]').forEach(el => {
      el.addEventListener('dragstart', () => { dragIdx = parseInt(el.dataset.pos); el.classList.add('dragging'); });
      el.addEventListener('dragend', () => el.classList.remove('dragging'));
      el.addEventListener('dragover', e => e.preventDefault());
      el.addEventListener('drop', e => { e.preventDefault(); const di = parseInt(el.dataset.pos); if (dragIdx !== null && dragIdx !== di && di > 0) { const item = optRoute.splice(dragIdx, 1)[0]; optRoute.splice(di, 0, item); render(); } });
      // Touch support
      el.addEventListener('touchstart', e => { dragIdx = parseInt(el.dataset.pos); touchEl = el; el.classList.add('dragging'); }, { passive: true });
      el.addEventListener('touchmove', e => { e.preventDefault(); }, { passive: false });
      el.addEventListener('touchend', e => {
        if (!touchEl) return;
        touchEl.classList.remove('dragging');
        const touch = e.changedTouches[0];
        const target = document.elementFromPoint(touch.clientX, touch.clientY);
        const dropEl = target?.closest?.('.ritem');
        if (dropEl) {
          const di = parseInt(dropEl.dataset.pos);
          if (dragIdx !== null && dragIdx !== di && di > 0) { const item = optRoute.splice(dragIdx, 1)[0]; optRoute.splice(di, 0, item); render(); }
        }
        touchEl = null;
      });
    });
  }
  function autoOpt() {
    const r = optRoute.slice();
    for (let it = 0; it < 50; it++) { let imp = false; for (let i = 1; i < r.length - 2; i++) for (let j = i + 1; j < r.length - 1; j++) { const d1 = havIdx(r[i-1],r[i]) + havIdx(r[j],r[j+1]), d2 = havIdx(r[i-1],r[j]) + havIdx(r[i],r[j+1]); if (d2 < d1 - 0.01) { let l = i, m = j; while (l < m) { [r[l], r[m]] = [r[m], r[l]]; l++; m--; } imp = true; } } if (!imp) break; }
    const yourD = Math.round(totalDist(optRoute)), aiD = Math.round(totalDist(r));
    addScore('optimize', yourD); drawRoute(r, currentThemeObj().visited);
    document.getElementById('optDist').innerHTML = `You: ${yourD.toLocaleString()} km | AI: ${aiD.toLocaleString()} km ${yourD <= aiD ? '<span class="correct">🏆 You win!</span>' : '<span class="wrong">AI wins</span>'}`;
  }
  render();
};

// ===== PIN DROP =====
games.pindrop = () => {
  let score = 0, round = 0, total = 10, target = -1;
  function next() {
    if (round >= total) { addScore('pindrop', score); ga.innerHTML = `<div class="score-big">${score} km</div><p class="note">Pin Drop complete! Lower is better.</p>${renderStreak()}${renderLB('pindrop', 'km', 'asc')}${renderShareBtn('Pin Drop', score, 'km error')} <button class="btn" id="pdAgain">Play Again</button>`; document.getElementById('pdAgain').onclick = () => games.pindrop(); return; }
    target = Math.floor(Math.random() * C.length); resetMarkers();
    ga.innerHTML = `<div class="note">Round ${round + 1}/${total} · Total error: ${score} km</div><div class="prompt">Click where ${flag(C[target][F.ISO])} <b>${C[target][F.NAME]}</b> is!</div><div id="feedback"></div>`;
    map.once('click', e => {
      const dist = Math.round(L.latLng(e.latlng.lat, e.latlng.lng).distanceTo(L.latLng(C[target][F.LAT], C[target][F.LNG])) / 1000);
      score += dist; round++;
      highlightMarker(target, currentThemeObj().visited, 8);
      addMiscLayer(L.polyline([[e.latlng.lat, e.latlng.lng], [C[target][F.LAT], C[target][F.LNG]]], { color: currentThemeObj().marker, dashArray: '4', weight: 1 }).addTo(map));
      document.getElementById('feedback').innerHTML = dist < 200 ? `<span class="correct">🎯 ${dist} km off — Great!</span>` : dist < 1000 ? `<span style="color:#ffab40">📍 ${dist} km off</span>` : `<span class="wrong">❌ ${dist} km off</span>`;
      map.flyTo([C[target][F.LAT], C[target][F.LNG]], 4, { duration: 0.5 });
      setTimeout(next, 1800);
    });
  }
  map.setView([20, 0], 2); next();
};

// ===== DISTANCE GUESS =====
games.distance = () => {
  let score = 0, round = 0, total = 10;
  function next() {
    if (round >= total) { addScore('distance', score); ga.innerHTML = `<div class="score-big">${score} pts</div><p class="note">Distance Guess complete!</p>${renderStreak()}${renderLB('distance')}${renderShareBtn('Distance Guess', score)} <button class="btn" id="dgAgain">Play Again</button>`; document.getElementById('dgAgain').onclick = () => games.distance(); return; }
    const a = Math.floor(Math.random() * C.length); let b; do { b = Math.floor(Math.random() * C.length); } while (b === a);
    const actual = Math.round(havIdx(a, b));
    resetMarkers(); highlightMarker(a, currentThemeObj().accent2 || currentThemeObj().accent, 7); highlightMarker(b, currentThemeObj().accent, 7);
    clearLines(); addMiscLayer(L.polyline([[C[a][F.LAT], C[a][F.LNG]], [C[b][F.LAT], C[b][F.LNG]]], { color: 'var(--accent)', dashArray: '6', weight: 1, opacity: 0.4 }).addTo(map));
    ga.innerHTML = `<div class="note">Round ${round + 1}/${total} · Score: ${score}</div><div class="prompt">Distance from ${flag(C[a][F.ISO])} <b>${C[a][F.CAPITAL]}</b> to ${flag(C[b][F.ISO])} <b>${C[b][F.CAPITAL]}</b>?</div><div style="display:flex;gap:6px;margin-top:8px"><input type="number" class="search-box" id="dgInput" placeholder="km" style="width:120px;margin:0"><button class="btn" id="dgSubmit">Guess</button></div><div id="feedback"></div>`;
    document.getElementById('dgSubmit').onclick = () => {
      const guess = parseInt(document.getElementById('dgInput').value) || 0;
      const err = Math.abs(guess - actual);
      const pts = Math.max(0, 100 - Math.floor(err / 50));
      score += pts; round++;
      document.getElementById('feedback').innerHTML = `<span class="${pts > 60 ? 'correct' : 'wrong'}">Actual: ${actual.toLocaleString()} km (off by ${err.toLocaleString()} km) → +${pts} pts</span>`;
      setTimeout(next, 2000);
    };
    document.getElementById('dgInput').addEventListener('keydown', e => { if (e.key === 'Enter') document.getElementById('dgSubmit').click(); });
  }
  next();
};

// ===== REGION RACE =====
games.region = () => {
  const regions = { Europe: [], Asia: [], Africa: [], NAmerica: [], SAmerica: [], Oceania: [] };
  C.forEach((c, i) => { if (regions[c[F.CONTINENT]]) regions[c[F.CONTINENT]].push(i); });
  ga.innerHTML = `<div class="prompt">Pick a continent to race!</div><div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:8px">${Object.keys(regions).map(r => `<button class="btn rr-pick" data-r="${r}">${r} (${regions[r].length})</button>`).join('')}</div>${renderLB('region', 's', 'asc')}`;
  ga.querySelectorAll('.rr-pick').forEach(b => b.onclick = () => runRegion(b.dataset.r, regions[b.dataset.r]));

  function runRegion(name, indices) {
    const targets = shuffle([...indices]); let cur = 0, start = Date.now(), timer;
    resetMarkers(); indices.forEach(i => highlightMarker(i, currentThemeObj().accent, 6));
    ga.innerHTML = `<div class="prompt">Click all <b>${name}</b> countries!</div><div class="timer-big" id="rrTimer">0.0s</div><div class="note">Find: <span id="rrTarget"></span> (<span id="rrProg">0</span>/${targets.length})</div>`;
    timer = setInterval(() => { document.getElementById('rrTimer').textContent = ((Date.now() - start) / 1000).toFixed(1) + 's'; }, 100);
    function showTarget() {
      if (cur >= targets.length) {
        clearInterval(timer); const t = ((Date.now() - start) / 1000).toFixed(1);
        addScore('region', parseFloat(t));
        ga.innerHTML = `<div class="score-big">${t}s</div><p class="note">${name} complete!</p>${renderStreak()}${renderLB('region', 's', 'asc')}${renderShareBtn('Region Race: ' + name, t, 's')} <button class="btn" id="rrAgain">Play Again</button>`;
        document.getElementById('rrAgain').onclick = () => games.region(); return;
      }
      document.getElementById('rrTarget').innerHTML = `${flag(C[targets[cur]][F.ISO])} ${C[targets[cur]][F.NAME]}`;
      document.getElementById('rrProg').textContent = cur;
    }
    mks.forEach((m, i) => m.on('click', () => {
      if (i === targets[cur]) { highlightMarker(i, currentThemeObj().visited, 5); cur++; showTarget(); }
    }));
    showTarget();
  }
};

// ===== CLOSEST CAPITAL =====
games.closest = () => {
  let score = 0, round = 0, total = 12;
  function next() {
    if (round >= total) { addScore('closest', score); ga.innerHTML = `<div class="score-big">${score}/${total}</div><p class="note">Closest Capital complete!</p>${renderStreak()}${renderLB('closest')}${renderShareBtn('Closest Capital', `${score}/${total}`, '')} <button class="btn" id="ccAgain">Play Again</button>`; document.getElementById('ccAgain').onclick = () => games.closest(); return; }
    const base = Math.floor(Math.random() * C.length);
    const others = Array.from({ length: C.length }, (_, i) => i).filter(i => i !== base);
    others.sort((a, b) => havIdx(base, a) - havIdx(base, b));
    const correct = others[0];
    const wrong = shuffle(others.slice(5, 40)).slice(0, 3);
    const opts = shuffle([correct, ...wrong]);
    resetMarkers(); highlightMarker(base, currentThemeObj().accent, 8);
    map.flyTo([C[base][F.LAT], C[base][F.LNG]], 4, { duration: 0.4 });
    ga.innerHTML = `<div class="note">Round ${round + 1}/${total} · Score: ${score}</div><div class="prompt">Which capital is closest to ${flag(C[base][F.ISO])} <b>${C[base][F.CAPITAL]}</b>?</div><div id="feedback"></div><div id="answerBtns">${opts.map(o => `<button class="game-btn" data-i="${o}">${flag(C[o][F.ISO])} ${C[o][F.CAPITAL]} (${C[o][F.NAME]})</button>`).join('')}</div>`;
    ga.querySelectorAll('.game-btn').forEach(b => b.onclick = () => {
      round++; const ok = parseInt(b.dataset.i) === correct; if (ok) score++;
      document.getElementById('feedback').innerHTML = ok ? `<span class="correct">✓ Correct! (${Math.round(havIdx(base, correct))} km)</span>` : `<span class="wrong">✗ It was ${flag(C[correct][F.ISO])} ${C[correct][F.CAPITAL]} (${Math.round(havIdx(base, correct))} km)</span>`;
      setTimeout(next, ok ? 700 : 1500);
    });
  }
  next();
};

// ===== CAPITAL SCRAMBLE =====
games.scramble = () => {
  let score = 0, round = 0, total = 12;
  function scrambleWord(w) {
    const a = w.toUpperCase().split('');
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a.join('') === w.toUpperCase() ? scrambleWord(w) : a.join('');
  }
  function next() {
    if (round >= total) { addScore('scramble', score); ga.innerHTML = `<div class="score-big">${score}/${total}</div><p class="note">Capital Scramble complete!</p>${renderStreak()}${renderLB('scramble')}${renderShareBtn('Capital Scramble', `${score}/${total}`, '')} <button class="btn" id="scAgain">Play Again</button>`; document.getElementById('scAgain').onclick = () => games.scramble(); return; }
    const idx = Math.floor(Math.random() * C.length);
    const capital = C[idx][F.CAPITAL];
    const scrambled = scrambleWord(capital);
    resetMarkers(); highlightMarker(idx, currentThemeObj().accent, 8);
    map.flyTo([C[idx][F.LAT], C[idx][F.LNG]], 4, { duration: 0.4 });
    ga.innerHTML = `<div class="note">Round ${round + 1}/${total} · Score: ${score}</div><div class="prompt">Unscramble this capital:</div><div style="font-size:24px;letter-spacing:4px;color:var(--accent);margin:10px 0;font-weight:700">${scrambled}</div><div style="display:flex;gap:6px;margin-top:8px"><input type="text" class="search-box" id="scInput" placeholder="Type the capital..." style="width:180px;margin:0" autocomplete="off"><button class="btn" id="scSubmit">Go</button><button class="btn" id="scHint" style="opacity:0.6">🏳️ Hint</button></div><div id="feedback"></div>`;
    document.getElementById('scHint').onclick = () => { document.getElementById('scHint').textContent = `${flag(C[idx][F.ISO])} ${C[idx][F.NAME]}`; document.getElementById('scHint').style.opacity = '1'; };
    const submit = () => {
      const guess = document.getElementById('scInput').value.trim();
      const ok = guess.toLowerCase() === capital.toLowerCase();
      if (ok) score++;
      round++;
      document.getElementById('feedback').innerHTML = ok ? `<span class="correct">✓ ${capital}!</span>` : `<span class="wrong">✗ It was ${capital}</span>`;
      setTimeout(next, ok ? 700 : 1500);
    };
    document.getElementById('scSubmit').onclick = submit;
    document.getElementById('scInput').addEventListener('keydown', e => { if (e.key === 'Enter') submit(); });
    document.getElementById('scInput').focus();
  }
  next();
};

// ===== HIGHER OR LOWER =====
games.hilo = () => {
  function parsePop(s) { if (!s) return 0; const n = parseFloat(s); if (s.includes('B')) return n * 1000000; if (s.includes('M')) return n * 1000; if (s.includes('K')) return n; return n; }
  let streak = 0, best = 0, curIdx = Math.floor(Math.random() * C.length);
  function show() {
    const info = INFO[C[curIdx][F.ISO]];
    const pop = info ? info.pop : '?';
    let nextIdx; do { nextIdx = Math.floor(Math.random() * C.length); } while (nextIdx === curIdx);
    const nextInfo = INFO[C[nextIdx][F.ISO]];
    const nextPop = nextInfo ? nextInfo.pop : '?';
    resetMarkers();
    highlightMarker(curIdx, currentThemeObj().accent, 7);
    highlightMarker(nextIdx, currentThemeObj().accent2 || currentThemeObj().accent, 7);
    ga.innerHTML = `<div class="note">Streak: ${streak} (Best: ${best})</div><div class="prompt">${flag(C[curIdx][F.ISO])} <b>${C[curIdx][F.NAME]}</b> has <b>${pop}</b> people.</div><div class="prompt">Does ${flag(C[nextIdx][F.ISO])} <b>${C[nextIdx][F.NAME]}</b> have <b>higher</b> or <b>lower</b>?</div><div style="display:flex;gap:8px;margin-top:10px"><button class="btn" id="hiBtn">⬆ Higher</button><button class="btn" id="loBtn">⬇ Lower</button></div><div id="feedback"></div>`;
    const answer = (choice) => {
      const curP = parsePop(pop), nextP = parsePop(nextPop);
      const ok = (choice === 'hi' && nextP >= curP) || (choice === 'lo' && nextP <= curP);
      if (ok) { streak++; if (streak > best) best = streak; } else { addScore('hilo', streak); streak = 0; }
      document.getElementById('feedback').innerHTML = ok ? `<span class="correct">✓ ${C[nextIdx][F.NAME]} has ${nextPop}</span>` : `<span class="wrong">✗ ${C[nextIdx][F.NAME]} has ${nextPop}. Streak ended!</span>${renderStreak()}${renderLB('hilo')}`;
      curIdx = nextIdx;
      setTimeout(show, ok ? 1000 : 2500);
    };
    document.getElementById('hiBtn').onclick = () => answer('hi');
    document.getElementById('loBtn').onclick = () => answer('lo');
  }
  show();
};

// ===== CONTINENT SORT =====
games.sort = () => {
  const buckets = ['Europe', 'Asia', 'Africa', 'NAmerica', 'SAmerica', 'Oceania'];
  const items = shuffle(Array.from({ length: C.length }, (_, i) => i)).slice(0, 20);
  let cur = 0, correct = 0, start = null, timer = null;

  // Zoom out to hide location, show "Ready?" screen
  map.setView([20, 0], 2);
  resetMarkers();
  ga.innerHTML = `<div class="prompt" style="text-align:center;margin:16px 0"><b>Continent Sort</b><br>20 countries — pick the right continent!</div><div style="text-align:center"><button class="btn" id="csStart" style="font-size:15px;padding:10px 24px">Ready? Start →</button></div>`;
  document.getElementById('csStart').onclick = beginGame;

  function beginGame() {
    start = Date.now();
    ga.innerHTML = `<div class="note"><span id="csProg">1/${items.length}</span> · <span class="timer-big" id="csTimer">0.0s</span></div><div class="prompt">Which continent? <span id="csCountry"></span></div><div id="csBuckets" style="display:flex;flex-wrap:wrap;gap:6px;margin-top:8px">${buckets.map(b => `<button class="btn cs-bucket" data-c="${b}">${b === 'NAmerica' ? 'N.America' : b === 'SAmerica' ? 'S.America' : b}</button>`).join('')}</div><div id="feedback" style="margin-top:8px"></div><div style="margin-top:8px"><button class="btn danger" id="csReset">↺ Reset</button></div>`;
    timer = setInterval(() => { const el = document.getElementById('csTimer'); if (el) el.textContent = ((Date.now() - start) / 1000).toFixed(1) + 's'; }, 100);
    document.getElementById('csReset').onclick = () => { clearInterval(timer); games.sort(); };
    showItem();
  }

  function showItem() {
    if (cur >= items.length) {
      clearInterval(timer);
      const t = ((Date.now() - start) / 1000).toFixed(1);
      addScore('sort', correct);
      map.setView([20, 0], 2);
      ga.innerHTML = `<div class="score-big">${correct}/${items.length}</div><p class="note">${Math.round(correct / items.length * 100)}% correct in ${t}s</p>${renderStreak()}${renderLB('sort')}${renderShareBtn('Continent Sort', `${correct}/${items.length}`, '')} <button class="btn" id="csAgain">Play Again</button>`;
      document.getElementById('csAgain').onclick = () => games.sort();
      return;
    }
    const idx = items[cur];
    // Zoom out — don't reveal location
    map.setView([20, 0], 2);
    resetMarkers();
    document.getElementById('csTimer').textContent = ((Date.now() - start) / 1000).toFixed(1) + 's';
    document.getElementById('csProg').textContent = `${cur + 1}/${items.length}`;
    document.getElementById('csCountry').innerHTML = `${flag(C[idx][F.ISO])} ${C[idx][F.NAME]}`;
    document.getElementById('feedback').textContent = '';
    document.querySelectorAll('.cs-bucket').forEach(b => {
      b.onclick = () => {
        const ok = b.dataset.c === C[idx][F.CONTINENT];
        if (ok) correct++;
        // Reveal location by zooming in
        highlightMarker(idx, ok ? currentThemeObj().visited : currentThemeObj().marker, 8);
        map.flyTo([C[idx][F.LAT], C[idx][F.LNG]], 4, { duration: 0.4 });
        document.getElementById('feedback').innerHTML = ok ? `<span class="correct">✓</span>` : `<span class="wrong">✗ ${C[idx][F.CONTINENT]}</span>`;
        cur++;
        // Zoom back out and show next after delay
        setTimeout(() => { map.setView([20, 0], 2); setTimeout(showItem, 300); }, ok ? 800 : 1500);
      };
    });
  }
};

startGame();
