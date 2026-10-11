export const site = {
  name: "예진",
  nameEn: "Yejin",
  fullName: "김예진",
  fullNameEn: "Yejin Kim",
  role: "Frontend Developer",
  tagline: "구조를 먼저 정리하고\n개선을 숫자로 확인하는 프론트엔드 개발자",
  heroStack: ["React", "Next.js", "TypeScript"],
  about: `저는 사용자의 일상 속에서 자연스럽게 스며들어 추천하고 싶은 서비스를 만드는 프론트엔드 개발자 김예진입니다.

클릭 한 번, 색상 하나의 변화가 서비스의 인상을 좌우한다고 믿으며, 
작은 개선이 모여 사용자 경험의 큰 차이를 만든다고 생각합니다.

단순히 보이는 화면을 구현하는 것을 넘어, 
생각을 구조화하고 이를 코드로 구현하는 과정에서 즐거움을 느껴왔습니다. 
서비스의 의도를 이용자가 쓸 수 있는 화면으로 잇는, 
다리 같은 개발자가 되고 싶습니다.`,
  links: {
    github: "https://github.com/your-id",
    linkedin: "https://linkedin.com/in/your-id",
    email: "mailto:your-email@example.com",
    resume: "/resume.pdf",
  },
  seo: {
    baseTitle: "예진 — Frontend Developer",
    baseDescription:
      "구조를 먼저 정리하고 개선을 숫자로 확인하는 프론트엔드 개발자 예진의 포트폴리오입니다.",
  },
} as const;

export const nav = [
  { label: "WORK", href: "/work" },
  { label: "BLOG", href: "/blog" },
  { label: "PLAYGROUND", href: "/playground" },
] as const;
