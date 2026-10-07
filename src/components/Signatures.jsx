import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'motion/react'
import { certificates, sig, trainings, ui } from '../data/content'
import { useLang } from '../lib/i18n'
import { getLenis } from '../lib/lenis'
import { Arrow, EASE, FadeIn, RevealTitle, SectionHead } from './ui'

const thumb = (id) => `media/certs/${id}-thumb.webp`
const full = (id) => `media/certs/${id}.webp`

function Eye({ className = 'h-3.5 w-3.5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

const btnBase =
  'group items-center justify-center gap-2 border px-3 py-2 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors duration-300 sm:px-3.5 sm:tracking-[0.16em]'
const btn = `inline-flex ${btnBase}`

function Actions({ item, onPreview, compact = false }) {
  const { t } = useLang()
  return (
    <div className="flex flex-wrap gap-2">
      <button type="button" onClick={onPreview} className={`${btn} border-copper/60 bg-copper/10 text-copper-hi hover:border-copper hover:bg-copper/20`}>
        <Eye />
        {t(sig.preview)}
      </button>
      {item.verify && (
        <a href={item.verify} target="_blank" rel="noreferrer" className={`${btn} border-line-hi text-bone hover:border-phosphor hover:text-phosphor`}>
          {t(sig.verify)}
          <Arrow className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      )}
      {!compact && (
        <a href={item.pdf} download className={`${btn} border-line-hi text-ash hover:border-bone hover:text-bone`}>
          PDF
          <Arrow down className="h-3 w-3 transition-transform group-hover:translate-y-0.5" />
        </a>
      )}
    </div>
  )
}

function Status({ item }) {
  const { t } = useLang()
  return item.verify ? (
    <span className="inline-flex items-center gap-2 border border-phosphor/40 bg-void/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-phosphor backdrop-blur-sm">
      <span className="h-1.5 w-1.5 rounded-full bg-phosphor shadow-[0_0_8px_rgba(125,255,177,0.9)]" />
      {t(sig.verified)} · {item.via}
    </span>
  ) : (
    <span className="inline-flex items-center gap-2 border border-line-hi bg-void/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ash backdrop-blur-sm">
      <span className="h-1.5 w-1.5 rounded-full border border-ash" />
      {t(sig.archived)}
    </span>
  )
}

function Card({ item, index, run, onPreview }) {
  const { t } = useLang()
  return (
    <motion.article
      className="group relative flex flex-col border border-line bg-panel/60 transition-colors duration-500 hover:border-line-hi"
      initial={{ opacity: 0, y: 28 }}
      animate={run ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.15 + index * 0.07, ease: EASE }}
    >
      <button type="button" onClick={onPreview} className="relative block aspect-[3/2] overflow-hidden bg-[#0d0e11]" aria-label={`${t(sig.preview)}: ${t(item.title)}`}>
        <img
          src={thumb(item.id)}
          alt={t(item.title)}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-contain p-4 transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.035]"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-void/70 via-transparent to-transparent" />
        <span className="absolute left-3 top-3">
          <Status item={item} />
        </span>
        <span className="absolute bottom-3 right-3 inline-flex items-center gap-2 border border-bone/25 bg-void/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-bone opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 [@media(hover:none)]:opacity-100">
          <Eye className="h-3 w-3" />
          {t(sig.preview)}
        </span>
      </button>
      <div className="flex flex-1 flex-col gap-3 border-t border-line p-5 sm:p-6">
        <div className="type-label text-ash">
          {item.issuer} · {t(item.date)}
        </div>
        <h3 className="text-[19px] font-medium leading-snug text-bone sm:text-[20px]">{t(item.title)}</h3>
        {item.desc && <p className="text-[14px] leading-[1.65] text-ash">{t(item.desc)}</p>}
        <div className="mt-auto pt-3">
          <Actions item={item} onPreview={onPreview} />
        </div>
      </div>
    </motion.article>
  )
}

function TrainingCard({ item, index, run, onPreview }) {
  const { t } = useLang()
  return (
    <motion.article
      className="group flex flex-col border border-line bg-panel/40 transition-colors duration-500 hover:border-line-hi"
      initial={{ opacity: 0, y: 20 }}
      animate={run ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1 + index * 0.07, ease: EASE }}
    >
      <button type="button" onClick={onPreview} className="relative block aspect-[3/2] overflow-hidden bg-[#0d0e11]" aria-label={`${t(sig.preview)}: ${t(item.title)}`}>
        <img src={thumb(item.id)} alt={t(item.title)} loading="lazy" className="absolute inset-0 h-full w-full object-contain p-3 transition-transform duration-700 group-hover:scale-[1.04]" />
      </button>
      <div className="flex flex-1 flex-col gap-2 border-t border-line p-4">
        <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-ash">{t(item.date)}</div>
        <h4 className="text-[15px] font-medium leading-snug text-bone">{t(item.title)}</h4>
        <p className="text-[12px] leading-[1.5] text-ash">{t(item.issuer)}</p>
        <div className="mt-auto flex gap-2 pt-3">
          <button type="button" onClick={onPreview} className={`${btn} border-copper/60 bg-copper/10 px-3 py-1.5 text-copper-hi hover:bg-copper/20`}>
            <Eye className="h-3 w-3" />
            {t(sig.preview)}
          </button>
          <a href={item.pdf} download className={`${btn} border-line-hi px-3 py-1.5 text-ash hover:border-bone hover:text-bone`}>
            PDF
          </a>
        </div>
      </div>
    </motion.article>
  )
}

/* Full-screen viewer: the certificate as an image, with verify / download / open actions. */
function Viewer({ items, index, onClose, onStep }) {
  const { t } = useLang()
  const item = items[index]

  useEffect(() => {
    const lenis = getLenis()
    lenis?.stop()
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onStep(1)
      if (e.key === 'ArrowLeft') onStep(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
      lenis?.start()
    }
  }, [onClose, onStep])

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex flex-col bg-void/85 backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      role="dialog"
      aria-modal="true"
      aria-label={t(item.title)}
      data-lenis-prevent
    >
      <div className="flex items-center justify-between gap-4 border-b border-line px-4 py-3 sm:px-8">
        <div className="min-w-0">
          <div className="type-label truncate text-ash">
            {typeof item.issuer === 'string' ? item.issuer : t(item.issuer)} · {t(item.date)}
          </div>
          <div className="truncate text-[15px] text-bone sm:text-[17px]">{t(item.title)}</div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {item.verify && (
            <a href={item.verify} target="_blank" rel="noreferrer" className={`${btnBase} hidden border-line-hi text-bone hover:border-phosphor hover:text-phosphor sm:inline-flex`}>
              {t(sig.verify)} <Arrow className="h-3 w-3" />
            </a>
          )}
          <a href={item.pdf} download className={`${btnBase} hidden border-line-hi text-ash hover:border-bone hover:text-bone sm:inline-flex`}>
            {t(sig.download)} <Arrow down className="h-3 w-3" />
          </a>
          <a href={item.pdf} target="_blank" rel="noreferrer" className={`${btnBase} hidden border-line-hi text-ash hover:border-bone hover:text-bone md:inline-flex`}>
            {t(sig.openTab)}
          </a>
          <button type="button" onClick={onClose} aria-label={t(sig.close)} className="flex h-10 w-10 items-center justify-center border border-line-hi text-bone transition-colors hover:border-copper hover:text-copper-hi">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center p-4 sm:p-10" onClick={onClose}>
        <AnimatePresence mode="wait">
          <motion.img
            key={item.id}
            src={full(item.id)}
            alt={t(item.title)}
            onClick={(e) => e.stopPropagation()}
            drag={items.length > 1 ? 'x' : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.45}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60 || info.velocity.x < -500) onStep(1)
              else if (info.offset.x > 60 || info.velocity.x > 500) onStep(-1)
            }}
            draggable={false}
            className="max-h-full max-w-full cursor-grab touch-pan-y select-none border border-line-hi object-contain shadow-[0_40px_120px_rgba(0,0,0,0.7)] active:cursor-grabbing"
            initial={{ opacity: 0, scale: 0.97, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.45, ease: EASE }}
          />
        </AnimatePresence>
        {items.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onStep(-1)
              }}
              aria-label={t(sig.prev)}
              className="absolute left-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-bone/20 bg-void/50 text-bone backdrop-blur-md transition-colors hover:border-copper hover:text-copper-hi sm:left-6 sm:flex"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 rotate-180" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M5 12h13M13 6l6 6-6 6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onStep(1)
              }}
              aria-label={t(sig.next)}
              className="absolute right-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-bone/20 bg-void/50 text-bone backdrop-blur-md transition-colors hover:border-copper hover:text-copper-hi sm:right-6 sm:flex"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M5 12h13M13 6l6 6-6 6" />
              </svg>
            </button>
          </>
        )}
      </div>

      <div className="flex items-center gap-2 border-t border-line px-4 py-3 sm:hidden">
        {items.length > 1 && (
          <button type="button" onClick={() => onStep(-1)} aria-label={t(sig.prev)} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-bone/20 bg-void/50 text-bone">
            <svg viewBox="0 0 24 24" className="h-4 w-4 rotate-180" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M5 12h13M13 6l6 6-6 6" />
            </svg>
          </button>
        )}
        <div className="flex flex-1 items-center justify-center gap-2">
          {item.verify && (
            <a href={item.verify} target="_blank" rel="noreferrer" className={`${btn} border-line-hi text-bone`}>
              {t(sig.verify)} <Arrow className="h-3 w-3" />
            </a>
          )}
          <a href={item.pdf} download className={`${btn} border-line-hi text-ash`}>
            PDF <Arrow down className="h-3 w-3" />
          </a>
        </div>
        {items.length > 1 && (
          <button type="button" onClick={() => onStep(1)} aria-label={t(sig.next)} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-bone/20 bg-void/50 text-bone">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M5 12h13M13 6l6 6-6 6" />
            </svg>
          </button>
        )}
      </div>
    </motion.div>
  )
}

export default function Signatures() {
  const { t } = useLang()
  const gridRef = useRef(null)
  const run = useInView(gridRef, { once: true, margin: '-8% 0px' })
  const trainRef = useRef(null)
  const trainRun = useInView(trainRef, { once: true, margin: '-8% 0px' })
  const verified = certificates.filter((c) => c.verify).length
  const [open, setOpen] = useState(null) // { list: 'certs' | 'trainings', index }

  const list = open?.list === 'trainings' ? trainings : certificates
  const close = useCallback(() => setOpen(null), [])
  const step = useCallback((d) => setOpen((o) => (o ? { ...o, index: (o.index + d + (o.list === 'trainings' ? trainings : certificates).length) % (o.list === 'trainings' ? trainings : certificates).length } : o)), [])

  return (
    <section id="sig" data-section="sig" className="relative border-t border-line px-5 py-28 sm:px-8 lg:px-12 lg:py-40">
      <div className="mx-auto max-w-[1440px]">
        <SectionHead layer={`L4 · ${t(ui.layerNames.sig)}`} meta={`${certificates.length} · ${verified} ✓`} />
        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:items-end">
          <RevealTitle lines={t(sig.title)} className="text-[clamp(40px,10.5vw,124px)] lg:text-[clamp(64px,6.3vw,104px)]" />
          <FadeIn delay={0.15}>
            <p className="max-w-[470px] text-[17px] leading-[1.8] text-ash">{t(sig.intro)}</p>
          </FadeIn>
        </div>

        <div ref={gridRef} className="relative mt-20">
          {/* verification beam sweeping the wall of certificates as it resolves */}
          <motion.div
            className="pointer-events-none absolute inset-x-0 z-10 h-px bg-copper shadow-[0_0_22px_6px_rgba(232,116,59,0.45)]"
            initial={{ top: '0%', opacity: 0 }}
            animate={run ? { top: ['0%', '100%'], opacity: [0, 1, 1, 0] } : {}}
            transition={{ duration: 2.2, ease: [0.45, 0, 0.2, 1], times: [0, 0.05, 0.92, 1] }}
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 xl:gap-6">
            {certificates.map((c, i) => (
              <Card key={c.id} item={c} index={i} run={run} onPreview={() => setOpen({ list: 'certs', index: i })} />
            ))}
          </div>
        </div>

        <div ref={trainRef} className="mt-24">
          <div className="type-label flex items-center gap-4 text-ash">
            <span className="text-copper">+{trainings.length}</span>
            <span>{t(sig.trainingsTitle)}</span>
            <span className="h-px flex-1 bg-line-hi" />
          </div>
          <p className="mt-5 max-w-[640px] text-[14px] leading-[1.7] text-ash">{t(sig.trainingsNote)}</p>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5">
            {trainings.map((c, i) => (
              <TrainingCard key={c.id} item={c} index={i} run={trainRun} onPreview={() => setOpen({ list: 'trainings', index: i })} />
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>{open && <Viewer key="viewer" items={list} index={open.index} onClose={close} onStep={step} />}</AnimatePresence>
    </section>
  )
}
