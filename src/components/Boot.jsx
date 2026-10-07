import { useCallback, useEffect, useRef, useState } from 'react'
import { animate, motion } from 'motion/react'
import { boot, ui } from '../data/content'
import { useLang } from '../lib/i18n'
import { power } from '../lib/store'

const LINE_GAP = 175
const MEM_TOTAL = 32768

/* Power-On Self-Test screen. Any key / click / wheel skips straight to power-on. */
export default function Boot({ onDone }) {
  const { t } = useLang()
  const [shown, setShown] = useState(0)
  const [mem, setMem] = useState(0)
  const [phase, setPhase] = useState('post') // post → on → gone
  const done = useRef(false)

  const finish = useCallback(() => {
    if (done.current) return
    done.current = true
    setShown(boot.lines.length)
    setMem(MEM_TOTAL)
    setPhase('on')
    setTimeout(() => {
      onDone()
      animate(power, 1, { duration: 2.8, ease: [0.3, 0, 0.15, 1] })
    }, 360)
    setTimeout(() => setPhase('gone'), 1400)
  }, [onDone])

  useEffect(() => {
    const timers = boot.lines.map((_, i) => setTimeout(() => setShown(i + 1), 160 + i * LINE_GAP))
    const memCtl = animate(0, MEM_TOTAL, { duration: 0.85, delay: 0.5, ease: 'easeOut', onUpdate: (v) => setMem(Math.round(v)) })
    timers.push(setTimeout(finish, 160 + boot.lines.length * LINE_GAP + 560))
    const skip = () => finish()
    const events = ['keydown', 'pointerdown', 'wheel', 'touchstart']
    events.forEach((e) => window.addEventListener(e, skip, { passive: true }))
    return () => {
      timers.forEach(clearTimeout)
      memCtl.stop()
      events.forEach((e) => window.removeEventListener(e, skip))
    }
  }, [finish])

  if (phase === 'gone') return null
  const on = phase === 'on'

  return (
    <div className="fixed inset-0 z-[100]" aria-hidden={on}>
      <motion.div
        className="absolute inset-0 bg-void"
        animate={{ opacity: on ? 0 : 1 }}
        transition={{ duration: 0.75, delay: on ? 0.42 : 0, ease: 'easeOut' }}
      />

      <motion.div
        className="absolute inset-0 flex items-center justify-center px-6"
        animate={on ? { scaleY: 0.004, opacity: 0 } : { scaleY: 1, opacity: 1 }}
        transition={{ duration: 0.34, ease: [0.7, 0, 0.84, 0] }}
      >
        <div className="w-full max-w-[760px] font-mono text-[12px] leading-[1.95] sm:text-[13px]">
          <div className="mb-7 flex items-center justify-between border-b border-line pb-3 text-ash">
            <span>
              <span className="text-copper">ANIL GÜL</span> · PORTFOLIO v4
            </span>
            <span>POST · 0x0000</span>
          </div>
          {boot.lines.map((l, i) =>
            i < shown ? (
              <div key={l.k} className="flex gap-4 sm:gap-6">
                <span className="w-[86px] shrink-0 text-ash sm:w-[104px]">{l.k}</span>
                <span className="min-w-0 text-bone">
                  {l.v === 'mem' ? (
                    <>
                      <span className="tabular-nums">{String(mem).padStart(5, '0')}K</span>{' '}
                      {mem >= MEM_TOTAL && <span className="text-phosphor">OK</span>}
                    </>
                  ) : (
                    t(l.v)
                  )}
                  {l.ok && (
                    <>
                      <span className="text-dim"> ........ </span>
                      <span className="text-phosphor">[ OK ]</span>
                    </>
                  )}
                </span>
              </div>
            ) : null,
          )}
          <div className="mt-7 flex items-center gap-3 text-ash">
            <span className="caret inline-block h-[14px] w-[8px] bg-bone" />
            <span>{t(ui.skipBoot)}</span>
          </div>
        </div>
      </motion.div>

      {/* CRT power-on: a line sweeps across, then blooms open */}
      <motion.div
        className="absolute left-0 top-1/2 h-[2px] w-full origin-center bg-copper-hi"
        style={{ boxShadow: '0 0 28px 6px rgba(255,178,122,0.65)' }}
        initial={{ scaleX: 0, scaleY: 1, opacity: 0 }}
        animate={on ? { scaleX: [0, 1, 1], scaleY: [1, 1, 280], opacity: [1, 1, 0] } : {}}
        transition={{ duration: 0.9, times: [0, 0.32, 1], ease: 'easeOut', delay: 0.2 }}
      />
    </div>
  )
}
