// Core types for Mission Control OS V2

export type SongStatus = 'Draft' | 'Lyrics Done' | 'Suno Ready' | 'Generated' | 'Video Done' | 'Published';
export type BookStatus = 'Writing' | 'Editing' | 'Cover Design' | 'Formatting' | 'KDP Upload' | 'Published';
export type ProductStatus = 'Creating' | 'Ready' | 'Uploaded' | 'Live' | 'Promoted';
export type SiteStatus = 'Design' | 'Development' | 'Deployed' | 'Live';
export type PostStatus = 'Idea' | 'Drafted' | 'Scheduled' | 'Posted' | 'Engaged';
export type ProjectStatus = 'Planning' | 'In Progress' | 'Blocked' | 'Completed';
export type TaskStatus = 'Not Started' | 'In Progress' | 'Completed';

export interface Song {
  id: string;
  name: string;
  language: string;
  status: SongStatus;
  sunoPrompt: string;
  lyricsPreview?: string;
  videoUrl?: string;
  publishedUrl?: string;
}

export interface ImagePrompt {
  id: string;
  label: string;
  prompt: string;
}

export interface KDPChecklist {
  manuscriptReady: boolean;
  coverImage: boolean;
  description: boolean;
  keywords: boolean;
  categories: boolean;
  priceSet: boolean;
  kdpLoggedIn: boolean;
  uploaded: boolean;
  reviewSubmitted: boolean;
  liveOnAmazon: boolean;
}

export interface Book {
  id: string;
  title: string;
  wordCount: number;
  status: BookStatus;
  imagePrompts: ImagePrompt[];
  kdpChecklist: KDPChecklist;
  nextStep: string;
}

export interface ProductChecklist {
  fileReady: boolean;
  coverImage: boolean;
  description: boolean;
  priceSet: boolean;
  uploaded: boolean;
  live: boolean;
}

export interface Product {
  id: string;
  name: string;
  type: string;
  price: number;
  status: ProductStatus;
  checklist: ProductChecklist;
  revenue: number;
}

export interface LandingSite {
  id: string;
  domain: string;
  purpose: string;
  status: SiteStatus;
  techStack: string;
  platform: string;
  url?: string;
}

export interface AdCampaign {
  id: string;
  platform: string;
  campaign: string;
  spend: number;
  revenue: number;
}

export interface RevenueSource {
  source: string;
  amount: number;
}

export interface LinkedInPost {
  id: string;
  date: string;
  topic: string;
  status: PostStatus;
  content?: string;
}

export interface LinkedInCampaign {
  id: string;
  name: string;
  connectionsSent: number;
  connectionsAccepted: number;
}

export interface NandiniTask {
  id: string;
  task: string;
  status: TaskStatus;
  notes: string;
  nextAction: string;
}

export interface AIProsperityChecklist {
  curriculumFinalized: boolean;
  masterpromptReady: boolean;
  buildPlaybookDone: boolean;
  launchKitComplete: boolean;
  pricingSet: boolean;
  landingPageLive: boolean;
  paymentGateway: boolean;
  tenSignupsTarget: boolean;
  linkedInPromotion: boolean;
  emailSequence: boolean;
}

export interface Project {
  id: string;
  name: string;
  status: ProjectStatus;
  nextAction: string;
  notes: string;
}

export interface PreFlightCheck {
  concern: string;
  accomplishment: string;
  scope: string;
  playbook: string;
  quality: string;
}

export interface MissionControlData {
  songs: Song[];
  songsTarget: number;
  books: Book[];
  products: Product[];
  landingSites: LandingSite[];
  revenueByMonth: { month: string; amount: number }[];
  revenueGoal: number;
  adCampaigns: AdCampaign[];
  revenueSources: RevenueSource[];
  linkedInPosts: LinkedInPost[];
  linkedInCampaigns: LinkedInCampaign[];
  linkedInWeeklyTarget: number;
  nandiniTasks: NandiniTask[];
  aiProsperityLaunchDate: string;
  aiProsperityChecklist: AIProsperityChecklist;
  aiProsperitySignups: number;
  projects: Project[];
  lastUpdated: string;
}
