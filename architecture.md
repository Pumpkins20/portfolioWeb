Next.js Portfolio Architecture

Stack yang kita gunakan:

Next.js (App Router)

React

Tailwind CSS

Framer Motion (animation)

GitHub API (activity)

shadcn/ui


1. Struktur Folder Project

Struktur yang disarankan:

portfolio-dev/
│
├─ app/
│   ├─ layout.tsx
│   ├─ page.tsx
│   └─ globals.css
│
├─ components/
│   ├─ navbar/
│   │   └─ Navbar.tsx
│   │
│   ├─ hero/
│   │   └─ HeroSection.tsx
│   │
│   ├─ skills/
│   │   └─ SkillForge.tsx
│   │
│   ├─ projects/
│   │   ├─ ProjectLab.tsx
│   │   └─ ProjectCard.tsx
│   │
│   ├─ github/
│   │   └─ GithubMountain.tsx
│   │
│   ├─ journey/
│   │   └─ JourneyPath.tsx
│   │
│   └─ contact/
│       └─ ContactPortal.tsx
│
├─ data/
│   └─ projects.ts
│
├─ public/
│   ├─ mascot/
│   ├─ scenes/
│   └─ icons/
│
└─ lib/
    └─ github.ts
