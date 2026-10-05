# LEBASS Portfolio 2026

UI/UX 디자이너 겸 웹 퍼블리셔 **이재광**의 포트폴리오 사이트입니다.
React + Vite로 만들었고, 메인 비주얼은 타이포그래피 모션 영상, 프로젝트 목록과 Info 페이지 배경은 Three.js 3D로 구성되어 있습니다.

- 배포 주소: https://lebass98.github.io/Portfolio_2026/
- 테마: 라이트(노랑) / 다크(남색) 전환 지원, 모바일 대응

## 주요 화면

| 영역 | 내용 | 관련 파일 |
|---|---|---|
| **메인 비주얼 (Hero)** | 12초 반복 타이포그래피 모션 영상. 테마(라이트/다크)와 화면 방향(가로/세로)에 맞는 영상을 자동 선택하고, 테마를 바꿔도 이어서 재생 | `src/components/Hero.jsx`, `motion/` |
| **About / Career** | 경력 타임라인. 데스크톱(1024px 이상)에서는 섹션을 고정한 채 경력 목록이 스크롤 | `src/components/About.jsx` |
| **Projects** | 오목한 곡면 위에 카드를 배치한 Three.js 3D 갤러리. 스크롤로 카드를 넘기고, 정면 카드 클릭 시 프로젝트 열기, 옆 카드 클릭 시 해당 카드로 이동 | `src/components/Portfolio.jsx`, `src/components/gallery3d/` |
| **Info 페이지** (`/info`) | 상단 배경에 마우스에 반응하는 3D 물결 라인 지형. 스크롤하면 카메라가 위로 올라감 | `src/components/Info.jsx`, `src/components/info3d/` |
| **프로젝트 상세** (`/project/seowon`) | 한국의 서원 통합관리센터 상세 페이지 | `src/pages/ProjectSeowon.jsx` |

3D 장면과 영상은 모두 다음을 지킵니다.

- 첫 화면 로딩을 막지 않도록 3D 코드는 지연 로드(`React.lazy`)
- 화면 밖에 있으면 렌더링·재생 중지
- 기기의 "동작 줄이기"(`prefers-reduced-motion`) 설정 시 애니메이션 최소화 / 정지 이미지 표시

## 기술 스택

- **React 19**, **Vite 7**, React Router 7
- **Tailwind CSS 4**
- **Three.js** + `@react-three/fiber` + `@react-three/drei` — 3D 갤러리, Info 배경
- **GSAP**(ScrollTrigger) + **Lenis** — 스크롤 애니메이션, 부드러운 스크롤
- **Framer Motion** — 등장 애니메이션
- 폰트: Pretendard

## 시작하기

```bash
npm install
npm run dev       # 개발 서버 (http://localhost:5173/Portfolio_2026/)
npm run build     # dist/ 에 배포용 빌드
npm run preview   # 빌드 결과 미리보기
npm run lint
```

사이트는 `/Portfolio_2026/` 경로 아래에서 동작하도록 설정되어 있습니다(`vite.config.js`의 `base`, `src/main.jsx`의 `basename`).

## 폴더 구조

```
src/
  components/       화면 섹션 컴포넌트 (Hero, About, Portfolio, Info, Header, Footer …)
    gallery3d/      Projects 3D 갤러리 씬
    info3d/         Info 페이지 3D 물결 배경 씬
  pages/            라우트 페이지 (Home, ProjectSeowon)
  data/             portfolioData.js — 프로필, 경력, 프로젝트 목록
  lib/              lenis.js — 스크롤 인스턴스 공유
public/
  images/portfolio/         프로젝트 전체 페이지 스크린샷
  images/portfolio/gallery/ 3D 갤러리용 16:10 텍스처 (자동 생성)
  videos/                   메인 비주얼 영상·정지 이미지 (자동 생성)
motion/             메인 비주얼 영상 원본과 렌더링 스크립트
scripts/            갤러리 텍스처 생성 스크립트
```

## 콘텐츠 수정하기

### 프로젝트 추가·수정

1. `src/data/portfolioData.js`의 `projects` 배열을 수정합니다. 공개 링크가 없는 프로젝트는 `url: "#"`으로 두면 VIEW 버튼이 비활성화됩니다.
2. 전체 페이지 스크린샷을 `public/images/portfolio/scr_XX.jpg`로 넣습니다.
3. 3D 갤러리용 텍스처를 다시 생성합니다. 원본 스크린샷을 그대로 쓰면 GPU 메모리가 과도해 모바일에서 문제가 되므로, 상단을 16:10(1024×640)으로 잘라 씁니다.

   ```bash
   python3 scripts/make-gallery-thumbs.py   # Pillow 필요: pip3 install Pillow
   ```

### 메인 비주얼 영상 수정

영상 원본은 `motion/hero-typo.html`입니다. 브라우저로 열면 실시간 재생되고, `?theme=dark`, `?t=3.5`(특정 시점 정지) 같은 옵션으로 확인할 수 있습니다.
문구·타이밍·색을 고친 뒤 아래 명령으로 영상 4종(라이트/다크 × 가로/세로)과 정지 이미지를 다시 만듭니다.
렌더링 도구(Playwright, ffmpeg)는 프로젝트 의존성에 넣지 않고 별도 폴더에 설치해서 씁니다.

```bash
mkdir -p /tmp/render-deps && (cd /tmp/render-deps && npm i playwright-core ffmpeg-static)
RENDER_DEPS=/tmp/render-deps node motion/render.mjs              # 4종 전부
RENDER_DEPS=/tmp/render-deps node motion/render.mjs dark portrait # 일부만
```

Google Chrome이 설치되어 있어야 하며(다른 경로라면 `CHROME_PATH` 지정), 폰트를 CDN에서 받으므로 인터넷 연결이 필요합니다.

## 배포

`main` 브랜치에 푸시하면 GitHub Actions(`.github/workflows/deploy.yml`)가 빌드해서 GitHub Pages에 자동 배포합니다. 진행 상황은 저장소의 **Actions** 탭에서 확인할 수 있습니다.

## 참고: 커밋 히스토리 한글화

관리 편의를 위해 과거 영문 커밋 메시지(105개)를 한국어로 번역해 히스토리를 재작성한 적이 있습니다. 그 이전에 클론한 저장소가 있다면 히스토리가 맞지 않으므로 새로 클론하는 것을 권장합니다.
