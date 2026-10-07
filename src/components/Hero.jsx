import { lazy, Suspense, useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { hero, person, ui } from '../data/content'
import { useLang } from '../lib/i18n'
import { EASE } from './ui'

const ChipCanvas = lazy(() => import('./scene/ChipCanvas'))

function Caption({ p, c }) {
  const { t } = useLang()
  const [a, b] = c.range
  const opacity = useTransform(p, [a - 0.035, a + 0.015, b - 0.02, b + 0.025], [0, 1, 1, 0])
  const y = useTransform(p, [a - 0.035, a + 0.015, b - 0.02, b + 0.025], [36, 0, 0, -36])
  return (
    <motion.div style={{ opacity, y }} className="pointer-events-none absolute left-5 top-1/2 w-[min(460px,calc(100vw-40px))] -translate-y-1/2 sm:left-8 lg:left-12">
      <div className="type-label flex items-center gap-3 text-ash">
        <span className="text-copper">{c.addr}</span>
        <span className="h-px w-10 bg-line-hi" />
        <span>{t(ui.layerNames.top)}</span>
      </div>
      <h2 className="type-display mt-5 text-[clamp(40px,5.2vw,84px)] text-bone">{t(c.title)}</h2>
      <p className="mt-6 text-[17px] leading-[1.7] text-bone/75 sm:text-[18px]">{t(c.body)}</p>
    </motion.div>
  )
}

function Gauge({ p, booted }) {
  const top = useTransform(p, [0, 1], ['0%', '100%'])
  const marks = ['0x00', '0x01', '0x02', '0x03']
  return (
    <motion.div
      className="pointer-events-none absolute bottom-[18vh] right-5 top-[18vh] hidden w-14 sm:block lg:right-8"
      initial={{ opacity: 0 }}
      animate={booted ? { opacity: 1 } : {}}
      transition={{ duration: 1, delay: 1.4 }}
    >
      <div className="ticks-y absolute bottom-0 right-0 top-0 w-2.5" />
      <div className="absolute bottom-0 right-[5px] top-0 w-px bg-line-hi" />
      {marks.map((m, i) => (
        <span key={m} className="absolute right-5 -translate-y-1/2 font-mono text-[10px] text-dim" style={{ top: `${[0.29, 0.5, 0.71, 0.905][i] * 100}%` }}>
          {m}
        </span>
      ))}
      <motion.div style={{ top }} className="absolute right-0 flex -translate-y-1/2 items-center gap-2">
        <span className="h-px w-5 bg-copper" />
        <span className="h-2 w-2 rotate-45 bg-copper shadow-[0_0_14px_3px_rgba(232,116,59,0.6)]" />
      </motion.div>
    </motion.div>
  )
}

export default function Hero({ booted }) {
  const { t } = useLang()
  const ref = useRef(null)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  const titleOpacity = useTransform(p, [0.03, 0.14], [1, 0])
  const titleY = useTransform(p, [0, 0.14], [0, -90])
  const shade = useTransform(p, [0.13, 0.2, 0.9, 0.97], [0, 1, 1, 0])
  const endFade = useTransform(p, [0.93, 1], [0, 1])

  const words = ['ANIL', 'GÜL']

  return (
    <section id="top" data-section="top" ref={ref} className="relative h-[440vh]">
      <div className="sticky top-0 h-svh w-full overflow-hidden">
        <Suspense fallback={null}>
          <ChipCanvas progress={p} />
        </Suspense>

        {/* legibility shade for the captions */}
        <motion.div style={{ opacity: shade }} className="pointer-events-none absolute inset-y-0 left-0 w-full bg-gradient-to-r from-void/80 via-void/30 to-transparent sm:w-[62%]" />

        {/* floor shade under the opening title */}
        <motion.div style={{ opacity: titleOpacity }} className="pointer-events-none absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-t from-void/85 via-void/35 to-transparent" />

        {/* opening title */}
        <motion.div style={{ opacity: titleOpacity, y: titleY }} className="pointer-events-none absolute inset-x-0 bottom-0 px-5 pb-9 sm:px-8 sm:pb-12 lg:px-12">
          <motion.div
            className="type-label mb-6 flex items-center gap-3 text-ash"
            initial={{ opacity: 0 }}
            animate={booted ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <span className="text-copper">0x00</span>
            <span className="h-px w-10 bg-line-hi" />
            <span>{t(hero.role)}</span>
          </motion.div>
          <h1 className="type-display text-[clamp(72px,13.6vw,250px)] leading-[0.98] text-bone" aria-label={person.name}>
            {words.map((w, wi) => (
              <span key={w} className="-mt-[0.12em] block overflow-hidden pt-[0.12em]">
                {w.split('').map((ch, ci) => (
                  <motion.span
                    key={ci}
                    className="inline-block"
                    initial={{ y: '110%' }}
                    animate={booted ? { y: '0%' } : {}}
                    transition={{ duration: 1.15, delay: 0.45 + wi * 0.14 + ci * 0.05, ease: EASE }}
                  >
                    {ch}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>
          <motion.div
            className="mt-7 flex flex-wrap items-end justify-between gap-6"
            initial={{ opacity: 0, y: 14 }}
            animate={booted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 1.15, ease: EASE }}
          >
            <p className="flex flex-wrap gap-y-1 font-mono text-[12px] tracking-[0.06em] text-ash sm:text-[13px]">
              {hero.motto.split(' → ').map((part, i, arr) => (
                <span key={part} className="whitespace-nowrap">
                  <span className="text-bone">{part}</span>
                  {i < arr.length - 1 && <span className="px-2 text-copper">→</span>}
                </span>
              ))}
            </p>
            <div className="type-label flex items-center gap-4 text-ash">
              <span>{t(hero.cue)}</span>
              <span className="relative block h-10 w-px overflow-hidden bg-line-hi">
                <motion.span
                  className="absolute left-0 top-0 block h-4 w-px bg-copper"
                  animate={{ y: [-16, 40] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                />
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* coordinates block */}
        <motion.div
          style={{ opacity: titleOpacity }}
          className="pointer-events-none absolute right-5 top-24 hidden text-right sm:block lg:right-12"
        >
          <motion.div
            className="type-label space-y-2 text-ash"
            initial={{ opacity: 0, y: -8 }}
            animate={booted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 1.3, ease: EASE }}
          >
            <div className="text-bone">{person.coords}</div>
            {hero.meta.map((m) => (
              <div key={t(m)}>{t(m)}</div>
            ))}
            <div className="flex items-center justify-end gap-2 text-bone">
              <span className="led h-1.5 w-1.5 rounded-full bg-phosphor" />
              {t(hero.status)}
            </div>
          </motion.div>
        </motion.div>

        {hero.captions.map((c) => (
          <Caption key={c.addr} p={p} c={c} />
        ))}

        <Gauge p={p} booted={booted} />

        <motion.div style={{ opacity: endFade }} className="pointer-events-none absolute inset-0 bg-void" />
      </div>
    </section>
  )
}
