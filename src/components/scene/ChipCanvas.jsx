import { Suspense, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Lightformer, PerformanceMonitor } from '@react-three/drei'
import { Bloom, ChromaticAberration, EffectComposer, ToneMapping, Vignette } from '@react-three/postprocessing'
import { ToneMappingMode } from 'postprocessing'
import * as THREE from 'three'
import { power } from '../../lib/store'
import { useLang } from '../../lib/i18n'
import { buildTraces, ribbonGeometry, traceFragment, traceVertex } from './traces'
import { BOARD_SPAN, DIE_REGIONS, DIE_SIZE, makeDieTextures, makeIhsTexture, makeSilkTexture, makeSsdLabelTexture, makeSubstrateTexture } from './textures'

const { damp, clamp } = THREE.MathUtils
const smooth = (a, b, x) => {
  const t = clamp((x - a) / (b - a), 0, 1)
  return t * t * (3 - 2 * t)
}
const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches

/* Camera keyframes along the hero scroll (p = 0..1). */
const CAM = [
  { p: 0.0, pos: [0, 7.4, 10.6], look: [0, 0, 0.9] },
  { p: 0.26, pos: [-0.7, 5.8, 6.5], look: [0, 0, 0.3] },
  { p: 0.5, pos: [0.35, 4.3, 3.1], look: [0, 0.05, 0.05] },
  { p: 0.76, pos: [0, 2.45, 0.78], look: [0, 0.12, 0] },
  { p: 1.0, pos: [0, 1.02, 0.12], look: [0, 0.12, 0] },
]

/* ---------------------------------------------------------------- shared per-frame state */
function Driver({ progress, s }) {
  const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 1, 0), 0), [])
  const hit = useMemo(() => new THREE.Vector3(), [])
  const ray = useMemo(() => new THREE.Raycaster(), [])
  const target = useMemo(() => new THREE.Vector3(), [])
  const last = useMemo(() => new THREE.Vector2(9, 9), [])

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05)
    const prev = s.p
    s.p = damp(s.p, progress.get(), 3.4, dt)
    s.vel = damp(s.vel, Math.abs(s.p - prev) / Math.max(dt, 1e-3), 5, dt)
    s.reveal = power.get()
    s.power = damp(s.power, s.reveal, 2.4, dt)
    s.time += dt

    // Torch follows the pointer on the board; wanders on its own when the pointer rests.
    if (last.distanceToSquared(state.pointer) > 1e-6) {
      last.copy(state.pointer)
      s.idle = 0
    } else s.idle += dt
    if (s.idle > 2.5) {
      const t = s.time * 0.35
      target.set(Math.cos(t) * 3.4, 0, Math.sin(t * 1.3) * 2.4 + 0.8)
    } else {
      ray.setFromCamera(state.pointer, state.camera)
      if (ray.ray.intersectPlane(plane, hit)) target.copy(hit)
    }
    s.torch.lerp(target, 1 - Math.exp(-dt * (s.idle > 2.5 ? 1.5 : 7)))
  })
  return null
}

function Rig({ s }) {
  const curves = useMemo(() => {
    const pos = new THREE.CatmullRomCurve3(CAM.map((k) => new THREE.Vector3(...k.pos)), false, 'centripetal')
    const look = new THREE.CatmullRomCurve3(CAM.map((k) => new THREE.Vector3(...k.look)), false, 'centripetal')
    return { pos, look }
  }, [])
  const p = useMemo(() => new THREE.Vector3(), [])
  const l = useMemo(() => new THREE.Vector3(), [])
  const mouse = useMemo(() => new THREE.Vector2(), [])

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05)
    // map scroll progress onto the curve parameter, segment by segment
    let i = 0
    while (i < CAM.length - 2 && s.p > CAM[i + 1].p) i++
    const u = clamp((s.p - CAM[i].p) / (CAM[i + 1].p - CAM[i].p), 0, 1)
    const t = (i + u) / (CAM.length - 1)
    curves.pos.getPoint(t, p)
    curves.look.getPoint(t, l)

    // On wide screens the opening shot keeps the chip right of centre so the name sits on dark board.
    const aspect = state.size.width / Math.max(1, state.size.height)
    // portrait screens: pull the camera back along its line of sight so the subject stays in frame
    if (aspect < 0.9) p.sub(l).multiplyScalar(1 + (0.9 - aspect) * 0.9).add(l)
    const off = (aspect > 1.15 ? -2.2 : 0) * (1 - smooth(0, 0.26, s.p))
    p.x += off
    l.x += off * 0.95

    mouse.x = damp(mouse.x, state.pointer.x, 2.5, dt)
    mouse.y = damp(mouse.y, state.pointer.y, 2.5, dt)
    const k = 1 - s.p * 0.85
    p.x += mouse.x * 0.6 * k + Math.sin(s.time * 0.21) * 0.07 * k
    p.y += mouse.y * 0.32 * k
    // power-on dolly
    const intro = (1 - s.power) ** 2
    p.y += intro * 3.2
    p.z += intro * 4.6
    state.camera.position.copy(p)
    state.camera.lookAt(l)
  })
  return null
}

/* ---------------------------------------------------------------- board */
const boardVertex = /* glsl */ `
  varying vec3 vPos;
  void main() {
    vec4 w = modelMatrix * vec4(position, 1.0);
    vPos = w.xyz;
    gl_Position = projectionMatrix * viewMatrix * w;
  }
`
const boardFragment = /* glsl */ `
  uniform vec3 uTorch;
  uniform float uPower;
  varying vec3 vPos;
  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  void main() {
    float r = length(vPos.xz);
    vec3 c = vec3(0.019, 0.022, 0.021);
    c += sin(vPos.x * 34.0) * sin(vPos.z * 34.0) * 0.0022;
    c += (hash(floor(vPos.xz * 64.0)) - 0.5) * 0.0035;
    float torch = exp(-pow(distance(vPos.xz, uTorch.xz), 2.0) * 0.085);
    c += vec3(0.062, 0.043, 0.03) * torch * (0.25 + 0.75 * uPower);
    vec2 g = fract(vPos.xz * 2.0) - 0.5;
    c += vec3(0.055, 0.05, 0.045) * smoothstep(0.05, 0.028, length(g)) * torch;
    c *= 1.0 - smoothstep(6.5, 17.0, r);
    gl_FragColor = vec4(c, 1.0);
  }
`

function Board({ s }) {
  const mat = useMemo(
    () => new THREE.ShaderMaterial({ uniforms: { uTorch: { value: s.torch }, uPower: { value: 0 } }, vertexShader: boardVertex, fragmentShader: boardFragment }),
    [s],
  )
  const silk = useMemo(() => makeSilkTexture(), [])
  const silkMat = useRef()
  useFrame(() => {
    mat.uniforms.uPower.value = s.power
    if (silkMat.current) silkMat.current.opacity = 0.06 + 0.24 * s.power
  })
  return (
    <group>
      <mesh rotation-x={-Math.PI / 2} material={mat}>
        <planeGeometry args={[60, 60]} />
      </mesh>
      <mesh rotation-x={-Math.PI / 2} position-y={0.006}>
        <planeGeometry args={[BOARD_SPAN, BOARD_SPAN]} />
        <meshBasicMaterial ref={silkMat} map={silk} transparent opacity={0.1} depthWrite={false} color="#d8d0c2" />
      </mesh>
    </group>
  )
}

function Traces({ s }) {
  const { geometry, vias } = useMemo(() => {
    const polys = buildTraces({ mobile: isMobile })
    const vias = []
    polys.forEach(({ pts, fill }) => {
      vias.push(pts[pts.length - 1])
      if (fill) vias.push(pts[0])
    })
    return { geometry: ribbonGeometry(polys), vias }
  }, [])
  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: { uTime: { value: 0 }, uPower: { value: 0 }, uReveal: { value: 0 }, uTorch: { value: s.torch } },
        vertexShader: traceVertex,
        fragmentShader: traceFragment,
        side: THREE.DoubleSide,
      }),
    [s],
  )
  const viaRef = useRef()
  useLayoutEffect(() => {
    const m = new THREE.Matrix4()
    const c = new THREE.Color()
    vias.forEach(([x, z], i) => {
      m.makeRotationX(-Math.PI / 2).setPosition(x, 0.005, z)
      viaRef.current.setMatrixAt(i, m)
      const fade = 1 - smooth(5, 13.5, Math.hypot(x, z))
      viaRef.current.setColorAt(i, c.setRGB(0.55 * fade, 0.26 * fade, 0.11 * fade))
    })
    viaRef.current.instanceMatrix.needsUpdate = true
    if (viaRef.current.instanceColor) viaRef.current.instanceColor.needsUpdate = true
  }, [vias])
  useFrame(() => {
    mat.uniforms.uTime.value = s.time
    mat.uniforms.uPower.value = s.power
    mat.uniforms.uReveal.value = s.reveal
  })
  return (
    <group>
      <mesh geometry={geometry} material={mat} />
      <instancedMesh ref={viaRef} args={[undefined, undefined, vias.length]}>
        <ringGeometry args={[0.026, 0.056, 16]} />
        <meshBasicMaterial />
      </instancedMesh>
    </group>
  )
}

/* ---------------------------------------------------------------- components on the board */
function Instances({ items, children }) {
  const ref = useRef()
  useLayoutEffect(() => {
    const o = new THREE.Object3D()
    items.forEach((it, i) => {
      o.position.set(...it.p)
      o.rotation.set(0, it.ry || 0, 0)
      o.scale.set(...(it.s || [1, 1, 1]))
      o.updateMatrix()
      ref.current.setMatrixAt(i, o.matrix)
    })
    ref.current.instanceMatrix.needsUpdate = true
  }, [items])
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, items.length]}>
      {children}
    </instancedMesh>
  )
}

const SIDES = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
]

function Parts({ s }) {
  const layout = useMemo(() => {
    const caps = []
    const ends = []
    const res = []
    const gold = []
    SIDES.forEach(([ox, oz]) => {
      const tx = -oz
      const tz = ox
      const ry = Math.atan2(-oz, ox)
      for (let u = -2.15; u <= 2.16; u += 0.31) {
        const x = ox * 3.02 + tx * u
        const z = oz * 3.02 + tz * u
        caps.push({ p: [x, 0.045, z], ry })
        ends.push({ p: [x + ox * 0.078, 0.046, z + oz * 0.078], ry }, { p: [x - ox * 0.078, 0.046, z - oz * 0.078], ry })
      }
      for (let u = -2.55; u <= 2.56; u += 0.27) {
        if (Math.abs(u) < 0.2) continue
        res.push({ p: [ox * 3.42 + tx * u, 0.03, oz * 3.42 + tz * u], ry: ry + Math.PI / 2 })
      }
      for (let u = -1.6; u <= 1.61; u += 0.32) gold.push({ p: [ox * 1.98 + tx * u, 0.265, oz * 1.98 + tz * u], ry })
    })
    const chokes = Array.from({ length: 7 }, (_, i) => ({ p: [-4.6, 0.25, -3 + i] }))
    const fets = Array.from({ length: 7 }, (_, i) => ({ p: [-3.75, 0.05, -3 + i] }))
    return { caps, ends, res, gold, chokes, fets }
  }, [])

  const ram = useRef([])
  useFrame(() => {
    ram.current.forEach((m, i) => {
      if (!m) return
      const act = 0.5 + 0.5 * Math.sin(s.time * 2.2 - i * 0.9)
      const k = (0.35 + act * 2.4) * s.power
      m.color.setRGB(1.0 * k, 0.47 * k, 0.19 * k)
    })
  })
  const { lang } = useLang()
  const ssdLabel = useMemo(() => makeSsdLabelTexture(), [])
  useEffect(() => ssdLabel.setLang(lang), [ssdLabel, lang])

  return (
    <group>
      {/* SMD capacitors around the socket */}
      <Instances items={layout.caps}>
        <boxGeometry args={[0.17, 0.085, 0.09]} />
        <meshStandardMaterial color="#3b322a" roughness={0.6} />
      </Instances>
      <Instances items={layout.ends}>
        <boxGeometry args={[0.03, 0.092, 0.096]} />
        <meshStandardMaterial color="#c9c3ba" metalness={1} roughness={0.3} />
      </Instances>
      <Instances items={layout.res}>
        <boxGeometry args={[0.12, 0.05, 0.065]} />
        <meshStandardMaterial color="#0d0d0f" roughness={0.5} />
      </Instances>
      <Instances items={layout.gold}>
        <boxGeometry args={[0.085, 0.03, 0.05]} />
        <meshStandardMaterial color="#c9a45c" metalness={1} roughness={0.28} />
      </Instances>

      {/* VRM */}
      <Instances items={layout.chokes}>
        <boxGeometry args={[0.62, 0.5, 0.62]} />
        <meshStandardMaterial color="#2a2c31" metalness={0.75} roughness={0.38} />
      </Instances>
      <Instances items={layout.fets}>
        <boxGeometry args={[0.34, 0.1, 0.42]} />
        <meshStandardMaterial color="#0e0f11" roughness={0.45} />
      </Instances>

      {/* DIMM slots + memory with activity light bars */}
      {[4.9, 5.4, 5.9, 6.4].map((x, i) => (
        <group key={x} position={[x, 0, 0]}>
          <mesh position-y={0.11}>
            <boxGeometry args={[0.2, 0.22, 8.6]} />
            <meshStandardMaterial color="#0e0f12" roughness={0.7} />
          </mesh>
          {[-4.45, 4.45].map((z) => (
            <mesh key={z} position={[0, 0.18, z]}>
              <boxGeometry args={[0.24, 0.36, 0.3]} />
              <meshStandardMaterial color="#7e8086" roughness={0.5} />
            </mesh>
          ))}
          <mesh position-y={0.74}>
            <boxGeometry args={[0.035, 1.0, 7.9]} />
            <meshStandardMaterial color="#13211b" roughness={0.6} />
          </mesh>
          {[-0.034, 0.034].map((dx) => (
            <mesh key={dx} position={[dx, 0.74, 0]}>
              <boxGeometry args={[0.03, 0.9, 7.9]} />
              <meshStandardMaterial color="#26282d" metalness={0.85} roughness={0.32} />
            </mesh>
          ))}
          <mesh position-y={1.255}>
            <boxGeometry args={[0.1, 0.03, 7.5]} />
            <meshBasicMaterial ref={(m) => (ram.current[i] = m)} color="#000" />
          </mesh>
        </group>
      ))}

      {/* PCIe x16 with metal shield */}
      <group position={[-1.8, 0, 5.6]}>
        <mesh position-y={0.13}>
          <boxGeometry args={[8, 0.26, 0.34]} />
          <meshStandardMaterial color="#a3a5aa" metalness={1} roughness={0.32} />
        </mesh>
        <mesh position-y={0.262}>
          <boxGeometry args={[7.8, 0.012, 0.09]} />
          <meshStandardMaterial color="#050506" />
        </mesh>
        <mesh position={[4.15, 0.15, 0]}>
          <boxGeometry args={[0.3, 0.3, 0.4]} />
          <meshStandardMaterial color="#7e8086" roughness={0.5} />
        </mesh>
      </group>

      {/* M.2 NVMe drive */}
      <group position={[0.9, 0, 3.62]}>
        <mesh position-y={0.03}>
          <boxGeometry args={[3.3, 0.03, 0.88]} />
          <meshStandardMaterial color="#101a15" roughness={0.6} />
        </mesh>
        {[-0.75, 0.45].map((x) => (
          <mesh key={x} position={[x, 0.08, 0]}>
            <boxGeometry args={[0.95, 0.07, 0.68]} />
            <meshStandardMaterial color="#0f0f11" roughness={0.5} />
          </mesh>
        ))}
        <mesh position={[1.25, 0.08, 0]}>
          <boxGeometry args={[0.55, 0.07, 0.55]} />
          <meshStandardMaterial color="#141416" roughness={0.4} metalness={0.3} />
        </mesh>
        <mesh position={[-0.15, 0.1175, 0]} rotation-x={-Math.PI / 2}>
          <planeGeometry args={[2.15, 0.66]} />
          <meshStandardMaterial map={ssdLabel.tex} roughness={0.55} />
        </mesh>
        <mesh position={[1.75, 0.07, 0]}>
          <cylinderGeometry args={[0.09, 0.09, 0.08, 20]} />
          <meshStandardMaterial color="#b8b6b1" metalness={1} roughness={0.3} />
        </mesh>
      </group>
    </group>
  )
}

/* ---------------------------------------------------------------- CPU package */
function Cpu({ s }) {
  const { lang } = useLang()
  const ihsTex = useMemo(() => makeIhsTexture(), [])
  useEffect(() => ihsTex.setLang(lang), [ihsTex, lang])
  const die = useMemo(() => makeDieTextures(), [])
  const substrate = useMemo(() => makeSubstrateTexture(), [])
  const ihs = useRef()
  const metal = useMemo(
    () => new THREE.MeshPhysicalMaterial({ color: '#d8d3cb', metalness: 1, roughness: 0.3, clearcoat: 0.35, clearcoatRoughness: 0.25, transparent: true }),
    [],
  )
  const engraved = useMemo(
    () => new THREE.MeshPhysicalMaterial({ color: '#ffffff', map: ihsTex.tex, metalness: 1, roughness: 0.28, clearcoat: 0.4, clearcoatRoughness: 0.2, transparent: true }),
    [ihsTex],
  )
  const dieMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        map: die.map,
        color: '#66656c',
        metalness: 0.25,
        roughness: 0.48,
        envMapIntensity: 0.22,
        iridescence: 1,
        iridescenceIOR: 1.6,
        iridescenceThicknessRange: [220, 900],
        clearcoat: 0.12,
        clearcoatRoughness: 0.3,
      }),
    [die],
  )

  // one glow overlay per die region, each sampling its own part of the glow canvas
  const glows = useMemo(
    () =>
      DIE_REGIONS.map((r) => {
        const tex = die.glow.clone()
        tex.repeat.set(r.w / DIE_SIZE, r.h / DIE_SIZE)
        tex.offset.set(r.x / DIE_SIZE, 1 - (r.y + r.h) / DIE_SIZE)
        tex.needsUpdate = true
        const k = 1.7 / DIE_SIZE
        return {
          tex,
          w: r.w * k,
          h: r.h * k,
          x: -0.85 + (r.x + r.w / 2) * k,
          z: -0.85 + (r.y + r.h / 2) * k,
        }
      }),
    [die],
  )
  const glowMats = useRef([])

  useFrame(() => {
    const lift = smooth(0.33, 0.5, s.p)
    if (ihs.current) {
      ihs.current.position.set(lift * 2.6, 0.25 + lift * 5.2, -lift * 0.8)
      ihs.current.rotation.set(lift * 0.55, 0, -lift * 0.38)
      ihs.current.visible = lift < 0.995
      const o = 1 - smooth(0.6, 1, lift)
      metal.opacity = o
      engraved.opacity = o
    }
    glowMats.current.forEach((m, i) => {
      if (!m) return
      const on = i < 8 ? smooth(0.56 + i * 0.022, 0.6 + i * 0.022, s.p) : smooth(0.74, 0.8, s.p)
      const flicker = 0.82 + 0.18 * Math.sin(s.time * (7 + i) + i * 1.7)
      m.opacity = on * flicker * s.power
    })
  })

  return (
    <group>
      {/* socket: plastic frame + metal load plate */}
      {[
        [0, 2.475, 5.3, 0.35],
        [0, -2.475, 5.3, 0.35],
        [2.475, 0, 0.35, 4.6],
        [-2.475, 0, 0.35, 4.6],
      ].map(([x, z, w, d], i) => (
        <group key={i}>
          <mesh position={[x, 0.07, z]}>
            <boxGeometry args={[w, 0.14, d]} />
            <meshStandardMaterial color="#141518" roughness={0.75} />
          </mesh>
          <mesh position={[x, 0.155, z]}>
            <boxGeometry args={[w * (w > 1 ? 1 : 0.5), 0.03, d * (d > 1 ? 1 : 0.5)]} />
            <meshStandardMaterial color="#8d9096" metalness={1} roughness={0.35} />
          </mesh>
        </group>
      ))}
      {/* substrate */}
      <mesh position-y={0.195}>
        <boxGeometry args={[4.3, 0.11, 4.3]} />
        <meshStandardMaterial map={substrate} roughness={0.55} metalness={0.15} envMapIntensity={0.5} />
      </mesh>
      {/* die */}
      <mesh position-y={0.285} material={dieMat}>
        <boxGeometry args={[1.7, 0.07, 1.7]} />
      </mesh>
      {glows.map((g, i) => (
        <mesh key={i} position={[g.x, 0.3215, g.z]} rotation-x={-Math.PI / 2}>
          <planeGeometry args={[g.w, g.h]} />
          <meshBasicMaterial
            ref={(m) => (glowMats.current[i] = m)}
            map={g.tex}
            color={new THREE.Color(4.2, 1.95, 0.75)}
            transparent
            opacity={0}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      ))}
      {/* integrated heat spreader */}
      <group ref={ihs} position-y={0.25}>
        <mesh position-y={0.025} material={metal}>
          <boxGeometry args={[3.75, 0.05, 3.75]} />
        </mesh>
        <mesh position-y={0.2} material={metal}>
          <boxGeometry args={[3.3, 0.3, 3.3]} />
        </mesh>
        <mesh position-y={0.351} rotation-x={-Math.PI / 2} material={engraved}>
          <planeGeometry args={[3.3, 3.3]} />
        </mesh>
      </group>
    </group>
  )
}

/* ---------------------------------------------------------------- lights, post */
function TorchLight({ s }) {
  const ref = useRef()
  useFrame(() => {
    ref.current.position.set(s.torch.x, 1.7, s.torch.z)
    // fade the torch as the camera dives so it never hot-spots the die
    ref.current.intensity = 16 * (0.3 + 0.7 * s.power) * (1 - smooth(0.3, 0.52, s.p) * 0.88)
  })
  return <pointLight ref={ref} distance={8} decay={2} color="#ffbf8a" />
}

function Effects({ s }) {
  const offset = useMemo(() => new THREE.Vector2(0.0004, 0.0003), [])
  useFrame(() => {
    const k = Math.min(s.vel * 0.012, 0.0035)
    offset.set(0.0004 + k, 0.0003 + k * 0.6)
  })
  return (
    <EffectComposer multisampling={isMobile ? 0 : 4}>
      <Bloom mipmapBlur intensity={1.05} luminanceThreshold={0.8} luminanceSmoothing={0.22} radius={0.78} />
      <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
      <ChromaticAberration offset={offset} radialModulation modulationOffset={0.3} />
      <Vignette offset={0.18} darkness={0.85} />
    </EffectComposer>
  )
}

function Scene({ progress }) {
  const s = useMemo(() => ({ p: 0, vel: 0, power: 0, reveal: 0, time: 0, idle: 0, torch: new THREE.Vector3(0, 0, 1.4) }), [])
  return (
    <>
      <Driver progress={progress} s={s} />
      <Rig s={s} />
      <fog attach="fog" args={['#07080a', 11, 27]} />
      <ambientLight intensity={0.14} />
      <directionalLight position={[-5, 9, 5]} intensity={1.15} color="#fff1e2" />
      <directionalLight position={[7, 4, -6]} intensity={0.45} color="#a9bcff" />
      <TorchLight s={s} />
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={2.2} position={[0, 7, 0]} rotation-x={Math.PI / 2} scale={[12, 5, 1]} />
        <Lightformer form="rect" intensity={3} color="#ffb27a" position={[-6, 2.5, -2]} rotation-y={Math.PI / 2} scale={[10, 1.2, 1]} />
        <Lightformer form="rect" intensity={1.4} color="#c9d6ff" position={[6, 3, 3]} rotation-y={-Math.PI / 2} scale={[10, 1.5, 1]} />
        <Lightformer form="ring" intensity={2.5} position={[2, 6, -5]} scale={2.5} />
      </Environment>
      <Board s={s} />
      <Traces s={s} />
      <Parts s={s} />
      <Cpu s={s} />
      <Effects s={s} />
    </>
  )
}

export default function ChipCanvas({ progress }) {
  const wrap = useRef(null)
  const [visible, setVisible] = useState(true)
  const [dpr, setDpr] = useState(isMobile ? 1.5 : 1.75)

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: '120px' })
    io.observe(wrap.current)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={wrap} className="absolute inset-0">
      <Canvas
        flat
        frameloop={visible ? 'always' : 'never'}
        dpr={[1, dpr]}
        camera={{ fov: 32, near: 0.05, far: 80, position: [0, 10, 15] }}
        gl={{ antialias: false, powerPreference: 'high-performance', stencil: false }}
        eventSource={typeof document !== 'undefined' ? document.getElementById('root') : undefined}
        eventPrefix="client"
      >
        <color attach="background" args={['#07080a']} />
        <PerformanceMonitor onDecline={() => setDpr(1)} />
        <Suspense fallback={null}>
          <Scene progress={progress} />
        </Suspense>
      </Canvas>
    </div>
  )
}
