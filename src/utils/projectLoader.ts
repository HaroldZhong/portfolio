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
}

// Import project data
import bratData from '../content/projects/brat-chatbot/data.json';
import nhisData from '../content/projects/nhis-nhanes/data.json';
import clinicalData from '../content/projects/clinical-prompts/data.json';

const projects: Project[] = [
  bratData as Project,
  nhisData as Project,
  clinicalData as Project
];

export const getAllProjects = (): Project[] => {
  return projects.sort((a, b) => a.title.localeCompare(b.title));
};

export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find(p => p.slug === slug);
};

