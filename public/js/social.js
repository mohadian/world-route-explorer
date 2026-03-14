// Social sharing & streak tracking

export function shareScore(game, score, unit = 'pts') {
  const text = `I scored ${score} ${unit} on ${game} in World Route Explorer! 🌍\nCan you beat me?`;
  if (navigator.share) {
    navigator.share({ title: 'World Route Explorer', text }).catch(() => {});
  } else {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'width=550,height=420');
  }
}

export function renderShareBtn(game, score, unit = 'pts') {
  const data = JSON.stringify({ game, score, unit }).replace(/"/g, '&quot;');
  return `<button class="btn" data-share="${data}">📤 Share</button>`;
}

// Streak
const STREAK_KEY = 'playStreak';

function getStreakData() {
  try { return JSON.parse(localStorage.getItem(STREAK_KEY)) || { last: null, count: 0, best: 0 }; }
  catch { return { last: null, count: 0, best: 0 }; }
}

function todayStr() { return new Date().toISOString().slice(0, 10); }

export function recordPlay() {
  const d = getStreakData(), today = todayStr();
  if (d.last === today) return d;
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  d.count = d.last === yesterday ? d.count + 1 : 1;
  d.last = today;
  if (d.count > d.best) d.best = d.count;
  localStorage.setItem(STREAK_KEY, JSON.stringify(d));
  return d;
}

export function getStreak() { return getStreakData(); }

export function renderStreak() {
  const d = getStreakData();
  if (d.count < 2) return '';
  return `<div style="font-size:11px;color:var(--accent);margin-top:4px">🔥 ${d.count} day streak (best: ${d.best})</div>`;
}
