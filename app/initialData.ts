import { Book, Song, Client, Partnership, Session, ContentPost, LandingPage, DigitalProduct, Project } from './types';

export const initialBooks: Book[] = [
  {
    id: 'book-1',
    title: 'Is Modi God Sent?',
    wordCount: 15579,
    languages: ['English'],
    status: 'Published',
    imagePrompt: 'Portrait of Narendra Modi in divine golden light, Indian flag colors, professional book cover',
    kdpChecklist: {
      manuscript: true,
      cover: true,
      description: true,
      keywords: true,
      categories: true,
      pricing: true,
    },
    amazonLinks: {
      ebookASIN: 'B0GPNMGG6G',
      ebookStatus: 'Live',
      ebookPrice: '$9.99',
      paperbackASIN: '',
      paperbackStatus: 'In Review',
      paperbackPrice: '$9.99',
      hardcoverStatus: 'Not Started',
    }
  },
  {
    id: 'book-2',
    title: 'The Iceberg Success Mindset',
    wordCount: 8500,
    languages: ['English'],
    status: 'Published',
    imagePrompt: 'Iceberg metaphor, success above water, hard work below, yellow/gold theme',
    kdpChecklist: {
      manuscript: true,
      cover: true,
      description: true,
      keywords: true,
      categories: true,
      pricing: true,
    },
    amazonLinks: {
      ebookASIN: 'B0GPN2SPRX',
      ebookStatus: 'Live',
      ebookPrice: '$9.99',
      paperbackASIN: 'B0GPNJC2QM',
      paperbackStatus: 'Live',
      paperbackPrice: '$9.99',
      hardcoverStatus: 'Not Started',
    }
  },
  {
    id: 'book-3',
    title: 'Why You Feel Stuck',
    wordCount: 8500,
    languages: ['English', 'Hindi', 'Kannada', 'Tamil', 'Telugu', 'Gujarati', 'Marathi', 'Bengali', 'Malayalam', 'Punjabi', 'Urdu', 'Sanskrit'],
    status: 'Cover Design',
    imagePrompt: 'Person standing at crossroads, contemplative mood, warm colors, minimalist design',
    kdpChecklist: {
      manuscript: true,
      cover: true,
      description: false,
      keywords: false,
      categories: false,
      pricing: false,
    }
  },
  {
    id: 'book-4',
    title: 'Chinese Face Mapping',
    wordCount: 12000,
    languages: ['English'],
    status: 'Editing',
    imagePrompt: 'Chinese face mapping diagram with meridians and organs, traditional Chinese medicine aesthetic',
    kdpChecklist: {
      manuscript: true,
      cover: false,
      description: false,
      keywords: false,
      categories: false,
      pricing: false,
    },
    amazonLinks: {
      ebookStatus: 'Not Started',
      paperbackStatus: 'Not Started',
      hardcoverStatus: 'Not Started',
    }
  },
  {
    id: 'book-epstein',
    title: 'Epstein Book',
    wordCount: 0,
    languages: ['English'],
    status: 'Writing',
  },
  ...Array.from({ length: 6 }, (_, i) => ({
    id: `book-${i + 5}`,
    title: `Book Slot ${i + 5}`,
    wordCount: 0,
    languages: ['English'],
    status: 'Idea' as const,
  }))
];

export const initialSongs: Song[] = [
  {
    id: 'song-1',
    number: 1,
    title: 'Baalya Kannada',
    raga: 'Traditional Folk',
    emotion: 'Childhood nostalgia',
    status: 'Published',
    lyrics: 'V5 delivered: 1080p/720p/360p, 27 scenes, lyrics-synced',
    sunoPrompt: 'Kannada folk melody with childhood nostalgia theme, traditional instruments',
  },
  ...Array.from({ length: 9 }, (_, i) => ({
    id: `song-${i + 2}`,
    number: i + 2,
    title: `Song Slot ${i + 2}`,
    status: 'Draft' as const,
  })),
  {
    id: 'song-11',
    number: 11,
    title: 'Guruvige Namana',
    raga: 'Bhupali',
    emotion: 'Guru devotion',
    status: 'Lyrics Done',
    lyrics: 'Guruvige namana maado, hrudaya nimmadha\nGnaana deepa belage, jeevanadha arthavanu kandu...',
  },
  {
    id: 'song-12',
    number: 12,
    title: 'Saagara Aalada',
    raga: 'Bageshri',
    emotion: 'Ocean surrender',
    status: 'Lyrics Done',
    lyrics: 'Saagara aaladha hage, nanna mana ninnallige\nOlaga illavante, ninna anugraha bekenu...',
  },
  {
    id: 'song-13',
    number: 13,
    title: 'Honalu Barali',
    raga: 'Shuddha Kalyan',
    emotion: 'Freedom',
    status: 'Lyrics Done',
    lyrics: 'Honalu barali nanna manavu, mukthiya sancharadali\nBandhanagalella bidisi, aakaashadali haaru...',
  },
  {
    id: 'song-14',
    number: 14,
    title: 'Nanna Ammage',
    raga: 'Charukeshi',
    emotion: 'Mother tribute',
    status: 'Suno Ready',
    lyrics: 'Nanna ammage vandane, ninna paadakke nanna pranama\nNinna maatunolidhu jeevana, ninna seveyalli dhanyathe\n\nKaarana illade sneha, nirantara anugraha\nNinna kai mugidu nanagagi, lokadha sukha bittu...\n\nAmmaa nee devaru nannaya, ninna hrudaya divya mandhira\nNinna aashirvadha jeevana, ninna namoonu nanna sakala...',
    sunoPrompt: 'Carnatic devotional ballad, female vocalist, gentle tanpura drone, harmonium melody, soft tabla, violin interludes, 65 BPM, Raag Charukeshi, devotional, emotional, Indian classical fusion',
  },
  {
    id: 'song-15',
    number: 15,
    title: 'Bedavu Nanna Mana',
    raga: 'Puriya Dhanashri',
    emotion: 'Love',
    status: 'Suno Ready',
    lyrics: 'Bedavu nanna mana, ninna bhaavagalhu ninagagi\nRaatri dina ninna nenapu, hrudaya gaayadha madhura geete\n\nKanasina haadi nee, nanna jeevana kavana\nNinna mukha chandhra, nanna raatri deepavanu...\n\nPrema ninna paada, nanna antharanga geethe\nNinagaagi kaayalu, nanna kaaladha sakala samarpaney...',
    sunoPrompt: 'Hindustani-Carnatic fusion ghazal, male vocalist, sarangi lead, soft harmonium, gentle tabla, 55 BPM, Raag Puriya Dhanashri, romantic, yearning, intimate',
  },
  ...Array.from({ length: 2 }, (_, i) => ({
    id: `song-${i + 16}`,
    number: i + 16,
    title: `Song Slot ${i + 16}`,
    status: 'Draft' as const,
  })),
  {
    id: 'song-18',
    number: 18,
    title: 'Mugila Mele',
    raga: 'Madhuvanti',
    emotion: 'Clouds/hope',
    status: 'Suno Ready',
    lyrics: 'Mugila mele nadedare, aakashakke seridene\nMannina bandhanagalu bidisi, mukthiya haadinalli\n\nMaleyondige aashegalu, nanna mana barisu sneha\nNinna kripa varshadha hage, nanna jeevakke novu barisu...\n\nAashe mugila haage, hrudaya aakaasha vistaara\nNinna anugraha meghadha haage, nanna janmakke arthavanu...',
    sunoPrompt: 'Indian classical fusion, male vocalist, bansuri lead, gentle tabla, ambient pads, rain sounds, 72 BPM, Raag Madhuvanti, meditative, hopeful, nature-inspired',
  },
  ...Array.from({ length: 32 }, (_, i) => ({
    id: `song-${i + 19}`,
    number: i + 19,
    title: `Song Slot ${i + 19}`,
    status: 'Draft' as const,
  }))
];

export const initialClients: Client[] = [
  {
    id: 'client-1',
    name: 'Rosa / Modex',
    status: 'Active',
    tasks: ['Supabase migration ✓', 'Schema refinement in progress'],
    revenue: 0,
    notes: 'Supabase migration completed, refining schema',
  },
  {
    id: 'client-2',
    name: 'Mike',
    status: 'Active',
    tasks: [],
  },
  {
    id: 'client-3',
    name: 'Daniel Meléndez',
    status: 'Active',
    tasks: ['Assessment LIVE ✓', 'Documentary script ✓', '1000 cold emails ready', 'Flight Commander game ✓', 'eBestChoice Reason for Existence doc ✓'],
    revenue: 0,
    notes: 'Assessment live at divinesuccessflow.github.io/daniel-safety-assessment, Colombian fighter pilot, aviation safety consultant',
  },
  {
    id: 'client-4',
    name: 'Lana',
    status: 'Active',
    tasks: [],
  },
  {
    id: 'client-5',
    name: 'Nandini Savanura',
    status: 'Active',
    tasks: ['Meta Ads running (462 leads @ ₹30/lead)', 'Iceberg page needs fixes', 'Assessment campaign active'],
    revenue: 13860,
    notes: 'Iceberg Success Mindset coaching, 462 leads at ₹30 each = ₹13,860 ad spend',
  },
  {
    id: 'client-6',
    name: 'Jolly Shah',
    status: 'Active',
    tasks: ['Invoice Feb pending'],
    revenue: 0,
    notes: 'Jan invoice paid, Feb pending',
  },
  {
    id: 'client-7',
    name: 'Fadma Bouhbass',
    status: 'Prospect',
    revenue: 47,
    tasks: [],
    notes: '€47 lead',
  },
  {
    id: 'client-8',
    name: 'Zahir Kurwale',
    status: 'Active',
    tasks: [],
    notes: 'Client folder exists - verify status',
  },
  {
    id: 'client-9',
    name: 'Sunstream Global',
    status: 'Active',
    tasks: ['Dashboard v3 ✓', '24K companies database', 'SalesRobot sequences', 'Dutch C-suite campaign'],
    revenue: 0,
    notes: '24,000 companies in database, targeting Dutch C-suite',
  },
  {
    id: 'client-10',
    name: 'Vinay (cousin)',
    status: 'Prospect',
    tasks: ['NSE stock AI questionnaire', 'Telegram bot spec'],
    revenue: 0,
    notes: 'Wants AI for NSE trading, Rs 500-1.5K/mo',
  },
];

export const initialPartnerships: Partnership[] = [
  {
    id: 'partner-1',
    name: 'Seemant',
    type: 'Partner',
    status: 'Active',
    notes: 'LinkedIn project at /clawd/projects/Seemant_LinkedIn/',
  },
  {
    id: 'partner-2',
    name: 'Jolly Shah',
    type: 'Partner',
    status: 'Active',
    revenueShared: 0,
    notes: '2 invoices - ongoing partnership',
  },
];

export const initialSessions: Session[] = [
  {
    number: 1,
    status: 'Upcoming',
    topic: 'Week 1: AI Foundation & Business Mindset (March 11, 2026)',
  },
  {
    number: 2,
    status: 'Upcoming',
    topic: 'Week 2: AI Tools & Workflow Integration',
  },
  {
    number: 3,
    status: 'Upcoming',
    topic: 'Week 3: Content Creation at Scale',
  },
  {
    number: 4,
    status: 'Upcoming',
    topic: 'Week 4: Lead Generation & Client Acquisition',
  },
  {
    number: 5,
    status: 'Upcoming',
    topic: 'Week 5: Sales Automation & CRM',
  },
  {
    number: 6,
    status: 'Upcoming',
    topic: 'Week 6: Service Delivery & Operations',
  },
  {
    number: 7,
    status: 'Upcoming',
    topic: 'Week 7: Pricing & Packaging',
  },
  {
    number: 8,
    status: 'Upcoming',
    topic: 'Week 8: Launch Strategy & Go-to-Market',
  },
  {
    number: 9,
    status: 'Upcoming',
    topic: 'Week 9: Scaling & Team Building',
  },
  {
    number: 10,
    status: 'Upcoming',
    topic: 'Week 10: Long-term Growth & Exit Strategy',
  },
];

export const initialContentPosts: ContentPost[] = [
  {
    id: 'post-1',
    platform: 'LinkedIn',
    topic: 'LinkedIn architecture post',
    draftText: '',
    status: 'Draft',
  },
  {
    id: 'post-2',
    platform: 'LinkedIn',
    topic: 'AI Prosperity mindset shift',
    draftText: 'Most people think AI will replace them.\n\nSuccessful people ask: "How can I use AI to 10x my impact?"\n\nThe difference?\n\nMindset.\n\nIn AI Prosperity 4.0, we don\'t teach tools.\nWe teach transformation.\n\n10 weeks. 50 seats. March 11.\n\nAre you ready?',
    imagePrompt: 'Split screen: worried person vs confident person using AI, modern professional design',
    status: 'Draft',
  },
  ...Array.from({ length: 20 }, (_, i) => ({
    id: `post-${i + 3}`,
    platform: 'LinkedIn',
    topic: `Content Calendar Week ${Math.floor(i / 5) + 1} - Post ${(i % 5) + 1}`,
    draftText: '',
    status: 'Draft' as const,
    notes: i < 22 ? 'Part of 22-post LinkedIn calendar (Mon/Wed/Fri/Sat over 4 weeks)' : undefined,
  }))
];

export const initialLandingPages: LandingPage[] = [
  {
    id: 'lp-1',
    name: 'MindFlow App',
    url: 'https://divinesuccessflow.github.io/mindflow',
    status: 'Live',
    notes: '✅ LIVE',
  },
  {
    id: 'lp-2',
    name: 'Daniel Safety Assessment',
    url: 'https://divinesuccessflow.github.io/daniel-safety-assessment',
    status: 'Live',
    notes: '✅ LIVE',
  },
  {
    id: 'lp-3',
    name: 'Mission Control OS',
    url: 'https://divinesuccessflow.github.io/mission-control-os',
    status: 'Live',
    notes: '✅ LIVE (this dashboard)',
  },
  {
    id: 'lp-4',
    name: 'Iceberg Assessment (Nandini)',
    url: 'https://iceberg.divinesuccessflow.com',
    status: 'Live - Needs Fix',
    notes: 'Assessment tool live but needs debugging',
  },
  {
    id: 'lp-5',
    name: 'OpenClaw Campaign Page',
    url: 'Not deployed',
    status: 'Draft',
    notes: 'Landing page draft created, NOT deployed yet',
  },
  {
    id: 'lp-6',
    name: 'Divine Success Flow (Main)',
    url: 'https://divinesuccessflow.com',
    status: 'Live',
  },
  {
    id: 'lp-7',
    name: 'Divine Teams AI',
    url: 'https://divineteams.ai',
    status: 'Live',
  },
  {
    id: 'lp-8',
    name: 'Divine Teams France',
    url: 'https://france.divineteams.ai',
    status: 'Deployed',
  },
  {
    id: 'lp-9',
    name: 'Divine Teams Germany',
    url: 'https://germany.divineteams.ai',
    status: 'Deployed',
  },
  {
    id: 'lp-10',
    name: 'Divine Teams Spain',
    url: 'https://spain.divineteams.ai',
    status: 'Deployed',
  },
];

export const initialDigitalProducts: DigitalProduct[] = [
  {
    id: 'prod-1',
    name: 'OpenClaw Setup Guide',
    price: '$99 / $299',
    status: 'Ready',
    uploadChecklist: {
      files: true,
      description: true,
      pricing: true,
      cover: true,
    },
    notes: '.docx ready (10 chapters), landing page draft, NOT deployed yet'
  },
  {
    id: 'prod-2',
    name: 'Divine Teams Catalog',
    price: 'Custom pricing',
    status: 'Live',
    uploadChecklist: {
      files: true,
      description: true,
      pricing: true,
      cover: true,
    },
    notes: '304 teams built and cataloged'
  },
  {
    id: 'prod-3',
    name: 'AI Prosperity 4.0 Program',
    price: '₹9,999 - ₹29,999',
    status: 'Active',
    uploadChecklist: {
      files: true,
      description: true,
      pricing: true,
      cover: true,
    },
    notes: 'Curriculum ready, launches March 11'
  },
  {
    id: 'prod-4',
    name: 'Face Mapping Ebook',
    price: '$17 - $27',
    status: 'Ready to Upload',
    uploadChecklist: {
      files: true,
      description: false,
      pricing: false,
      cover: false,
    },
    notes: 'Ebook received, business plan done (598 lines), not yet published'
  },
];

export const initialProjects: Project[] = [
  {
    id: 'proj-1',
    name: 'Divine Teams',
    description: '304 teams built and cataloged. Ready for sale and deployment',
    status: 'Complete',
    progress: 100,
  },
  {
    id: 'proj-2',
    name: 'AI Prosperity 4.0',
    description: '10-week AI business program launching March 11. Curriculum ready',
    status: 'Active',
    progress: 85,
  },
  {
    id: 'proj-3',
    name: 'OpenClaw Setup Guide',
    description: '.docx ready (10 chapters), landing page draft created, NOT yet deployed',
    status: 'Active',
    progress: 70,
  },
  {
    id: 'proj-4',
    name: 'Face Mapping Business',
    description: 'Full business plan done (598 lines). Ebook received, not yet published',
    status: 'Planning',
    progress: 60,
  },
  {
    id: 'proj-5',
    name: 'Passenger Payback',
    description: 'PRD done, dev not started, launches March 20',
    status: 'Planning',
    progress: 40,
  },
  {
    id: 'proj-6',
    name: 'MindFlow App',
    description: 'LIVE at divinesuccessflow.github.io/mindflow',
    status: 'Live',
    progress: 100,
  },
  {
    id: 'proj-7',
    name: 'Mission Control OS',
    description: 'This dashboard! Live at divinesuccessflow.github.io/mission-control-os',
    status: 'Live',
    progress: 100,
  },
  {
    id: 'proj-8',
    name: 'KDP Books Pipeline',
    description: '7 languages ready for Why You Feel Stuck, 12 languages total for cover design',
    status: 'Active',
    progress: 55,
  },
  {
    id: 'proj-9',
    name: 'Daniel Documentary',
    description: 'Netflix-style documentary on aviation Safety Culture. Script + storyboard done',
    status: 'Active',
    progress: 70,
  },
  {
    id: 'proj-10',
    name: 'Sunstream Global',
    description: 'US exhibition lead gen. Dashboard v3, 24K companies, SalesRobot sequences',
    status: 'Active',
    progress: 85,
  },
  {
    id: 'proj-11',
    name: 'TidyMac',
    description: 'macOS menu bar app for one-click file organization. 5 modes, SwiftUI',
    status: 'Development',
    progress: 80,
  },
  {
    id: 'proj-12',
    name: 'Nandini Savanura',
    description: 'Meta Ads (462 leads @ ₹30/lead), landing page, Iceberg Success Model coaching',
    status: 'Active',
    progress: 70,
  },
  {
    id: 'proj-13',
    name: 'Orb Trading Bot',
    description: 'Deferred to Q3 2026. Paper trader + camarilla built but backtesting module broken',
    status: 'On Hold',
    progress: 35,
  },
];
