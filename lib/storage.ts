import { MissionControlData } from '@/types';

const STORAGE_KEY = 'mission-control-os-v2';

const modiImagePrompts = [
  { id: 'cover', label: 'Cover (Front)', prompt: 'Dramatic photorealistic book cover. Narendra Modi silhouette standing at the edge of a cliff overlooking a futuristic India skyline at golden hour. Divine rays of light breaking through storm clouds above him. The Indian tricolor subtly woven into the sky colors - saffron, white, green. Ancient Sanskrit text faintly visible in the light rays. Cinematic, epic scale, 8k, dramatic lighting, movie poster quality. No text.' },
  { id: 'ch1', label: 'Ch 1: The Nostradamus Code', prompt: 'Ancient weathered parchment with Nostradamus quatrains in old French, illuminated by candlelight. A magnifying glass reveals the word "India" hidden in the text. Dark medieval study background with astrolabe, star charts. Photorealistic, moody, mysterious. No readable text.' },
  { id: 'ch2', label: 'Ch 2: The Palm Leaf Prophecies', prompt: 'Ancient dried palm leaf manuscripts (Nadi Shastra) stacked in a dimly lit Tamil temple library. Intricate Tamil script etched on leaves. Warm oil lamp light. Old wooden shelves. Dust particles in light beams. Photorealistic, sacred atmosphere.' },
  { id: 'ch3', label: 'Ch 3: The Kalki Avatar', prompt: 'Majestic white horse emerging from storm clouds over India, divine golden light behind. Below: a map of India transforming from darkness to light. Hindu temple architecture framing the scene. Epic, cinematic, divine scale. Photorealistic.' },
  { id: 'ch4', label: 'Ch 4: The Numbers Don\'t Lie', prompt: 'Beautiful mathematical sacred geometry patterns floating in dark space. Numbers 17, 9, 11 prominently glowing in gold. Fibonacci spirals, Vedic yantra patterns, astrological charts overlapping. Dark background, luminous gold numbers. Digital art, clean, mysterious.' },
  { id: 'ch5', label: 'Ch 5: The Western Prophets', prompt: 'Split image: Edgar Cayce in trance on the left, Baba Vanga with white headscarf on the right. Between them: a glowing globe showing India highlighted in gold. Vintage sepia tones, photorealistic portraits, dramatic vignette.' },
  { id: 'ch6', label: 'Ch 6: The Darkness Before (2010-2014)', prompt: 'Dark moody image of Indian Parliament building shrouded in thick fog and darkness. Crumbling rupee coins on the ground. Empty gas cylinders, price tags flying. Night scene, oppressive atmosphere. Photorealistic, editorial.' },
  { id: 'ch7', label: 'Ch 7: The JAM Trinity', prompt: 'Three pillars of light emerging from Indian soil: one made of Aadhaar cards, one of mobile phones, one of bank passbooks. The light beams converge into a single bright star above. Rural Indian landscape at dawn. Photorealistic, hopeful.' },
  { id: 'ch8', label: 'Ch 8: Demonetization', prompt: 'Dramatic bird\'s-eye view of a massive queue of Indians outside a bank, stretching into the distance. Old 500 and 1000 rupee notes scattered on the ground like fallen leaves. Dawn light. Photorealistic, documentary style.' },
  { id: 'ch9', label: 'Ch 9: The Conspiracy Theories', prompt: 'Dark room with red string connecting photos, documents, and newspaper clippings on a conspiracy board. WEF logo, Adani tower, electoral bonds document visible but blurry. Single desk lamp illuminating. Noir, thriller aesthetic. Photorealistic.' },
  { id: 'ch10', label: 'Ch 10: The Ram Mandir', prompt: 'Magnificent Ram Mandir in Ayodhya at sunrise, golden light illuminating the pink sandstone. Thousands of diyas (oil lamps) floating on the Sarayu river in foreground. Devotees silhouetted. Photorealistic, sacred, grand scale.' },
  { id: 'ch11', label: 'Ch 11: Space', prompt: 'Chandrayaan-3 lander on the lunar south pole surface. Earth visible in the black sky with India clearly lit up. Indian flag on the lander. Stark, beautiful, photorealistic space photography style.' },
  { id: 'ch12', label: 'Ch 12: India 2030', prompt: 'Futuristic Indian city skyline - bullet trains, solar panels on every roof, drone delivery, holographic displays. Traditional temple spires rising between glass towers. Golden hour, optimistic, clean. Photorealistic concept art.' },
  { id: 'ch13', label: 'Ch 13: The Shadow Side', prompt: 'Cracked mirror reflecting Modi\'s face - one half shows achievements (rockets, temples, infrastructure), other half shows protests, farmer agitation, unemployment lines. Dramatic lighting, symbolic, photorealistic.' },
  { id: 'ch14', label: 'Ch 14: The Final Question', prompt: 'Single person standing at a crossroads in a vast Indian landscape. One path leads to a radiant golden future city, the other to darkness. Stars and constellations visible above. Dramatic, cinematic, contemplative. Photorealistic.' },
  { id: 'epilogue', label: 'Epilogue: 2030', prompt: 'India from space at night, brilliantly lit up - brighter than any other country. International Space Station visible. Earth curvature, stars. NASA-style satellite photography but India is glowing golden, not white. Photorealistic.' },
  { id: 'back', label: 'Back Cover', prompt: 'Subtle Indian tricolor gradient background (saffron to white to green, very muted). Center: a single question mark made of tiny images of Modi, temples, rockets, protests, rupee signs, flags. Photorealistic collage forming the question mark shape.' },
];

export const getDefaultData = (): MissionControlData => ({
  songs: [
    {
      id: 'song1',
      name: 'Nanna Ammage',
      language: 'Kannada',
      status: 'Suno Ready',
      sunoPrompt: 'Carnatic devotional ballad, female vocalist, gentle tanpura drone, harmonium melody, soft tabla, violin interludes, 65 BPM, Raag Charukeshi, devotional, emotional, Indian classical fusion',
      lyricsPreview: 'ನನ್ನ ಅಮ್ಮಗೆ ನಮನ, ದೇವತೆಯ ಸ್ವರೂಪ\nಮಾತೃಶಕ್ತಿಯ ಪ್ರತೀಕ, ಪ್ರೇಮದ ಅನೂಪ\nನಿನ್ನ ಪಾದದ ಕೆಳಗೆ ಸ್ವರ್ಗವಿದೆ ಎಂದರು\nನಿನ್ನ ಮಮತೆಯಲ್ಲಿ ದೇವರು ಕಾಣುತ್ತಾರೆ...',
    },
    {
      id: 'song2',
      name: 'Mugila Mele',
      language: 'Kannada',
      status: 'Suno Ready',
      sunoPrompt: 'Indian classical fusion, male vocalist, bansuri lead, gentle tabla, ambient pads, rain sounds, 72 BPM, Raag Madhuvanti, meditative, hopeful, nature-inspired',
    },
    {
      id: 'song3',
      name: 'Bedavu Nanna Mana',
      language: 'Kannada',
      status: 'Suno Ready',
      sunoPrompt: 'Hindustani-Carnatic fusion ghazal, male vocalist, sarangi lead, soft harmonium, gentle tabla, 55 BPM, Raag Puriya Dhanashri, romantic, yearning, intimate',
    },
  ],
  songsTarget: 50,
  books: [
    {
      id: 'book1',
      title: 'Is Modi God Sent?',
      wordCount: 15579,
      status: 'Formatting',
      imagePrompts: modiImagePrompts,
      kdpChecklist: {
        manuscriptReady: true,
        coverImage: false,
        description: false,
        keywords: false,
        categories: false,
        priceSet: false,
        kdpLoggedIn: false,
        uploaded: false,
        reviewSubmitted: false,
        liveOnAmazon: false,
      },
      nextStep: 'Generate cover image → Upload to KDP',
    },
  ],
  products: [],
  landingSites: [
    { id: 'site1', domain: 'divinesuccessflow.com', purpose: 'Main site', status: 'Live', techStack: 'Next.js', platform: 'Vercel', url: 'https://divinesuccessflow.com' },
    { id: 'site2', domain: 'divineteams.ai', purpose: 'Divine Teams', status: 'Live', techStack: 'Next.js', platform: 'Vercel', url: 'https://divineteams.ai' },
    { id: 'site3', domain: 'iceberg.divinesuccessflow.com', purpose: 'Nandini Assessment', status: 'Live', techStack: 'HTML/JS', platform: 'GitHub Pages', url: 'https://iceberg.divinesuccessflow.com' },
    { id: 'site4', domain: 'france.divineteams.ai', purpose: 'French localization', status: 'Development', techStack: 'Next.js', platform: 'Vercel' },
    { id: 'site5', domain: 'germany.divineteams.ai', purpose: 'German localization', status: 'Development', techStack: 'Next.js', platform: 'Vercel' },
    { id: 'site6', domain: 'spain.divineteams.ai', purpose: 'Spanish localization', status: 'Development', techStack: 'Next.js', platform: 'Vercel' },
    { id: 'site7', domain: 'brazil.divineteams.ai', purpose: 'Portuguese localization', status: 'Development', techStack: 'Next.js', platform: 'Vercel' },
    { id: 'site8', domain: 'arabic.divineteams.ai', purpose: 'Arabic localization', status: 'Development', techStack: 'Next.js', platform: 'Vercel' },
  ],
  revenueByMonth: [
    { month: '2026-02', amount: 16692 },
  ],
  revenueGoal: 10000000,
  adCampaigns: [],
  revenueSources: [
    { source: 'Perplexity Resale', amount: 8346 },
    { source: 'N8N Flip', amount: 8346 },
  ],
  linkedInPosts: [],
  linkedInCampaigns: [],
  linkedInWeeklyTarget: 5,
  nandiniTasks: [
    { id: 'n1', task: 'Iceberg Assessment site fix', status: 'In Progress', notes: 'FormSubmit integration needs testing', nextAction: 'Test both email endpoints' },
    { id: 'n2', task: 'FormSubmit.co email confirmation (both emails)', status: 'Not Started', notes: '', nextAction: 'Configure FormSubmit endpoints' },
    { id: 'n3', task: 'Google Sheets backup for leads', status: 'Not Started', notes: '', nextAction: 'Set up Zapier/Make integration' },
    { id: 'n4', task: 'Meta ad campaign setup', status: 'Not Started', notes: '', nextAction: 'Create ad account and first campaign' },
    { id: 'n5', task: 'Masterclass landing page', status: 'Not Started', notes: '', nextAction: 'Design wireframe' },
    { id: 'n6', task: 'WhatsApp automation', status: 'Not Started', notes: '', nextAction: 'Research Interakt API' },
    { id: 'n7', task: 'Lead nurture sequence', status: 'Not Started', notes: '', nextAction: 'Write first 3 emails' },
  ],
  aiProsperityLaunchDate: '2026-03-11',
  aiProsperityChecklist: {
    curriculumFinalized: false,
    masterpromptReady: false,
    buildPlaybookDone: false,
    launchKitComplete: false,
    pricingSet: true,
    landingPageLive: false,
    paymentGateway: false,
    tenSignupsTarget: false,
    linkedInPromotion: false,
    emailSequence: false,
  },
  aiProsperitySignups: 0,
  projects: [
    { id: 'p1', name: 'TraceLeads', status: 'In Progress', nextAction: 'Build lead scraping pipeline', notes: 'LinkedIn/Apollo integration' },
    { id: 'p2', name: 'Sunstream', status: 'In Progress', nextAction: 'Exhibition data scraping', notes: 'Germany trade shows focus' },
    { id: 'p3', name: 'FAaaS', status: 'Planning', nextAction: 'Define service offering', notes: 'Funnels as a Service' },
    { id: 'p4', name: 'Passenger Payback', status: 'Planning', nextAction: 'Legal research on flight compensation', notes: 'EU261 claims automation' },
    { id: 'p5', name: 'Rosa Consulting', status: 'Blocked', nextAction: 'Resume client outreach', notes: 'On hold pending bandwidth' },
    { id: 'p6', name: 'Orb Trading Bot', status: 'In Progress', nextAction: 'Backtest strategy', notes: 'Options selling automation' },
  ],
  lastUpdated: new Date().toISOString(),
});

export const loadData = (): MissionControlData => {
  if (typeof window === 'undefined') {
    return getDefaultData();
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Merge with defaults to ensure new fields exist
      return { ...getDefaultData(), ...parsed };
    }
  } catch (error) {
    console.error('Failed to load data:', error);
  }

  return getDefaultData();
};

export const saveData = (data: MissionControlData): void => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    data.lastUpdated = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save data:', error);
  }
};

export const resetData = (): void => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to reset data:', error);
  }
};
