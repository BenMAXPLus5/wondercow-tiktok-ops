# WonderCow TikTok OS — Internal Operations Site

A single-page guided rollout site for WonderCow's TikTok Shop scaling system. Built with Vite + React + TypeScript + TailwindCSS + Recharts.

## Setup

```bash
npm install
npm run dev       # Start dev server
npm run build     # Production build
npm run preview   # Preview production build
```

## Features

- **Guided Mode**: Step-by-step wizard with progress tracking
- **All Sections Mode**: Full reference view of all content
- **Role Filter**: Operator / Founder / CEO views
- **Search**: Find any section by keyword
- **Command Center**: Interactive calculators, charts, risk alerts, recommendations
- **CEO Dashboard**: 8 key metrics at a glance
- **Template Library**: Copy-paste message templates
- **Export**: JSON snapshot + CSV of key KPIs
- **Print**: Print-friendly summary

## Updating Content

All content is stored in structured data files under `src/data/`:

- `src/data/sections.ts` — All 14 guided steps (the main content)
- `src/data/templates.ts` — Message templates
- `src/data/calculatorDefaults.ts` — Calculator defaults, formulas, risk alerts, recommendation engine

To update content, edit the relevant data file. The site will hot-reload in dev mode.

## Exporting Snapshots

1. Click the **Export** button in the top bar
2. Choose **Export JSON Snapshot** for a full state dump (inputs, checklist progress, computed outputs)
3. Choose **Export CSV** for a key metrics summary

## Printing

Click **Export → Print Summary** or use Ctrl+P / Cmd+P. The site uses print-friendly CSS that hides the sidebar and navigation.

## Data Persistence

All state (checklist completion, calculator inputs, current step, notes) is stored in `localStorage`. Data persists across browser sessions. To reset, clear your browser's localStorage for the site.

## Architecture

```
src/
├── App.tsx                    # Main app with layout, routing, state
├── types.ts                   # TypeScript types
├── hooks/
│   └── useLocalStorage.ts     # localStorage persistence hook
├── components/
│   ├── Topbar.tsx             # Search, mode/role toggles, export
│   ├── Sidebar.tsx            # Sticky table of contents
│   ├── GuidedStepper.tsx      # Step progress + navigation
│   ├── SectionRenderer.tsx    # Renders section content with markdown
│   ├── CommandCenter.tsx      # Calculators, charts, risk alerts
│   ├── TemplateLibrary.tsx    # Copyable message templates
│   ├── Accordion.tsx          # Expand/collapse
│   ├── Callout.tsx            # Info/warning/danger/success alerts
│   ├── CopyButton.tsx         # Copy to clipboard
│   ├── KPICard.tsx            # Metric display card
│   └── Checklist.tsx          # Interactive checklist
└── data/
    ├── sections.ts            # All 14 section content
    ├── templates.ts           # Message templates
    └── calculatorDefaults.ts  # Calculator logic
```
