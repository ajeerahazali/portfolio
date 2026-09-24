'use client'

import { useState, useRef } from 'react'
import { track } from '@vercel/analytics'
import { RESUME_BODY, NOTICEBOARD_BODY } from '../../data/content'
import type { ModalType } from '../../data/types'
import { SkillTabs } from './SkillTabs'

interface ModalProps {
  type: Exclude<ModalType, null>
  close: () => void
  typeLog: (text: string) => void
}

export function Modal({ type, close, typeLog }: ModalProps) {
  const [submitting, setSubmitting] = useState(false)
  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const messageRef = useRef<HTMLTextAreaElement>(null)
  const content = {
    resume: { title: 'RECORDS.TXT', body: RESUME_BODY },
    skills: { title: 'INVENTORY.DAT', body: <SkillTabs /> },
    noticeboard: { title: 'NOTICEBOARD.LOG', body: NOTICEBOARD_BODY },
    contact: { title: 'OUTGOING_TRANSMISSION', body: <form onSubmit={async (e) => {
      e.preventDefault()
      setSubmitting(true)
      typeLog('Transmitting...')
      const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY
      if (!accessKey) {
        typeLog('Config error: WEB3FORMS_KEY not set.')
        setSubmitting(false)
        return
      }
      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            access_key: accessKey,
            name: nameRef.current?.value ?? '',
            email: emailRef.current?.value ?? '',
            message: messageRef.current?.value ?? '',
          }),
        })
        if (!res.ok) throw new Error(`Server responded with ${res.status}`)
        typeLog('Transmission received.')
        setTimeout(() => close(), 800)
      } catch {
        typeLog('Transmission failed. Please try again.')
        setSubmitting(false)
      }
    }} className="space-y-3"><input ref={nameRef} required aria-label="Your name" placeholder="YOUR NAME" className="terminal-input" /><input ref={emailRef} required type="email" aria-label="Your email" placeholder="YOUR EMAIL" className="terminal-input" /><textarea ref={messageRef} required aria-label="Message" placeholder="MESSAGE" rows={4} className="terminal-input resize-none" /><button disabled={submitting} className="border border-white/25 px-3 py-2 text-xs text-[#e8ddd0] hover:bg-white/10 disabled:opacity-40">{submitting ? '[TRANSMITTING...]' : '[SEND TRANSMISSION]'}</button></form> },
  }[type]
  const isNoticeboard = type === 'noticeboard'
  const isInventory = type === 'skills'
  const isResume = type === 'resume'
  const dialogClasses = isNoticeboard
    ? 'w-full h-full flex flex-col overflow-hidden border border-amber-600/50 relative bg-cover bg-center bg-no-repeat p-6 font-mono text-xs leading-5 text-amber-100 shadow-[0_0_35px_rgba(180,120,40,.28)]'
    : isInventory
      ? 'w-full max-w-md h-full flex flex-col overflow-hidden p-5 font-mono text-xs leading-5 text-amber-200'
      : isResume
        ? 'w-full h-full flex flex-col overflow-hidden p-6 font-mono text-xs leading-5 text-stone-700'
        : 'w-full max-w-sm p-5 font-mono text-xs leading-5 text-[#e8ddd0]'
  const dividerClasses = 'mb-5 flex items-center justify-between pb-2 text-white/80'
  const backdropClasses = (isNoticeboard || isInventory || isResume)
    ? 'absolute inset-0 z-20 flex items-center justify-center'
    : 'absolute inset-0 z-20 flex items-center justify-center bg-black/45 p-5 backdrop-blur-[2px]'
  return (
    <div className={backdropClasses}>
      <div
        role="dialog"
        aria-modal="true"
        className={dialogClasses}
        style={isNoticeboard ? { backgroundImage: 'url(/images/backgrounds/background-noticeboard.png)' } : undefined}
      >
        {isNoticeboard && <div className="absolute inset-0 bg-black/40" />}
        <div className={`flex flex-col h-full ${isNoticeboard ? 'relative z-10' : ''}`}>
          <div className={dividerClasses}>
            <span>{content.title}</span>
            <span className="flex items-center gap-2 shrink-0">
              {isResume && (
                <a
                  href="/downloads/my_resume.pdf"
                  download
                  onClick={() => track('Resume Downloaded')}
                  className="inline-block border border-white/30 px-2 py-0.5 text-[10px] text-white/80 hover:bg-white/20"
                >
                  [SAVE_RECORD]
                </a>
              )}
              <button onClick={close} aria-label="Close window">[X]</button>
            </span>
          </div>
          <div className="flex-1 min-h-0 overflow-y-auto">
            {content.body}
          </div>
          {!isNoticeboard && !isInventory && !isResume && type !== 'contact' && (
            <button onClick={close} className="mt-5 text-[10px] opacity-60 hover:opacity-100">[CLOSE FILE]</button>
          )}
        </div>
      </div>
    </div>
  )
}