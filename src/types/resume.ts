export interface PersonalDetails {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  website?: string;
  github?: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  bullets: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
  bullets: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  achievements?: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  link?: string;
}

export interface ResumeData {
  personalDetails: PersonalDetails;
  summary: string;
  skills: {
    technical: string[];
    soft: string[];
  };
  workExperience: WorkExperience[];
  projects: Project[];
  education: Education[];
  certifications: Certification[];
}

export type TemplateId = 'classic' | 'modern' | 'minimal' | 'professional' | 'executive' | 'creative' | 'tech' | 'academic';

export interface TemplateInfo {
  id: TemplateId;
  name: string;
  description: string;
  layout: 'single' | 'two-column';
  preview: string;
}

export interface ATSScore {
  overall: number;
  keywords: number;
  formatting: number;
  suggestions: string[];
  missingKeywords: string[];
}

export type BuilderStep = 
  | 'personal'
  | 'summary'
  | 'skills'
  | 'experience'
  | 'projects'
  | 'education'
  | 'certifications';

export const BUILDER_STEPS: { id: BuilderStep; label: string }[] = [
  { id: 'personal', label: 'Personal Details' },
  { id: 'summary', label: 'Summary' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'certifications', label: 'Certifications' },
];
