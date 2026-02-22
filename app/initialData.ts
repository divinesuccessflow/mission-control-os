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
  ...Array.from({ length: 8 }, (_, i) => ({
    id: `book-${i + 3}`,
    title: `Book Slot ${i + 3}`,
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
    notes: 'Waiting for proposal response',
  },
  {
    id: 'client-2',
    name: 'Mike',
    status: 'Active',
    tasks: [],
  },
  {
    id: 'client-3',
    name: 'Daniel Melendez',
    status: 'Active',
    tasks: ['Signal Intelligence Playbook', 'Sales Strategy', '1000 personalized emails'],
    revenue: 0,
  },
  {
    id: 'client-4',
    name: 'Lana',
    status: 'Active',
    tasks: [],
  },
  {
    id: 'client-5',
    name: 'Nandini',
    status: 'Active',
    tasks: ['Iceberg Assessment', 'Masterclass', 'Meta Ads campaign'],
    revenue: 0,
    notes: 'High priority - ongoing masterclass delivery',
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

export const initialSessions: Session[] = Array.from({ length: 10 }, (_, i) => ({
  number: i + 1,
  status: i < 7 ? 'Completed' : i === 7 ? 'Next' : 'Upcoming',
  topic: i === 7 ? 'TBD - What to pitch?' : undefined,
}));

export const initialContentPosts: ContentPost[] = [
  {
    id: 'post-1',
    platform: 'LinkedIn',
    topic: 'AI Prosperity mindset shift',
    draftText: 'Most people think AI will replace them.\n\nSuccessful people ask: "How can I use AI to 10x my impact?"\n\nThe difference?\n\nMindset.\n\nIn AI Prosperity 4.0, we don\'t teach tools.\nWe teach transformation.\n\n10 weeks. 50 seats. March 11.\n\nAre you ready?',
    imagePrompt: 'Split screen: worried person vs confident person using AI, modern professional design',
    status: 'Draft',
  },
  ...Array.from({ length: 21 }, (_, i) => ({
    id: `post-${i + 2}`,
    platform: 'LinkedIn',
    topic: `LinkedIn Post Slot ${i + 2}`,
    draftText: '',
    status: 'Draft' as const,
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
    status: 'Live',
  },
  {
    id: 'lp-5',
    name: 'Divine Teams Germany',
    url: 'https://germany.divineteams.ai',
    status: 'Live',
  },
  {
    id: 'lp-6',
    name: 'Divine Teams Spain',
    url: 'https://spain.divineteams.ai',
    status: 'Live',
  },
  {
    id: 'lp-7',
    name: 'Divine Teams Brazil',
    url: 'https://brazil.divineteams.ai',
    status: 'Live',
  },
  {
    id: 'lp-8',
    name: 'Divine Teams Arabic',
    url: 'https://arabic.divineteams.ai',
    status: 'Live',
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
    name: 'TraceLeads',
    description: 'Lead generation platform',
    status: 'Active',
    progress: 60,
  },
  {
    id: 'proj-2',
    name: 'Sunstream Global',
    description: 'Exhibition lead generation campaign',
    status: 'Active',
    progress: 75,
  },
  {
    id: 'proj-3',
    name: 'FAaaS (Funnels as a Service)',
    description: 'White-label funnel service',
    status: 'Planning',
    progress: 20,
  },
  {
    id: 'proj-4',
    name: 'Passenger Payback',
    description: 'Flight compensation service',
    status: 'On Hold',
    progress: 40,
  },
  {
    id: 'proj-5',
    name: 'Rosa App',
    description: 'Custom app development',
    status: 'Proposal',
    progress: 10,
  },
  {
    id: 'proj-6',
    name: 'Orb Trading Bot',
    description: 'Automated trading system',
    status: 'Development',
    progress: 35,
  },
];
