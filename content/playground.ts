export type PlaygroundCategory =
  | "CSS Animation"
  | "React Components"
  | "UI Experiments"
  | "Three.js"
  | "Framer Motion"
  | "API Experiments"
  | "Small Tools";

export type PlaygroundItem = {
  slug: string;
  title: string;
  description: string;
  category: PlaygroundCategory;
  stack: string[];
  date: string;
  demo?: string;
  github?: string;
  notes: string[];
};

export const playgroundItems: PlaygroundItem[] = [];

export const getAllPlaygroundItems = () =>
  [...playgroundItems].sort((a, b) => (a.date < b.date ? 1 : -1));

export const getPlaygroundItemBySlug = (slug: string) =>
  playgroundItems.find((p) => p.slug === slug);
