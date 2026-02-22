export type BookStatus = 'Idea' | 'Outline' | 'Writing' | 'Editing' | 'Translation' | 'Cover Design' | 'Formatting' | 'KDP Upload' | 'Published';

export interface Book {
  id: string;
  title: string;
  wordCount: number;
  languages: string[];
  status: BookStatus;
  imagePrompt?: string;
  kdpChecklist?: {
    manuscript: boolean;
    cover: boolean;
    description: boolean;
    keywords: boolean;
    categories: boolean;
    pricing: boolean;
  };
  amazonLinks?: {
    ebookASIN?: string;
    ebookStatus?: 'Live' | 'In Review' | 'Draft' | 'Not Started';
    ebookPrice?: string;
    paperbackASIN?: string;
    paperbackStatus?: 'Live' | 'In Review' | 'Draft' | 'Not Started';
    paperbackPrice?: string;
    hardcoverStatus?: 'Live' | 'In Review' | 'Draft' | 'Not Started';
  };
}

export type SongStatus = 'Draft' | 'Lyrics Done' | 'Suno Ready' | 'Generated' | 'Video Done' | 'Published';

export interface Song {
  id: string;
  number: number;
  title: string;
  raga?: string;
  emotion?: string;
  status: SongStatus;
  lyrics?: string;
  sunoPrompt?: string;
}

export type ClientStatus = 'Prospect' | 'Proposal' | 'Active' | 'Completed' | 'Paused';

export interface Client {
  id: string;
  name: string;
  status: ClientStatus;
  revenue?: number;
  tasks: string[];
  notes?: string;
}

export type PartnerType = 'Partner' | 'Affiliate' | 'JV' | 'Referral';

export interface Partnership {
  id: string;
  name: string;
  type: PartnerType;
  status: string;
  revenueShared?: number;
  notes?: string;
}

export type SessionStatus = 'Completed' | 'Next' | 'Upcoming';

export interface Session {
  number: number;
  status: SessionStatus;
  topic?: string;
}

export interface ContentPost {
  id: string;
  platform: string;
  topic: string;
  draftText: string;
  imagePrompt?: string;
  status: 'Draft' | 'Scheduled' | 'Published';
  scheduledDate?: string;
}

export interface LandingPage {
  id: string;
  name: string;
  url: string;
  status: string;
  notes?: string;
}

export interface DigitalProduct {
  id: string;
  name: string;
  price: string;
  status: string;
  gumroadLink?: string;
  uploadChecklist?: {
    files: boolean;
    description: boolean;
    pricing: boolean;
    cover: boolean;
  };
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: string;
  progress?: number;
}
