'use client'

import { useState, useEffect, useRef } from 'react'
import { playTone } from '../../lib/audio'
import type { ModalType } from '../../data/types'
import { Modal } from '../modal/Modal'

interface OfficeViewProps {
  onOpenComputer: () => void
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

export function OfficeView({ onOpenComputer, theme, toggleTheme }: OfficeViewProps) {
  const [focusedZone, setFocusedZone] = useState(-1)
  const [hoveredHotspot, setHoveredHotspot] = useState<string | null>(null)
  const [activeModal, setActiveModal] = useState<ModalType>(null)
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 })
  const [logText, setLogText] = useState('Click around the office to explore.')
  const [zoom, setZoom] = useState({ active: false, scale: 1, originX: 50, originY: 50 })
  const zoomTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => () => { if (zoomTimer.current) clearTimeout(zoomTimer.current) }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (zoom.active || activeModal) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    setParallaxOffset({ x: (x - 0.5) * 12, y: (y - 0.5) * 8 })
  }

  const handleHotspotClick = (e: React.MouseEvent<HTMLButtonElement>, action: () => void) => {
    if (zoomTimer.current) return
    const section = e.currentTarget.closest('section')!
    const rect = section.getBoundingClientRect()
    const btnRect = e.currentTarget.getBoundingClientRect()
    const originX = ((btnRect.left + btnRect.width / 2 - rect.left) / rect.width) * 100
    const originY = ((btnRect.top + btnRect.height / 2 - rect.top) / rect.height) * 100
    setZoom({ active: true, scale: 1.15, originX, originY })
    setParallaxOffset({ x: 0, y: 0 })
    zoomTimer.current = setTimeout(() => {
      setZoom({ active: false, scale: 1, originX: 50, originY: 50 })
      zoomTimer.current = null
      action()
    }, 300)
  }

  const typeLog = (text: string) => {
    setLogText('')
    let index = 0
    const timer = window.setInterval(() => {
      index += 1
      setLogText(text.slice(0, index))
      if (index >= text.length) window.clearInterval(timer)
    }, 26)
  }

  const openModal = (modal: ModalType, logMsg: string) => {
    setActiveModal(modal)
    typeLog(logMsg)
  }

  return (
    <section
      tabIndex={0}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { if (!zoom.active && !activeModal) setParallaxOffset({ x: 0, y: 0 }) }}
      onKeyDown={(e) => {
        if (activeModal) return
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); setFocusedZone(z => (z + 1) % 6); return }
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); setFocusedZone(z => z <= 0 ? 5 : z - 1); return }
        if ((e.key === 'Enter' || e.key === ' ') && focusedZone >= 0) {
          e.preventDefault()
          const btn = document.querySelectorAll(`.hotspot`)[focusedZone] as HTMLButtonElement
          btn?.click()
        }
      }}
      className="relative aspect-video w-full max-w-5xl overflow-hidden rounded-sm border border-[#6d8a6d]/70 bg-black shadow-[0_20px_80px_rgba(0,0,0,.6)]" aria-label="Interactive office portfolio">
      <div
        className="absolute inset-0 transition-transform duration-[250ms] ease-out"
        style={{
          transform: `scale(${zoom.active ? zoom.scale : 1}) translate(${zoom.active ? 0 : parallaxOffset.x}px, ${zoom.active ? 0 : parallaxOffset.y}px)`,
          transformOrigin: `${zoom.originX}% ${zoom.originY}%`,
          willChange: 'transform',
        }}
      >
        <img src="/images/office/full-office.png" alt="Warmly lit pixel-art office with desks, filing cabinets, plants, and a central door" className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700" style={{ opacity: theme === 'light' ? 1 : 0 }} />
        <img src="/images/office/night-office.png" alt="Dark pixel-art office at night" className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700" style={{ opacity: theme === 'dark' ? 1 : 0 }} />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,12,8,.02),rgba(3,8,5,.22))]" />
        <img src="/images/hotspots/glow-computer.png" alt="" className="absolute inset-0 h-full w-full object-cover pointer-events-none transition-opacity duration-300" style={{ opacity: hoveredHotspot === 'computer' ? 1 : 0 }} />
        <img src="/images/hotspots/glow-files.png" alt="" className="absolute inset-0 h-full w-full object-cover pointer-events-none transition-opacity duration-300" style={{ opacity: hoveredHotspot === 'files' ? 1 : 0 }} />
        <img src="/images/hotspots/glow-archive.png" alt="" className="absolute inset-0 h-full w-full object-cover pointer-events-none transition-opacity duration-300" style={{ opacity: hoveredHotspot === 'archive' ? 1 : 0 }} />
        <img src="/images/hotspots/glow-door.png" alt="" className="absolute inset-0 h-full w-full object-cover pointer-events-none transition-opacity duration-300" style={{ opacity: hoveredHotspot === 'door' ? 1 : 0 }} />
        <img src="/images/hotspots/glow-noticeboard.png" alt="" className="absolute inset-0 h-full w-full object-cover pointer-events-none transition-opacity duration-300" style={{ opacity: hoveredHotspot === 'noticeboard' ? 1 : 0 }} />
        <img src="/images/hotspots/glow-lightswitch.png" alt="" className="absolute inset-0 h-full w-full object-cover pointer-events-none transition-opacity duration-300" style={{ opacity: hoveredHotspot === 'lightswitch' ? 1 : 0 }} />
        <button aria-label="Open projects and GitHub terminal" onClick={(e) => { playTone('terminal_click'); handleHotspotClick(e, onOpenComputer); }} onMouseEnter={() => setHoveredHotspot('computer')} onMouseLeave={() => setHoveredHotspot(null)} className={`hotspot left-[24%] top-[45%] h-[28%] w-[22%] ${focusedZone === 0 ? 'ring-2 ring-emerald-400' : ''}`}><span className="hotspot-label">COMPUTER</span></button>
        <button aria-label="Open resume" onClick={(e) => { playTone('cork_push'); handleHotspotClick(e, () => openModal('resume', 'Inspecting desk papers... Resume file opened.')); }} onMouseEnter={() => setHoveredHotspot('files')} onMouseLeave={() => setHoveredHotspot(null)} className={`hotspot left-[50%] top-[50%] h-[13%] w-[10%] ${focusedZone === 1 ? 'ring-2 ring-emerald-400' : ''}`}><span className="hotspot-label">RECORDS</span></button>
        <button aria-label="Open skills inventory" onClick={(e) => { playTone('cork_push'); handleHotspotClick(e, () => openModal('skills', 'File cabinet indexed... Skills inventory opened.')); }} onMouseEnter={() => setHoveredHotspot('archive')} onMouseLeave={() => setHoveredHotspot(null)} className={`hotspot left-[45.5%] top-[24%] h-[28%] w-[13.9%] ${focusedZone === 2 ? 'ring-2 ring-emerald-400' : ''}`}><span className="hotspot-label">INVENTORY</span></button>
        <button aria-label="Open contact form" onClick={(e) => { playTone('cork_push'); handleHotspotClick(e, () => openModal('contact', 'Door\'s always open. Say hello or leave a note.')); }} onMouseEnter={() => setHoveredHotspot('door')} onMouseLeave={() => setHoveredHotspot(null)} className={`hotspot left-[69%] top-[17%] h-[34%] w-[11%] ${focusedZone === 3 ? 'ring-2 ring-emerald-400' : ''}`}><span className="hotspot-label">DOOR</span></button>
        <button aria-label="Toggle day and night mode" onClick={() => { playTone('click'); toggleTheme(); }} onMouseEnter={() => setHoveredHotspot('lightswitch')} onMouseLeave={() => setHoveredHotspot(null)} className={`hotspot left-[66.6%] top-[29.5%] h-[6%] w-[2.5%] ${focusedZone === 4 ? 'ring-2 ring-emerald-400' : ''}`}><span className="hotspot-label">LIGHT</span></button>
        <button aria-label="Open noticeboard" onClick={(e) => { playTone('cork_push'); handleHotspotClick(e, () => openModal('noticeboard', 'Noticeboard accessed. Pinned items retrieved.')); }} onMouseEnter={() => setHoveredHotspot('noticeboard')} onMouseLeave={() => setHoveredHotspot(null)} className={`hotspot left-[35%] top-[18.6%] h-[23%] w-[11.5%] ${focusedZone === 5 ? 'ring-2 ring-emerald-400' : ''}`}><span className="hotspot-label">NOTICEBOARD</span></button>
      </div>
      <div className="absolute bottom-3 left-3 right-3 flex items-center gap-3 border border-black/70 bg-black/90 px-3 py-2 font-mono text-[10px] text-[#a9d39d] shadow-lg sm:text-xs">
        <span className="text-emerald-300">&gt;</span><span>{logText}<span className="ml-0.5 animate-blink">█</span></span>
      </div>
      {activeModal && <Modal type={activeModal} close={() => setActiveModal(null)} typeLog={typeLog} />}
    </section>
  )
}