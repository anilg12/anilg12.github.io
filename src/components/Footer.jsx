import { footer } from '../data/content'
import { useLang } from '../lib/i18n'
import { scrollToId } from '../lib/lenis'
import { RevealTitle } from './ui'

export default function Footer() {
  const { t } = useLang()
  return (
    <footer data-section="ssh" className="relative overflow-hidden border-t border-line px-5 pb-10 pt-28 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1440px]">
        <p className="type-label flex items-center gap-3 text-ash">
          <span className="text-copper">0xFFFF</span>
          <span>HALT</span>
        </p>
        <RevealTitle lines={[t(footer.halt)]} className="mt-8 text-[clamp(44px,8.5vw,160px)]" as="p" />
        <p className="mt-8 flex items-center gap-3 font-mono text-[13px] text-ash">
          <span className="caret inline-block h-[13px] w-[7px] bg-copper" />
          {t(footer.safe)}
        </p>
        <div className="type-label mt-24 flex flex-col gap-4 border-t border-line pt-6 text-dim md:flex-row md:items-center md:justify-between">
          <span>{t(footer.rights)}</span>
          <span>React · Three.js · Motion · v4.0</span>
          <button type="button" onClick={() => scrollToId('top')} className="text-left text-ash transition-colors hover:text-bone md:text-right">
            {t(footer.top)} ↑
          </button>
        </div>
      </div>
    </footer>
  )
}
