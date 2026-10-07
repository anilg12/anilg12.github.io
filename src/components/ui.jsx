import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'
import { useLang } from '../lib/i18n'

export const EASE = [0.16, 1, 0.3, 1]

/* Section header: the address and layer name carry meaning (where you are in the stack). */
export function SectionHead({ addr, layer, meta }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-12% 0px' })
  return (
    <div ref={ref} className="type-label flex items-center gap-4 text-ash">
      {addr && (
        <motion.span className="text-copper" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.4 }}>
          {addr}
        </motion.span>
      )}
      <motion.span initial={{ opacity: 0, x: -8 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.08, ease: EASE }}>
        {layer}
      </motion.span>
      <motion.span
        className="h-px flex-1 origin-left bg-line-hi"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.15, ease: EASE }}
      />
      {meta && (
        <motion.span className="hidden sm:inline" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.5 }}>
          {meta}
        </motion.span>
      )}
    </div>
  )
}

/* Big display title revealed line by line from behind a mask. */
export function RevealTitle({ lines, className = '', as: Tag = 'h2', delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  return (
    <Tag ref={ref} className={`type-display ${className}`}>
      {lines.map((line, i) => (
        // The mask is padded so Turkish dots (İ) and descenders (ğ, ç, ş) aren't shaved off;
        // the negative margins keep the original line spacing.
        <span key={i} className="-my-[0.16em] block overflow-hidden pb-[0.22em] pr-[0.04em] pt-[0.16em]">
          <motion.span
            className={`block ${i % 2 === 1 ? 'text-ash' : ''}`}
            initial={{ y: '150%' }}
            animate={inView ? { y: '0%' } : {}}
            transition={{ duration: 1.1, delay: delay + i * 0.09, ease: EASE }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}

export function FadeIn({ children, className = '', delay = 0, y = 18 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-8% 0px' })
  return (
    <motion.div ref={ref} className={className} initial={{ opacity: 0, y }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, delay, ease: EASE }}>
      {children}
    </motion.div>
  )
}

const GLYPHS = '01ABCDEF#$%&<>/[]{}=+*'

/* Text that decodes from noise once `run` turns true. */
export function ScrambleText({ text, run, delay = 0, duration = 700, className = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!run) {
      el.textContent = text.replace(/[^\s·]/g, '·')
      return
    }
    let raf = 0
    let start = 0
    const tick = (now) => {
      if (!start) start = now + delay
      const t = Math.max(0, Math.min(1, (now - start) / duration))
      const settled = Math.floor(t * text.length)
      let out = ''
      for (let i = 0; i < text.length; i++) {
        const ch = text[i]
        if (i < settled || ch === ' ') out += ch
        else out += now < start ? '·' : GLYPHS[(Math.random() * GLYPHS.length) | 0]
      }
      el.textContent = out
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [text, run, delay, duration])
  return <span ref={ref} className={className} aria-label={text} />
}

/* Counts up to a number once in view. */
export function CountUp({ to, run, duration = 1400, className = '' }) {
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!run) return
    let raf = 0
    const t0 = performance.now()
    const tick = (now) => {
      const t = Math.min(1, (now - t0) / duration)
      setV(Math.round(to * (1 - Math.pow(1 - t, 4))))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [to, run, duration])
  return <span className={className}>{String(v).padStart(2, '0')}</span>
}

export function Arrow({ down = false, className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={`h-3.5 w-3.5 ${className}`} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square">
      {down ? <path d="M12 4v15M6 13l6 6 6-6" /> : <path d="M7 17 17 7M8 7h9v9" />}
    </svg>
  )
}

/* Text link with an underline that draws on hover — the only hover effect we use for links. */
export function LinkButton({ href, children, download = false, icon = true, className = '' }) {
  const ext = /^https?:/.test(href)
  return (
    <a
      href={href}
      target={ext ? '_blank' : undefined}
      rel={ext ? 'noreferrer' : undefined}
      download={download && !ext ? '' : undefined}
      className={`group inline-flex items-center gap-2.5 border border-line-hi px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-bone transition-colors duration-300 hover:border-copper hover:text-copper-hi ${className}`}
    >
      <span>{children}</span>
      {icon && <Arrow down={download} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />}
    </a>
  )
}

export function useT() {
  return useLang().t
}
