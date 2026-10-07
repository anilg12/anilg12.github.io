import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { hero, stack, ui } from '../data/content'
import { useLang } from '../lib/i18n'
import { FadeIn, RevealTitle, SectionHead } from './ui'

function Layer({ layer, index }) {
  const { t } = useLang()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 78%', 'start 42%'] })
  const opacity = useTransform(scrollYProgress, [0, 1], [0.18, 1])
  const x = useTransform(scrollYProgress, [0, 1], [28, 0])
  const led = useTransform(scrollYProgress, [0.7, 1], [0, 1])

  return (
    <motion.article ref={ref} style={{ opacity }} className="relative pb-24 pl-12 last:pb-4 sm:pl-16">
      <motion.span
        style={{ opacity: led }}
        className="absolute left-[3px] top-[7px] h-[9px] w-[9px] rounded-full bg-phosphor shadow-[0_0_14px_3px_rgba(125,255,177,0.55)]"
      />
      <motion.div style={{ x }}>
        <div className="type-label flex items-center gap-4 text-ash">
          <span className="text-copper">{layer.addr}</span>
          <span>L{index}</span>
        </div>
        <h3 className="type-display mt-4 break-words text-[clamp(34px,3.7vw,64px)] text-bone">{t(layer.name)}</h3>
        <p className="mt-6 max-w-[560px] text-[16px] leading-[1.75] text-ash sm:text-[17px]">{t(layer.body)}</p>
        <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[12px] text-bone/85">
          {layer.tech.map((x, i) => (
            <span key={x} className="flex items-center gap-3">
              {i > 0 && <span className="text-dim">/</span>}
              {x}
            </span>
          ))}
        </p>
      </motion.div>
    </motion.article>
  )
}

export default function Stack() {
  const { t } = useLang()
  const listRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 62%', 'end 58%'] })
  const packetTop = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section id="stack" data-section="stack" className="relative px-5 pb-28 pt-28 sm:px-8 lg:px-12 lg:pb-40 lg:pt-40">
      <div className="mx-auto max-w-[1440px]">
        <SectionHead addr="0x10" layer={`L1 · ${t(ui.layerNames.stack)}`} meta={t(stack.direction)} />
        <div className="mt-16 grid grid-cols-1 gap-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
          <div className="min-w-0 lg:sticky lg:top-32 lg:self-start">
            <RevealTitle lines={t(stack.title)} className="text-[clamp(38px,10.8vw,96px)] lg:text-[clamp(42px,5.1vw,90px)]" />
            <FadeIn delay={0.15}>
              <p className="mt-12 max-w-[540px] text-[17px] leading-[1.8] text-ash">{t(stack.intro)}</p>
            </FadeIn>
            <FadeIn delay={0.25}>
              <div className="mt-12 border-l border-copper pl-5 font-mono text-[12px] leading-[2] text-ash sm:text-[13px]">
                {hero.motto.split(' → ').map((part, i) => (
                  <div key={part}>
                    <span className="text-dim">{`0x0${i}`}</span>
                    <span className="px-3 text-copper">→</span>
                    <span className="text-bone">{part}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          <div ref={listRef} className="relative min-w-0">
            <div className="absolute bottom-0 left-[7px] top-[11px] w-px bg-line" />
            <motion.div className="absolute bottom-0 left-[7px] top-[11px] w-px origin-top bg-copper" style={{ scaleY: scrollYProgress }} />
            <motion.div
              className="absolute left-0 z-10 h-[15px] w-[15px] -translate-y-1/2 rounded-full bg-copper-hi shadow-[0_0_26px_7px_rgba(232,116,59,0.55)]"
              style={{ top: packetTop }}
            />
            {stack.layers.map((l, i) => (
              <Layer key={l.addr} layer={l} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
