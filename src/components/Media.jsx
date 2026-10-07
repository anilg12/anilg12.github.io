import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useLang } from '../lib/i18n'

/* Plays a list of clips back to back while `play` is true; tabs double as progress bars. */
export function ClipPlayer({ clips, play, fit = 'cover' }) {
  const { lang, t } = useLang()
  const [idx, setIdx] = useState(0)
  const video = useRef(null)
  const fills = useRef([])
  const src = (i) => clips[i].src.replace('{lang}', lang)

  useEffect(() => {
    const v = video.current
    if (!v) return
    if (play) v.play().catch(() => {})
    else v.pause()
  }, [play, idx, lang])

  useEffect(() => {
    fills.current.forEach((f, i) => f && (f.style.transform = `scaleX(${i < idx ? 1 : 0})`))
    if (!play) return
    let raf = 0
    const tick = () => {
      const v = video.current
      const f = fills.current[idx]
      if (v && f && v.duration) f.style.transform = `scaleX(${Math.min(1, v.currentTime / v.duration)})`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [play, idx])

  return (
    <div className="relative w-full">
      <div className="relative aspect-[16/10] overflow-hidden bg-[#0b0b0e]">
        <video
          key={src(idx)}
          ref={video}
          className={`absolute inset-0 h-full w-full ${fit === 'cover' ? 'object-cover object-top' : 'object-contain'}`}
          src={`${src(idx)}.mp4`}
          poster={`${src(idx)}.webp`}
          muted
          playsInline
          autoPlay={play}
          preload={play ? 'auto' : 'none'}
          onEnded={() => setIdx((i) => (i + 1) % clips.length)}
          aria-label={t(clips[idx].label)}
        />
      </div>
      {clips.length > 1 && (
        <div className="grid shrink-0 gap-3 border-t border-line px-4 py-3" style={{ gridTemplateColumns: `repeat(${clips.length}, minmax(0, 1fr))` }}>
          {clips.map((c, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIdx(i)}
              className={`flex min-w-0 flex-col gap-2 text-left font-mono text-[10px] uppercase tracking-[0.14em] transition-colors duration-300 ${i === idx ? 'text-bone' : 'text-dim hover:text-ash'}`}
            >
              <span className="truncate">{t(c.label)}</span>
              <span className="relative h-[2px] overflow-hidden bg-line-hi">
                <span
                  ref={(el) => (fills.current[i] = el)}
                  className="absolute inset-0 origin-left bg-copper"
                  style={{ transform: `scaleX(${i < idx ? 1 : 0})` }}
                />
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

/* Slow push-in on a single screenshot. */
export function KenBurns({ src, alt, play, fit = 'cover' }) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#0b0b0e]">
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        className={`absolute inset-0 h-full w-full ${fit === 'cover' ? 'object-cover object-left-top' : 'object-contain'}`}
        animate={play ? { scale: [1, 1.08] } : { scale: 1 }}
        transition={{ duration: 14, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }}
      />
    </div>
  )
}

/* Cross-fades through screenshots while playing. */
export function ImageSwap({ images, play }) {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (!play) return
    const id = setInterval(() => setI((n) => (n + 1) % images.length), 4200)
    return () => clearInterval(id)
  }, [play, images.length])
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#0b0b0e]">
      <AnimatePresence initial={false}>
        <motion.img
          key={images[i].src}
          src={images[i].src}
          alt={images[i].alt}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover object-left-top"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        />
      </AnimatePresence>
      <div className="absolute bottom-3 right-3 flex gap-1.5">
        {images.map((img, n) => (
          <span key={img.src} className={`h-1 w-5 transition-colors duration-500 ${n === i ? 'bg-copper' : 'bg-line-hi'}`} />
        ))}
      </div>
    </div>
  )
}

/* A base screenshot with a poster card floating above it (moves on its own layer). */
export function Layered({ base, card, play, shift = 0 }) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#0b0b0e]">
      <img src={base.src} alt={base.alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-80" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-void/70" />
      <motion.img
        src={card.src}
        alt={card.alt}
        loading="lazy"
        className="absolute bottom-[-6%] right-[6%] w-[34%] border border-line-hi shadow-[0_40px_80px_rgba(0,0,0,0.6)]"
        style={{ x: shift }}
        animate={play ? { y: [0, -10, 0] } : { y: 0 }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

export function ProjectMedia({ project, play, shift = 0 }) {
  const m = project.media
  if (m.type === 'clips') return <ClipPlayer clips={m.clips} play={play} fit={project.id === 'oblivion' ? 'contain' : 'cover'} />
  let inner = null
  if (m.type === 'image') inner = <KenBurns src={m.src} alt={m.alt} play={play} />
  if (m.type === 'images') inner = <ImageSwap images={m.images} play={play} />
  if (m.type === 'layered') inner = <Layered base={m.base} card={m.card} play={play} shift={shift} />
  return <div className="relative aspect-[16/10] w-full">{inner}</div>
}
