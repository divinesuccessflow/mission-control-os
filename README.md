# Mission Control OS V3

Comprehensive operational dashboard for Divine Success Flow.

## Features

- **📚 Books (500)** - KDP pipeline with translations, status tracking, and checklist
- **🎵 Songs (50)** - Divine Music collection with Suno prompts and lyrics
- **👥 Active Clients** - Client management with tasks, revenue, and status
- **🤝 Partnerships** - Partner tracking with revenue sharing
- **🎓 AI Prosperity 3.0** - Current cohort tracking with session management
- **🚀 AI Prosperity 4.0** - Launch planning with countdown and curriculum
- **📝 Content Plan** - Multi-platform content scheduling with copy buttons
- **🌐 Landing Pages** - All clickable landing page links
- **🛒 Gumroad** - Digital product pipeline
- **💰 Revenue & Ads** - Financial tracking
- **🏭 Projects Hub** - Active project management
- **✅ Pre-Flight Check** - Daily task checklist
- **📖 Knowledge Docs** - Quick access to knowledge base

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- LocalStorage persistence
- Static export for GitHub Pages

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Production Build

```bash
npm run build
```

Static files will be generated in the `out/` directory.

## Deployment

This app is configured for GitHub Pages deployment with a basePath. The basePath only applies in production builds.

## Data Persistence

All data is automatically saved to browser localStorage. Data persists across sessions.

## Features

- Dark theme with gold/blue accents
- Copy-to-clipboard buttons with toast notifications
- Expandable sections for detailed content
- Clickable external links (target="_blank")
- Responsive design
- Real-time countdown to AI Prosperity 4.0 launch
