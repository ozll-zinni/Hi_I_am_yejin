export const site = {
  name: "예진",
  nameEn: "Yejin",
  fullName: "김예진",
  fullNameEn: "Yejin Kim",
  role: "Frontend Developer",
  tagline: "사용자의 문제를 이해하고\n서비스로 해결하는 프론트엔드 개발자",
  heroStack: ["React", "JavaScript", "Next.js"],
  about: `프론트엔드 개발자로 실제 서비스의 UI를 개발하고 운영하면서
사용자가 편하게 사용할 수 있는 인터페이스와
유지보수하기 좋은 코드 구조에 관심을 가지고 있습니다.
최근에는 금융 서비스와 데이터 기반 서비스에 관심을 가지고
개인 프로젝트를 통해 새로운 기술과 문제 해결 방법을 실험하고 있습니다.`,
  links: {
    github: "https://github.com/your-id",
    linkedin: "https://linkedin.com/in/your-id",
    email: "mailto:your-email@example.com",
    resume: "/resume.pdf",
  },
  seo: {
    baseTitle: "예진 — Frontend Developer",
    baseDescription:
      "사용자의 문제를 이해하고 서비스로 해결하는 프론트엔드 개발자 예진의 포트폴리오입니다.",
  },
} as const;

export const nav = [
  { label: "WORK", href: "/projects" },
  { label: "BLOG", href: "/blog" },
  { label: "PLAYGROUND", href: "/playground" },
] as const;

// Anchor ids for the one-page home scroll-spy nav.
export const homeSections = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "blog", label: "Blog" },
  { id: "contact", label: "Contact" },
] as const;
