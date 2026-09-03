export interface SkillGapItem {
  skill: string;
  importance: 'High' | 'Medium' | 'Nice-to-have';
  recommendation: string;
}

export interface RecommendedCert {
  id: string;
  name: string;
  provider: string;
  estimatedDuration: string;
  cost?: string;
  url?: string;
  expectedMatchBoostPercent: number;
  skillsAddressed: string[];
  status?: 'not_started' | 'in_progress' | 'completed';
}

export interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  highlights: string[];
}

export interface CandidateProfile {
  name: string;
  title: string;
  avatarUrl: string;
  location: string;
  targetSalaryMin: number;
  targetSalaryMax: number;
  preferredWorkModel: 'Any' | 'Remote' | 'Hybrid' | 'On-site';
  linkedinUrl: string;
  cvFileName?: string;
  cvSource?: 'local' | 'google_drive' | 'dropbox' | 'onedrive';
  cvLastUpdated?: string;
  summary: string;
  skills: string[];
  experience: ExperienceItem[];
  education: string[];
  certifications: string[];
  completedCourseIds: string[];
}

export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogoBg: string;
  location: string;
  workModel: 'Remote' | 'Hybrid' | 'On-site';
  industry: string;
  jobFamily: string;
  salaryMin: number;
  salaryMax: number;
  currency: string;
  experienceLevel: 'Entry' | 'Mid' | 'Senior' | 'Lead / Staff' | 'Director / VP';
  postedDate: string;
  featured?: boolean;
  description: string;
  responsibilities: string[];
  requiredSkills: string[];
  niceToHaveSkills: string[];
  benefits: string[];
  // Match results
  matchScore?: number;
  matchLabel?: 'Strong Match' | 'Good Match' | 'Moderate Match' | 'Growth Opportunity';
  goodFitReasons?: string[];
  notGoodFitReasons?: string[];
  skillsGap?: SkillGapItem[];
  recommendedCertifications?: RecommendedCert[];
}

export interface SavedSearchAlert {
  id: string;
  name: string;
  keywords: string;
  jobTitle: string;
  location: string;
  industry: string;
  jobFamily: string;
  minSalary: number;
  workModel: string;
  alertFrequency: 'instant' | 'daily' | 'weekly';
  emailAlerts: boolean;
  inAppAlerts: boolean;
  minMatchScore: number;
  isActive: boolean;
  createdAt: string;
  newMatchesCount: number;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'new_match' | 'saved_search' | 'upskilling' | 'profile_sync';
  jobId?: string;
  matchScore?: number;
}
