'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { PROJECTS } from '../../data/projects'
import { README_TEXT, OPERATOR_NAME } from '../../data/content'
import type { Directory } from '../../data/types'

interface TerminalViewProps {
  onSwitchToOffice: () => void
}

export function TerminalView({ onSwitchToOffice }: TerminalViewProps) {
  const [currentDirectory, setCurrentDirectory] = useState<Directory>('root')
  const [cursorIndex, setCursorIndex] = useState(0)
  const [readmeText, setReadmeText] = useState('')
  const [selectedProject, setSelectedProject] = useState<{ label: string; href: string } | null>(null)
  const [bootText, setBootText] = useState('')
  const terminalRef = useRef<HTMLDivElement | null>(null)
  const readmeTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    terminalRef.current?.focus()
    const fullBoot = 'BOOT SEQUENCE COMPLETE. WELCOME, OPERATOR.'
    let i = 0
    const timer = setInterval(() => {
      i++
      setBootText(fullBoot.slice(0, i))
      if (i >= fullBoot.length) clearInterval(timer)
    }, 28)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (!selectedProject) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProject(null)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [selectedProject])

  // Typewriter effect when entering readme directory
  useEffect(() => {
    if (currentDirectory !== 'readme') {
      if (readmeTimerRef.current) clearInterval(readmeTimerRef.current)
      setReadmeText('')
      return
    }
    setReadmeText('')
    let index = 0
    readmeTimerRef.current = setInterval(() => {
      index++
      setReadmeText(README_TEXT.slice(0, index))
      if (index >= README_TEXT.length && readmeTimerRef.current) clearInterval(readmeTimerRef.current)
    }, 8)
    return () => { if (readmeTimerRef.current) clearInterval(readmeTimerRef.current) }
  }, [currentDirectory])

  const goToRoot = useCallback(() => {
    setCurrentDirectory('root')
    setCursorIndex(0)
  }, [])

  const directoryItems = {
    root: [
      { label: '[DIR] SYS_ARCHIVE/', detail: 'project links', action: 'sys' as Directory },
      { label: '[DIR] LINKS/', detail: 'external links', action: 'links' as Directory },
      { label: '[FILE] README.TXT', detail: 'about the operator', action: 'readme' as Directory },
    ],
    sys: PROJECTS.map(p => ({ label: p.label, detail: p.detail, href: p.href })),
    links: [
      { label: '[GITHUB PROFILE]', detail: 'ajeerahazali', href: 'https://github.com/ajeerahazali' },
      { label: '[LINKEDIN PROFILE]', detail: 'linkedin.com/in/ajeerahazali', href: 'https://www.linkedin.com/in/ajeerahazali/' },
      { label: '[SECURE COMM EMAIL]', detail: 'ajeerahazali@gmail.com', href: 'mailto:ajeerahazali@gmail.com' },
    ],
    readme: [],
  }

  return (
    <>
    <section className="relative flex aspect-video w-full max-w-5xl flex-col overflow-hidden border border-emerald-400/50 bg-black p-5 font-mono text-emerald-100 shadow-[0_0_60px_rgba(34,197,94,.16)] scanlines sm:p-9" aria-label="CRT terminal">
      <div className="pointer-events-none absolute inset-0 bg-emerald-400/[.025]" />
      <header className="relative flex items-start justify-between border-b border-emerald-400/40 pb-3 text-xs sm:text-sm">
        <div><div className="font-bold tracking-[.22em]">{OPERATOR_NAME} // WORKSTATION</div></div>
        <div className="text-right text-[10px] opacity-70">LOCATION: KLANG, MY<br />STATUS: ACTIVE</div>
      </header>
      <div className="relative flex-1 overflow-auto py-5 text-xs leading-7 sm:text-sm"
        ref={terminalRef} tabIndex={0}
        onKeyDown={(e) => {
          const back = currentDirectory !== 'root'
          const items = directoryItems[currentDirectory]
          const maxI = back ? items.length : items.length - 1
          if (e.key === 'ArrowDown') { e.preventDefault(); setCursorIndex(i => Math.min(i + 1, maxI)) }
          if (e.key === 'ArrowUp') { e.preventDefault(); setCursorIndex(i => Math.max(i - 1, 0)) }
          if (e.key === 'Enter') {
            if (back && cursorIndex === 0) { goToRoot(); return }
            const idx = back ? cursorIndex - 1 : cursorIndex
            const item = items[idx]
            if (item && 'action' in item) setCurrentDirectory(item.action)
            else if (item && 'href' in item) {
              if (currentDirectory === 'links') {
                window.open(item.href, '_blank', 'noopener,noreferrer')
              } else if (item.href.startsWith('mailto:')) {
                window.location.href = item.href
              } else {
                setSelectedProject({ label: item.label, href: item.href })
              }
            }
          }
          if (e.key === 'Backspace') { e.preventDefault(); if (back) goToRoot() }
          if (e.key === 'Escape') {
            if (selectedProject) { setSelectedProject(null); return }
            onSwitchToOffice(); setCurrentDirectory('root'); setCursorIndex(0)
          }
        }}
      >
        {currentDirectory === 'root' && (
          <>
            <div className="opacity-70">{bootText}</div>
            <div className="mb-4 opacity-70">SELECT A DIRECTORY TO CONTINUE<span className="animate-blink">_</span></div>
          </>
        )}
        {currentDirectory !== 'root' && (
          <div onMouseEnter={() => setCursorIndex(0)} className={`mb-2 block text-left ${cursorIndex === 0 ? 'bg-emerald-400 text-black' : ''} hover:bg-emerald-400 hover:text-black`}>
            <button onClick={goToRoot} className="w-full text-left"><span>{cursorIndex === 0 ? '▸ ' : '  '}[BACK] ROOT DIRECTORY</span></button>
          </div>
        )}
        {currentDirectory !== 'readme' && (
          <div className="grid gap-1">
            {directoryItems[currentDirectory].map((item, i) => {
              const idx = currentDirectory !== 'root' ? i + 1 : i
              const isHovered = idx === cursorIndex
              return 'action' in item ? (
                <div key={item.label} onMouseEnter={() => setCursorIndex(idx)} className={isHovered ? 'bg-emerald-400 text-black' : 'hover:bg-emerald-400 hover:text-black'}><button onClick={() => { setCurrentDirectory(item.action); setCursorIndex(0) }} className="group block w-full max-w-2xl text-left"><span>{isHovered ? '▸ ' : '  '}{item.label}</span><span className={`ml-3 ${isHovered ? 'opacity-100' : 'opacity-50'}`}>{item.detail}</span></button></div>
              ) : currentDirectory === 'sys' ? (
                  <div key={item.label} onMouseEnter={() => setCursorIndex(idx)} className={isHovered ? 'bg-emerald-400 text-black' : 'hover:bg-emerald-400 hover:text-black'}><button onClick={() => setSelectedProject({ label: item.label, href: item.href })} className="group block w-full max-w-2xl text-left"><span>{isHovered ? '▸ ' : '  '}{item.label}</span><span className={`ml-3 ${isHovered ? 'opacity-100' : 'opacity-50'}`}>{item.detail}</span></button></div>
                ) : <div key={item.label} onMouseEnter={() => setCursorIndex(idx)} className={isHovered ? 'bg-emerald-400 text-black' : 'hover:bg-emerald-400 hover:text-black'}><a href={item.href} target="_blank" rel="noreferrer" className="group block w-full max-w-2xl text-left"><span>{isHovered ? '▸ ' : '  '}{item.label}</span><span className={`ml-3 ${isHovered ? 'opacity-100' : 'opacity-50'}`}>{item.detail}</span></a></div>
            })}
          </div>
        )}
        {currentDirectory === 'readme' && (
          <pre className="whitespace-pre-wrap border-l border-emerald-400/50 pl-4 text-base leading-7">{readmeText}<span className="animate-blink">█</span></pre>
        )}
      </div>
      <button onClick={() => { onSwitchToOffice(); setCurrentDirectory('root') }} className="relative self-end border border-emerald-400/70 px-3 py-2 text-[11px] hover:bg-emerald-400 hover:text-black">[ESC] DISCONNECT TERMINAL</button>
    </section>
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white">
          <div className="flex items-center justify-between bg-black/90 px-4 py-2 text-xs text-emerald-100">
            <span className="font-bold tracking-wider">VIEWING: {selectedProject.label}</span>
            <button onClick={() => setSelectedProject(null)} className="hover:text-emerald-300" aria-label="Close iframe">[CLOSE]</button>
          </div>
          <iframe src={selectedProject.href} className="w-full flex-1" title={selectedProject.label} />
        </div>
      )}
    </>
  )
}