import { useEffect } from 'react'
import Lenis from 'lenis'

let lenis = null

export const getLenis = () => lenis

export function scrollToId(id, opts = {}) {
  const target = id === 'top' ? 0 : document.getElementById(id)
  if (lenis) lenis.scrollTo(target, { duration: 1.6, easing: (t) => 1 - Math.pow(1 - t, 4), ...opts })
  else if (target === 0) window.scrollTo({ top: 0, behavior: 'smooth' })
  else target?.scrollIntoView({ behavior: 'smooth' })
}

/* One Lenis instance for the page; paused while the boot screen runs. */
export function useLenis(enabled) {
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
    lenis = new Lenis({ lerp: 0.085, smoothWheel: true, wheelMultiplier: 0.95, touchMultiplier: 1.4 })
    let raf = 0
    const loop = (time) => {
      lenis?.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      lenis?.destroy()
      lenis = null
    }
  }, [])

  useEffect(() => {
    if (!lenis) return
    if (enabled) lenis.start()
    else lenis.stop()
  }, [enabled])

  // Deep links (#sig, or the previous site's anchors) resolve once the boot screen is gone.
  useEffect(() => {
    if (!enabled) return
    const id = hashTarget(location.hash)
    if (!id) return
    const timer = setTimeout(() => scrollToId(id, { duration: 2.2 }), 450)
    return () => clearTimeout(timer)
  }, [enabled])
}

const LEGACY = {
  hero: 'top',
  'cap-section': 'stack',
  'orbital-section': 'stack',
  'tech-section': 'isa',
  'project-section': 'proc',
  'cert-section': 'sig',
  'contact-section': 'ssh',
}

function hashTarget(hash) {
  const raw = decodeURIComponent(hash.replace(/^#/, ''))
  if (!raw) return null
  const id = LEGACY[raw] || raw
  return document.getElementById(id) ? id : null
}
