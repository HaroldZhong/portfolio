export interface Project {
  slug: string;
  title: string;
  role: string;
  summary: string;
  thumbnail: string;
  tags: string[];
  overview: string;
  myRole: string;
  technologies: string[];
  outcomes: string[];
  links?: {
    github?: string;
    demo?: string;
    paper?: string;
    availableOnRequest?: boolean;
  };
  sections?: {
    title: string;
    content: string | string[];
    type?: 'text' | 'list';
  }[];
}

// Import project data
import bratData from '../content/projects/brat-chatbot/data.json';
import nhisData from '../content/projects/nhis-nhanes/data.json';
import intersectionalityData from '../content/projects/intersectionality-health/data.json';
import clinicalData from '../content/projects/clinical-prompts/data.json';
import llmCouncilData from '../content/projects/ai-advisory-board/data.json';
import researchAtlasData from '../content/projects/research-atlas/data.json';

const projects: Project[] = [
  researchAtlasData as Project,
  llmCouncilData as Project,
  bratData as Project,
  nhisData as Project,
  intersectionalityData as Project,
  clinicalData as Project
];

export const getAllProjects = (): Project[] => {
  return projects;
};

export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find(p => p.slug === slug);
};

