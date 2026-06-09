// ============================================================
// CONFIG
// ============================================================
const SHEET_ID = '1_xTd9prQkSc-WkZjCGINZOBsAi4KWaj3teqO2Fsa80I';

const RUNS_URL        = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=runs`;
const INTERVALS_URL   = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=intervals`;
const SPEED_TIERS_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=speed_tiers`;

// ============================================================
// DEMO DATA
// ============================================================
const DEMO_RUNS = [
  { id: 'tempo-20', title: 'Tempo 20', description: 'A 20-minute progressive tempo run — build speed each interval.', total_duration_minutes: '20', difficulty: 'Moderate', program: 'Foundation Runs', player_type: 'timer' },
  { id: 'easy-30',  title: 'Easy 30',  description: 'A relaxed 30-minute steady-state run. Conversational pace.',     total_duration_minutes: '30', difficulty: 'Easy',     program: 'Foundation Runs', player_type: 'timer' },
  { id: 'rs-w1-d1', title: 'Easy Run',   description: 'An easy aerobic effort to kick off your training block.',          total_duration_minutes: '30', difficulty: 'Easy',     program: 'RUN STRONG', player_type: 'segment', week_number: '1', week_label: 'Base Building',   day_recommendation: 'Monday',    coaching_cue: 'Welcome to Week 1. This run is all about base building — keep it conversational and easy. If you can\'t hold a conversation, slow it down. We\'re playing the long game here.' },
  { id: 'rs-w1-d2', title: 'Tempo Run',  description: 'Your first taste of tempo pace. Short efforts, big adaptation.',  total_duration_minutes: '35', difficulty: 'Moderate', program: 'RUN STRONG', player_type: 'segment', week_number: '1', week_label: 'Base Building',   day_recommendation: 'Wednesday', coaching_cue: 'Tempo pace should feel comfortably hard — you can speak a few words but not full sentences. Start conservative and build into each effort. Recovery between segments is earned, so take it.' },
  { id: 'rs-w1-d3', title: 'Long Run',   description: 'Your weekly long run. Easy pace, big miles.',                     total_duration_minutes: '50', difficulty: 'Moderate', program: 'RUN STRONG', player_type: 'segment', week_number: '1', week_label: 'Base Building',   day_recommendation: 'Saturday',  coaching_cue: 'Long runs are your foundation. Stay easy — this is aerobic conditioning, not a race. Fuel and hydrate before you feel like you need it. Finish feeling like you could have gone further.' },
  { id: 'rs-w2-d1', title: 'Recovery Run', description: 'An active recovery day — flush the legs, stay easy.',           total_duration_minutes: '25', difficulty: 'Easy',     program: 'RUN STRONG', player_type: 'segment', week_number: '2', week_label: 'Building Volume', day_recommendation: 'Monday',    coaching_cue: 'Today is about recovery, not performance. Keep your heart rate low and your effort minimal. If your legs are tired, that\'s expected — you\'re adapting. Stay easy.' },
];

const DEMO_SPEED_TIERS = [
  { effort_label: 'Warm Up',   beginner_mph: '4.0', intermediate_mph: '4.5', advanced_mph: '5.0', display_order: '1' },
  { effort_label: 'Easy Jog',  beginner_mph: '5.0', intermediate_mph: '5.5', advanced_mph: '6.0', display_order: '2' },
  { effort_label: 'Tempo',     beginner_mph: '6.5', intermediate_mph: '7.5', advanced_mph: '8.5', display_order: '3' },
  { effort_label: 'Recovery',  beginner_mph: '4.5', intermediate_mph: '5.0', advanced_mph: '5.5', display_order: '5' },
  { effort_label: 'Cool Down', beginner_mph: '3.5', intermediate_mph: '4.0', advanced_mph: '4.5', display_order: '7' },
];

const DEMO_INTERVALS = {
  'tempo-20': [
    { run_id: 'tempo-20', order: '1',  label: 'Warm Up',   speed_label: 'Warm Up',   incline_pct: '',  duration_seconds: '120' },
    { run_id: 'tempo-20', order: '2',  label: 'Tempo',     speed_label: 'Tempo',     incline_pct: '',  duration_seconds: '180' },
    { run_id: 'tempo-20', order: '3',  label: 'Recovery',  speed_label: 'Recovery',  incline_pct: '',  duration_seconds: '60'  },
    { run_id: 'tempo-20', order: '4',  label: 'Tempo',     speed_label: 'Tempo',     incline_pct: '',  duration_seconds: '180' },
    { run_id: 'tempo-20', order: '5',  label: 'Recovery',  speed_label: 'Recovery',  incline_pct: '',  duration_seconds: '60'  },
    { run_id: 'tempo-20', order: '6',  label: 'Tempo',     speed_label: 'Tempo',     incline_pct: '1', duration_seconds: '180' },
    { run_id: 'tempo-20', order: '7',  label: 'Recovery',  speed_label: 'Recovery',  incline_pct: '',  duration_seconds: '60'  },
    { run_id: 'tempo-20', order: '8',  label: 'Tempo',     speed_label: 'Tempo',     incline_pct: '1', duration_seconds: '180' },
    { run_id: 'tempo-20', order: '9',  label: 'Cool Down', speed_label: 'Cool Down', incline_pct: '',  duration_seconds: '180' },
  ],
  'easy-30': [
    { run_id: 'easy-30', order: '1', label: 'Warm Up',   speed_label: 'Warm Up',   incline_pct: '', duration_seconds: '300'  },
    { run_id: 'easy-30', order: '2', label: 'Easy Run',  speed_label: 'Easy Jog',  incline_pct: '', duration_seconds: '1200' },
    { run_id: 'easy-30', order: '3', label: 'Cool Down', speed_label: 'Cool Down', incline_pct: '', duration_seconds: '300'  },
  ],
  'rs-w1-d1': [
    { run_id: 'rs-w1-d1', order: '1', label: 'Warm-up walk',     segment_type: 'timer', distance_label: '5 min',  notes: 'Easy 3.5 mph walk to wake up your legs.',          duration_seconds: '300' },
    { run_id: 'rs-w1-d1', order: '2', label: 'Easy aerobic run', segment_type: 'timer', distance_label: '1.5 mi', notes: 'Conversational pace. Incline 1%.',                  duration_seconds: '900' },
    { run_id: 'rs-w1-d1', order: '3', label: 'Recovery walk',    segment_type: 'tap',   distance_label: '2 min',  notes: 'Catch your breath. Slow it way down.',             duration_seconds: '' },
    { run_id: 'rs-w1-d1', order: '4', label: 'Easy aerobic run', segment_type: 'timer', distance_label: '1.5 mi', notes: 'Same effort. Relax your shoulders.',               duration_seconds: '900' },
    { run_id: 'rs-w1-d1', order: '5', label: 'Cool-down walk',   segment_type: 'timer', distance_label: '5 min',  notes: 'Drop to 3.0 mph. Let your heart rate settle.',     duration_seconds: '300' },
  ],
  'rs-w1-d2': [
    { run_id: 'rs-w1-d2', order: '1', label: 'Warm-up',       segment_type: 'timer', distance_label: '10 min', notes: 'Easy jog, building pace gradually.',           duration_seconds: '600' },
    { run_id: 'rs-w1-d2', order: '2', label: 'Tempo effort',  segment_type: 'timer', distance_label: '1 mi',   notes: 'Comfortably hard. Push but keep control.',     duration_seconds: '540' },
    { run_id: 'rs-w1-d2', order: '3', label: 'Easy recovery', segment_type: 'timer', distance_label: '3 min',  notes: 'Drop to easy jog. Full recovery.',             duration_seconds: '180' },
    { run_id: 'rs-w1-d2', order: '4', label: 'Tempo effort',  segment_type: 'timer', distance_label: '1 mi',   notes: 'Same as before. Stay smooth and controlled.',  duration_seconds: '540' },
    { run_id: 'rs-w1-d2', order: '5', label: 'Cool-down',     segment_type: 'timer', distance_label: '5 min',  notes: 'Easy jog → walk. Heart rate under 120 bpm.',   duration_seconds: '300' },
  ],
  'rs-w1-d3': [
    { run_id: 'rs-w1-d3', order: '1', label: 'Warm-up',        segment_type: 'timer', distance_label: '10 min', notes: 'Very easy start. Build slowly.',                    duration_seconds: '600' },
    { run_id: 'rs-w1-d3', order: '2', label: 'Long run',        segment_type: 'tap',   distance_label: '4 mi',   notes: 'Easy pace the whole way. Never breathless.',        duration_seconds: '' },
    { run_id: 'rs-w1-d3', order: '3', label: 'Cool-down walk',  segment_type: 'timer', distance_label: '5 min',  notes: 'Walk it out. You earned it.',                       duration_seconds: '300' },
  ],
  'rs-w2-d1': [
    { run_id: 'rs-w2-d1', order: '1', label: 'Easy jog',        segment_type: 'timer', distance_label: '5 min',  notes: 'Start slow. Your legs will thank you.',             duration_seconds: '300' },
    { run_id: 'rs-w2-d1', order: '2', label: 'Recovery run',    segment_type: 'tap',   distance_label: '3 mi',   notes: 'Truly easy — zone 1-2 the whole way.',              duration_seconds: '' },
    { run_id: 'rs-w2-d1', order: '3', label: 'Cool-down',       segment_type: 'timer', distance_label: '5 min',  notes: 'Walk and stretch as you cool down.',                duration_seconds: '300' },
  ],
};

// ============================================================
// CONSTANTS
// ============================================================
const CIRCUMFERENCE = 2 * Math.PI * 120; // ≈ 753.98

const TIER_KEY = { 'Beginner': 'beginner_mph', 'Intermediate': 'intermediate_mph', 'Advanced': 'advanced_mph' };
const DAY_ORDER = { 'Monday': 1, 'Tuesday': 2, 'Wednesday': 3, 'Thursday': 4, 'Friday': 5, 'Saturday': 6, 'Sunday': 7 };

const RS_TIER_LABEL        = { '10k': 'Short', 'Half Marathon': 'Moderate', 'Full Marathon': 'Long' };
const RS_TIER_COLOR        = { '10k': '#22c55e', 'Half Marathon': '#52d1f2', 'Full Marathon': '#f97316' };
const RS_TIER_INTERVALS_KEY = { '10k': '10k', 'Half Marathon': 'Half', 'Full Marathon': 'Full' };

const FOUNDATION_TIER_SPEED = {
  'Beginner':     { text: '5 – 10 mph', color: '#22c55e' },
  'Intermediate': { text: '6 – 11 mph', color: '#52d1f2' },
  'Advanced':     { text: '7 – 12 mph', color: '#f97316' },
};

// ============================================================
// STATE
// ============================================================
const state = {
  runs:               [],
  intervals:          {},
  speedTiers:         {},
  foundationTier:     localStorage.getItem('foundationTier') || '',
  runStrongTier:      localStorage.getItem('runStrongTier') || '10k',
  // Timer player
  currentRunId:       null,
  activeIntervals:    [],   // filtered + sorted intervals for current run
  currentIntervalIdx: 0,
  timeRemaining:      0,
  totalElapsed:       0,
  isRunning:          false,
  hasStarted:         false,
  isPaused:           false,
  timerHandle:        null,
  wakeLock:           null,
  // Segment player
  activeSegments:     [],
  currentSegmentIdx:  0,
  segTimeRemaining:   0,
  segTimerHandle:     null,
  segTotalTime:       0,
  segIsPaused:        false,
  runStartTime:       null,
};

// ============================================================
// CSV PARSER
// ============================================================
function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') { current += '"'; i++; }
      else inQuotes = !inQuotes;
    } else if (ch === ',' && !inQuotes) {
      result.push(current); current = '';
    } else {
      current += ch;
    }
  }
  result.push(current);
  return result;
}

function parseCSV(text) {
  const lines = text.trim().split('\n');
  if (lines.length < 2) return [];
  const headers = parseCSVLine(lines[0]).map(h => h.replace(/^"|"$/g, '').trim());
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    const values = parseCSVLine(line);
    const row = {};
    headers.forEach((h, idx) => { row[h] = (values[idx] || '').replace(/^"|"$/g, '').trim(); });
    rows.push(row);
  }
  return rows;
}

// ============================================================
// DATA FETCHING
// ============================================================
function buildSpeedTiersMap(tiersArray) {
  state.speedTiers = {};
  tiersArray.forEach(row => {
    if (row.effort_label) {
      state.speedTiers[row.effort_label] = {
        beginner_mph:     row.beginner_mph,
        intermediate_mph: row.intermediate_mph,
        advanced_mph:     row.advanced_mph,
      };
    }
  });
}

async function fetchData() {
  if (SHEET_ID === 'YOUR_GOOGLE_SHEET_ID_HERE') {
    state.runs = DEMO_RUNS;
    state.intervals = DEMO_INTERVALS;
    buildSpeedTiersMap(DEMO_SPEED_TIERS);
    return { ok: true, demo: true };
  }

  try {
    const [runsRes, intRes, tiersRes] = await Promise.all([
      fetch(RUNS_URL),
      fetch(INTERVALS_URL),
      fetch(SPEED_TIERS_URL).catch(() => null),
    ]);

    if (!runsRes.ok || !intRes.ok) throw new Error('Sheet fetch failed');

    const runsText = await runsRes.text();
    const intText  = await intRes.text();

    state.runs = parseCSV(runsText);

    const allIntervals = parseCSV(intText);
    state.intervals = {};
    allIntervals.forEach(row => {
      const id = row.run_id;
      if (!state.intervals[id]) state.intervals[id] = [];
      state.intervals[id].push(row);
    });
    Object.keys(state.intervals).forEach(id => {
      state.intervals[id].sort((a, b) => parseInt(a.order) - parseInt(b.order));
    });

    if (tiersRes && tiersRes.ok) {
      const tiersText = await tiersRes.text();
      buildSpeedTiersMap(parseCSV(tiersText));
    }

    return { ok: true, demo: false };
  } catch (err) {
    console.error('Data fetch failed:', err);
    return { ok: false, error: err.message };
  }
}

// ============================================================
// ROUTING
// ============================================================
function router() {
  stopTimer();
  stopSegmentTimer();

  const hash = window.location.hash;
  if (hash.startsWith('#/run/')) {
    const id = decodeURIComponent(hash.slice(6));
    const run = state.runs.find(r => r.id === id);
    if (run && run.player_type === 'segment') {
      renderCoachingScreen(id);
    } else {
      renderPlayer(id);
    }
  } else if (hash === '#/program/run-strong') {
    renderRunStrongView();
  } else if (hash === '#/foundation-runs') {
    renderFoundationRunsView();
  } else {
    renderLibrary();
  }
}

function navigate(path) {
  stopTimer();
  stopSegmentTimer();
  removeSwipeLeft();
  releaseWakeLock();
  window.location.hash = path || '';
}

// ============================================================
// SWIPE RIGHT — additional input for both players
// ============================================================
let _swipeAnimating = false;

function initSwipeLeft(handler) {
  removeSwipeLeft();
  let startX = 0, startY = 0;
  function onStart(e) { startX = e.touches[0].clientX; startY = e.touches[0].clientY; }
  function onEnd(e) {
    if (_swipeAnimating) return;
    const dx = e.changedTouches[0].clientX - startX;
    const dy = e.changedTouches[0].clientY - startY;
    if (dx < -60 && Math.abs(dx) > Math.abs(dy)) {
      _swipeAnimating = true;
      animateSwipeLeft(handler, () => { _swipeAnimating = false; });
    }
  }
  document.addEventListener('touchstart', onStart, { passive: true });
  document.addEventListener('touchend',   onEnd,   { passive: true });
  document._swipeStartFn = onStart;
  document._swipeEndFn   = onEnd;
}

function removeSwipeLeft() {
  if (document._swipeStartFn) document.removeEventListener('touchstart', document._swipeStartFn);
  if (document._swipeEndFn)   document.removeEventListener('touchend',   document._swipeEndFn);
  document._swipeStartFn = null;
  document._swipeEndFn   = null;
  _swipeAnimating = false;
}

function animateSwipeLeft(handler, done) {
  const app  = document.getElementById('app');
  const view = app.firstElementChild;
  if (!view) { handler(); done(); return; }

  view.style.transition = 'transform 250ms ease-in-out';
  view.style.transform  = 'translateX(-100%)';

  setTimeout(() => {
    handler();
    const newView = document.getElementById('app').firstElementChild;
    if (newView) {
      newView.style.transition = 'none';
      newView.style.transform  = 'translateX(100%)';
      void newView.getBoundingClientRect();
      newView.style.transition = 'transform 250ms ease-in-out';
      newView.style.transform  = 'translateX(0)';
      setTimeout(done, 250);
    } else {
      done();
    }
  }, 250);
}

// ============================================================
// LIBRARY VIEW
// ============================================================
function renderLibrary() {
  document.getElementById('app').innerHTML = `
    <div class="view-library">
      <header class="library-header">
        <div class="bbc-logo">
          <img src="assets/logo.png" alt="BBC" onerror="logoFallback(this,'logo-placeholder')">
        </div>
        <h1 class="library-title">Big Boy Run Club</h1>
        <p class="library-tagline">Lift heavy. Run hard.</p>
      </header>
      <main class="library-main" id="libraryMain">
        ${renderLibraryContent()}
      </main>
    </div>
  `;
}

function renderLibraryContent() {
  if (!state.runs.length) {
    return `<div class="library-state"><div class="loading-spinner"></div><p>Loading runs…</p></div>`;
  }
  return `
    <div class="program-cards">
      <div class="program-card" onclick="navigate('/foundation-runs')">
        <div class="program-card-image"></div>
        <div class="program-card-body">
          <div class="program-card-label">Program</div>
          <h2 class="program-card-title">Foundation Runs</h2>
          <p class="program-card-desc">Structured treadmill runs for every level. Steady state, speed work, and incline training.</p>
          <div class="program-card-cta">Explore Runs →</div>
        </div>
      </div>
      <div class="program-card" onclick="navigate('/program/run-strong')">
        <div class="program-card-image"></div>
        <div class="program-card-body">
          <div class="program-card-label">Program</div>
          <h2 class="program-card-title">RUN STRONG</h2>
          <p class="program-card-desc">An 8-week training plan built for your goal race. Pick your distance and follow the plan week by week.</p>
          <div class="program-card-cta">Start Program →</div>
        </div>
      </div>
    </div>
  `;
}

function setFoundationTier(tier) {
  state.foundationTier = tier;
  localStorage.setItem('foundationTier', tier);
  renderFoundationRunsView();
}

// ============================================================
// FOUNDATION RUNS VIEW
// ============================================================
function renderFoundationRunsView() {
  const t = state.foundationTier;
  const foundationRuns = state.runs.filter(r => (r.program || '').trim().toUpperCase() === 'FOUNDATION RUNS');

  document.getElementById('app').innerHTML = `
    <div class="view-program">
      <header class="program-header">
        <button class="close-btn" onclick="navigate('')">←</button>
        <h1 class="program-title">Foundation Runs</h1>
        <div class="header-spacer"></div>
      </header>
      <div class="program-tier-row">
        <div class="tier-toggle">
          <button class="tier-btn${t==='Beginner'?' active':''}" onclick="setFoundationTier('Beginner')">Beginner</button>
          <button class="tier-btn${t==='Intermediate'?' active':''}" onclick="setFoundationTier('Intermediate')">Intermediate</button>
          <button class="tier-btn${t==='Advanced'?' active':''}" onclick="setFoundationTier('Advanced')">Advanced</button>
        </div>
      </div>
      <div class="program-content">
        ${t ? renderFoundationCategories(foundationRuns) : `
          <p class="tier-prompt">Choose your level to get started. If you're not sure, start with Beginner.</p>
        `}
      </div>
    </div>
  `;
}

function renderFoundationCategories(runs) {
  const CATEGORIES = [
    { key: 'Steady State', label: 'STEADY STATE' },
    { key: 'Speed Work',   label: 'SPEED WORK'   },
    { key: 'Incline Work', label: 'INCLINE WORK'  },
  ];

  return CATEGORIES.map(({ key, label }) => {
    const catRuns = runs.filter(r => (r.category || '').trim().toLowerCase() === key.toLowerCase());
    let content;
    if (catRuns.length) {
      const speedPill = FOUNDATION_TIER_SPEED[state.foundationTier] || null;
      content = catRuns.map(r => renderRunCard(r, { hideDifficulty: true, speedPill })).join('');
    } else if (key === 'Incline Work') {
      content = `<div class="coming-soon-card">Dedicated incline runs for power and glute strength — coming soon.</div>`;
    } else {
      return '';
    }
    return `
      <div class="foundation-section">
        <div class="foundation-section-header">${label}</div>
        ${content}
      </div>
    `;
  }).join('');
}

function renderRunCard(run, opts = {}) {
  const speedPill = opts.speedPill
    ? `<span class="week-pill" style="border-color:${opts.speedPill.color};color:${opts.speedPill.color}">${opts.speedPill.text}</span>`
    : '';
  return `
    <div class="run-card" onclick="navigate('/run/${run.id}')">
      <div class="run-card-body">
        <div class="run-card-meta">
          ${speedPill}
          ${opts.hideDifficulty ? '' : `<span class="difficulty-badge difficulty-${(run.difficulty || 'easy').toLowerCase()}">${run.difficulty || 'Easy'}</span>`}
          <span class="run-card-duration">${run.total_duration_minutes} min</span>
        </div>
        <h2 class="run-card-title">${run.title}</h2>
        <p class="run-card-desc">${run.description}</p>
      </div>
      <div class="run-card-arrow">›</div>
    </div>
  `;
}

function renderErrorLibrary(message) {
  document.getElementById('app').innerHTML = `
    <div class="view-library">
      <header class="library-header">
        <div class="bbc-logo"><div class="logo-placeholder">B</div></div>
        <h1 class="library-title">Big Boy Run Club</h1>
        <p class="library-tagline">Lift heavy. Run hard.</p>
      </header>
      <main class="library-main">
        <div class="library-state">
          <p><strong>Couldn't load runs.</strong><br>${message}<br><br>Check your Sheet ID in app.js and make sure the sheet is published to the web.</p>
        </div>
      </main>
    </div>
  `;
}

// ============================================================
// RUN STRONG PROGRAM VIEW
// ============================================================
function renderRunStrongView() {
  const t = state.runStrongTier;
  const runStrongRuns = state.runs.filter(r => (r.program || '').trim().toUpperCase() === 'RUN STRONG');

  document.getElementById('app').innerHTML = `
    <div class="view-program">
      <header class="program-header">
        <button class="close-btn" onclick="navigate('')">←</button>
        <h1 class="program-title">RUN STRONG</h1>
        <div class="header-spacer"></div>
      </header>
      <div class="program-tier-row">
        <div class="tier-toggle">
          <button class="tier-btn${t==='10k'?' active':''}" onclick="setRunStrongTier('10k')">Short</button>
          <button class="tier-btn${t==='Half Marathon'?' active':''}" onclick="setRunStrongTier('Half Marathon')">Moderate</button>
          <button class="tier-btn${t==='Full Marathon'?' active':''}" onclick="setRunStrongTier('Full Marathon')">Long</button>
        </div>
        <p class="program-tier-subtitle">Choose based on your weekly mileage goals.</p>
      </div>
      <div class="program-content" id="programContent">
        ${renderRunStrongWeeks(runStrongRuns)}
      </div>
    </div>
  `;
}

function setRunStrongTier(tier) {
  state.runStrongTier = tier;
  localStorage.setItem('runStrongTier', tier);
  renderRunStrongView();
}

function runHasIntervalsForTier(runId, tier) {
  const intervals = state.intervals[runId] || [];
  const hasTierCol = intervals.some(iv => iv.tier && iv.tier.trim() !== '');
  if (!hasTierCol) return true;
  const intervalsTier = RS_TIER_INTERVALS_KEY[tier] || tier;
  return intervals.some(iv => iv.tier.trim() === intervalsTier);
}

function getRunWeek(run) {
  return parseInt(run.week || run.week_number) || 0;
}

function renderRunStrongWeeks(runs) {
  const tier = state.runStrongTier;
  const filteredRuns = runs.filter(run => runHasIntervalsForTier(run.id, tier));

  const weeks = {}, weekOrder = [];
  filteredRuns.forEach(run => {
    const wk = getRunWeek(run);
    if (!weeks[wk]) { weeks[wk] = []; weekOrder.push(wk); }
    weeks[wk].push(run);
  });
  weekOrder.sort((a, b) => a - b);
  weekOrder.forEach(wk => {
    weeks[wk].sort((a, b) => (DAY_ORDER[a.day_recommendation] || 99) - (DAY_ORDER[b.day_recommendation] || 99));
  });

  if (!weekOrder.length) {
    return `<p class="tier-prompt">No runs available for this tier yet.</p>`;
  }

  return weekOrder.map(wk => {
    const weekRuns  = weeks[wk];
    const weekLabel = (weekRuns[0].week_label || '').trim();
    const header    = wk > 0 ? `WEEK ${wk}${weekLabel ? ` — ${weekLabel}` : ''}` : (weekLabel || null);
    return `
      <div class="week-group">
        ${header ? `<div class="week-header">${header}</div>` : ''}
        ${weekRuns.map(renderProgramRunCard).join('')}
      </div>
    `;
  }).join('');
}

function renderProgramRunCard(run) {
  const weekNum  = getRunWeek(run);
  const color    = RS_TIER_COLOR[state.runStrongTier] || '#52d1f2';
  const weekPill = weekNum > 0
    ? `<span class="week-pill" style="border-color:${color};color:${color}">WEEK ${weekNum}</span>`
    : '';
  return `
    <div class="run-card" onclick="navigate('/run/${run.id}')">
      <div class="run-card-body">
        <div class="run-card-meta">
          ${weekPill}
          ${run.day_recommendation ? `<span class="day-badge">${run.day_recommendation}</span>` : ''}
          <span class="run-card-duration">${run.total_duration_minutes} min</span>
        </div>
        <h2 class="run-card-title">${run.title}</h2>
        <p class="run-card-desc">${run.description}</p>
      </div>
      <div class="run-card-arrow">›</div>
    </div>
  `;
}

// ============================================================
// COACHING SCREEN (segment player entry point)
// ============================================================
function renderCoachingScreen(runId) {
  const run = state.runs.find(r => r.id === runId);
  if (!run) { window.location.hash = ''; return; }

  state.currentRunId = runId;

  document.getElementById('app').innerHTML = `
    <div class="view-coaching">
      <button class="coaching-back" onclick="history.back()">←</button>
      <div class="coaching-inner">
        <img src="assets/logo.png" alt="BBC" class="coaching-logo"
             onerror="logoFallback(this,'coaching-logo-placeholder')">
        <h1 class="coaching-title">${run.title}</h1>
        <p class="coaching-cue">${run.coaching_cue || 'You\'ve got this. Let\'s go.'}</p>
      </div>
      <button class="coaching-cta" onclick="startSegmentPlayer()">Let's Go →</button>
    </div>
  `;

  requestWakeLock();
}

// ============================================================
// SEGMENT PLAYER
// ============================================================
function getSegmentsByRunStrongTier(runId) {
  const all = state.intervals[runId] || [];
  const hasTierCol = all.some(iv => iv.tier && iv.tier.trim() !== '');
  if (!hasTierCol) return [...all];
  const intervalsTier = RS_TIER_INTERVALS_KEY[state.runStrongTier] || state.runStrongTier;
  return all
    .filter(iv => iv.tier.trim() === intervalsTier)
    .sort((a, b) => parseInt(a.order) - parseInt(b.order));
}

function startSegmentPlayer() {
  const runId   = state.currentRunId;
  const run     = state.runs.find(r => r.id === runId);
  const segments = getSegmentsByRunStrongTier(runId);

  if (!run || !segments.length) { navigate(''); return; }

  state.activeSegments    = segments;
  state.currentSegmentIdx = 0;
  state.segTimeRemaining  = 0;
  state.segTotalTime      = 0;
  state.segIsPaused       = false;
  state.runStartTime      = Date.now();
  stopSegmentTimer();

  renderSegmentPlayerShell(run);
  tryLockOrientation();
}

function renderSegmentPlayerShell(run) {
  const segments = state.activeSegments;
  const idx      = state.currentSegmentIdx;
  const seg      = segments[idx];
  const nextSeg  = segments[idx + 1] || null;
  const total    = segments.length;
  const topPct   = (idx / total) * 100;
  const ringPct  = Math.round((idx / total) * 100);
  const ringOffset = (CIRCUMFERENCE * (1 - idx / total)).toFixed(2);
  const isTimer  = seg.segment_type === 'timer';

  const distLabel = (seg.distance_label || '').trim();
  const notes     = (seg.notes || '').trim();
  const nextText  = nextSeg ? `Next up: ${nextSeg.label}` : 'Final segment 💪';

  let ringHTML;
  if (isTimer) {
    const dur = parseInt(seg.duration_seconds) || 0;
    ringHTML = `
      <div class="timer-container seg-ring-area" style="pointer-events:none;">
        <svg class="timer-svg" viewBox="0 0 280 280" xmlns="http://www.w3.org/2000/svg">
          <circle class="timer-track" cx="140" cy="140" r="120"/>
          <circle class="timer-progress" cx="140" cy="140" r="120" id="segTimerProgress"
            stroke-dasharray="${CIRCUMFERENCE.toFixed(2)}"
            stroke-dashoffset="0"
            transform="scale(-1 1) translate(-280 0) rotate(-90 140 140)"
          />
        </svg>
        <div class="timer-text">
          <div class="timer-countdown" id="segTimerCountdown">${formatTime(dur)}</div>
        </div>
      </div>
    `;
  } else {
    ringHTML = `
      <div class="timer-container seg-ring-area" style="pointer-events:none;">
        <svg class="timer-svg" viewBox="0 0 280 280" xmlns="http://www.w3.org/2000/svg">
          <circle class="timer-track" cx="140" cy="140" r="120"/>
          <circle class="timer-progress" cx="140" cy="140" r="120"
            stroke-dasharray="${CIRCUMFERENCE.toFixed(2)}"
            stroke-dashoffset="${ringOffset}"
            transform="rotate(-90 140 140)"
          />
        </svg>
        <div class="timer-text">
          <div class="seg-ring-pct">${ringPct}%</div>
        </div>
      </div>
    `;
  }

  document.getElementById('app').innerHTML = `
    <div class="view-segment-player">
      <div class="player-progress-bar">
        <div class="player-progress-fill" style="width:${topPct}%"></div>
      </div>
      <header class="player-header">
        <button class="close-btn" onclick="navigate('')">×</button>
        <h1 class="player-run-title">${run.title}</h1>
        <div class="header-spacer"></div>
      </header>
      <div class="segment-counter">Segment ${idx + 1} of ${total}</div>
      <div class="seg-content">
        ${ringHTML}
        ${distLabel ? `<div class="seg-distance-primary">${distLabel}</div>` : ''}
        <h2 class="seg-label">${seg.label}</h2>
        ${notes ? `<p class="seg-coaching-note">${notes}</p>` : ''}
      </div>
      <div class="seg-controls">
        ${isTimer
          ? `<button class="pause-btn" id="segPauseBtn" onclick="toggleSegPause()" aria-label="Pause">${pauseIcon()}</button>`
          : `<button class="seg-next-btn" onclick="advanceSegment()">Next →</button>`
        }
        <div class="seg-next-up">${nextText}</div>
        <button class="skip-btn" onclick="advanceSegment()">Skip →</button>
      </div>
    </div>
  `;

  if (isTimer) {
    const dur = parseInt(seg.duration_seconds) || 0;
    state.segTimeRemaining = dur;
    state.segIsPaused = false;
    const tp = document.getElementById('segTimerProgress');
    if (tp) {
      tp.style.transition = 'none';
      tp.style.strokeDashoffset = '0';
      void tp.getBoundingClientRect();
      tp.style.transition = 'stroke-dashoffset 0.98s linear';
    }
    state.segTimerHandle = setInterval(segTick, 1000);
  }
  initSwipeLeft(advanceSegment);
}

function segTick() {
  if (state.segIsPaused) return;

  state.segTimeRemaining--;
  state.segTotalTime++;

  const cd = document.getElementById('segTimerCountdown');
  if (cd) cd.textContent = formatTime(state.segTimeRemaining);

  updateSegTimerArc();

  if (state.segTimeRemaining <= 0) {
    stopSegmentTimer();
    playChime();
    advanceSegment();
  }
}

function updateSegTimerArc() {
  const seg = state.activeSegments[state.currentSegmentIdx];
  if (!seg) return;
  const dur = parseInt(seg.duration_seconds) || 1;
  const offset = CIRCUMFERENCE * (1 - state.segTimeRemaining / dur);
  const tp = document.getElementById('segTimerProgress');
  if (tp) tp.style.strokeDashoffset = offset.toFixed(2);
}

function toggleSegPause() {
  state.segIsPaused = !state.segIsPaused;
  const btn = document.getElementById('segPauseBtn');
  if (btn) btn.innerHTML = state.segIsPaused ? playIcon() : pauseIcon();
}

function advanceSegment() {
  const run = state.runs.find(r => r.id === state.currentRunId);
  stopSegmentTimer();

  if (state.currentSegmentIdx >= state.activeSegments.length - 1) {
    showSegmentCompletion();
    return;
  }

  state.currentSegmentIdx++;
  renderSegmentPlayerShell(run);
}

function stopSegmentTimer() {
  if (state.segTimerHandle) {
    clearInterval(state.segTimerHandle);
    state.segTimerHandle = null;
  }
}

// ============================================================
// TIMER PLAYER (Foundation Runs)
// ============================================================

// Returns intervals for a run filtered to the selected Foundation tier (if a tier
// column exists on the data) and sorted by order. Handles runs where all three
// tiers' rows are stored together in the same sheet.
function getIntervalsByTier(runId) {
  const all = state.intervals[runId] || [];
  const hasTierColumn = all.some(iv => iv.tier && iv.tier.trim() !== '');
  if (!hasTierColumn) return all; // no tier data — already sorted by fetchData
  const effectiveTier = state.foundationTier || 'Intermediate';
  return all
    .filter(iv => iv.tier.trim() === effectiveTier)
    .sort((a, b) => parseInt(a.order) - parseInt(b.order));
}

function renderPlayer(runId) {
  const run       = state.runs.find(r => r.id === runId);
  const intervals = getIntervalsByTier(runId);

  if (!run || !intervals.length) {
    window.location.hash = '';
    return;
  }

  state.currentRunId       = runId;
  state.activeIntervals    = intervals;
  state.currentIntervalIdx = 0;
  state.timeRemaining      = parseInt(intervals[0].duration_seconds) || 60;
  state.totalElapsed       = 0;
  state.isRunning          = false;
  state.hasStarted         = false;
  state.isPaused           = false;
  stopTimer();

  const first = intervals[0];
  const next  = intervals[1];

  document.getElementById('app').innerHTML = `
    <div class="view-player">
      <div class="player-progress-bar">
        <div class="player-progress-fill" id="progressFill" style="width:0%"></div>
      </div>
      <header class="player-header">
        <button class="close-btn" onclick="navigate('')">×</button>
        <h1 class="player-run-title">${run.title}</h1>
        <div class="header-spacer"></div>
      </header>
      <div class="player-content">
        <div class="timer-container" id="timerContainer" onclick="handleTimerTap()">
          <svg class="timer-svg" viewBox="0 0 280 280" xmlns="http://www.w3.org/2000/svg">
            <circle class="timer-track"    cx="140" cy="140" r="120" />
            <circle class="timer-fill"     cx="140" cy="140" r="120" id="timerFill" />
            <circle class="timer-progress" cx="140" cy="140" r="120" id="timerProgress"
              stroke-dasharray="${CIRCUMFERENCE.toFixed(2)}"
              stroke-dashoffset="${CIRCUMFERENCE.toFixed(2)}"
              transform="scale(-1 1) translate(-280 0) rotate(-90 140 140)"
            />
          </svg>
          <div class="timer-text" id="timerText">
            <div class="timer-press-label" id="timerPressLabel">Press to Start</div>
            <div class="timer-sub-label"   id="timerSubLabel">${formatIntervalLabel(first)}&nbsp;—&nbsp;${formatDuration(parseInt(first.duration_seconds) || 0)}</div>
          </div>
        </div>
        <div class="interval-label" id="intervalLabel">${formatIntervalLabel(first)}</div>
        <button class="pause-btn" id="pauseBtn" onclick="togglePause()" style="display:none" aria-label="Pause">
          ${pauseIcon()}
        </button>
        <div class="next-up-card">
          <div class="next-up-label">Next Up</div>
          <div class="next-up-content" id="nextUpContent">${nextUpText(next)}</div>
        </div>
        <button class="skip-btn" onclick="skipInterval()">Skip →</button>
      </div>
    </div>
  `;

  requestWakeLock();
  tryLockOrientation();
  initSwipeLeft(skipInterval);
}

function handleTimerTap() {
  if (!state.hasStarted) startRun();
}

function startRun() {
  state.hasStarted  = true;
  state.isRunning   = true;
  state.isPaused    = false;
  state.runStartTime = Date.now();

  document.getElementById('timerFill').classList.add('faded');

  const tp = document.getElementById('timerProgress');
  tp.style.transition = 'none';
  tp.style.strokeDashoffset = '0';
  void tp.getBoundingClientRect();
  tp.style.transition = 'stroke-dashoffset 0.98s linear';

  document.getElementById('timerText').innerHTML = `
    <div class="timer-countdown" id="timerCountdown">${formatTime(state.timeRemaining)}</div>
  `;
  document.getElementById('pauseBtn').style.display = 'flex';

  state.timerHandle = setInterval(tick, 1000);
}

function tick() {
  if (state.isPaused) return;

  state.timeRemaining--;
  state.totalElapsed++;

  const cd = document.getElementById('timerCountdown');
  if (cd) cd.textContent = formatTime(state.timeRemaining);

  updateTimerArc();
  updateProgressBar();

  if (state.timeRemaining <= 0) advanceInterval();
}

function updateTimerArc() {
  const intervals = state.activeIntervals;
  const interval  = intervals[state.currentIntervalIdx];
  const total     = parseInt(interval.duration_seconds) || 1;
  const offset    = CIRCUMFERENCE * (1 - state.timeRemaining / total);
  const tp = document.getElementById('timerProgress');
  if (tp) tp.style.strokeDashoffset = offset.toFixed(2);
}

function updateProgressBar() {
  const total = state.activeIntervals.length;
  const pct   = (state.currentIntervalIdx / total) * 100;
  const fill  = document.getElementById('progressFill');
  if (fill) fill.style.width = `${pct}%`;
}

function togglePause() {
  if (!state.hasStarted) return;
  state.isPaused  = !state.isPaused;
  state.isRunning = !state.isPaused;
  const btn = document.getElementById('pauseBtn');
  if (btn) btn.innerHTML = state.isPaused ? playIcon() : pauseIcon();
}

function skipInterval() {
  if (!state.hasStarted) { startRun(); return; }
  if (state.isPaused) {
    state.isPaused  = false;
    state.isRunning = true;
    const btn = document.getElementById('pauseBtn');
    if (btn) btn.innerHTML = pauseIcon();
  }
  advanceInterval();
}

function advanceInterval() {
  const intervals = state.activeIntervals;

  if (state.currentIntervalIdx >= intervals.length - 1) {
    stopTimer();
    showCompletion();
    return;
  }

  playChime();

  state.currentIntervalIdx++;
  const newInterval = intervals[state.currentIntervalIdx];
  state.timeRemaining = parseInt(newInterval.duration_seconds) || 60;

  const tp = document.getElementById('timerProgress');
  if (tp) {
    tp.style.transition = 'none';
    tp.style.strokeDashoffset = '0';
    void tp.getBoundingClientRect();
    tp.style.transition = 'stroke-dashoffset 0.98s linear';
  }

  const cd = document.getElementById('timerCountdown');
  if (cd) cd.textContent = formatTime(state.timeRemaining);

  const label = document.getElementById('intervalLabel');
  if (label) label.textContent = formatIntervalLabel(newInterval);

  const nextUp = document.getElementById('nextUpContent');
  if (nextUp) nextUp.textContent = nextUpText(intervals[state.currentIntervalIdx + 1]);

  updateProgressBar();
}

function stopTimer() {
  if (state.timerHandle) {
    clearInterval(state.timerHandle);
    state.timerHandle = null;
  }
  state.isRunning = false;
}

// ============================================================
// COMPLETION
// ============================================================
function showCompletion() {
  removeSwipeLeft();
  releaseWakeLock();
  const run       = state.runs.find(r => r.id === state.currentRunId);
  const intervals = state.activeIntervals;

  const tierKey = TIER_KEY[state.foundationTier] || 'intermediate_mph';
  const totalDist = intervals.reduce((sum, iv) => {
    let mph = parseFloat(iv.speed_mph) || 0;
    // Try notes field first (effort_label), then speed_label, for speed_tiers lookup
    if (!mph) {
      const lookupKey = (iv.notes && state.speedTiers[iv.notes]) ? iv.notes
                      : (iv.speed_label && state.speedTiers[iv.speed_label]) ? iv.speed_label
                      : null;
      if (lookupKey) mph = parseFloat(state.speedTiers[lookupKey][tierKey]) || 0;
    }
    return sum + mph * ((parseInt(iv.duration_seconds) || 0) / 3600);
  }, 0);

  const elapsed = state.runStartTime ? Math.round((Date.now() - state.runStartTime) / 1000) : state.totalElapsed;
  renderCompletionScreen(run, elapsed, intervals.length, totalDist);
}

function showSegmentCompletion() {
  removeSwipeLeft();
  releaseWakeLock();
  const run      = state.runs.find(r => r.id === state.currentRunId);
  const segments = state.activeSegments;

  let totalDist = 0;
  let hasMiDistance = false;
  segments.forEach(seg => {
    const dl = (seg.distance_label || '').trim();
    if (/\d+\.?\d*\s*mi$/i.test(dl)) {
      const n = parseFloat(dl);
      if (!isNaN(n)) { totalDist += n; hasMiDistance = true; }
    }
  });

  const elapsed = state.runStartTime ? Math.round((Date.now() - state.runStartTime) / 1000) : state.segTotalTime;
  renderCompletionScreen(run, elapsed, segments.length, hasMiDistance ? totalDist : null);
}

function renderCompletionScreen(run, elapsed, segCount, totalDist) {
  // totalDist is null when no mi-labelled segments exist
  const distDisplay = totalDist !== null ? `${totalDist.toFixed(2)} mi` : '—';
  const comparison  = totalDist !== null ? getDistanceComparison(totalDist) : 'You showed up. That\'s everything.';

  document.getElementById('app').innerHTML = `
    <div class="view-completion">
      <div class="completion-inner">
        <div class="completion-logo-block">
          <img src="assets/logo.png" alt="Big Boy Club" class="completion-logo-img">
          <div class="completion-club-label">Run Club</div>
        </div>
        <h1 class="completion-heading">🏁 Run Complete!</h1>
        <div class="completion-card">
          <div class="stat-row">
            <span class="stat-label">Run</span>
            <span class="stat-value">${run.title}</span>
          </div>
          <div class="stat-row">
            <span class="stat-label">Time</span>
            <span class="stat-value">${formatTime(elapsed)}</span>
          </div>
          <div class="stat-row">
            <span class="stat-label">Segments</span>
            <span class="stat-value">${segCount}</span>
          </div>
          <div class="stat-row">
            <span class="stat-label">Distance</span>
            <span class="stat-value">${distDisplay}</span>
          </div>
        </div>
        <div class="comparison-block">
          <p class="comparison-text">${comparison}</p>
        </div>
        <button class="back-btn" onclick="navigate('')">Back to Runs</button>
      </div>
    </div>
  `;
}

// ============================================================
// DISTANCE COMPARISONS
// ============================================================
const DISTANCE_REFS = [
  { unit: 0.1146,  fn: (n) => `That's ${n} Space Needles laid end to end. Towering effort.` },
  { unit: 0.0568,  fn: (n) => `That's ${n} football fields end to end. Unstoppable.` },
  { unit: 0.2053,  fn: (n) => `You covered ${n} Eiffel Towers tipped sideways. Très fort.` },
  { unit: 0.0578,  fn: (n) => `That's the height of ${n} Statues of Liberty, laid flat. Iconic.` },
  { unit: 0.05,    fn: (n) => `You just ran ${n} NYC city blocks. Stack 'em.` },
  { unit: 0.275,   fn: (n) => `That's ${n} Empire State Buildings on their side. Big energy.` },
  { unit: 1.134,   fn: (n) => `You crossed ${n === 1 ? 'the' : n} Brooklyn Bridge${n === 1 ? '' : 's'}. Legendary.` },
  { unit: 1.7,     fn: (n) => `That's ${n === 1 ? 'the entire' : n} Golden Gate Bridge${n === 1 ? '' : 's'}. West Coast proud.` },
  { unit: 2.5,     fn: (n) => `${n === 1 ? 'The full length of Central Park' : `${n} lengths of Central Park`}. That's a real one.` },
  { unit: 0.031,   fn: (n) => `${n} Olympic swimming pools back to back. Make a splash.` },
  { unit: 3.1,     fn: (n) => n === 1 ? `That's a full 5K — without a race bib. FLEX.` : `${n}× the length of a 5K. Absolute unit.` },
  { unit: 6.2,     fn: (n) => n === 1 ? `A complete 10K. You are a beast.` : `${n}× the length of a 10K. Certified machine.` },
];

function getDistanceComparison(miles) {
  if (miles <= 0) return 'You showed up. That\'s everything.';
  let best = null, bestScore = Infinity;
  DISTANCE_REFS.forEach(ref => {
    const rawCount = miles / ref.unit;
    const rounded  = Math.round(rawCount);
    if (rounded < 1) return;
    const score = Math.abs(Math.log(rawCount / 18));
    if (score < bestScore) { bestScore = score; best = { ref, count: rounded }; }
  });
  if (!best) return `You crushed ${miles.toFixed(2)} miles. Full stop.`;
  return best.ref.fn(best.count);
}

// ============================================================
// AUDIO
// ============================================================
function playChime() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const masterGain = ctx.createGain();
    masterGain.connect(ctx.destination);
    masterGain.gain.setValueAtTime(0.4, ctx.currentTime);
    [{ freq: 880, start: 0, dur: 0.35 }, { freq: 1100, start: 0.18, dur: 0.35 }, { freq: 1320, start: 0.36, dur: 0.5 }].forEach(({ freq, start, dur }) => {
      const osc = ctx.createOscillator(), gain = ctx.createGain();
      osc.connect(gain); gain.connect(masterGain);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + start);
      gain.gain.setValueAtTime(0, ctx.currentTime + start);
      gain.gain.linearRampToValueAtTime(1, ctx.currentTime + start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + start + dur);
      osc.start(ctx.currentTime + start);
      osc.stop(ctx.currentTime + start + dur);
    });
    setTimeout(() => ctx.close(), 1500);
  } catch (_) {}
}

// ============================================================
// WAKE LOCK
// ============================================================
async function requestWakeLock() {
  try {
    if ('wakeLock' in navigator) state.wakeLock = await navigator.wakeLock.request('screen');
  } catch (_) {}
}

async function releaseWakeLock() {
  try {
    if (state.wakeLock) { await state.wakeLock.release(); state.wakeLock = null; }
  } catch (_) {}
}

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible' && state.isRunning && !state.wakeLock) requestWakeLock();
});

// ============================================================
// ORIENTATION LOCK
// ============================================================
function tryLockOrientation() {
  try {
    if (screen.orientation && screen.orientation.lock) screen.orientation.lock('portrait').catch(() => {});
  } catch (_) {}
}

// ============================================================
// FORMATTING HELPERS
// ============================================================
function formatIntervalLabel(interval) {
  const name = interval.label || '';
  let speed = '';

  // notes field holds the effort_label in the sheet (e.g. "Easy Jog");
  // speed_label is checked as fallback for older data layouts.
  const lookupKey = (interval.notes && state.speedTiers[interval.notes]) ? interval.notes
                  : (interval.speed_label && state.speedTiers[interval.speed_label]) ? interval.speed_label
                  : null;

  if (lookupKey) {
    const key = TIER_KEY[state.foundationTier] || 'intermediate_mph';
    const mph = state.speedTiers[lookupKey][key];
    if (mph) speed = `${mph} mph`;
  } else if (interval.speed_mph) {
    speed = `${interval.speed_mph} mph`;
  }

  const incline = interval.incline_pct && interval.incline_pct !== '' ? `/ ${interval.incline_pct}%` : '';
  const details = [speed, incline].filter(Boolean).join(' ');
  if (name && details) return `${name} — ${details}`;
  return name || details;
}

function formatTime(secs) {
  const s = Math.max(0, secs);
  const m = Math.floor(s / 60);
  return `${String(m).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
}

function formatDuration(secs) {
  const m = Math.floor(secs / 60), s = secs % 60;
  if (m === 0) return `${s}s`;
  if (s === 0) return `${m}m`;
  return `${m}m ${s}s`;
}

function nextUpText(nextInterval) {
  if (!nextInterval) return 'Final push 💪';
  return `${formatIntervalLabel(nextInterval)} · ${formatDuration(parseInt(nextInterval.duration_seconds) || 0)}`;
}

function pauseIcon() {
  return `<svg class="pause-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>`;
}

function playIcon() {
  return `<svg class="pause-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="5,3 20,12 5,21"/></svg>`;
}

// ============================================================
// LOGO FALLBACK — avoids nested-quote issues in onerror attrs
// ============================================================
function logoFallback(el, className) {
  const div = document.createElement('div');
  div.className = className;
  div.textContent = 'B';
  el.parentNode.replaceChild(div, el);
}

// ============================================================
// INIT
// ============================================================
async function init() {
  window.addEventListener('hashchange', router);
  const result = await fetchData();
  if (!result.ok) { renderErrorLibrary(result.error || 'Unknown error'); return; }
  router();
}

document.addEventListener('DOMContentLoaded', init);
