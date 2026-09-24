# AJEERAH // WORKSTATION

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.3-06B6D4?logo=tailwindcss)](https://tailwindcss.com)
[![pnpm](https://img.shields.io/badge/pnpm-12.3-F69220?logo=pnpm)](https://pnpm.io)

An interactive point-and-click portfolio built as a retro pixel-art field office. Explore a virtual workspace with interactive hotspots, a CRT terminal, and ambient audio — all running in the browser.

**Live site:** [https://ajeerahazali-portfolio.vercel.app](https://ajeerahazali-portfolio.vercel.app)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Deployment](#deployment)
- [Customisation](#customisation)
- [Roadmap](#roadmap)
- [License](#license)

---

## Overview

This is a portfolio website that breaks away from traditional layouts. Instead of a static grid of cards, visitors arrive at a pixel-art office scene and interact with clickable **hotspots** — a computer, filing cabinet, noticeboard, door, and light switch — each revealing different sections of the portfolio.

Switch to the **CRT terminal** view for a command-line-style directory browser that surfaces projects, links, and a README about the operator.

The design language is inspired by late-90s point-and-click adventure games, with scanline overlays, WAV-synthesised sound effects, and a monochrome-green terminal aesthetic.

---

## Features

### Interactive Office
- **6 clickable hotspots** — Computer, Records, Inventory, Door, Light Switch, Noticeboard
- **Parallax effect** — Subtle mouse-follow depth movement
- **Zoom animation** — Inset zoom on hotspot click before transitioning
- **Day/Night toggle** — Click the light switch to toggle between light and dark office scenes
- **Terminal-style log footer** — Typewriter-animated status messages at the bottom of the screen
- **Keyboard navigation** — Arrow keys to cycle hotspots, Enter to activate, full accessibility support

### CRT Terminal
- **Boot sequence** — Animated startup text on entry
- **Directory browser** — Navigate `SYS_ARCHIVE/`, `LINKS/`, and `README.TXT` with keyboard or mouse
- **Typewriter README** — Character-by-character reveal of the operator bio
- **Project viewer** — Inline iframe for previewing linked projects
- **Escape to exit** — Esc or the disconnect button returns to the office

### Modal System
- **Records (Resume)** — Paper-textured printable-style resume with download as PDF
- **Inventory (Skills)** — Tabbed folder view for Skills, Languages, and Certifications
- **Noticeboard** — Styled sticky notes with pin shadows and rotated layouts
- **Contact** — Functional contact form via Web3Forms API with transmission-style feedback

### Audio
- **WAV synthesis** — Sound effects generated in-browser (no external audio files)
- **Three distinct tones** — Terminal click, cork push, and UI click
- **Cached URLs** — Generated tones are cached as object URLs for replay performance

---

## Tech Stack

| Technology | Purpose |
|---|---|
| [Next.js 16](https://nextjs.org) (App Router) | React framework with server components and static export |
| [TypeScript 5.7](https://www.typescriptlang.org) | Type safety and developer experience |
| [Tailwind CSS 4](https://tailwindcss.com) | Utility-first styling with custom theme tokens |
| [tw-animate-css](https://github.com/tailwindlabs/tailwindcss-animate) | Tailwind animation utilities |
| [Vercel Analytics](https://vercel.com/analytics) | Privacy-focused page and event tracking |
| [Web3Forms](https://web3forms.com) | Contact form submission API |
| [pnpm](https://pnpm.io) | Fast, disk-efficient package manager |

---

## Project Structure

```
retro-office-portfolio/
├── app/
│   ├── layout.tsx                  # Root layout (metadata, viewport, Analytics)
│   ├── globals.css                 # Tailwind + custom hotspot/scanline/terminal styles
│   ├── (workspace)/                # Route group serving at /
│   │   └── page.tsx                # Main workspace page (office ↔ terminal switcher)
│   ├── components/
│   │   ├── office/
│   │   │   └── OfficeView.tsx      # Interactive office scene with hotspots
│   │   ├── terminal/
│   │   │   └── TerminalView.tsx    # CRT terminal with directory navigation
│   │   └── modal/
│   │       ├── Modal.tsx           # Overlay modal for resume/skills/noticeboard/contact
│   │       └── SkillTabs.tsx       # Tabbed skills/languages/certifications viewer
│   ├── hooks/
│   │   ├── useTypewriter.ts        # Typewriter animation hook (effect + imperative)
│   │   ├── useKeyboardNavigation.ts # Arrow-key list navigation hook
│   │   └── useZoom.ts              # Hotspot zoom-in animation hook
│   ├── data/
│   │   ├── types.ts                # Shared TypeScript types
│   │   ├── projects.ts             # Project entries for SYS_ARCHIVE/
│   │   ├── noticeboard.ts          # Noticeboard sticky-note data
│   │   └── content.tsx             # Resume body, README text, noticeboard JSX
│   └── lib/
│       └── audio.ts                # In-browser WAV synthesis for sound effects
├── public/
│   ├── images/
│   │   ├── backgrounds/            # Paper, noticeboard textures
│   │   ├── hotspots/               # Glow overlay PNGs (6 hotspots)
│   │   └── office/                 # full-office.png, night-office.png
│   ├── downloads/
│   │   └── my_resume.pdf           # Downloadable resume file
│   └── icons (various)             # Favicons and apple-touch-icon
├── next.config.mjs
├── tsconfig.json
├── postcss.config.mjs
├── package.json
└── pnpm-lock.yaml
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) 18+
- [pnpm](https://pnpm.io/installation) (`npm install -g pnpm`)

### Installation

```bash
# Clone the repository
git clone https://github.com/ajeerahazali/retro-office-portfolio.git
cd retro-office-portfolio

# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production build

```bash
pnpm build
pnpm start
```

---

## Scripts

| Script | Description |
|---|---|
| `pnpm dev` | Start development server with Turbopack |
| `pnpm build` | Create an optimised production build |
| `pnpm start` | Start the production server |
| `pnpm lint` | Run Next.js ESLint checks |
| `pnpm typecheck` | Run TypeScript type checking (`tsc --noEmit`) |

---

## Deployment

The project is designed to deploy seamlessly on **Vercel** (recommended) or any platform that supports Next.js.

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ajeerahazali/retro-office-portfolio)

Alternatively, for a fully static export:

```bash
# Build outputs to out/ directory
pnpm build
```

---

## Customisation

### Changing the operator name

Edit `app/data/content.tsx`:

```tsx
export const OPERATOR_NAME = "YOUR NAME"
```

### Adding projects

Add entries to `app/data/projects.ts`:

```tsx
export const PROJECTS: Project[] = [
  {
    id: "my-project",
    label: "MY PROJECT",
    tech: ["React", "TypeScript"],
    detail: "Short description shown in the terminal",
    href: "https://example.com",
  },
  // ...
]
```

### Updating the resume

The resume appears in two places — both need replacing with your own info:

**1. Downloadable PDF** — Replace `public/downloads/my_resume.pdf` with your own resume file. The `[SAVE_RECORD]` button in the Records modal links to this file.

**2. On-screen content** — Edit the `RESUME_BODY` JSX in `app/data/content.tsx` to update the inline resume shown in the Records modal. This is separate from the PDF.

The repo contains my personal resume — replace both before deploying a fork.

### Customising the noticeboard

Edit `app/data/noticeboard.ts`:

```tsx
export const NOTICEBOARD_NOTES: NoticeboardNote[] = [
  { id: 'note-id', color: '#fef08a', rotate: '-rotate-3', title: 'TITLE',
    lines: ['Line 1', 'Line 2'], style: 'paragraph' },
  // ...
]
```

### Adding new office hotspots

1. Add a new glow PNG to `public/images/hotspots/`
2. Add a button element in `OfficeView.tsx` with percentage-based positioning (`left`, `top`, `width`, `height`)
3. Define the associated modal or action handler

### Updating contact form

The contact form uses [Web3Forms](https://web3forms.com). You must provide your own access key — create a `.env` file:

```bash
echo "NEXT_PUBLIC_WEB3FORMS=your-key-here" > .env
```

The form will not submit without this variable set. See `.env.example` for the template.

---

## Roadmap

- [ ] Add more office scenes / rooms
- [ ] Easter egg interactions on repeated clicks
- [ ] Animated NPC or pet in the office
- [ ] Localisation / multi-language support
- [ ] Music / ambient soundtrack toggle
- [ ] Guestbook / visitor log

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">Built with ☕ and Next.js · © 2026 Ajeerah Azali</p>
