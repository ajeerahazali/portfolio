import { NOTICEBOARD_NOTES } from './noticeboard'

export const OPERATOR_NAME = "AJEERAH AZALI"

export const README_TEXT =
  "Public Health graduate with hands-on experience turning healthcare data into decisions that informed national policy. " +
  "Comfortable working across research, client communication and cross-functional coordination, with a track record of " +
  "translating complex information clearly for both technical and non-technical audiences. Power BI certified, with " +
  "practical experience using AI-assisted research tools and growing foundations in SQL and Python. Driven to bring " +
  "health science and data together for real health impact."

export const RESUME_BODY = (
  <div className="border-2 border-[rgba(0,0,0,0.2)] p-0 shadow-[3px_3px_0px_rgba(0,0,0,0.15)]">
    <div className="bg-cover bg-center bg-no-repeat p-8 sm:px-16 sm:py-8" style={{ backgroundImage: 'url(/images/backgrounds/background-paper.png), repeating-linear-gradient(0deg, transparent, transparent 23px, rgba(0,0,0,0.05) 23px, rgba(0,0,0,0.05) 24px)' }}>
      {/* Header */}
      <div className="border-b border-gray-300 pb-3 mb-4 text-center">
        <p className="text-gray-900 text-lg font-bold font-mono tracking-wider">{OPERATOR_NAME}</p>
        <p className="text-gray-600 text-xs font-mono tracking-wider">Port Klang, Selangor | ajeerahazali@gmail.com | linkedin.com/in/ajeerahazali</p>
        <p className="text-gray-700 text-xs font-mono mt-2 leading-relaxed">
          Public Health graduate with hands-on experience turning healthcare data into decisions that informed national policy. Comfortable working across research, client communication and cross-functional coordination, with a track record of translating complex information clearly for both technical and non-technical audiences. Power BI certified, with practical experience using AI-assisted research tools and growing foundations in SQL and Python. Driven to bring health science and data together for real health impact.
        </p>
      </div>

      {/* Education */}
      <div className="mb-4">
        <p className="text-gray-800 text-[13px] font-bold font-mono tracking-wider uppercase mb-1">Education</p>
        <p className="text-gray-800 text-xs font-mono">Bachelor of Science in Healthcare and Disease Prevention (Public Health), University of Debrecen</p>
        <p className="text-gray-500 text-xs italic font-mono">2019 - 2023 | Stipendium Hungaricum Scholar</p>
      </div>

      {/* Experience */}
      <div className="mb-4">
        <p className="text-gray-800 text-[13px] font-bold font-mono tracking-wider uppercase mb-2">Experience</p>

        <div className="mb-3">
          <p className="text-gray-800 text-[13px] font-bold font-mono tracking-wider">Research Assistant, Institut Kesihatan Negara (NIH)</p>
          <p className="text-gray-500 text-xs italic font-mono">Contract | February 2024 - November 2024</p>
          <ul className="list-disc pl-4 mt-1 space-y-0.5">
            {[
              'Performed data cleaning and analysis on survey and discussion data from 40+ healthcare professionals, translating findings into charts and visual summaries that helped identify Malaysia\'s top 10 preventable hospitalisations and informed national healthcare policy discussions.',
              'Synthesized findings from 20+ academic sources using AI-assisted research tools, building an evidence matrix that streamlined the study\'s methodology.',
              'Co-authored a manuscript published in The BMJ, translating research and expert discussion into actionable evidence for Malaysia\'s healthcare system priorities.',
            ].map((li, i) => <li key={i} className="text-xs text-gray-700 font-mono leading-relaxed">{li}</li>)}
          </ul>
        </div>

        <div className="mb-3">
          <p className="text-gray-800 text-[13px] font-bold font-mono tracking-wider">President cum Faculty Representative, International Student Union, University of Debrecen</p>
          <p className="text-gray-500 text-xs italic font-mono">2022 – 2023</p>
          <ul className="list-disc pl-4 mt-1 space-y-0.5">
            {[
              'Served as the first point of contact for international students within the Faculty of Health Sciences, triaging academic and welfare concerns and escalating unresolved cases to faculty administration.',
              'Represented the faculty\'s international student body in cross-union coordination for university-wide events, attending planning meetings and ensuring the team delivered on assigned tasks for successful event execution.',
              'Managed the faculty\'s communication channels, ensuring timely announcements and consistent awareness of academic updates across the international student body.',
            ].map((li, i) => <li key={i} className="text-xs text-gray-700 font-mono leading-relaxed">{li}</li>)}
          </ul>
        </div>
      </div>

      {/* Additional Experience */}
      <div className="mb-4">
        <p className="text-gray-800 text-[13px] font-bold font-mono tracking-wider uppercase mb-2">Additional Experience</p>

        <div>
          <p className="text-gray-800 text-[13px] font-bold font-mono tracking-wider">Authorised Consultant &amp; Business Partner, Public Gold Group</p>
          <p className="text-gray-500 text-xs italic font-mono">Self-Employed | May 2025 - March 2026</p>
          <ul className="list-disc pl-4 mt-1 space-y-0.5">
            {[
              'Translated complex financial information clearly to a small client base, drawing on extensive business and leadership training.',
              'Built and managed social media content, tracking engagement to shape educational strategy for a client audience.',
              'Applied Public Gold\'s proprietary systems to manage procedures and client interactions accurately.',
            ].map((li, i) => <li key={i} className="text-xs text-gray-700 font-mono leading-relaxed">{li}</li>)}
          </ul>
        </div>
      </div>

      {/* Certifications */}
      <div className="mb-3">
        <p className="text-gray-800 text-[13px] font-bold font-mono tracking-wider uppercase mb-1">Certifications</p>
        <ul className="list-disc pl-4 space-y-0.5">
          <li className="text-xs text-gray-700 font-mono leading-relaxed">Power BI Data Analyst Associate, Microsoft | Jun 2026</li>
          <li className="text-xs text-gray-700 font-mono leading-relaxed">Certified Associate Prompt Engineering, TalentLabs | March 2026</li>
        </ul>
      </div>

      {/* Key Skills */}
      <div>
        <p className="text-gray-800 text-[13px] font-bold font-mono tracking-wider uppercase mb-1">Key Skills</p>
        <ul className="list-disc pl-4 space-y-0.5">
          <li className="text-xs text-gray-700 font-mono leading-relaxed">Data Analysis and Reporting, Academic Research, Microsoft Office, Canva, Power BI</li>
          <li className="text-xs text-gray-700 font-mono leading-relaxed">Client Communication, Project Coordination, Event Coordination, Social Media Management</li>
          <li className="text-xs text-gray-700 font-mono leading-relaxed">English, Bahasa Malaysia</li>
        </ul>
      </div>
    </div>
  </div>
)

export const NOTICEBOARD_BODY = (
  <div className="flex flex-wrap gap-6 p-2 justify-center items-start min-h-full">
    {NOTICEBOARD_NOTES.map(n => (
      <div key={n.id} className={`relative p-5 pt-7 w-64 sm:w-72 ${n.rotate} border-2 border-[rgba(0,0,0,0.35)] shadow-[4px_4px_0px_#00000040] text-gray-900 font-mono`} style={{ background: n.color }}>
        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-gradient-to-b from-gray-300 via-gray-400 to-gray-500 shadow-[0_2px_3px_rgba(0,0,0,0.5)]" />
        <p className="font-bold text-base mb-2 tracking-wider leading-snug"><span className={`inline-block w-3 h-3 mr-2 align-middle ${n.icon}`} />{n.title}</p>
        {n.style === 'list' ? (
          <ul className="text-sm tracking-wider leading-relaxed list-disc list-inside space-y-1">
            {n.lines.map((line, i) => <li key={i}>{line}</li>)}
          </ul>
        ) : (
          n.lines.map((line, i) => <p key={i} className="text-sm tracking-wider leading-relaxed mt-2 first:mt-0">{line}</p>)
        )}
      </div>
    ))}
  </div>
)