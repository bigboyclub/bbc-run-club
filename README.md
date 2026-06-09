# Big Boy Run Club — run.bigboyclub.co

Mobile-optimized treadmill run player for the BBC community.

---

## Quick Start

1. Drop your `logo.png` into the `assets/` folder
2. Set up your Google Sheet (instructions below)
3. Paste your Sheet ID into `app.js`
4. Deploy to Netlify / Vercel / GitHub Pages

---

## Google Sheet Setup

### 1. Create the Sheet

Create a new Google Sheet with **two tabs** named exactly:
- `runs`
- `intervals`

### Sheet 1 — `runs`

| Column | Example |
|--------|---------|
| `id` | `tempo-20` (URL-safe slug, no spaces) |
| `title` | `Tempo 20` |
| `description` | `A 20-minute progressive tempo run` |
| `total_duration_minutes` | `20` |
| `difficulty` | `Easy` / `Moderate` / `Hard` |

### Sheet 2 — `intervals`

| Column | Example | Notes |
|--------|---------|-------|
| `run_id` | `tempo-20` | Must match `id` from runs sheet |
| `order` | `1` | Integer, 1-based, determines playback order |
| `label` | `Tempo` or `7.5 mph` | Displayed on screen during interval |
| `speed_mph` | `7.5` | Used to calculate distance |
| `incline_pct` | `1` | Optional — leave blank if flat |
| `duration_seconds` | `180` | How long this interval lasts |

### 2. Publish the Sheet as CSV

For **each tab** (runs and intervals):

1. Go to **File → Share → Publish to web**
2. In the first dropdown, select the tab name (`runs` or `intervals`)
3. In the second dropdown, select **Comma-separated values (.csv)**
4. Click **Publish** and confirm

You only need one **Sheet ID** — it's in the URL:
```
https://docs.google.com/spreadsheets/d/THIS_IS_YOUR_SHEET_ID/edit
```

### 3. Paste the Sheet ID into app.js

Open `app.js` and find line 4:

```js
const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID_HERE';
```

Replace `YOUR_GOOGLE_SHEET_ID_HERE` with your actual Sheet ID. The app will automatically build the CSV URLs for both tabs.

> **CORS note:** Google Sheets published CSV files support cross-origin requests. If you see fetch errors, double-check that you've clicked "Publish" (not just shared the link) for each tab.

---

## Swapping in the Logo

1. Export your logo as `logo.png` (recommended: 200×200px or larger, transparent background)
2. Place it at `assets/logo.png`

The logo appears:
- In the library header (small, square with rounded corners)
- On the completion screen (centered, prominent)

If the file is missing, the app falls back to a styled placeholder — so missing logo won't break anything.

---

## Demo Mode

If `SHEET_ID` is left as `'YOUR_GOOGLE_SHEET_ID_HERE'`, the app loads 4 built-in demo runs so you can test the full flow immediately without a sheet.

---

## Deployment

### Netlify / Vercel

1. Push this folder to a GitHub repo
2. Connect the repo to Netlify or Vercel
3. No build command needed — it's static HTML/CSS/JS
4. Set your custom domain (`run.bigboyclub.co`) in the platform settings

### GitHub Pages

1. Push to a GitHub repo
2. Go to **Settings → Pages**
3. Set source to `main` branch, `/ (root)` folder
4. Custom domain: add `run.bigboyclub.co` in Pages settings and update your DNS CNAME

### Manual / Any Static Host

Upload `index.html`, `style.css`, `app.js`, and the `assets/` folder to any static file host.

---

## File Structure

```
bbc-run-club/
├── index.html       # App shell, meta tags, font imports
├── style.css        # All styles — mobile-first, dark navy + cyan
├── app.js           # All logic — routing, timer, audio, data
├── assets/
│   └── logo.png     # Your BBC logo (add this file)
└── README.md
```

---

## Features

- **Library** — pulls runs from Google Sheets, hash-based routing
- **Run Player** — animated SVG circle timer, pause/resume, interval auto-advance
- **Chime** — three-note ascending chime via Web Audio API (no audio files needed)
- **Wake Lock** — prevents screen sleep during active runs (iOS 16.4+, Chrome)
- **Completion Screen** — stats + fun distance comparison, designed to be screenshotted
- **Demo mode** — 4 sample runs load automatically when no Sheet ID is set
