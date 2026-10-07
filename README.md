# anilg12.github.io

Personal portfolio of **Anıl Gül** — systems & software engineer. Live at **https://anilg12.github.io**.

The site is a scroll-driven tour through a computer, from the silicon up: a procedural CPU and motherboard rendered in WebGL, the hardware-to-microservice stack, skills, projects, verified certificates and an interactive terminal. Turkish and English.

## Stack

React 19 · Vite · Tailwind CSS 4 · Motion · Three.js (React Three Fiber, drei, postprocessing) · Lenis

## Run locally

```bash
npm install
npm run dev
```

`npm run build` writes the static site to `dist/`. Every push to `main` builds and deploys it to GitHub Pages through `.github/workflows/deploy.yml`.

## Layout

- `src/data/content.js` — all copy (TR/EN), projects, skills and certificates
- `src/components/` — page sections; `src/components/scene/` — the 3D chip, board and procedural textures
- `public/` — media, CVs (`CV_Anil_Gul_TR.pdf`, `CV_Anil_Gul_EN.pdf`) and certificate PDFs
