import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { isa, ui } from '../data/content'
import { useLang } from '../lib/i18n'
import { CountUp, EASE, FadeIn, RevealTitle, ScrambleText, SectionHead } from './ui'

const hex = (n) => '0x' + n.toString(16).toUpperCase().padStart(2, '0')

export default function InstructionSet() {
  const { t } = useLang()
  const gridRef = useRef(null)
  const inView = useInView(gridRef, { once: true, margin: '-12% 0px' })
  const statsRef = useRef(null)
  const statsIn = useInView(statsRef, { once: true, margin: '-10% 0px' })
  const total = isa.banks.reduce((n, b) => n + b.items.length, 0)

  return (
    <section id="isa" data-section="isa" className="relative border-t border-line px-5 py-28 sm:px-8 lg:px-12 lg:py-40">
      <div className="mx-auto max-w-[1440px]">
        <SectionHead addr="0x20" layer={`L2 · ${t(ui.layerNames.isa)}`} meta={`${total} OPS · ${isa.banks.length} BANKS`} />
        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:items-end">
          <RevealTitle lines={t(isa.title)} className="text-[clamp(44px,12vw,132px)] lg:text-[clamp(52px,6.6vw,118px)]" />
          <FadeIn delay={0.15}>
            <p className="max-w-[470px] text-[17px] leading-[1.8] text-ash">{t(isa.intro)}</p>
          </FadeIn>
        </div>

        <div ref={gridRef} className="relative mt-20 grid grid-cols-1 border-l border-t border-line sm:grid-cols-2 lg:grid-cols-5">
          {/* write-head sweeping across the register file during decode */}
          <motion.div
            className="pointer-events-none absolute bottom-0 top-0 z-10 hidden w-px bg-copper shadow-[0_0_18px_4px_rgba(232,116,59,0.5)] lg:block"
            initial={{ left: '0%', opacity: 0 }}
            animate={inView ? { left: ['0%', '100%'], opacity: [0, 1, 1, 0] } : {}}
            transition={{ duration: 1.5, ease: [0.45, 0, 0.2, 1], times: [0, 0.1, 0.9, 1] }}
          />
          {isa.banks.map((b, bi) => (
            <div key={b.reg} className="border-b border-r border-line">
              <div className="flex items-baseline justify-between gap-3 border-b border-line px-5 py-4">
                <div className="flex min-w-0 items-baseline gap-3">
                  <span className="font-mono text-[12px] text-copper">{b.reg}</span>
                  <span className="type-label truncate text-bone">{t(b.name)}</span>
                </div>
                <span className="font-mono text-[11px] text-dim">{String(b.items.length).padStart(2, '0')}</span>
              </div>
              <ul className="px-5 py-4">
                {b.items.map((item, ii) => (
                  <li key={item} className="flex items-baseline gap-4 py-[7px] font-mono text-[13px]">
                    <span className="w-9 shrink-0 text-dim">{hex(bi * 16 + ii)}</span>
                    <ScrambleText text={item} run={inView} delay={bi * 260 + ii * 45} duration={620} className="text-bone" />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div ref={statsRef} className="mt-24 grid grid-cols-2 border-t border-line lg:grid-cols-4">
          {isa.stats.map((s, i) => (
            <motion.div
              key={i}
              className="border-b border-line py-8 pr-6 lg:border-b-0 lg:border-r lg:px-8 lg:first:pl-0 lg:last:border-r-0"
              initial={{ opacity: 0, y: 20 }}
              animate={statsIn ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: i * 0.1, ease: EASE }}
            >
              <CountUp to={s.value} run={statsIn} className="type-display block text-[clamp(64px,7vw,120px)] text-bone" />
              <span className="type-label mt-4 block text-ash">{t(s.label)}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
