export type EvidenceBasis = 'Internal benchmark' | 'Human-verified golden set' | 'Planned evaluation';

export interface Project {
  slug: string;
  title: string;
  role: string;
  status: string;
  summary: string;
  thumbnail: string;
  tags: string[];
  overview?: string;
  myRole: string;
  technologies: string[];
  outcomes: string[];
  links?: {
    github?: string;
    demo?: string;
    paper?: string;
  };
  sections?: {
    title: string;
    content: string | string[];
    type?: 'text' | 'list';
  }[];
  // Featured case studies: problem, decisions, measured evidence and tradeoffs.
  caseStudy?: {
    problem: string;
    decisions: { title: string; detail: string }[];
    evidenceNote?: string;
    evidence: { basis: EvidenceBasis; claim: string }[];
    tradeoffs: string[];
    publication?: { title: string; venue: string; year: string; doi: string };
  };
}

// Import project data
import bratData from '../content/projects/brat-chatbot/data.json';
import nhisData from '../content/projects/nhis-nhanes/data.json';
import intersectionalityData from '../content/projects/intersectionality-health/data.json';
import clinicalData from '../content/projects/clinical-prompts/data.json';
import researchAtlasData from '../content/projects/research-atlas/data.json';
import praxisData from '../content/projects/praxis-ai/data.json';
import scholiaData from '../content/projects/scholia/data.json';
import psmData from '../content/projects/propensity-score-matching/data.json';

// Featured work first, then the rest by recency.
const projects: Project[] = [
  praxisData as Project,
  scholiaData as Project,
  bratData as Project,
  researchAtlasData as Project,
  nhisData as Project,
  intersectionalityData as Project,
  psmData as Project,
  clinicalData as Project
];

// Retired case-study URLs and where they now live.
export const projectRedirects: Record<string, string> = { 'ai-advisory-board': 'scholia' };

export const getAllProjects = (): Project[] => {
  return projects;
};

export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find(p => p.slug === slug);
};

