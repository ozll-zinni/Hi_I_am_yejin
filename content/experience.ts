export type Experience = {
  period: string;
  role: string;
  company: string;
  description?: string;
  highlights: string[];
  stack: string[];
};

export const experience: Experience[] = [
  {
    period: "2025.12 — Present",
    role: "Frontend Developer",
    company: "Golfzon Cloud",
    description: "골프장 홈페이지, 경기관제, 모바일 경영정보 서비스의 프론트엔드를 개발하고 운영하고 있습니다.",
    highlights: [
      "SNS 간편로그인·계정 연결·재인증·SSO 인증 흐름 4종 통합 설계",
      "외부 서비스 자동로그인(SSO) 브릿지 구현",
      "회원가입 CI/DI RSA 공개키 암호화 적용",
      "Safari 로그인 실패(레이스 컨디션) 원인 분석 및 해결",
      "Datadog RUM·에러 바운더리 기반 프론트 에러 모니터링 구축",
    ],
    stack: ["React", "Next.js", "TypeScript", "Jotai", "Vite"],
  },
  {
    period: "2025.02 — 2025.11",
    role: "Functional Safety Engineer",
    company: "KES Solution",
    highlights: [
      "철도 시스템 개발 프로젝트에서 신뢰성·가용성·유지보수성(RAMS) 목표 달성을 위한 컨설팅 수행",
      "소프트웨어 생명주기에 맞춰 요구사항 정의, 설계, 검증 단계에서의 품질 확보 지원",
      "개발된 시스템의 요구사항 충족 여부와 목적 적합성 검증·분석을 수행"
    ],
    stack: [],
  },
];

export const otherExperiences: Experience[] = [
  {
    period: "2024.08 - 2024.12",
    role: "",
    company: "SW사관학교 정글",
    description: "카이스트에서 운영하는 도구보다 동작원리를 이해하느데 집중한 교육과정입니다. 매주 정해진 목표에 따라 자료구조, C언어, 운영체제를 직접 구현하며 공부했습니다.",
    highlights: [],
    stack: [],
  },
  {
    period: "2023.08 - 2024.01",
    role: "",
    company: "KT Aivle School",
    description: "KT가 운영하는 AI 인재 양성 교육과정으로, AI개발자 트랙에서 데이터 분석과 머신러닝·딥러닝 모델링부터 웹 서비스 개발, 클라우드까지 AI 서비스를 만드는 전 과정을 공부했습니다.",
    highlights: ["AICE Associate (2023.12)"],
    stack: [],
  },
  {
    period: "2022.03 - 2024.02",
    role: "",
    company: "한국외국어대학교",
    description: "컴퓨터전자시스템공학부에서 공부하며 자료구조, 운영체제등의 과목을 이수하였습니다. 편입을하여 전공수업과 함께 추가적으로 웹 개발 관련 공부를 진행하였습니다.",
    highlights: [],
    stack: ["컴퓨터전자시스템공학부"],
  },
  {
    period: "2019.03 - 2021.04",
    role: "",
    company: "호서대학교",
    description: "빅데이터경영공학부에서 공부하며 빅데이터 분석, 통계학등의 과목을 이수하였습니다. 교양수업을 듣고 개발에 흥미를 느껴 전공을 바꾸고자 편입을 진행하였습니다.",
    highlights: [],
    stack: ["빅데이터경영공학부"],
  },
];
