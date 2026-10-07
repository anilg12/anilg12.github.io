import * as THREE from 'three'

/* All surface detail is drawn procedurally on canvases: no image downloads, crisp at any zoom. */

const DISPLAY = '"Archivo", "Arial Black", sans-serif'
const MONO = '"IBM Plex Mono", Consolas, monospace'

function mulberry32(seed) {
  let s = seed >>> 0
  return () => {
    s = (s + 0x6d2b79f5) >>> 0
    let t = s
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function canvasTexture(size, draw, { srgb = true, aniso = 8 } = {}) {
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  const g = canvas.getContext('2d')
  draw(g, size)
  const tex = new THREE.CanvasTexture(canvas)
  if (srgb) tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = aniso
  // Fonts may still be loading: redraw once they are ready.
  if (document.fonts?.ready) {
    document.fonts.ready.then(() => {
      g.clearRect(0, 0, size, size)
      draw(g, size)
      tex.needsUpdate = true
    })
  }
  return tex
}

/* Language-aware canvas: draw(g, size, lang) runs again whenever the site language changes.
   Fonts are requested with the exact glyphs first, so Turkish letters render in the same faces. */
function langCanvasTexture(size, draw, sample) {
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = typeof sample === 'number' ? sample : size
  const g = canvas.getContext('2d')
  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = 8
  let current = 'tr'
  const paint = () => {
    g.clearRect(0, 0, canvas.width, canvas.height)
    draw(g, canvas.width, current, canvas.height)
    tex.needsUpdate = true
  }
  const setLang = (lang) => {
    current = lang
    paint()
    const glyphs = 'ANIL GÜL İŞĞÜÇÖ ışğüçö →·&'
    const loads = [`800 128px "Archivo"`, `500 40px "IBM Plex Mono"`, `600 40px "IBM Plex Mono"`].map((f) => document.fonts?.load(f, glyphs))
    Promise.all(loads).then(paint).catch(() => {})
    document.fonts?.ready.then(paint)
  }
  setLang(current)
  return { tex, setLang }
}

const IHS_COPY = {
  tr: {
    role: 'SİSTEM & YAZILIM MÜHENDİSİ',
    motto: 'DONANIMDAN → MİKROSERVİSE',
    edu: 'KAPADOKYA ÜNİ. · YBS · 2026',
    stack: 'C++ · JAVA · PYTHON · .NET',
    certs: 'CISCO NETACAD · CRTOM',
    base: 'MALATYA, TÜRKİYE',
  },
  en: {
    role: 'SYSTEMS & SOFTWARE ENGINEER',
    motto: 'BARE-METAL → MICROSERVICES',
    edu: 'KAPADOKYA UNIV. · MIS · 2026',
    stack: 'C++ · JAVA · PYTHON · .NET',
    certs: 'CISCO NETACAD · CRTOM',
    base: 'BASED IN MALATYA, TR',
  },
}

/* ---------- Integrated heat spreader: brushed metal with laser engraving ---------- */
export function makeIhsTexture() {
  return langCanvasTexture(1024, (g, S, lang) => {
    const copy = IHS_COPY[lang] || IHS_COPY.en
    const rand = mulberry32(11)
    g.fillStyle = '#f1ede7'
    g.fillRect(0, 0, S, S)
    // brushing
    for (let i = 0; i < 3200; i++) {
      const y = rand() * S
      const shade = rand() < 0.5 ? '255,255,255' : '120,114,106'
      g.fillStyle = `rgba(${shade},${0.025 + rand() * 0.03})`
      g.fillRect(0, y, S, 1 + rand())
    }
    const ink = '#77726b'
    g.fillStyle = ink
    g.textBaseline = 'alphabetic'
    try { g.fontStretch = 'expanded' } catch { /* older canvas */ }
    g.font = `800 128px ${DISPLAY}`
    g.fillText('ANIL GÜL', 92, 292)
    try { g.fontStretch = 'normal' } catch { /* older canvas */ }
    g.font = `500 40px ${MONO}`
    g.fillText(copy.role, 96, 384)
    g.fillText(copy.motto, 96, 440)
    g.fillText(copy.edu, 96, 496)
    // 2D data-matrix
    const cell = 12
    const ox = 96
    const oy = 650
    for (let y = 0; y < 18; y++) {
      for (let x = 0; x < 18; x++) {
        const edge = x === 0 || y === 17
        const clock = (y === 0 && x % 2 === 0) || (x === 17 && y % 2 === 1)
        if (edge || clock || (x > 0 && y < 17 && rand() < 0.48)) g.fillRect(ox + x * cell, oy + y * cell, cell - 1, cell - 1)
      }
    }
    g.font = `500 34px ${MONO}`
    g.fillText(copy.stack, 360, 708)
    g.fillText(copy.certs, 360, 760)
    g.fillText(copy.base, 360, 812)
    // pin-1 marker
    g.beginPath()
    g.moveTo(40, 986)
    g.lineTo(104, 986)
    g.lineTo(40, 922)
    g.closePath()
    g.fill()
  })
}

/* ---------- Silicon die: eight cores, shared L3, IO ring ---------- */
export const DIE_SIZE = 2048
const M = 150
const GAP = 40
const CORE_W = (DIE_SIZE - 2 * M - 3 * GAP) / 4
const CORE_H = 640
const TOP_Y = 170
const L3_Y = TOP_Y + CORE_H + GAP
const L3_H = 348
const BOT_Y = L3_Y + L3_H + GAP

export const CORE_LABELS = ['C++', 'JAVA', 'PYTHON', '.NET', 'LINUX', 'POWERSHELL', 'NTLITE', 'CISCO IOS']

export const DIE_REGIONS = [
  ...Array.from({ length: 8 }, (_, i) => ({
    x: M + (i % 4) * (CORE_W + GAP),
    y: i < 4 ? TOP_Y : BOT_Y,
    w: CORE_W,
    h: CORE_H,
  })),
  { x: M, y: L3_Y, w: DIE_SIZE - 2 * M, h: L3_H }, // index 8: L3
]

function drawCoreDetail(g, r, rand, glow) {
  const stroke = (x, y, w, h, lw) => {
    g.lineWidth = lw
    g.strokeRect(x, y, w, h)
  }
  // L2 slab with stripes
  const l2h = r.h * 0.24
  if (glow) {
    stroke(r.x + 18, r.y + 18, r.w - 36, l2h, 3)
  } else {
    for (let y = 0; y < l2h; y += 7) {
      g.fillStyle = (y / 7) % 2 ? '#1d1a2c' : '#16202b'
      g.fillRect(r.x + 18, r.y + 18 + y, r.w - 36, 6)
    }
  }
  // functional blocks
  const cols = 3
  const rows = 4
  const bx = r.x + 18
  const by = r.y + 36 + l2h
  const bw = (r.w - 36 - (cols - 1) * 10) / cols
  const bh = (r.h - l2h - 120 - (rows - 1) * 10) / rows
  const tones = ['#1b1830', '#162231', '#221a27', '#19241f', '#1f1d2e']
  for (let yy = 0; yy < rows; yy++) {
    for (let xx = 0; xx < cols; xx++) {
      const x = bx + xx * (bw + 10)
      const y = by + yy * (bh + 10)
      if (glow) {
        if (rand() < 0.55) stroke(x, y, bw, bh, 2)
        continue
      }
      g.fillStyle = tones[Math.floor(rand() * tones.length)]
      g.fillRect(x, y, bw, bh)
      if (rand() < 0.5) {
        g.fillStyle = 'rgba(255,255,255,0.035)'
        for (let s = 0; s < bw; s += 5) g.fillRect(x + s, y, 2, bh)
      }
    }
  }
}

export function makeDieTextures() {
  const label = (g, i, r, color) => {
    g.fillStyle = color
    g.font = `600 34px ${MONO}`
    g.fillText(`C${i}`, r.x + 22, r.y + r.h - 34)
    g.font = `600 30px ${MONO}`
    g.fillText(CORE_LABELS[i], r.x + 92, r.y + r.h - 34)
  }

  const map = canvasTexture(DIE_SIZE, (g, S) => {
    const rand = mulberry32(5)
    g.fillStyle = '#0d0c12'
    g.fillRect(0, 0, S, S)
    // IO pad ring
    g.fillStyle = '#3d3427'
    for (let p = 70; p < S - 70; p += 26) {
      g.fillRect(p, 40, 14, 60)
      g.fillRect(p, S - 100, 14, 60)
      g.fillRect(40, p, 60, 14)
      g.fillRect(S - 100, p, 60, 14)
    }
    DIE_REGIONS.slice(0, 8).forEach((r) => {
      g.fillStyle = '#131220'
      g.fillRect(r.x, r.y, r.w, r.h)
      drawCoreDetail(g, r, rand, false)
    })
    // shared L3
    const l3 = DIE_REGIONS[8]
    for (let x = 0; x < l3.w; x += 7) {
      const slice = Math.floor(x / (l3.w / 8))
      const inGap = x % Math.floor(l3.w / 8) < 10
      if (inGap) continue
      g.fillStyle = (x / 7 + slice) % 2 ? '#1a1724' : '#211d2d'
      g.fillRect(l3.x + x, l3.y + 20, 6, l3.h - 90)
    }
    g.fillStyle = 'rgba(214,202,184,0.7)'
    g.font = `600 30px ${MONO}`
    g.fillText('IMC', 52, TOP_Y - 60)
    g.fillText('PCIe 5.0', S - 230, TOP_Y - 60)
    g.font = `500 22px ${MONO}`
    g.fillStyle = 'rgba(214,202,184,0.5)'
    g.fillText('ANIL GÜL · 2026', S - 330, S - 120)
  })

  const glow = canvasTexture(
    DIE_SIZE,
    (g, S) => {
      const rand = mulberry32(5)
      g.fillStyle = '#000'
      g.fillRect(0, 0, S, S)
      g.strokeStyle = '#fff'
      DIE_REGIONS.slice(0, 8).forEach((r, i) => {
        g.lineWidth = 5
        g.strokeRect(r.x + 3, r.y + 3, r.w - 6, r.h - 6)
        drawCoreDetail(g, r, rand, true)
        label(g, i, r, '#fff')
      })
      const l3 = DIE_REGIONS[8]
      g.lineWidth = 4
      g.strokeRect(l3.x + 3, l3.y + 3, l3.w - 6, l3.h - 6)
      for (let k = 1; k < 8; k++) {
        const x = l3.x + (l3.w / 8) * k
        g.beginPath()
        g.moveTo(x, l3.y + 20)
        g.lineTo(x, l3.y + l3.h - 70)
        g.stroke()
      }
      g.fillStyle = '#fff'
      g.font = `600 30px ${MONO}`
      g.fillText('L3 · SHARED CACHE · 32 MB', l3.x + 22, l3.y + l3.h - 30)
    },
    { srgb: false },
  )
  return { map, glow }
}

/* ---------- Package substrate: dark laminate with pad rows and fine routing ---------- */
export function makeSubstrateTexture() {
  return canvasTexture(1024, (g, S) => {
    const rand = mulberry32(17)
    g.fillStyle = '#0c1411'
    g.fillRect(0, 0, S, S)
    // fine routing
    g.strokeStyle = 'rgba(120,150,130,0.10)'
    g.lineWidth = 2
    for (let i = 0; i < 140; i++) {
      let x = rand() * S
      let y = rand() * S
      g.beginPath()
      g.moveTo(x, y)
      for (let s = 0; s < 3; s++) {
        const horizontal = rand() < 0.5
        const len = 30 + rand() * 160
        if (horizontal) x += rand() < 0.5 ? len : -len
        else y += rand() < 0.5 ? len : -len
        g.lineTo(x, y)
      }
      g.stroke()
    }
    // pad rows around the die area
    g.fillStyle = 'rgba(201,164,92,0.55)'
    for (let p = 230; p < S - 230; p += 18) {
      g.fillRect(p, 236, 8, 8)
      g.fillRect(p, S - 244, 8, 8)
      g.fillRect(236, p, 8, 8)
      g.fillRect(S - 244, p, 8, 8)
    }
    g.fillStyle = 'rgba(214,202,184,0.35)'
    g.font = `500 20px ${MONO}`
    g.fillText('ANIL GÜL · 2026', 40, S - 40)
  })
}

/* ---------- Board silkscreen: designators and footprints ---------- */
export const BOARD_SPAN = 24
export function makeSilkTexture() {
  const S = 2048
  const k = S / BOARD_SPAN
  const w2c = (x, z) => [(x + BOARD_SPAN / 2) * k, (z + BOARD_SPAN / 2) * k]
  return canvasTexture(S, (g) => {
    g.clearRect(0, 0, S, S)
    g.strokeStyle = 'rgba(232,226,214,0.9)'
    g.fillStyle = 'rgba(232,226,214,0.9)'
    g.lineWidth = 3
    const text = (str, x, z, size = 26, weight = 500) => {
      g.font = `${weight} ${size}px ${MONO}`
      const [cx, cy] = w2c(x, z)
      g.fillText(str, cx, cy)
    }
    const bracket = (x0, z0, x1, z1, len = 0.35) => {
      const [a, b] = w2c(x0, z0)
      const [c, d] = w2c(x1, z1)
      const L = len * k
      g.beginPath()
      g.moveTo(a, b + L); g.lineTo(a, b); g.lineTo(a + L, b)
      g.moveTo(c - L, b); g.lineTo(c, b); g.lineTo(c, b + L)
      g.moveTo(c, d - L); g.lineTo(c, d); g.lineTo(c - L, d)
      g.moveTo(a + L, d); g.lineTo(a, d); g.lineTo(a, d - L)
      g.stroke()
    }
    bracket(-2.85, -2.85, 2.85, 2.85, 0.5)
    text('CPU1', -2.8, -3.05, 34, 600)
    ;[4.9, 5.4, 5.9, 6.4].forEach((x, i) => {
      g.save()
      const [cx, cy] = w2c(x + 0.16, -4.45)
      g.translate(cx, cy)
      g.rotate(-Math.PI / 2)
      g.font = `500 22px ${MONO}`
      g.fillText(['DIMM_A1', 'DIMM_A2', 'DIMM_B1', 'DIMM_B2'][i], 0, 0)
      g.restore()
    })
    text('PCIE_X16_1', -5.8, 5.2, 26, 600)
    text('M.2_1 · NVMe', -1.0, 3.0, 22)
    text('VRM_VCORE', -5.1, -3.6, 24, 600)
    text('ANIL GÜL · PORTFOLIO v4', -7.4, 7.2, 40, 700)
    text('MALATYA · TÜRKİYE · 38.35N 38.31E', -7.4, 7.65, 22)
    text('C401', 3.15, -2.2, 20)
    text('C402', 3.15, 1.9, 20)
    text('R118', -3.4, 2.4, 20)
    text('Q7', -3.5, -0.2, 20)
    // mounting holes
    ;[[-7, -7], [7, -7], [-7, 7], [7, 7]].forEach(([x, z]) => {
      const [cx, cy] = w2c(x, z)
      g.beginPath()
      g.arc(cx, cy, 0.32 * k, 0, Math.PI * 2)
      g.stroke()
      g.beginPath()
      g.arc(cx, cy, 0.22 * k, 0, Math.PI * 2)
      g.stroke()
    })
  })
}

/* ---------- NVMe sticker ---------- */
const SSD_COPY = {
  tr: ['SİSTEM · AĞ · BACKEND', 'DONANIM · OS İMAJI · CI/CD'],
  en: ['SYSTEMS · NETWORKING · BACKEND', 'HARDWARE · OS IMAGING · CI/CD'],
}

export function makeSsdLabelTexture() {
  return langCanvasTexture(
    1024,
    (g, W, lang, H) => {
      const lines = SSD_COPY[lang] || SSD_COPY.en
      g.fillStyle = '#16171b'
      g.fillRect(0, 0, W, H)
      g.fillStyle = '#e8743b'
      g.fillRect(0, 0, 18, H)
      g.fillStyle = '#ede7dc'
      try { g.fontStretch = 'expanded' } catch { /* older canvas */ }
      g.font = `800 64px ${DISPLAY}`
      g.fillText('AG NVMe', 60, 104)
      try { g.fontStretch = 'normal' } catch { /* older canvas */ }
      g.font = `500 30px ${MONO}`
      g.fillStyle = '#8f8b84'
      g.fillText(lines[0], 62, 168)
      g.fillText(lines[1], 62, 212)
      g.textAlign = 'right'
      g.fillText('2 TB', W - 40, 104)
      g.textAlign = 'left'
    },
    256,
  )
}
