export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
}

export interface EducationItem {
  id: string;
  school: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  location: string;
  description?: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  role?: string;
  description: string;
  url?: string;
}

export interface CertificateItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  description: string;
}

export interface LanguageItem {
  id: string;
  language: string;
  proficiency: string;
}

export interface LinkItem {
  id: string;
  label: string;
  url: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  experience: WorkExperience[];
  education: EducationItem[];
  skills: string[];
  projects: ProjectItem[];
  certificates: CertificateItem[];
  achievements: AchievementItem[];
  languages: LanguageItem[];
  links: LinkItem[];
}

export interface TemplateMetadata {
  id: string;
  name: string;
  desc: string;
  isPremium: boolean;
  atsScore: number;
  isPopular?: boolean;
}
