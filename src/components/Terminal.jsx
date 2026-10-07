import { useEffect, useRef, useState } from 'react'
import { isa, person, projects, ssh, ui } from '../data/content'
import { useLang } from '../lib/i18n'
import { Arrow, FadeIn, RevealTitle, SectionHead } from './ui'

const PROMPT = 'guest@anilgul:~$'

function useCommands() {
  const { lang, t } = useLang()
  const tr = lang === 'tr'
  return (raw) => {
    const cmd = raw.trim().replace(/\s+/g, ' ')
    const low = cmd.toLowerCase()
    if (!low) return { out: [] }
    if (low === 'clear') return { clear: true }
    if (low === 'help')
      return {
        out: [
          tr ? 'kullanılabilir komutlar:' : 'available commands:',
          '  whoami     ' + (tr ? 'ben kimim' : 'who I am'),
          '  projects   ' + (tr ? 'yayındaki süreçler' : 'shipped processes'),
          '  skills     ' + (tr ? 'komut seti' : 'instruction set'),
          '  contact    ' + (tr ? 'iletişim kanalları' : 'contact channels'),
          '  cv         ' + (tr ? 'özgeçmişi aç' : 'open my résumé'),
          '  ls · date · echo · clear',
          '  sudo hire anil',
        ],
      }
    if (low === 'whoami')
      return {
        out: [
          tr ? 'anıl gül — sistem & yazılım mühendisi' : 'anıl gül — systems & software engineer',
          tr ? 'malatya, tr · d. 2002 · kapadokya üni. ybs mezunu' : 'malatya, tr · b. 2002 · kapadokya univ. MIS graduate',
          'bare-metal → HAL → kernel → backend → microservices',
        ],
      }
    if (low === 'projects' || low === 'ps')
      return {
        out: [
          'PID   PROCESS     VERSION       PLATFORM',
          ...projects.map((p) => `${p.pid}  ${p.name.toLowerCase().padEnd(11)} ${p.version.padEnd(13)} ${p.platform}`),
          tr ? '→ kaynak kodlar: github.com/anilg12' : '→ source: github.com/anilg12',
        ],
      }
    if (low === 'skills') return { out: isa.banks.map((b) => `${b.reg} ${t(b.name).padEnd(20)} ${b.items.join(', ')}`) }
    if (low === 'contact')
      return { out: [`email     ${person.email}`, `github    ${person.githubLabel}`, `linkedin  ${person.linkedinLabel}`] }
    if (low === 'cv') {
      window.open(t(person.cv), '_blank', 'noopener')
      return { out: [(tr ? 'açılıyor: ' : 'opening: ') + t(person.cv).split('/').pop()] }
    }
    if (low === 'ls') return { out: ['projects/   certificates/   cv.pdf   contact.txt   README.md'] }
    if (low === 'date') return { out: [new Date().toString()] }
    if (low.startsWith('echo ')) return { out: [cmd.slice(5)] }
    if (low === 'sudo hire anil' || low === 'sudo hire') {
      setTimeout(() => {
        window.location.href = `mailto:${person.email}?subject=${encodeURIComponent(tr ? 'Merhaba Anıl — bir görüşme' : 'Hello Anıl — let’s talk')}`
      }, 1400)
      return {
        out: [
          `[sudo] password for recruiter: ********`,
          tr ? 'erişim verildi ✓  e-posta istemcisi açılıyor…' : 'access granted ✓  opening mail client…',
        ],
      }
    }
    if (low.startsWith('sudo')) return { out: [tr ? 'güzel deneme. önce: sudo hire anil' : 'nice try. first: sudo hire anil'] }
    return { out: [`${tr ? 'komut bulunamadı' : 'command not found'}: ${cmd} — ${tr ? "'help' yazın" : "try 'help'"}`] }
  }
}

function Shell() {
  const { t, lang } = useLang()
  const run = useCommands()
  const [lines, setLines] = useState([])
  const [input, setInput] = useState('')
  const out = useRef(null)
  const field = useRef(null)

  useEffect(() => {
    const login = new Date().toLocaleString(lang === 'tr' ? 'tr-TR' : 'en-GB', { dateStyle: 'medium', timeStyle: 'short' })
    setLines([
      { k: 'sys', text: `${lang === 'tr' ? 'Son giriş' : 'Last login'}: ${login} on ttys001` },
      { k: 'sys', text: lang === 'tr' ? "anil@gul'e hoş geldiniz — 'help' yazın." : "Welcome to anil@gul — type 'help'." },
    ])
  }, [lang])

  useEffect(() => {
    if (out.current) out.current.scrollTop = out.current.scrollHeight
  }, [lines])

  const exec = (raw) => {
    const res = run(raw)
    if (res.clear) {
      setLines([])
      return
    }
    setLines((l) => [...l, { k: 'cmd', text: raw }, ...res.out.map((text) => ({ k: 'out', text }))])
  }

  return (
    <div className="flex h-full flex-col border border-line-hi bg-panel">
      <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
        <span className="h-2 w-2 rounded-full bg-line-hi" />
        <span className="h-2 w-2 rounded-full bg-line-hi" />
        <span className="h-2 w-2 rounded-full bg-line-hi" />
        <span className="ml-3 font-mono text-[11px] text-ash">ssh guest@anilgul — 80×24</span>
      </div>
      <div
        ref={out}
        data-lenis-prevent
        className="h-[320px] overflow-y-auto px-5 py-4 font-mono text-[12.5px] leading-[1.75] sm:h-[360px]"
        onClick={() => field.current?.focus({ preventScroll: true })}
      >
        {lines.map((l, i) => (
          <div key={i} className={`whitespace-pre-wrap break-words ${l.k === 'sys' ? 'text-ash' : l.k === 'cmd' ? 'text-bone' : 'text-bone/70'}`}>
            {l.k === 'cmd' && <span className="mr-2 text-copper">{PROMPT}</span>}
            {l.text}
          </div>
        ))}
        <form
          className="flex items-center"
          onSubmit={(e) => {
            e.preventDefault()
            exec(input)
            setInput('')
          }}
        >
          <label htmlFor="shell" className="mr-2 shrink-0 text-copper">
            {PROMPT}
          </label>
          <input
            id="shell"
            ref={field}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            placeholder={t(ssh.terminal.placeholder)}
            className="min-w-0 flex-1 bg-transparent text-bone caret-copper outline-none placeholder:text-dim"
          />
        </form>
      </div>
      <div className="border-t border-line px-4 py-3">
        <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.16em] text-dim">{t(ssh.terminal.hint)}</div>
        <div className="flex flex-wrap gap-2">
          {ssh.terminal.suggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => exec(s)}
              className="border border-line-hi px-2.5 py-1 font-mono text-[11px] text-ash transition-colors duration-300 hover:border-copper hover:text-bone"
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function Channel({ label, value, href, action, download }) {
  const ext = /^https?:/.test(href)
  return (
    <div className="group grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-2 border-b border-line py-5 sm:flex sm:justify-between sm:gap-6 sm:py-6">
      <span className="type-label col-span-2 shrink-0 text-ash sm:col-span-1 sm:w-28">{label}</span>
      <a
        href={href}
        target={ext ? '_blank' : undefined}
        rel={ext ? 'noreferrer' : undefined}
        download={download ? '' : undefined}
        className="min-w-0 flex-1 truncate text-[18px] text-bone transition-colors duration-300 hover:text-copper-hi sm:text-[22px]"
      >
        {value}
      </a>
      {action || <Arrow down={download} className="shrink-0 text-ash transition-colors group-hover:text-copper" />}
    </div>
  )
}

export default function Terminal() {
  const { t, lang } = useLang()
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(person.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${person.email}`
    }
  }

  return (
    <section id="ssh" data-section="ssh" className="relative border-t border-line px-5 py-28 sm:px-8 lg:px-12 lg:py-40">
      <div className="mx-auto max-w-[1440px]">
        <SectionHead addr="0xFF" layer={`L5 · ${t(ui.layerNames.ssh)}`} meta="PORT 22 · OPEN" />
        <RevealTitle lines={t(ssh.title)} className="mt-16 text-[clamp(56px,10vw,184px)]" />
        <div className="mt-20 grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-20">
          <FadeIn>
            <p className="max-w-[520px] text-[18px] leading-[1.75] text-ash">{t(ssh.intro)}</p>
            <div className="mt-10 border-t border-line-hi">
              <Channel
                label={t(ssh.channels.email)}
                value={person.email}
                href={`mailto:${person.email}`}
                action={
                  <button
                    type="button"
                    onClick={copy}
                    className="shrink-0 border border-line-hi px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ash transition-colors hover:border-copper hover:text-bone"
                  >
                    {copied ? t(ssh.channels.copied) : t(ssh.channels.copy)}
                  </button>
                }
              />
              <Channel label="GitHub" value={person.githubLabel} href={person.github} />
              <Channel label="LinkedIn" value={person.linkedinLabel} href={person.linkedin} />
              <Channel label={t(ssh.channels.cv)} value={`CV_Anil_Gul_${lang.toUpperCase()}.pdf`} href={t(person.cv)} download />
            </div>
          </FadeIn>
          <FadeIn delay={0.12}>
            <Shell />
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
