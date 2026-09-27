export type ProjectCategory = "WEB" | "FINTECH" | "SIDE PROJECT" | "WORK";

export type CaseStudySection = {
  heading: string;
  body: string[];
};

export type Project = {
  slug: string;
  order: number;
  featured: boolean;
  category: ProjectCategory[];
  name: string;
  summary: string;
  problem: string;
  stack: string[];
  period: string;
  github?: string;
  demo?: string;
  caseStudy: CaseStudySection[];
};

export const projects: Project[] = [];

export const getFeaturedProjects = () =>
  projects.filter((p) => p.featured).sort((a, b) => a.order - b.order);

export const getAllProjects = () => [...projects].sort((a, b) => a.order - b.order);

export const getProjectBySlug = (slug: string) => projects.find((p) => p.slug === slug);

export const projectCategories: ProjectCategory[] = ["WEB", "FINTECH", "SIDE PROJECT", "WORK"];
