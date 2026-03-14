// First-time onboarding overlay

const SEEN_KEY = 'onboardingSeen';

export function showOnboarding(onDone) {
  if (localStorage.getItem(SEEN_KEY)) { if (onDone) onDone(); return; }

  const steps = [
    { icon: '🌍', title: 'Welcome to World Route Explorer!', text: 'An optimized route through every country on Earth, starting from any capital you choose.' },
    { icon: '🖱️', title: 'Click to Explore', text: 'Click any marker to mark a country as visited. Use the sidebar to search and track progress.' },
    { icon: '▶️', title: 'Watch it Animate', text: 'Hit Play to watch the route animate across the globe. Adjust speed with the slider.' },
  ];

  let step = 0;
  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;inset:0;z-index:5000;background:rgba(0,0,0,0.7);display:flex;align-items:center;justify-content:center;animation:fadeIn 0.3s';

  function render() {
    const s = steps[step];
    const isLast = step === steps.length - 1;
    overlay.innerHTML = `<div style="background:var(--card,rgba(16,16,40,0.95));border-radius:16px;padding:32px;max-width:380px;text-align:center;border:1px solid rgba(255,255,255,0.1);animation:fadeIn 0.3s">
      <div style="font-size:48px;margin-bottom:12px">${s.icon}</div>
      <h2 style="color:var(--accent,#00ffcc);font-size:18px;margin-bottom:8px">${s.title}</h2>
      <p style="color:var(--muted,#889);font-size:13px;line-height:1.6;margin-bottom:16px">${s.text}</p>
      <div style="display:flex;justify-content:center;gap:6px;margin-bottom:12px">${steps.map((_, i) => `<div style="width:8px;height:8px;border-radius:50%;background:${i === step ? 'var(--accent,#00ffcc)' : 'rgba(255,255,255,0.2)'}"></div>`).join('')}</div>
      <div style="display:flex;gap:8px;justify-content:center">
        ${step > 0 ? '<button class="btn" id="ob-prev">← Back</button>' : ''}
        <button class="btn" id="ob-next" style="min-width:80px">${isLast ? 'Get Started →' : 'Next →'}</button>
      </div>
      <div style="margin-top:8px"><button id="ob-skip" style="background:none;border:none;color:var(--dim,#556);font-size:11px;cursor:pointer">Skip tour</button></div>
    </div>`;
    overlay.querySelector('#ob-next').onclick = () => { if (isLast) close(); else { step++; render(); } };
    if (overlay.querySelector('#ob-prev')) overlay.querySelector('#ob-prev').onclick = () => { step--; render(); };
    overlay.querySelector('#ob-skip').onclick = close;
  }

  function close() {
    localStorage.setItem(SEEN_KEY, '1');
    overlay.remove();
    if (onDone) onDone();
  }

  render();
  document.body.appendChild(overlay);
}
