import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { ui } from '../data/content'
import { useLang } from '../lib/i18n'
import { getLenis, scrollToId } from '../lib/lenis'
import { EASE } from './ui'

export function ChipMark({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square">
      <path d="M8 2.5v3M12 2.5v3M16 2.5v3M8 18.5v3M12 18.5v3M16 18.5v3M2.5 8h3M2.5 12h3M2.5 16h3M18.5 8h3M18.5 12h3M18.5 16h3" />
      <rect x="5.5" y="5.5" width="13" height="13" rx="1.5" />
      <rect x="9.5" y="9.5" width="5" height="5" fill="currentColor" stroke="none" />
    </svg>
  )
}

function LangToggle() {
  const { lang, setLang } = useLang()
  return (
    <div className="flex rounded-full border border-bone/20 bg-void/45 p-1 backdrop-blur-md" role="group" aria-label="Language">
      {['tr', 'en'].map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`relative rounded-full px-3.5 py-2 font-mono text-[12px] font-medium uppercase tracking-[0.16em] transition-colors duration-300 ${lang === l ? 'text-void' : 'text-bone/75 hover:text-bone'}`}
        >
          {lang === l && <motion.span layoutId="lang-pill" className="absolute inset-0 rounded-full bg-copper shadow-[0_0_18px_rgba(232,116,59,0.45)]" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />}
          <span className="relative">{l}</span>
        </button>
      ))}
    </div>
  )
}

function MobileMenu({ layer, onClose }) {
  const { t } = useLang()
  useEffect(() => {
    getLenis()?.stop()
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      getLenis()?.start()
    }
  }, [onClose])
  return (
    <motion.div
      className="fixed inset-0 z-[70] flex flex-col bg-void/95 px-5 pb-10 pt-24 backdrop-blur-xl sm:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <nav className="flex flex-col" aria-label="Sections">
        {ui.nav.map((n, i) => (
          <motion.button
            key={n.id}
            type="button"
            onClick={() => {
              onClose()
              setTimeout(() => scrollToId(n.id), 60)
            }}
            className={`type-display border-b border-line py-5 text-left text-[clamp(34px,9vw,56px)] ${layer === n.id ? 'text-copper-hi' : 'text-bone'}`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 + i * 0.05, ease: EASE }}
          >
            {t(n.label)}
          </motion.button>
        ))}
      </nav>
    </motion.div>
  )
}

export default function Nav({ booted }) {
  const { t, lang } = useLang()
  const { scrollYProgress } = useScroll()
  const addrRef = useRef(null)
  const [layer, setLayer] = useState('top')
  const [menu, setMenu] = useState(false)
  const closeMenu = useCallback(() => setMenu(false), [])

  // The address bus readout tracks scroll position without re-rendering.
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (addrRef.current) addrRef.current.textContent = '0x' + Math.round(v * 0xffff).toString(16).toUpperCase().padStart(4, '0')
  })

  useEffect(() => {
    const els = [...document.querySelectorAll('[data-section]')]
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setLayer(e.target.dataset.section)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-[80]"
        initial={{ opacity: 0, y: -16 }}
        animate={booted ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.9, ease: EASE }}
      >
        <motion.div className="absolute left-0 top-0 h-[2px] w-full origin-left bg-copper" style={{ scaleX: scrollYProgress }} />
        <div
          className={`flex items-center justify-between gap-4 px-5 transition-[background-color,padding,border-color] duration-500 sm:px-8 ${
            layer === 'top' && !menu
              ? 'border-b border-transparent bg-gradient-to-b from-void/85 via-void/40 to-transparent pb-6 pt-4'
              : 'border-b border-line bg-void/80 py-3 backdrop-blur-md'
          }`}
        >
          <button type="button" onClick={() => scrollToId('top')} className="flex items-center gap-3 text-bone" aria-label="Anıl Gül">
            <ChipMark className="h-[20px] w-[20px] text-copper" />
            <span className="font-mono text-[12px] font-medium uppercase tracking-[0.22em] text-bone">Anıl Gül</span>
          </button>

          <div className="type-label hidden items-center gap-3 text-ash 2xl:flex">
            <span className="led h-1.5 w-1.5 rounded-full bg-phosphor" />
            <span>ADDR</span>
            <span ref={addrRef} className="tabular-nums text-bone">
              0x0000
            </span>
            <span className="text-dim">/</span>
            <span className="text-copper">{t(ui.layerNames[layer])}</span>
          </div>

          <div className="flex items-center gap-3">
            <nav className="hidden items-center rounded-full border border-bone/15 bg-void/45 p-1 backdrop-blur-md lg:flex" aria-label="Sections">
              {ui.nav.map((n) => (
                <button
                  key={n.id}
                  type="button"
                  onClick={() => scrollToId(n.id)}
                  aria-current={layer === n.id ? 'true' : undefined}
                  className={`relative rounded-full px-4 py-2 font-mono text-[12px] font-medium uppercase tracking-[0.14em] transition-colors duration-300 xl:px-5 ${
                    layer === n.id ? 'text-void' : 'text-bone/80 hover:text-bone'
                  }`}
                >
                  {layer === n.id && (
                    <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-bone" transition={{ type: 'spring', stiffness: 380, damping: 34 }} />
                  )}
                  <span className="relative">{t(n.label)}</span>
                </button>
              ))}
            </nav>
            <LangToggle />
            <button
              type="button"
              onClick={() => setMenu((m) => !m)}
              aria-expanded={menu}
              aria-label={lang === 'tr' ? 'Menü' : 'Menu'}
              className="flex h-[42px] items-center gap-2 rounded-full border border-bone/20 bg-void/45 px-4 font-mono text-[12px] font-medium uppercase tracking-[0.16em] text-bone backdrop-blur-md lg:hidden"
            >
              <span className="flex w-4 flex-col gap-[5px]">
                <span className={`h-px w-full bg-bone transition-transform duration-300 ${menu ? 'translate-y-[3px] rotate-45' : ''}`} />
                <span className={`h-px w-full bg-bone transition-transform duration-300 ${menu ? '-translate-y-[3px] -rotate-45' : ''}`} />
              </span>
              <span className="hidden sm:inline">{menu ? (lang === 'tr' ? 'Kapat' : 'Close') : lang === 'tr' ? 'Menü' : 'Menu'}</span>
            </button>
          </div>
        </div>
      </motion.header>
      <AnimatePresence>{menu && <MobileMenu key="menu" layer={layer} onClose={closeMenu} />}</AnimatePresence>
    </>
  )
}
