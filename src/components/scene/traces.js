import * as THREE from 'three'

/* Procedural PCB routing: buses leave the CPU socket on all four sides, bend 45°
   away from the centre (so they never cross) and run to the edge of the board.
   Short "fill" buses populate the outer board. Everything is merged into one mesh. */

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

const add = (a, b) => [a[0] + b[0], a[1] + b[1]]
const mul = (a, s) => [a[0] * s, a[1] * s]
const norm = (a) => {
  const l = Math.hypot(a[0], a[1]) || 1
  return [a[0] / l, a[1] / l]
}

function offsetPolyline(pts, d) {
  const n = pts.length
  return pts.map((p, i) => {
    if (i === 0 || i === n - 1) {
      const a = i === 0 ? pts[0] : pts[n - 2]
      const b = i === 0 ? pts[1] : pts[n - 1]
      const [dx, dz] = norm([b[0] - a[0], b[1] - a[1]])
      return [p[0] - dz * d, p[1] + dx * d]
    }
    const [d1x, d1z] = norm([p[0] - pts[i - 1][0], p[1] - pts[i - 1][1]])
    const [d2x, d2z] = norm([pts[i + 1][0] - p[0], pts[i + 1][1] - p[1]])
    const n1 = [-d1z, d1x]
    const n2 = [-d2z, d2x]
    const m = norm([n1[0] + n2[0], n1[1] + n2[1]])
    const s = d / (m[0] * n1[0] + m[1] * n1[1])
    return [p[0] + m[0] * s, p[1] + m[1] * s]
  })
}

export function buildTraces({ seed = 26, mobile = false } = {}) {
  const rand = mulberry32(seed)
  const polys = []
  const R = 2.62
  const spacing = 0.105
  const sides = [
    { o: [1, 0], t: [0, 1] },
    { o: [-1, 0], t: [0, -1] },
    { o: [0, 1], t: [-1, 0] },
    { o: [0, -1], t: [1, 0] },
  ]

  for (const s of sides) {
    const L1 = 0.45 + rand() * 0.5
    const L2 = 0.9 + rand() * 1.6
    for (const bc of [-1.55, -0.52, 0.52, 1.55]) {
      const k = mobile ? 3 : 4 + Math.floor(rand() * 3)
      const sgn = bc >= 0 ? 1 : -1
      const straight = Math.abs(bc) < 1 && rand() < 0.35
      const p0 = add(mul(s.o, R), mul(s.t, bc))
      const p1 = add(p0, mul(s.o, L1))
      const diag = norm(add(s.o, mul(s.t, sgn)))
      const p2 = add(p1, mul(diag, L2))
      const center = straight ? [p0, add(p0, mul(s.o, 9 + rand() * 4))] : [p0, p1, p2, add(p2, mul(s.o, 5 + rand() * 7))]
      const half = ((k - 1) / 2) * spacing
      for (let i = 0; i < k; i++) {
        const pts = offsetPolyline(center, -half + i * spacing)
        // stagger the far ends so buses don't stop in a flat line
        const last = pts.length - 1
        const dir = norm([pts[last][0] - pts[last - 1][0], pts[last][1] - pts[last - 1][1]])
        pts[last] = add(pts[last], mul(dir, -rand() * 1.4))
        polys.push({ pts, seed: rand() })
      }
    }
  }

  // outer fill buses
  const dirs = Array.from({ length: 8 }, (_, i) => [Math.cos((i * Math.PI) / 4), Math.sin((i * Math.PI) / 4)])
  const fills = mobile ? 14 : 34
  for (let f = 0; f < fills; f++) {
    const ang = rand() * Math.PI * 2
    const r = 4.6 + rand() * 6.5
    let p = [Math.cos(ang) * r, Math.sin(ang) * r]
    let di = Math.floor(rand() * 8)
    const center = [p]
    const segs = 2 + Math.floor(rand() * 3)
    for (let sIdx = 0; sIdx < segs; sIdx++) {
      p = add(p, mul(dirs[di], 0.6 + rand() * 2.4))
      center.push(p)
      di = (di + (rand() < 0.5 ? 1 : 7)) % 8
    }
    const k = 2 + Math.floor(rand() * 3)
    const half = ((k - 1) / 2) * spacing
    for (let i = 0; i < k; i++) polys.push({ pts: offsetPolyline(center, -half + i * spacing), seed: rand(), fill: true })
  }
  return polys
}

/* Flat ribbons on the board plane with per-vertex distance-along-trace for the pulse shader. */
export function ribbonGeometry(polys, width = 0.034, y = 0.004) {
  const pos = []
  const at = []
  const alen = []
  const aseed = []
  const astart = []
  const idx = []
  let v = 0
  const hw = width / 2
  for (const { pts, seed } of polys) {
    let total = 0
    for (let i = 0; i < pts.length - 1; i++) total += Math.hypot(pts[i + 1][0] - pts[i][0], pts[i + 1][1] - pts[i][1])
    const start = Math.hypot(pts[0][0], pts[0][1])
    let acc = 0
    for (let i = 0; i < pts.length - 1; i++) {
      const a = pts[i]
      const b = pts[i + 1]
      const L = Math.hypot(b[0] - a[0], b[1] - a[1])
      if (L < 1e-4) continue
      const dx = (b[0] - a[0]) / L
      const dz = (b[1] - a[1]) / L
      const nx = -dz * hw
      const nz = dx * hw
      const ax = a[0] - dx * hw
      const az = a[1] - dz * hw
      const bx = b[0] + dx * hw
      const bz = b[1] + dz * hw
      pos.push(ax - nx, y, az - nz, ax + nx, y, az + nz, bx - nx, y, bz - nz, bx + nx, y, bz + nz)
      at.push(acc, acc, acc + L, acc + L)
      for (let q = 0; q < 4; q++) {
        alen.push(total)
        aseed.push(seed)
        astart.push(start)
      }
      idx.push(v, v + 2, v + 1, v + 1, v + 2, v + 3)
      v += 4
      acc += L
    }
  }
  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3))
  geo.setAttribute('aT', new THREE.Float32BufferAttribute(at, 1))
  geo.setAttribute('aLen', new THREE.Float32BufferAttribute(alen, 1))
  geo.setAttribute('aSeed', new THREE.Float32BufferAttribute(aseed, 1))
  geo.setAttribute('aStart', new THREE.Float32BufferAttribute(astart, 1))
  geo.setIndex(idx)
  geo.computeBoundingSphere()
  return geo
}

export const traceVertex = /* glsl */ `
  attribute float aT;
  attribute float aLen;
  attribute float aSeed;
  attribute float aStart;
  varying float vT;
  varying float vLen;
  varying float vSeed;
  varying float vStart;
  varying vec3 vPos;
  void main() {
    vT = aT; vLen = aLen; vSeed = aSeed; vStart = aStart;
    vec4 world = modelMatrix * vec4(position, 1.0);
    vPos = world.xyz;
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`

export const traceFragment = /* glsl */ `
  uniform float uTime;
  uniform float uPower;
  uniform float uReveal;
  uniform vec3 uTorch;
  varying float vT;
  varying float vLen;
  varying float vSeed;
  varying float vStart;
  varying vec3 vPos;
  void main() {
    float r = length(vPos.xz);
    float fade = 1.0 - smoothstep(5.0, 13.5, r);
    float torch = exp(-pow(distance(vPos.xz, uTorch.xz), 2.0) * 0.16);

    // power-on wave travelling outward from the socket
    float wave = uReveal * 20.0 - (vStart + vT) - vSeed * 1.5;
    float on = smoothstep(0.0, 1.0, wave);
    float front = exp(-wave * wave * 1.4) * (1.0 - smoothstep(0.85, 1.0, uReveal));

    // data packets
    float speed = 1.3 + fract(vSeed * 13.7) * 2.6;
    float period = vLen + 5.0 + fract(vSeed * 5.13) * 12.0;
    float head = mod(uTime * speed + vSeed * 91.0, period);
    float inward = step(0.5, fract(vSeed * 3.71));
    float s = mix(vT, vLen - vT, inward);
    float d = head - s;
    float pulse = (d > 0.0 && d < 3.0 && head < vLen + 3.0) ? exp(-d * 2.1) : 0.0;

    vec3 base = vec3(0.15, 0.062, 0.026);
    vec3 lit = vec3(0.95, 0.46, 0.2);
    vec3 hot = vec3(1.0, 0.5, 0.2);
    vec3 col = base * (0.3 + 0.7 * on) + lit * torch * (0.2 + 0.8 * on);
    col += hot * pulse * 6.5 * uPower * on;
    col += hot * front * 3.5;
    gl_FragColor = vec4(col * fade, 1.0);
  }
`
