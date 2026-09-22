'use client'

import { useState } from 'react'
import { OfficeView } from '../components/office/OfficeView'
import { TerminalView } from '../components/terminal/TerminalView'

export default function WorkspacePage() {
  const [viewMode, setViewMode] = useState<'office' | 'computer'>('office')
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  const openComputer = () => {
    window.setTimeout(() => setViewMode('computer'), 420)
  }

  const toggleTheme = () => {
    setTheme(t => (t === 'light' ? 'dark' : 'light'))
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#101713] text-[#dce9d7] selection:bg-emerald-400/30">
      <div className="relative flex min-h-screen items-center justify-center px-3 py-10 sm:px-8">
        <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_50%_20%,#345a42,transparent_48%)]" />
        {viewMode === 'office' ? (
          <OfficeView
            onOpenComputer={openComputer}
            theme={theme}
            toggleTheme={toggleTheme}
          />
        ) : (
          <TerminalView
            onSwitchToOffice={() => { setViewMode('office') }}
          />
        )}
      </div>
    </main>
  )
}