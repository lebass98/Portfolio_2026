# React + Vite 포트폴리오 템플릿

이 템플릿은 Vite 환경에서 React가 HMR(Hot Module Replacement) 및 ESLint 규칙과 함께 동작할 수 있도록 구성된 최소한의 셋업을 제공합니다.

현재 사용 가능한 공식 플러그인은 다음과 같습니다:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react): Fast Refresh를 위해 [Babel](https://babeljs.io/)을 사용합니다. (또는 [rolldown-vite](https://vite.dev/guide/rolldown) 환경에서는 [oxc](https://oxc.rs) 사용)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc): Fast Refresh를 위해 [SWC](https://swc.rs/)를 사용합니다.

## React 컴파일러 (React Compiler)

개발 및 빌드 성능에 미치는 영향을 고려하여, 본 템플릿에는 React 컴파일러가 기본적으로 활성화되어 있지 않습니다. 컴파일러를 추가하려면 [공식 문서](https://react.dev/learn/react-compiler/installation)를 참고하세요.

## ESLint 설정 확장

프로덕션 수준의 애플리케이션을 개발하는 경우, 타입 인지 린트 규칙이 활성화된 TypeScript 환경을 권장합니다. TypeScript 및 [`typescript-eslint`](https://typescript-eslint.io)를 프로젝트에 통합하는 방법은 [TS 템플릿 문서](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts)를 확인하세요.

---

## 📢 커밋 히스토리 한글화 작업 안내

이 프로젝트의 히스토리 가독성 및 관리 편의성 향상을 위해 모든 Git 커밋 메시지(총 105개)를 한국어로 상세하게 번역하여 커밋 히스토리를 재작성(Rewrite)했습니다.

### 주요 반영 사항
- 영문으로 작성되어 있던 커밋 메시지들의 접두사 규칙(`feat`, `fix`, `refactor`, `style`, `chore` 등)을 명확히 정의하고, 작업 상세 내용을 자연스럽고 가독성 높은 한국어로 번역 및 적용했습니다.
- Git 커밋 해시가 전체적으로 재작성되었습니다. 원격 저장소(`origin`)에 업데이트를 반영하시려면 아래 명령어를 실행하여 강제 푸시를 해야 합니다:

```bash
git push --force origin main
```
