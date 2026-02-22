# Mission Control OS

A comprehensive productivity operating system that combines three powerful frameworks into one unified application:

- **SFFCMM** (Cascade structure for strategic alignment)
- **Mission Control** (Accomplishment-focused thinking)
- **PMP** (Project Management Professional processes)

## Features

### 🎯 Goal Tracker
Track massive-scale targets with real-time progress monitoring:
- 711 companies by March 22, 2026
- 1 million each of: Movies, Songs, Books, Seminars, Courses, Products, Factories, Companies by 2030
- Visual progress bars and countdown timers
- Daily rate calculator to maintain pace

### ✅ Pre-Flight Check System
Before starting any task, answer 5 critical questions:
1. **CONCERN**: What matter of importance does this fulfill? (SFFCMM)
2. **ACCOMPLISHMENT**: What exists when this is done? (Mission Control)
3. **SCOPE**: Specific acceptance criteria (PMP)
4. **PLAYBOOK**: Which guide/factors apply?
5. **QUALITY**: How do I verify the output is right?

Tasks cannot proceed until all 5 questions are answered.

### 🔄 Cascade View (SFFCMM)
Visual hierarchy builder:
- Overarching Area of Concern → Area of Concern → Concern → Outcome → Results → Actions
- Drill-down navigation
- Color-coded status indicators (active/complete/blocked)
- Full traceability from strategy to execution

### 📋 Task Board (PMP)
Kanban-style board with 5 process groups:
- **Initiating** → **Planning** → **Executing** → **Monitoring** → **Closing**
- Risk indicators (low/medium/high)
- Quality gate checkpoints
- Pre-flight check status on every task

### 📚 Knowledge Base
Built-in documentation for all frameworks:
- SFFCMM concepts (cascade, occurring, transparency)
- Mission Control thinking (accomplishment vs activity)
- PMP processes (5 process groups, 10 knowledge areas)
- Integration guide (how all three frameworks work together)

### 📊 Dashboard
Executive overview with:
- Today's date and key deadlines
- Goal progress sparklines
- Active tasks by PMP stage
- Daily production calculator

## Tech Stack

- **Next.js 14** - React framework with static export
- **TypeScript** - Type safety throughout
- **Tailwind CSS** - Utility-first styling
- **localStorage** - Client-side persistence (no backend needed)
- **Lucide React** - Beautiful icons
- **Framer Motion** - Smooth animations

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
```

The static site will be exported to the `out/` directory.

### Deploy to GitHub Pages

1. Update `next.config.js` with your repository name if needed
2. Build the project: `npm run build`
3. Deploy the `out/` directory to GitHub Pages

## Project Structure

```
mission-control-os/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main application
│   └── globals.css         # Global styles
├── components/
│   ├── Dashboard.tsx       # Dashboard view
│   ├── GoalTracker.tsx     # Goal tracking
│   ├── TaskBoard.tsx       # PMP task board
│   ├── CascadeView.tsx     # SFFCMM cascade hierarchy
│   ├── KnowledgeDocs.tsx   # Framework documentation
│   └── ui/                 # Reusable UI components
├── lib/
│   ├── storage.ts          # localStorage management
│   └── utils.ts            # Utility functions
├── types/
│   └── index.ts            # TypeScript type definitions
└── public/                 # Static assets
```

## Data Persistence

All data is stored in browser localStorage under the key `mission-control-os-data`.

The data structure includes:
- **Goals**: Target tracking with deadlines
- **Tasks**: PMP-based task management with pre-flight checks
- **Cascades**: SFFCMM hierarchy nodes

To reset all data, open browser DevTools console and run:
```javascript
localStorage.removeItem('mission-control-os-data');
```

## Design Philosophy

### Dark Theme
Professional dark theme with:
- Background: `#0a0a0a`
- Gold accent: `#B8860B` (goals, highlights)
- Blue accent: `#3B82F6` (tasks, actions)
- Clean, minimal executive dashboard aesthetic

### Mobile Responsive
Fully responsive design that works on:
- Desktop (1920px+)
- Laptop (1280px)
- Tablet (768px)
- Mobile (375px)

### Performance
- Static generation for instant loads
- No external dependencies or API calls
- Optimized for GitHub Pages deployment

## Framework Integration

Mission Control OS unifies three complementary frameworks:

1. **SFFCMM** provides **strategic structure** - cascading from broad concerns to specific actions
2. **Mission Control** provides **outcome clarity** - focusing on what exists, not what you're doing
3. **PMP** provides **execution discipline** - systematic process from initiation to closure

Together, they create a complete system for productivity at scale.

## License

Built for personal productivity. Use freely.

## Support

For questions or issues, refer to the built-in Knowledge Base (📚 tab in the application).
