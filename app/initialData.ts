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
    id: 'book-epstein',
    title: 'Epstein Book',
    wordCount: 0,
    languages: ['English'],
    status: 'Writing',
  },
  ...Array.from({ length: 7 }, (_, i) => ({
    id: `book-${i + 4}`,
    title: `Book Slot ${i + 4}`,
    wordCount: 0,
    languages: ['English'],
    status: 'Idea' as const,
  }))
];

export const initialSongs: Song[] = [
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `song-${i + 1}`,
    number: i + 1,
    title: `Song Slot ${i + 1}`,
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
    name: 'Rosa',
    status: 'Proposal',
    tasks: ['10-week consulting proposal', 'App requirements doc'],
    revenue: 0,
    notes: 'Custom app development project',
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
    tasks: ['Documentary script', 'SCMA website', 'LinkedIn strategy'],
    revenue: 0,
    notes: 'Colombian fighter pilot, aviation safety consultant, 49,808 leads',
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
    tasks: ['Meta ads campaign', 'Landing page', 'Coaching program'],
    revenue: 0,
    notes: 'Iceberg Success Mindset coaching',
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
    tasks: ['Campaign playbook'],
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
    name: 'Divine Success Flow (Main)',
    url: 'https://divinesuccessflow.com',
    status: 'Live',
  },
  {
    id: 'lp-2',
    name: 'Divine Teams AI',
    url: 'https://divineteams.ai',
    status: 'Live',
  },
  {
    id: 'lp-3',
    name: 'Iceberg Assessment (Nandini)',
    url: 'https://iceberg.divinesuccessflow.com',
    status: 'Live - Needs Fix',
    notes: 'Assessment tool live but needs debugging',
  },
  {
    id: 'lp-4',
    name: 'Divine Teams France',
    url: 'https://france.divineteams.ai',
    status: 'Deployed',
  },
  {
    id: 'lp-5',
    name: 'Divine Teams Germany',
    url: 'https://germany.divineteams.ai',
    status: 'Deployed',
  },
  {
    id: 'lp-6',
    name: 'Divine Teams Spain',
    url: 'https://spain.divineteams.ai',
    status: 'Deployed',
  },
  {
    id: 'lp-7',
    name: 'Divine Teams Brazil',
    url: 'https://brazil.divineteams.ai',
    status: 'Deployed',
  },
  {
    id: 'lp-8',
    name: 'Divine Teams Arabic',
    url: 'https://arabic.divineteams.ai',
    status: 'Deployed',
  },
  {
    id: 'lp-9',
    name: 'TidyMac Landing',
    url: '02_Products/TidyMac/landing-page/index.html',
    status: 'Built',
    notes: 'Dark macOS design, glassmorphism, 42KB HTML',
  },
  {
    id: 'lp-10',
    name: 'Nandini Success',
    url: 'nandini.divinesuccessflow.com',
    status: 'Blocked',
    notes: 'Custom domain claimed by old Railway project',
  },
];

export const initialDigitalProducts: DigitalProduct[] = [
  {
    id: 'prod-1',
    name: 'Why You Feel Stuck (ebook)',
    price: '₹299 / $4.99',
    status: 'Ready to Upload',
    uploadChecklist: {
      files: true,
      description: false,
      pricing: false,
      cover: true,
    }
  },
  {
    id: 'prod-2',
    name: 'Sanskrit Shlokas Collection',
    price: '₹199 / $2.99',
    status: 'In Progress',
    uploadChecklist: {
      files: false,
      description: false,
      pricing: false,
      cover: false,
    }
  },
  {
    id: 'prod-3',
    name: 'AI Starter Kit',
    price: '₹999 / $14.99',
    status: 'Idea',
    uploadChecklist: {
      files: false,
      description: false,
      pricing: false,
      cover: false,
    }
  },
];

export const initialProjects: Project[] = [
  {
    id: 'proj-1',
    name: 'TidyMac',
    description: 'macOS menu bar app for one-click file organization. 5 modes, SwiftUI, $10.99/mo',
    status: 'Development',
    progress: 80,
  },
  {
    id: 'proj-2',
    name: 'Daniel Documentary',
    description: 'Netflix-style documentary on aviation Safety Culture. Script + storyboard + narration done',
    status: 'Active',
    progress: 60,
  },
  {
    id: 'proj-3',
    name: 'AI Prosperity 4.0',
    description: '10-week AI business program launching March 11. Curriculum, masterprompt, build playbook, launch kit ready',
    status: 'Active',
    progress: 70,
  },
  {
    id: 'proj-4',
    name: 'Sovereign Finance',
    description: '7,200-word guide on DeFi, privacy coins, jurisdictional arbitrage, crypto income',
    status: 'Complete',
    progress: 100,
  },
  {
    id: 'proj-5',
    name: 'Voice Cloning Research',
    description: '25 models compared. Osho + Werner Erhard clone strategies documented',
    status: 'Complete',
    progress: 100,
  },
  {
    id: 'proj-6',
    name: 'MindFlow App',
    description: 'Next.js + TypeScript mindmap app live at divinesuccessflow.github.io/mindflow',
    status: 'Live',
    progress: 100,
  },
  {
    id: 'proj-7',
    name: 'Meta Ads GTM',
    description: 'Productized Meta API campaign setup for Indian agencies, Rs 15K-60K/month',
    status: 'Planning',
    progress: 30,
  },
  {
    id: 'proj-8',
    name: 'Sunstream Global',
    description: 'US exhibition lead gen. 87 associations scraped, 10K Hunter leads split, MCAA 106 manufacturers extracted',
    status: 'Active',
    progress: 85,
  },
  {
    id: 'proj-9',
    name: 'Rosa App',
    description: '10-week consulting proposal + app requirements document ready',
    status: 'Proposal',
    progress: 30,
  },
  {
    id: 'proj-10',
    name: 'Passenger Payback',
    description: 'Flight compensation service, PRD + detailed business doc ready, launches March 20',
    status: 'Planning',
    progress: 45,
  },
  {
    id: 'proj-11',
    name: 'Orb Trading Bot',
    description: 'Deferred to Q3 2026. Paper trader + camarilla built but backtesting module broken',
    status: 'On Hold',
    progress: 35,
  },
  {
    id: 'proj-12',
    name: 'KDP Publishing',
    description: '7 languages ready for \'Why You Feel Stuck\', covers being made. Identity/bank/tax setup blocking',
    status: 'Active',
    progress: 40,
  },
  {
    id: 'proj-13',
    name: 'Nandini Savanura',
    description: 'Ad campaigns, landing page, Iceberg Success Model coaching. Assessment ad live',
    status: 'Active',
    progress: 65,
  },
  {
    id: 'proj-14',
    name: 'FAaaS',
    description: 'Factory AI as a Service for Karnataka factories. Beachhead: Peenya (8,500 factories). Rs 25K-2L/mo subscription',
    status: 'Planning',
    progress: 20,
  },
  {
    id: 'proj-15',
    name: 'Longevity 500',
    description: '500-year human longevity research. Wellness company structure under FSSAI',
    status: 'Research',
    progress: 20,
  },
  {
    id: 'proj-16',
    name: 'Exoskeleton',
    description: 'Full product document created for exoskeleton development',
    status: 'Research',
    progress: 15,
  },
];
