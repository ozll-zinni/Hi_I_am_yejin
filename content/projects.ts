export type ProjectCategory = "WEB" | "WORK";

// Inline `code` is rendered as code.
export type CaseStudySection = {
  heading: string;
  problem: string[];
  solution: string[];
  result: string[];
};

// A live site built from the project, grouped by design theme on the detail page.
export type ProjectSite = {
  name: string;
  url: string;
  theme: string;
};

export type Project = {
  slug: string;
  order: number;
  category: ProjectCategory[];
  name: string;
  summary: string;
  stack: string[];
  period: string;
  github?: string;
  demo?: string;
  sites?: ProjectSite[];
  caseStudy: CaseStudySection[];
};

export const projects: Project[] = [
  {
    slug: "golf-homepage",
    order: 1,
    category: ["WORK", "WEB"],
    name: "통합홈페이지",
    summary: "하나의 코드에 디자인 테마 3종을 두고, 골프장이 원하는 테마를 골라 홈페이지를 만드는 통합 홈페이지 서비스입니다.",
    stack: ["React", "Next.js", "TypeScript", "Jotai"],
    period: "2025.12 — Present",
    // TODO(sites): 작업한 골프장을 { name, url, theme } 형식으로 추가하세요. 테마별로 묶여서 보입니다.
    sites: [],
    caseStudy: [
      {
        heading: "SNS 간편로그인·SSO 인증 흐름 통합 설계",
        problem: [
          "카카오/네이버 간편로그인 도입 후 기존 ID 계정과 SNS 계정이 중복으로 생성되었습니다.",
          "SNS 로그인, 마이페이지 재인증, 계정 연결, 외부 서비스 자동로그인(SSO)마다 OAuth 콜백 처리가 흩어질 위험이 있었습니다.",
        ],
        solution: [
          "OAuth 콜백을 브릿지 페이지 `/auth/sns-callback` 하나로 통합해 팝업(`postMessage`)과 리다이렉트를 모두 처리하도록 했습니다.",
          "공통 팝업 함수 `openSnsPopup`으로 팝업 흐름을 Promise로 감싸 origin 검증과 닫힘 감지를 처리하고, 로그인·재인증·계정 연결에서 함께 쓰도록 했습니다.",
          "중복 계정이 감지되면 계정 연결과 휴대폰 본인인증 모달로 이어지는 흐름을 만들었습니다.",
          "`MyPageAuthGate`를 만들어 서버가 허용한 수단(비밀번호 또는 SNS)으로 다시 인증해야 마이페이지에 들어가도록 했습니다.",
          "외부 서비스 자동로그인용 `/auth/bridge`에서 회원·골프장 정보를 `Promise.all`로 동시에 조회하고, 실패하면 토큰을 지우고 로그인 화면으로 보내도록 했습니다.",
          "회원가입 시 CI/DI를 RSA 공개키로 암호화해 보내도록 바꿔 보안 점검 지적 사항을 조치했습니다.",
        ],
        result: [
          "인증 흐름 4종의 진입점과 처리 방식을 하나로 표준화했습니다.",
          "외부 서비스에서 예약 화면까지 다시 로그인하지 않고 들어올 수 있게 됐습니다.",
        ],
      },
      {
        heading: "Safari 환경 로그인 실패(요청 폭주/abort) 해결",
        problem: ["인트로 페이지가 있는 골프장에서 Safari로 로그인할 때만 간헐적으로 실패했습니다."],
        solution: [
          "JWT를 저장할 때 레이아웃이 다시 렌더링되며 골프장 정보를 재조회했고, 이 요청이 로그인 후처리와 겹쳐 abort가 발생하는 레이스 컨디션이 원인임을 찾았습니다.",
          "Jotai에 `introLoginPending` 상태를 두어 후처리가 끝날 때까지 재조회와 화면 전환을 미뤘습니다.",
          "모든 실패 경로에서 lock을 해제해 화면이 멈춘 채 남지 않게 했습니다.",
          "재발에 대비해 Datadog RUM과 에러 바운더리를 적용했습니다.",
        ],
        result: ["브라우저별 프론트 에러를 실시간으로 추적할 수 있는 모니터링 체계를 갖췄습니다."],
      },
    ],
  },
];

export const getAllProjects = () => [...projects].sort((a, b) => a.order - b.order);

export const getProjectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
