import type { NoticeboardNote } from './types'

export const NOTICEBOARD_NOTES: NoticeboardNote[] = [
  { id: 'now',       color: '#fef08a', rotate: '-rotate-3', title: 'NOW',          icon: 'bg-emerald-500', lines: ['Figuring out where public health + data takes me next', 'Exploring health analytics, digital health & AI', 'Building small web apps with AI-assisted coding'] },
  { id: 'achieve',   color: '#fbcfe8', rotate: 'rotate-2',  title: 'ACHIEVEMENTS',  icon: 'bg-amber-500',   lines: ['Co-authored, published in The BMJ (2026)', 'Power BI Data Analyst Associate — Microsoft', 'Stipendium Hungaricum Scholar (Hungary)', 'President, International Student Union, Univ. of Debrecen'], style: 'list' },
  { id: 'personal',  color: '#bfdbfe', rotate: '-rotate-1', title: 'PERSONAL',       icon: 'bg-sky-500',     lines: ['Runs on coffee and quiet optimism', 'Daily chess, occasional Spanish', 'Never skips the LinkedIn games'] },
]