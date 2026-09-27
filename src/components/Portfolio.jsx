import { lazy, Suspense, useCallback, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { portfolioData } from '../data/portfolioData';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { scrollToY } from '../lib/lenis';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Three.js 갤러리는 첫 화면 로딩을 막지 않도록 지연 로드
const GalleryScene = lazy(() => import('./gallery3d/GalleryScene'));

// 카드 한 장을 넘기는 데 필요한 스크롤 거리(px)
const SCROLL_PER_CARD = 420;

const categories = ['All', 'Web Design & Publish', 'Web Design'];

// url이 '#'인 프로젝트는 공개 링크가 없는 작업
const hasLink = (project) => project.url && project.url !== '#';

const ProjectLink = ({ project, className, children }) =>
  !hasLink(project) ? (
    <span className={className} aria-disabled="true">{children}</span>
  ) : project.url.startsWith('/') ? (
    <Link to={project.url} className={className}>{children}</Link>
  ) : (
    <a href={project.url} target="_blank" rel="noopener noreferrer" className={className}>{children}</a>
  );

const Portfolio = () => {
  const [filter, setFilter] = useState('All');
  const [active, setActive] = useState(0);
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const triggerRef = useRef(null);
  // 3D 씬과 리렌더 없이 공유하는 스크롤 상태 (progress 0~1, velocity -1~1)
  const progressRef = useRef({ progress: 0, velocity: 0 });
  const navigate = useNavigate();

  const projects = useMemo(
    () => (filter === 'All' ? portfolioData.projects : portfolioData.projects.filter((p) => p.category === filter)),
    [filter]
  );
  const current = projects[active] ?? projects[0];

  useGSAP(() => {
    gsap.fromTo('.portfolio-header',
      { x: -30, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, scrollTrigger: { trigger: '.portfolio-header', start: 'top 85%' } }
    );

    const last = Math.max(1, projects.length - 1);
    triggerRef.current = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: () => `+=${last * SCROLL_PER_CARD}`,
      pin: true,
      // About의 데스크톱 pin이 지연 생성되므로 그 뒤에 위치를 계산하도록 우선순위를 낮춤
      refreshPriority: -1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        progressRef.current.progress = self.progress;
        progressRef.current.velocity = gsap.utils.clamp(-1, 1, self.getVelocity() / 4000);
        setActive(Math.round(self.progress * last));
      },
      onToggle: (self) => {
        if (!self.isActive) progressRef.current.velocity = 0;
      },
    });
  }, { scope: containerRef, dependencies: [projects], revertOnUpdate: true });

  const scrollToCard = useCallback((index) => {
    const st = triggerRef.current;
    if (!st) return;
    const last = Math.max(1, projects.length - 1);
    const clamped = gsap.utils.clamp(0, projects.length - 1, index);
    scrollToY(st.start + (st.end - st.start) * (clamped / last));
  }, [projects.length]);

  const openProject = useCallback((project) => {
    if (!hasLink(project)) return;
    if (project.url.startsWith('/')) navigate(project.url);
    else window.open(project.url, '_blank', 'noopener,noreferrer');
  }, [navigate]);

  // 정면 카드 클릭 → 프로젝트 열기, 옆 카드 클릭 → 해당 카드로 이동
  const handleSelect = useCallback((index) => {
    if (index === active) openProject(projects[index]);
    else scrollToCard(index);
  }, [active, openProject, projects, scrollToCard]);

  const handleFilter = (cat) => {
    if (cat === filter) return;
    const st = triggerRef.current;
    if (st && window.scrollY > st.start) scrollToY(st.start, { immediate: true });
    progressRef.current.progress = 0;
    setActive(0);
    setFilter(cat);
  };

  return (
    <section id="portfolio" ref={sectionRef} className="bg-yellow-theme transition-colors duration-500 relative overflow-hidden h-screen !py-0">
      {/* index.css의 section / section.bg-yellow-theme>div 전역 패딩을 덮어쓰기 위해 ! 사용 */}
      <div ref={containerRef} className="relative h-full flex flex-col !px-0 !pt-24 md:!pt-32 !pb-8 md:!pb-10">
        <div className="px-8 md:px-[60px] relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 md:gap-6">
          <div className="portfolio-header">
            <p className="text-sm font-bold tracking-[0.2em] mb-4 text-dark/80 uppercase">Selected Works</p>
            <h2 className="!mb-0 !p-0 text-dark">Projects</h2>
          </div>

          <div className="flex flex-nowrap md:flex-wrap gap-3 md:mb-2 max-w-full overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleFilter(cat)}
                className={`shrink-0 whitespace-nowrap text-[12px] font-bold tracking-widest px-6 py-2 rounded-full border-2 transition-all uppercase ${filter === cat
                  ? 'bg-dark text-[var(--bg-main)] border-dark glass-jk-bg'
                  : 'bg-transparent border-dark/20 text-dark/60 hover:border-dark/40 hover:text-dark'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 3D 갤러리 */}
        <div className="relative flex-1 min-h-0 my-4">
          <Suspense fallback={null}>
            <GalleryScene projects={projects} progressRef={progressRef} onSelect={handleSelect} />
          </Suspense>
        </div>

        {/* 정면 프로젝트 정보 */}
        {/* 우측 하단 고정 버튼(FamilySite·ScrollToTop)과 겹치지 않도록 오른쪽 여백 확보 */}
        <div className="pl-8 pr-24 md:pl-[60px] md:pr-[140px] relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="min-w-0 max-w-2xl" aria-live="polite">
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-dark/60 mb-2">
              {String(active + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')} · {current.category}
            </p>
            <h3 className="text-xl md:text-3xl font-bold tracking-tighter uppercase text-dark line-clamp-1">{current.title}</h3>
            <p className="text-sm font-medium text-dark/80 mt-2 line-clamp-1">{current.description}</p>
            <div className="flex gap-4 mt-3">
              <span className="text-[9px] font-bold uppercase text-dark/60 tracking-widest">
                Design <span className="text-xs text-dark">{current.contribution.design}%</span>
              </span>
              <span className="text-[9px] font-bold uppercase text-dark/60 tracking-widest">
                Publish <span className="text-xs text-dark">{current.contribution.publishing}%</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => scrollToCard(active - 1)}
              disabled={active === 0}
              aria-label="이전 프로젝트"
              className="w-12 h-12 rounded-full border-2 border-dark/30 text-dark flex items-center justify-center hover:border-dark disabled:opacity-30 transition-all"
            >
              <ArrowLeft size={20} />
            </button>
            <button
              onClick={() => scrollToCard(active + 1)}
              disabled={active === projects.length - 1}
              aria-label="다음 프로젝트"
              className="w-12 h-12 rounded-full border-2 border-dark/30 text-dark flex items-center justify-center hover:border-dark disabled:opacity-30 transition-all"
            >
              <ArrowRight size={20} />
            </button>
            <ProjectLink
              project={current}
              className={`h-12 px-6 rounded-full bg-dark text-[var(--bg-main)] flex items-center gap-2 text-[12px] font-bold tracking-widest uppercase transition-opacity ${hasLink(current) ? 'hover:opacity-80' : 'opacity-30 cursor-not-allowed'}`}
            >
              View <ExternalLink size={16} />
            </ProjectLink>
          </div>
        </div>

        {/* 진행 바 */}
        <div className="ml-8 mr-24 md:ml-[60px] md:mr-[140px] mt-6 h-[2px] bg-dark/15 relative z-10">
          <div
            className="h-full bg-dark transition-[width] duration-300"
            style={{ width: `${((active + 1) / projects.length) * 100}%` }}
          />
        </div>

        {/* 스크린 리더·검색엔진용 전체 목록 */}
        <ul className="sr-only">
          {projects.map((project) => (
            <li key={project.id}>
              <ProjectLink project={project}>{project.title} — {project.description}</ProjectLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Portfolio;
