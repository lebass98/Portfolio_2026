export const portfolioData = {
  profile: {
    name: "이재광",
    title: "UI/UX DEVELOPER",
    intro: "디자인의 감각과 퍼블리싱의 기술을 잇는 20년 차 베테랑,\nUI/UX 디자이너 겸 퍼블리셔 이재광입니다.",
    phone: "010-5244-1251",
    email: "dongbookro@gmail.com",
    roles: ["UI/UX Developer", "Web Publisher", "Web Designer"]
  },
  experience: [
    {
      period: "2019.09 ~ 2023.06",
      company: "(주)후이즈",
      position: "홈페이지 제작팀 과장 (메인 디자이너 / 메인 퍼블리셔)",
      details: "대형 웹 에이전시에서의 풍부한 제작 경험을 바탕으로, 굴지의 중견기업 및 공공기관의 웹 표준 퍼블리싱과 UI/UX 디자인 프로젝트를 성공적으로 리딩했습니다.",
      skills: ["Vite", "React", "HTML5", "CSS3", "jQuery"]
    },
    {
      period: "2018.09 ~ 2019.09",
      company: "(주)휴앤컴퍼니",
      position: "웹솔루션팀 차장 (프로모션 및 쇼핑몰 구축)",
      details: "다양한 이커머스 솔루션과 프로모션 사이트의 총괄 퍼블리싱을 담당하며, 사용자 구매 전환을 극대화하는 인터랙티브 UI 구현에 집중했습니다.",
      skills: ["JS", "HTML5", "jQuery", "SCSS"]
    },
    {
      period: "2015.09 ~ 2018.08",
      company: "(주)코리안몰",
      position: "홈페이지 / 쇼핑몰 제작팀 팀장",
      details: "글로벌 역직구 쇼핑몰의 프론트엔드 환경을 구축하고 팀을 매니징하며, 다국어 지원 및 확장성 있는 코드 구조를 설계했습니다.",
      skills: ["UI/UX", "Publishing", "Team Leading"]
    },
    {
      period: "2013.06 ~ 2015.09",
      company: "커리어 전환 및 확장기",
      position: "Senior Web Publisher",
      details: "2013년 하반기, 웹 디자이너에서 전문 웹 퍼블리셔로 전향하며 더욱 견고한 마크업과 스크립트 역량을 쌓았습니다. (얀트리, 트리니티비앤에이치 등)",
      skills: ["Web Standards", "Interaction", "SEO"]
    },
    {
      period: "2004.03 ~ 2013.05",
      company: "디자인 전문 역량 강화기",
      position: "Senior Web Designer",
      details: "약 9년간 트라이씨클(하프클럽) 등에서 근무하며 웹의 시각적 언어를 마스터했습니다. 디자인의 원리를 깊이 이해하는 퍼블리셔로서의 토대를 마련한 시기입니다.",
      skills: ["Creative Design", "Concept Planning", "Graphic"]
    }
  ],
  projects: [
    {
      id: 1,
      title: "동희홀딩스",
      url: "https://www.donghee.co.kr",
      image: "images/portfolio/scr_01.jpg",
      contribution: { design: 50, publishing: 100 },
      category: "Web Design & Publish",
      description: "중견기업 / 지주회사",
      tags: ["Corporate", "Holding"]
    },
    {
      id: 2,
      title: "(재)세계유산 한국의 서원 통합관리센터",
      url: "https://k-seowon.or.kr",
      image: "images/portfolio/scr_03.jpg",
      contribution: { design: 50, publishing: 100 },
      category: "Web Design & Publish",
      description: "중소기업 / 전자제품 판매업",
      tags: ["UNESCO", "Heritage", "Culture"]
    },
    {
      id: 3,
      title: "고용노동부 일생활균형",
      url: "https://worklife.kr",
      image: "images/portfolio/scr_04.jpg",
      contribution: { design: 50, publishing: 100 },
      category: "Web Design & Publish",
      description: "공공기관",
      tags: ["Public", "Government"]
    },
    {
      id: 4,
      title: "NUTTY BUD (굿즈 쇼핑몰) - 카페24 커스텀",
      url: "https://ntbdtv.cafe24.com/skin-skin4/index.html",
      image: "images/portfolio/scr_28.jpg",
      contribution: { design: 50, publishing: 100 },
      category: "Web Design & Publish",
      description: "카페24 솔루션 커스텀 / 연예인 캐릭터 굿즈 쇼핑몰",
      tags: ["E-commerce", "Cafe24"]
    },
    {
      id: 5,
      title: "인천공항운영서비스",
      url: "http://airportos.co.kr/",
      image: "images/portfolio/scr_02.jpg",
      contribution: { design: 100, publishing: 100 },
      category: "Web Design & Publish",
      description: "중소기업 / 기타 항공 운송지원 서비스업",
      tags: ["Public", "Airport"]
    },
    {
      id: 6,
      title: "지위픽 코리아",
      url: "http://ziwipets.co.kr",
      image: "images/portfolio/scr_05.jpg",
      contribution: { design: 50, publishing: 100 },
      category: "Web Design & Publish",
      description: "펫푸드 판매 / 브랜드",
      tags: ["Pet", "E-commerce"]
    },
    {
      id: 7,
      title: "(주)와이드",
      url: "http://widecorp.com/",
      image: "images/portfolio/scr_27.jpg",
      contribution: { design: 100, publishing: 100 },
      category: "Web Design & Publish",
      description: "특수디스플레이 제조회사",
      tags: ["Corporate", "Display"]
    },
    {
      id: 8,
      title: "한국미우라공업사",
      url: "https://www.miura.co.kr/",
      image: "images/portfolio/scr_24.jpg",
      contribution: { design: 100, publishing: 100 },
      category: "Web Design & Publish",
      description: "중견기업 / 보일러제조회사 / 일본기업",
      tags: ["Corporate", "Manufacturing"]
    },
    {
      id: 9,
      title: "예림피앤에프",
      url: "http://yaelimpf.co.kr/",
      image: "images/portfolio/scr_25.jpg",
      contribution: { design: 100, publishing: 100 },
      category: "Web Design & Publish",
      description: "중소기업 / 건축디자인",
      tags: ["Architecture", "Design"]
    },
    {
      id: 10,
      title: "BOCP",
      url: "https://bocp.co.kr/",
      image: "images/portfolio/scr_06.jpg",
      contribution: { design: 100, publishing: 100 },
      category: "Web Design & Publish",
      description: "중소기업 / 주식투자 커뮤니티",
      tags: ["Community", "Investing"]
    },
    {
      id: 11,
      title: "문화재수리협회",
      url: "https://kcpra.or.kr/",
      image: "images/portfolio/scr_07.jpg",
      contribution: { design: 100, publishing: 100 },
      category: "Web Design & Publish",
      description: "중소기업",
      tags: ["Public", "Heritage"]
    },
    {
      id: 12,
      title: "후이즈 다국어 홈페이지 샘플(후이즈커피)",
      url: "http://kor04r-19-0425.whoisgh.com/",
      image: "images/portfolio/scr_08.jpg",
      contribution: { design: 100, publishing: 100 },
      category: "Web Design & Publish",
      description: "후이즈 홈페이지 다국어 솔루션 샘플",
      tags: ["Sample", "Multilingual"]
    },
    {
      id: 13,
      title: "후이즈 다국어 홈페이지 샘플(스마트에듀)",
      url: "http://mtl01r-19-0008.whoisgh.com/",
      image: "images/portfolio/scr_09.jpg",
      contribution: { design: 100, publishing: 100 },
      category: "Web Design & Publish",
      description: "후이즈 홈페이지 다국어 솔루션 샘플",
      tags: ["Sample", "Multilingual"]
    },
    {
      id: 14,
      title: "후이즈 다국어 홈페이지 샘플(후이즈페인트)",
      url: "http://mtl01r-19-0004.whoisgh.com/",
      image: "images/portfolio/scr_10.jpg",
      contribution: { design: 100, publishing: 100 },
      category: "Web Design & Publish",
      description: "후이즈 홈페이지 다국어 솔루션 샘플",
      tags: ["Sample", "Multilingual"]
    },
    {
      id: 15,
      title: "인천공항시설관리",
      url: "http://www.airportfc.co.kr/",
      image: "images/portfolio/scr_11.jpg",
      contribution: { design: 100, publishing: 100 },
      category: "Web Design & Publish",
      description: "공공기관 / 국토교통부",
      tags: ["Public", "Government"]
    },
    {
      id: 16,
      title: "대한민국 직무스트레스 측정검사 솔루션",
      url: "https://jobstress.co.kr/",
      image: "images/portfolio/scr_12.jpg",
      contribution: { design: 100, publishing: 100 },
      category: "Web Design & Publish",
      description: "중소기업",
      tags: ["Solution", "Health"]
    },
    {
      id: 17,
      title: "KCVS 사단법인 한국컴퓨터비전학회",
      url: "https://kcvs.kr/",
      image: "images/portfolio/scr_13.jpg",
      contribution: { design: 100, publishing: 100 },
      category: "Web Design & Publish",
      description: "서울대학교 공동연구소",
      tags: ["Academic", "Society"]
    },
    {
      id: 18,
      title: "SAT 문제관리 플랫폼",
      url: "https://www.gatepreps.com/",
      image: "images/portfolio/scr_14.jpg",
      contribution: { design: 100, publishing: 100 },
      category: "Web Design & Publish",
      description: "중소기업 / 웹 플랫폼",
      tags: ["Platform", "Edu"]
    },
    {
      id: 19,
      title: "코넥스 협회",
      url: "http://konex.or.kr/?act=main",
      image: "images/portfolio/scr_15.jpg",
      contribution: { design: 100, publishing: 100 },
      category: "Web Design & Publish",
      description: "중소기업 / 정책지원사업",
      tags: ["Public", "Policy"]
    },
    {
      id: 20,
      title: "경북대학교 - 수소 및 신재생에너지학과",
      url: "https://hnrenergy.knu.ac.kr/",
      image: "images/portfolio/scr_17.jpg",
      contribution: { design: 100, publishing: 100 },
      category: "Web Design & Publish",
      description: "대학교 / 학부소개",
      tags: ["University", "Education"]
    },
    {
      id: 21,
      title: "경북대학교 - 융합학부",
      url: "http://aist.knu.ac.kr/",
      image: "images/portfolio/scr_18.jpg",
      contribution: { design: 100, publishing: 100 },
      category: "Web Design & Publish",
      description: "대학교 / 학부소개",
      tags: ["University", "Education"]
    },
    {
      id: 22,
      title: "(주)와이펀드",
      url: "http://221.153.49.17/y-fund/",
      image: "images/portfolio/scr_22.jpg",
      contribution: { design: 100, publishing: 100 },
      category: "Web Design & Publish",
      description: "온라인투자 / 주식커뮤니티",
      tags: ["Finance", "Community"]
    },
    {
      id: 23,
      title: "한국스페이스신택스연구소",
      url: "http://spacesyntax.kr/",
      image: "images/portfolio/scr_23.jpg",
      contribution: { design: 100, publishing: 100 },
      category: "Web Design & Publish",
      description: "중소기업 / 건설컨설팅",
      tags: ["Construction", "Consulting"]
    },
    {
      id: 24,
      title: "네일마트 (쇼핑몰)",
      url: "https://nailmart.net/",
      image: "images/portfolio/scr_26.jpg",
      contribution: { design: 0, publishing: 100 },
      category: "Web Design & Publish",
      description: "카페24솔루션 / 쇼핑몰",
      tags: ["E-commerce", "Cafe24"]
    },
    {
      id: 25,
      title: "내나라여행박람회",
      url: "http://www.naenara.or.kr/",
      image: "images/portfolio/scr_19.jpg",
      contribution: { design: 100, publishing: 100 },
      category: "Web Design & Publish",
      description: "박람회소개",
      tags: ["Fair", "Travel"]
    },
    {
      id: 26,
      title: "CK성모안과의원",
      url: "https://www.cksungmo.co.kr/",
      image: "images/portfolio/scr_20.jpg",
      contribution: { design: 100, publishing: 100 },
      category: "Web Design & Publish",
      description: "CK안과 / 리뉴얼전",
      tags: ["Medical", "Healthcare"]
    },
    {
      id: 27,
      title: "2020세계유산축제",
      url: "#",
      image: "images/portfolio/scr_21.jpg",
      contribution: { design: 100, publishing: 100 },
      category: "Web Design & Publish",
      description: "이벤트페이지",
      tags: ["Event", "Heritage"]
    },
    {
      id: 28,
      title: "후이즈 X 알리바바 제휴",
      url: "#",
      image: "images/portfolio/scr_16.jpg",
      contribution: { design: 100, publishing: 0 },
      category: "Web Design",
      description: "랜딩페이지",
      tags: ["Landing", "Marketing"]
    }
  ]
};
