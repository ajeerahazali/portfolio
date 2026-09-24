export type ModalType = 'resume' | 'skills' | 'contact' | 'noticeboard' | null
export type Directory = 'root' | 'sys' | 'links' | 'readme'

export interface NoticeboardNote {
  id: string
  color: string
  rotate: string
  title: string
  lines: string[]
  style?: 'paragraph' | 'list'
  icon?: string
}

export interface Project {
  id: string
  label: string
  detail: string
  href: string
}

