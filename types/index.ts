export interface Goal {
  id: string;
  category: 'Movies' | 'Songs' | 'Books' | 'Seminars' | 'Courses' | 'Products' | 'Factories' | 'Companies';
  target: number;
  current: number;
  deadline: string; // ISO date
  color: string;
}

export interface PreFlightCheck {
  concern: string;
  accomplishment: string;
  scope: string;
  playbook: string;
  quality: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  stage: 'Initiating' | 'Planning' | 'Executing' | 'Monitoring' | 'Closing';
  preFlightCheck: PreFlightCheck;
  risk: 'low' | 'medium' | 'high';
  qualityGateChecked: boolean;
  createdAt: string;
  updatedAt: string;
}

export type CascadeStatus = 'active' | 'complete' | 'blocked';

export interface CascadeNode {
  id: string;
  title: string;
  level: 'overarching' | 'area' | 'concern' | 'outcome' | 'result' | 'action';
  status: CascadeStatus;
  parentId: string | null;
  children: string[];
  description?: string;
}

export interface AppData {
  goals: Goal[];
  tasks: Task[];
  cascades: CascadeNode[];
  lastUpdated: string;
}
