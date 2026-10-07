import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { animate, motion, useInView, useMotionValue, useMotionValueEvent, useTransform } from 'motion/react'
import { proc, projects } from '../data/content'
import { useLang } from '../lib/i18n'
import { getLenis } from '../lib/lenis'
import { useMediaQuery } from '../lib/useMediaQuery'
import { ProjectMedia } from './Media'
import { FadeIn, LinkButton } from './ui'

const N = projects.length
const SPRING = { type: 'spring', stiffness: 170, damping: 30, mass: 0.9 }

function WindowFrame({ project, children }) {
  return (
    <div className="flex flex-col border border-line-hi bg-panel shadow-[0_50px_120px_-30px_rgba(0,0,0,0.9)]">
      <div className="flex shrink-0 items-center gap-2 border-b border-line px-4 py-2.5">
        <span className="h-2 w-2 rounded-full bg-line-hi" />
        <span className="h-2 w-2 rounded-full bg-line-hi" />
        <span className="h-2 w-2 rounded-full bg-line-hi" />
        <span className="ml-3 truncate font-mono text-[11px] text-ash">~/projects/{project.id}</span>
        <span className="ml-auto shrink-0 font-mono text-[11px] text-dim">{project.platform}</span>
      </div>
      <div className="relative">{children}</div>
    </div>
  )
}

function Info({ project, compact = false }) {
  const { t } = useLang()
  return (
    <div className="flex flex-col">
      <div className="type-label flex flex-wrap items-center gap-x-4 gap-y-2 text-ash">
        <span className="text-copper">{String(projects.indexOf(project) + 1).padStart(2, '0')}</span>
        <span>{t(project.kind)}</span>
      </div>
      <h3 className={`type-display mt-5 text-bone ${compact ? 'text-[clamp(40px,11.5vw,84px)]' : 'text-[clamp(56px,6vw,112px)]'}`}>{project.name}</h3>
      <p className="mt-6 max-w-[560px] text-[19px] leading-[1.5] text-bone sm:text-[21px]">{t(project.tagline)}</p>
      <p className={`mt-5 max-w-[560px] text-[15px] leading-[1.75] text-ash ${compact ? '' : '[@media(max-height:860px)]:hidden'}`}>{t(project.desc)}</p>
      <dl className="mt-8 grid max-w-[560px] grid-cols-2 border-t border-line sm:grid-cols-4">
        {project.facts.map((f) => (
          <div key={t(f.k)} className="border-b border-line py-4 pr-3">
            <dt className="type-display whitespace-nowrap text-[clamp(20px,1.7vw,28px)] text-bone">{f.v}</dt>
            <dd className="mt-2 font-mono text-[10px] uppercase leading-[1.5] tracking-[0.14em] text-ash">{t(f.k)}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-6 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[12px] text-bone/80">
        {project.stack.map((s, i) => (
          <span key={s} className="flex items-center gap-3">
            {i > 0 && <span className="text-dim">/</span>}
            {s}
          </span>
        ))}
      </p>
      <div className="mt-7 flex flex-wrap gap-3">
        {project.links.map((l) => (
          <LinkButton key={l.url} href={l.url} download={l.download}>
            {t(l.label)}
          </LinkButton>
        ))}
      </div>
    </div>
  )
}

/* Frame and copy sit on different depths: the frame drifts against the track, the copy settles in. */
function Panel({ project, index, x, base, step, play }) {
  const local = useTransform(x, (v) => (-v - base) / step)
  const frameX = useTransform(local, (l) => l * -90)
  const cardX = useTransform(local, (l) => l * -40)
  const copyY = useTransform(local, (l) => Math.min(1, Math.abs(l)) * 46)
  const copyOpacity = useTransform(local, (l) => 1 - Math.min(1, Math.abs(l)) * 0.75)
  return (
    <article className="grid w-[88vw] max-w-[1560px] shrink-0 grid-cols-[1.3fr_1fr] items-center gap-[4vw]" aria-roledescription="slide" aria-label={`${index + 1} / ${N}`}>
      <motion.div style={{ x: frameX }}>
        <WindowFrame project={project}>
          <ProjectMedia project={project} play={play} shift={cardX} />
        </WindowFrame>
      </motion.div>
      <motion.div style={{ y: copyY, opacity: copyOpacity }}>
        <Info project={project} />
      </motion.div>
    </article>
  )
}

function Segment({ progress, i }) {
  const scaleX = useTransform(progress, [(i - 0.5) / (N - 1), (i + 0.5) / (N - 1)], [0, 1])
  return (
    <span className="relative block h-[2px] overflow-hidden bg-line">
      <motion.span className="absolute inset-0 origin-left bg-copper" style={{ scaleX }} />
    </span>
  )
}

function ArrowButton({ dir, onClick, disabled, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="group pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full border border-bone/20 bg-void/35 text-bone shadow-[0_10px_40px_rgba(0,0,0,0.45)] backdrop-blur-md transition-[opacity,border-color,background-color,transform] duration-300 hover:border-copper hover:bg-void/60 hover:text-copper-hi active:scale-95 disabled:pointer-events-none disabled:opacity-0"
    >
      <svg viewBox="0 0 24 24" className={`h-5 w-5 transition-transform duration-300 ${dir < 0 ? 'rotate-180 group-hover:-translate-x-0.5' : 'group-hover:translate-x-0.5'}`} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square">
        <path d="M5 12h13M13 6l6 6-6 6" />
      </svg>
    </button>
  )
}

/* Horizontal project reel. The wheel moves it only while the pointer is over the cards;
   anywhere else — or past the first / last project — the page scrolls as usual. */
function Reel() {
  const { t } = useLang()
  const section = useRef(null)
  const zone = useRef(null)
  const track = useRef(null)
  const x = useMotionValue(0)
  const target = useRef(0)
  const anim = useRef(null)
  const snapTimer = useRef(0)
  const [geo, setGeo] = useState({ dist: 0, bases: projects.map(() => 0), step: 1 })
  const [active, setActive] = useState(0)
  const inView = useInView(zone, { margin: '-25% 0px' })

  useLayoutEffect(() => {
    const measure = () => {
      const vw = document.documentElement.clientWidth
      const panels = [...track.current.children]
      const first = panels[0].offsetLeft
      const last = panels[panels.length - 1]
      const dist = Math.max(0, last.offsetLeft + last.offsetWidth + vw * 0.04 - vw)
      const bases = panels.map((p) => Math.min(p.offsetLeft - first, dist))
      const step = panels.length > 1 ? panels[1].offsetLeft - first : 1
      setGeo({ dist, bases, step })
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(track.current)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  const progress = useTransform(x, (v) => (geo.dist ? -v / geo.dist : 0))
  const nearestTo = useCallback(
    (pos) => {
      let best = 0
      geo.bases.forEach((b, i) => {
        if (Math.abs(-pos - b) < Math.abs(-pos - geo.bases[best])) best = i
      })
      return best
    },
    [geo.bases],
  )
  useMotionValueEvent(x, 'change', (v) => setActive(nearestTo(v)))

  const go = useCallback(
    (to) => {
      const clamped = Math.max(-geo.dist, Math.min(0, to))
      target.current = clamped
      anim.current?.stop()
      anim.current = animate(x, clamped, SPRING)
    },
    [geo.dist, x],
  )
  const goIndex = useCallback((i) => go(-geo.bases[Math.max(0, Math.min(N - 1, i))]), [go, geo.bases])

  // keep the position valid when the layout changes
  useEffect(() => {
    if (target.current < -geo.dist) go(-geo.dist)
  }, [geo.dist, go])

  // wheel: captured only over the cards, and only while there is room to move
  useEffect(() => {
    const el = zone.current
    const onWheel = (e) => {
      if (e.ctrlKey) return
      const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
      const unit = e.deltaMode === 1 ? 32 : e.deltaMode === 2 ? window.innerHeight : 1
      const next = Math.max(-geo.dist, Math.min(0, target.current - d * unit * 1.15))
      if (Math.abs(next - target.current) < 0.5) return // at an end: the page scrolls on
      const r = el.getBoundingClientRect()
      if (r.top < -40 || r.bottom > window.innerHeight + 40) return // reel not fully on screen yet
      e.preventDefault()
      e.stopPropagation()
      go(next)
      clearTimeout(snapTimer.current)
      snapTimer.current = setTimeout(() => goIndex(nearestTo(target.current)), 260)
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [geo.dist, go, goIndex, nearestTo])

  // keyboard arrows while the reel is on screen
  useEffect(() => {
    const onKey = (e) => {
      if (!inView || e.target.closest?.('input, textarea')) return
      if (e.key === 'ArrowRight') goIndex(nearestTo(target.current) + 1)
      else if (e.key === 'ArrowLeft') goIndex(nearestTo(target.current) - 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [inView, goIndex, nearestTo])

  // bring the reel into view when a visitor uses the controls from off-centre
  const show = (i) => {
    const r = section.current.getBoundingClientRect()
    if (Math.abs(r.top) > 4) getLenis()?.scrollTo(section.current, { duration: 0.8 })
    goIndex(i)
  }

  return (
    <div ref={section} id="proc-reel" className="relative flex h-svh flex-col justify-center overflow-hidden">
      <div className="absolute inset-x-0 top-24 flex items-center gap-6 px-[4vw]">
        <span className="type-label whitespace-nowrap text-ash">
          <span className="text-copper">
            {t(proc.counter)} {String(active + 1).padStart(2, '0')}
          </span>{' '}
          / {String(N).padStart(2, '0')}
        </span>
        <div className="grid flex-1 gap-2" style={{ gridTemplateColumns: `repeat(${N}, minmax(0, 1fr))` }}>
          {projects.map((p, i) => (
            <button key={p.id} type="button" onClick={() => show(i)} className="py-2" aria-label={p.name}>
              <Segment progress={progress} i={i} />
            </button>
          ))}
        </div>
        <span className="type-label hidden whitespace-nowrap text-dim xl:inline">{t(proc.hint)}</span>
      </div>

      <div ref={zone} className="relative cursor-grab pt-10 active:cursor-grabbing">
        <motion.div
          ref={track}
          style={{ x }}
          drag="x"
          dragConstraints={{ left: -geo.dist, right: 0 }}
          dragElastic={0.06}
          dragMomentum={false}
          onDragStart={() => anim.current?.stop()}
          onDragEnd={(_, info) => {
            target.current = x.get()
            let i = nearestTo(target.current)
            if (Math.abs(info.velocity.x) > 400 && Math.abs(info.offset.x) > 30 && i === active) i += info.velocity.x < 0 ? 1 : -1
            goIndex(i)
          }}
          className="flex items-center gap-[6vw] px-[4vw]"
        >
          {projects.map((p, i) => (
            <Panel key={p.id} project={p} index={i} x={x} base={geo.bases[i]} step={geo.step} play={inView && active === i} />
          ))}
        </motion.div>

        <div className="pointer-events-none absolute inset-y-0 left-[1.4vw] right-[1.4vw] flex items-center justify-between">
          <ArrowButton dir={-1} label={t(proc.prev)} disabled={active === 0} onClick={() => show(active - 1)} />
          <ArrowButton dir={1} label={t(proc.next)} disabled={active === N - 1} onClick={() => show(active + 1)} />
        </div>
      </div>
    </div>
  )
}

function MobileItem({ project }) {
  const ref = useRef(null)
  const inView = useInView(ref, { margin: '-25% 0px' })
  return (
    <article ref={ref} className="border-t border-line py-16 first:border-t-0">
      <FadeIn>
        <WindowFrame project={project}>
          <ProjectMedia project={project} play={inView} />
        </WindowFrame>
      </FadeIn>
      <FadeIn delay={0.1} className="mt-10">
        <Info project={project} compact />
      </FadeIn>
    </article>
  )
}

export default function Processes() {
  const desktop = useMediaQuery('(min-width: 1024px)')
  return (
    <section id="proc" data-section="proc" className="relative border-t border-line">
      {desktop ? (
        <Reel />
      ) : (
        <div className="px-5 pb-20 pt-16 sm:px-8">
          {projects.map((p) => (
            <MobileItem key={p.id} project={p} />
          ))}
        </div>
      )}
    </section>
  )
}
