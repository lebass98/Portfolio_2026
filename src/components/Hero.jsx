import { useEffect, useRef, useState } from 'react';

// 메인 비주얼 타이포그래피 모션 영상 (원본: motion/hero-typo.html, 렌더: motion/render.mjs)
const videoBase = (theme, orient) => `${import.meta.env.BASE_URL}videos/hero-${theme}-${orient}`;

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = (e) => setMatches(e.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);
  return matches;
};

const Hero = ({ theme }) => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const lastTimeRef = useRef(0);
  const portrait = useMediaQuery('(orientation: portrait)');
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const base = videoBase(theme === 'dark' ? 'dark' : 'light', portrait ? 'portrait' : 'landscape');

  // 테마·방향이 바뀌어 영상이 교체돼도 재생 위치를 이어감
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const resume = () => {
      video.currentTime = lastTimeRef.current;
      video.play().catch(() => {});
    };
    video.addEventListener('loadedmetadata', resume, { once: true });
    return () => {
      lastTimeRef.current = video.currentTime;
      video.removeEventListener('loadedmetadata', resume);
    };
  }, [base]);

  // 화면 밖에서는 일시정지 (영상이 교체될 수 있으므로 항상 현재 요소를 참조)
  useEffect(() => {
    if (reducedMotion) return;
    const observer = new IntersectionObserver(([entry]) => {
      const video = videoRef.current;
      if (!video) return;
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    });
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <section id="home" ref={sectionRef} className="h-screen relative overflow-hidden bg-accent transition-colors duration-500">
      {reducedMotion ? (
        <img src={`${base}.jpg`} alt="" className="absolute inset-0 w-full h-full object-cover" />
      ) : (
        <video
          ref={videoRef}
          key={base}
          className="absolute inset-0 w-full h-full object-cover"
          src={`${base}.mp4`}
          poster={`${base}.jpg`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        />
      )}

      {/* 영상 속 문구는 장식이므로 검색엔진·스크린 리더용 제목을 별도 제공 */}
      <h1 className="sr-only">
        이재광 — UI/UX 디자이너 · 프론트엔드 개발자 · 웹 퍼블리셔. 디자인과 코드의 경계를 허무는 20년 차 퍼블리셔.
      </h1>

      <a
        href="#portfolio"
        className="absolute z-10 left-8 md:left-[60px] bottom-[5vh] inline-flex items-center gap-4 text-sm font-bold tracking-widest uppercase text-dark border-b-2 border-dark pb-2 hover:border-dark/30 hover:text-dark/60 transition-all"
      >
        View Projects
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </section>
  );
};

export default Hero;
