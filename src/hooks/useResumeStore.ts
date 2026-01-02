import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  ResumeData, 
  TemplateId, 
  BuilderStep, 
  WorkExperience, 
  Project, 
  Education, 
  Certification 
} from '@/types/resume';

const initialResumeData: ResumeData = {
  personalDetails: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    website: '',
    github: '',
  },
  summary: '',
  skills: {
    technical: [],
    soft: [],
  },
  workExperience: [],
  projects: [],
  education: [],
  certifications: [],
};

interface ResumeStore {
  resumeData: ResumeData;
  selectedTemplate: TemplateId;
  currentStep: BuilderStep;
  
  // Actions
  setPersonalDetails: (details: Partial<ResumeData['personalDetails']>) => void;
  setSummary: (summary: string) => void;
  setSkills: (skills: Partial<ResumeData['skills']>) => void;
  
  // Work Experience
  addWorkExperience: (experience: WorkExperience) => void;
  updateWorkExperience: (id: string, experience: Partial<WorkExperience>) => void;
  removeWorkExperience: (id: string) => void;
  
  // Projects
  addProject: (project: Project) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  removeProject: (id: string) => void;
  
  // Education
  addEducation: (education: Education) => void;
  updateEducation: (id: string, education: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  
  // Certifications
  addCertification: (certification: Certification) => void;
  updateCertification: (id: string, certification: Partial<Certification>) => void;
  removeCertification: (id: string) => void;
  
  // Template & Navigation
  setSelectedTemplate: (template: TemplateId) => void;
  setCurrentStep: (step: BuilderStep) => void;
  
  // Reset
  resetResume: () => void;
}

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      resumeData: initialResumeData,
      selectedTemplate: 'modern',
      currentStep: 'personal',

      setPersonalDetails: (details) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            personalDetails: { ...state.resumeData.personalDetails, ...details },
          },
        })),

      setSummary: (summary) =>
        set((state) => ({
          resumeData: { ...state.resumeData, summary },
        })),

      setSkills: (skills) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            skills: { ...state.resumeData.skills, ...skills },
          },
        })),

      addWorkExperience: (experience) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            workExperience: [...state.resumeData.workExperience, experience],
          },
        })),

      updateWorkExperience: (id, experience) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            workExperience: state.resumeData.workExperience.map((exp) =>
              exp.id === id ? { ...exp, ...experience } : exp
            ),
          },
        })),

      removeWorkExperience: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            workExperience: state.resumeData.workExperience.filter((exp) => exp.id !== id),
          },
        })),

      addProject: (project) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            projects: [...state.resumeData.projects, project],
          },
        })),

      updateProject: (id, project) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            projects: state.resumeData.projects.map((p) =>
              p.id === id ? { ...p, ...project } : p
            ),
          },
        })),

      removeProject: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            projects: state.resumeData.projects.filter((p) => p.id !== id),
          },
        })),

      addEducation: (education) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            education: [...state.resumeData.education, education],
          },
        })),

      updateEducation: (id, education) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            education: state.resumeData.education.map((edu) =>
              edu.id === id ? { ...edu, ...education } : edu
            ),
          },
        })),

      removeEducation: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            education: state.resumeData.education.filter((edu) => edu.id !== id),
          },
        })),

      addCertification: (certification) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            certifications: [...state.resumeData.certifications, certification],
          },
        })),

      updateCertification: (id, certification) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            certifications: state.resumeData.certifications.map((cert) =>
              cert.id === id ? { ...cert, ...certification } : cert
            ),
          },
        })),

      removeCertification: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            certifications: state.resumeData.certifications.filter((cert) => cert.id !== id),
          },
        })),

      setSelectedTemplate: (template) => set({ selectedTemplate: template }),
      setCurrentStep: (step) => set({ currentStep: step }),
      resetResume: () => set({ resumeData: initialResumeData, currentStep: 'personal' }),
    }),
    {
      name: 'resume-storage',
    }
  )
);
