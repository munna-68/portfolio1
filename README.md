# Marimba Designs — Awwwards Dev Portfolio

A scroll-driven, single-page portfolio inspired by Awwwards-tier agency sites.
The hero text, sticky video frame, project info panels, and backlight are all
choreographed with a single GSAP `ScrollTrigger` master timeline.

## Stack

- **Vite 5** + **React 18**
- **Tailwind CSS 3** (PostCSS pipeline)
- **GSAP 3.12** + **ScrollTrigger** (npm, tree-shaken)
- **Google Fonts**: Cormorant Garamond, Plus Jakarta Sans, Space Mono
- No state management, no router — single screen, refs are enough.

## Run

```bash
npm install
npm run dev          # http://127.0.0.1:5173 — HMR
npm run build        # production bundle in dist/
npm run preview      # serve the built bundle
```

## Project layout

```
.
├── index.html              # Vite entry (just a <div id="root">)
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── .gitignore
├── README.md
└── src/
    ├── main.jsx            # React 18 createRoot
    ├── App.jsx             # Composition root
    ├── index.css           # Tailwind directives + global styles
    ├── components/
    │   ├── BackgroundDecor.jsx   # Column lines + dynamic glow
    │   ├── CustomCursor.jsx      # Fine-pointer-only fluid cursor
    │   ├── Header.jsx            # Top nav
    │   ├── MediaStage.jsx        # 4 video slides
    │   └── InfoPanels.jsx        # 4 project panels + CTAs
    ├── data/
    │   ├── projects.js     # 4 project entries (title, cta, scope, …)
    │   └── slides.js       # 4 slide overlays + labels
    └── hooks/
        └── useScrollTimeline.js  # Master GSAP timeline (mounted once)
```

## How it works

`useScrollTimeline()` (in `src/hooks/useScrollTimeline.js`) wraps the entire
GSAP setup in `gsap.context(...)` and returns `ctx.revert()` from the effect
cleanup, so every tween + every `ScrollTrigger` is torn down on unmount or
StrictMode double-mount.

The timeline is split into four labels — `morphStart` → `project2` →
`project3` → `explore` — that map to four sections of the 800vh scroll
distance:

1. **Morph start** — hero text scales/fades, nav slides up, video frame snaps
   from a centered wide card to a 1:1 dock on the left, project 01 panel
   slides in on the right.
2. **Project 02** — panel 01 exits, video 02 reveals via `clip-path: inset()`,
   scale "spring" bump, panel 02 enters.
3. **Project 03** — same rhythm, panel/video 03.
4. **Explore** — video frame morphs to a circle, the "Explore Ecosystem"
   overlay + terminal-style CTA reveal.

All motion is driven by `scrub: 2.5` for a heavy, buttery inertia feel.

## Videos

The original design references a local file (`69de95cf6267f600255573_2.mp4`).
Each `<video>` element falls back through a list of `<source>` tags:

1. A public Pexels stock video (works out of the box)
2. The original local file (drop it in the project root to use it instead)

The four slides reuse the same source but are differentiated with mix-blend
overlays (sky / emerald / stone) so each project reads as visually distinct.
See `src/data/slides.js`.

## Tailwind tokens

`src/tailwind.config.js` extends the theme with:

- `colors.cream` → `#f3f1eb` (background)
- `colors.ink` → `#2e3326` (foreground)
- `fontFamily.serif` / `mono` / `sans` matching the Google Fonts stack

Use them as `bg-cream`, `text-ink/80`, `font-serif`, etc. throughout the app.
