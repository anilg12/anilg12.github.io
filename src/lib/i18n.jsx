import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const LangContext = createContext({ lang: 'tr', setLang: () => {}, t: (v) => v })

function initialLang() {
  try {
    const saved = localStorage.getItem('ag.lang')
    if (saved === 'tr' || saved === 'en') return saved
  } catch {
    /* storage unavailable */
  }
  return 'tr'
}

export function LangProvider({ children }) {
  const [lang, setLang] = useState(initialLang)

  useEffect(() => {
    document.documentElement.lang = lang
    try {
      localStorage.setItem('ag.lang', lang)
    } catch {
      /* storage unavailable */
    }
  }, [lang])

  // A value is either a plain string or { tr, en }.
  const t = useCallback((v) => (v && typeof v === 'object' && !Array.isArray(v) && 'tr' in v ? v[lang] : v), [lang])

  const value = useMemo(() => ({ lang, setLang, t }), [lang, t])
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export const useLang = () => useContext(LangContext)
