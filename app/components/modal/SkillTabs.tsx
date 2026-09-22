'use client'

import { useState } from 'react'

const FOLDERS = [
  {
    label: 'SKILLS',
    color: '#fef3c7',
    items: ['Data Analysis and Reporting', 'Academic Research', 'Microsoft Office', 'Canva', 'Power BI', 'Client Communication', 'Project Coordination', 'Event Coordination', 'Social Media Management'],
  },
  {
    label: 'LANGUAGES',
    color: '#e0e7ff',
    items: ['English', 'Bahasa Malaysia'],
  },
  {
    label: 'CERTIFICATIONS',
    color: '#fce7f3',
    items: ['Power BI Data Analyst Associate (Microsoft | Jun 2026)', 'Certified Associate Prompt Engineering (TalentLabs | March 2026)'],
  },
] as const

export function SkillTabs() {
  const [activeTab, setActiveTab] = useState(0)
  const folder = FOLDERS[activeTab]

  return (
    <div className="flex flex-col p-1">
      {/* Tab bar */}
      <div className="flex gap-0">
        {FOLDERS.map((f, i) => {
          const isActive = i === activeTab
          return (
            <button
              key={f.label}
              onClick={() => setActiveTab(i)}
              className={`
                relative px-3 py-2 text-sm font-bold tracking-wider font-mono
                transition-colors duration-150
                ${isActive
                  ? 'text-gray-800 z-10 border border-[rgba(0,0,0,0.25)] border-b-0 rounded-t'
                  : 'text-gray-500 border border-transparent hover:text-gray-700 hover:border-[rgba(0,0,0,0.15)] hover:border-b-transparent rounded-t opacity-60 hover:opacity-90'
                }
              `}
              style={{ background: f.color }}
            >
              {f.label}
            </button>
          )
        })}
        {/* Spacer fills the remaining tab-bar width */}
        <div className="flex-1 border-b border-[rgba(0,0,0,0.25)]" />
      </div>

      {/* Active folder content */}
      <div className="bg-cover bg-center bg-no-repeat rounded-sm border border-[rgba(0,0,0,0.25)] -mt-px min-h-[420px]"
        style={{ backgroundImage: 'url(/images/backgrounds/background-paper.png), repeating-linear-gradient(0deg, transparent, transparent 23px, rgba(0,0,0,0.06) 23px, rgba(0,0,0,0.06) 24px)' }}
      >
        <ul className="list-none space-y-1.5 p-3">
          {folder.items.map((item, i) => (
            <li key={i} className="text-xs text-gray-800 font-mono tracking-wider leading-6 pl-2 border-b border-dotted border-gray-200 last:border-b-0">
              ▸ {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}