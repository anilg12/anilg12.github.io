import { useCallback, useState } from 'react'
import { LangProvider } from './lib/i18n'
import { useLenis } from './lib/lenis'
import Boot from './components/Boot'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Stack from './components/Stack'
import InstructionSet from './components/InstructionSet'
import Processes from './components/Processes'
import Signatures from './components/Signatures'
import Terminal from './components/Terminal'
import Footer from './components/Footer'

function Site() {
  const [booted, setBooted] = useState(false)
  useLenis(booted)
  const onBooted = useCallback(() => setBooted(true), [])
  return (
    <>
      <Boot onDone={onBooted} />
      <Nav booted={booted} />
      <main>
        <Hero booted={booted} />
        <Stack />
        <InstructionSet />
        <Processes />
        <Signatures />
        <Terminal />
      </main>
      <Footer />
      <div className="grain" aria-hidden />
    </>
  )
}

export default function App() {
  return (
    <LangProvider>
      <Site />
    </LangProvider>
  )
}
