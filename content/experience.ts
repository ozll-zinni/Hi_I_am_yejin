export type Experience = {
  period: string;
  role: string;
  company: string;
  highlights: string[];
  stack: string[];
};

export const experience: Experience[] = [
  {
    period: "2025 — Present",
    role: "Frontend Developer",
    company: "Golf Company",
    highlights: [
      "React 기반 웹 서비스 개발",
      "모바일 경영정보 서비스 개발",
      "REST API 연동",
      "UI/UX 개선",
      "Jira 기반 Agile/Sprint 개발",
    ],
    stack: ["React", "Vite", "MUI", "Jotai"],
  },
];
