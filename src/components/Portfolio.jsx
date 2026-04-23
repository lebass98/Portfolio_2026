import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { portfolioData } from '../data/portfolioData';
import { ExternalLink, Plus } from 'lucide-react';
import { ProjectSkeleton } from './Skeleton';
import { Link } from 'react-router-dom';
import SectionParallaxBackground from './SectionParallaxBackground';
import bgImage from '../assets/images/pic_plastic03.png';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Portfolio = ({ theme }) => {
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Simulate loading for premium feel
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const categories = ['All', 'Web Design & Publish', 'Web Design'];

  const filteredProjects = filter === 'All'
    ? portfolioData.projects
    : portfolioData.projects.filter(p => p.category === filter);

  useGSAP(() => {
    if (loading) return;

    // Header animation
    gsap.fromTo('.portfolio-header', 
      { x: -30, opacity: 0 },
      {
        scrollTrigger: {
          trigger: '.portfolio-header',
          start: 'top 85%',
        },
        x: 0,
        opacity: 1,
        duration: 0.8
      }
    );

    // Horizontal Scroll Trigger
    const track = containerRef.current.querySelector('.portfolio-track');
    
    if (track) {
      // Ensure track starts at 0 whenever filter changes
      gsap.set(track, { x: 0 });

      const getScrollAmount = () => {
        const trackWidth = track.scrollWidth;
        const viewportWidth = window.innerWidth;
        
        if (trackWidth > viewportWidth) {
          const paddingOffset = window.innerWidth >= 768 ? 60 * 2 : 32 * 2;
          return -(trackWidth - viewportWidth + paddingOffset);
        }
        return 0;
      };

      const getEndAmount = () => {
        const trackWidth = track.scrollWidth;
        const viewportWidth = window.innerWidth;
        if (trackWidth > viewportWidth) {
          return `+=${trackWidth * 1.2}`; // Extended scroll duration slightly for smoother feel
        }
        return `+=0`;
      };

      gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: getEndAmount, // Dynamic end value based on track width
          pin: true,
          scrub: 1, // Add scrub smoothing
          invalidateOnRefresh: true, // Automatically recalculates widths on browser resize or content load
        }
      });
    }

  }, { scope: containerRef, dependencies: [filteredProjects, loading] });

  return (
    <section id="portfolio" ref={sectionRef} className="bg-yellow-theme transition-colors duration-500 relative overflow-hidden pt-20 pb-20 min-h-screen flex flex-col justify-center">
      <SectionParallaxBackground bgImage={bgImage} theme={theme} containerRef={sectionRef} />
      <div className="px-8 md:px-[60px] relative z-10 w-full" ref={containerRef}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div className="portfolio-header">
            <p className="text-sm font-bold tracking-[0.2em] mb-4 text-dark/80 uppercase">Selected Works</p>
            <h2 className="!mb-0 !p-0 text-dark">Projects</h2>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 md:mb-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`text-[12px] font-bold tracking-widest px-6 py-2 rounded-full border-2 transition-all uppercase  ${filter === cat
                  ? 'bg-dark text-[var(--bg-main)] border-dark glass-jk-bg'
                  : 'bg-transparent border-dark/20 text-dark/60 hover:border-dark/40 hover:text-dark'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Track - Horizontal */}
        <div className="portfolio-track flex flex-nowrap gap-6 sm:gap-12 w-max pb-12 pt-4">
          {loading ? (
            Array(6).fill(0).map((_, i) => (
              <div key={`sk-${i}`} className="w-[85vw] sm:w-[450px] lg:w-[550px] shrink-0">
                <ProjectSkeleton />
              </div>
            ))
          ) : (
            filteredProjects.map((project) => (
              <div
                key={project.id}
                className="portfolio-card group cursor-pointer glass-glow w-[85vw] sm:w-[450px] lg:w-[550px] shrink-0"
              >
                <div className="relative aspect-[16/10] glass-card rounded-[5px] overflow-hidden shadow-2xl transition-all duration-700 staggered-scroll-container">
                  {/* Project Image */}
                  <img
                    src={`${import.meta.env.BASE_URL}${project.image}`}
                    alt={project.title}
                    className="w-full h-full object-cover object-top transition-all duration-1000 staggered-scroll-img"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426';
                    }}
                  />

                  {/* Hover Button */}
                  {project.url.startsWith('/') ? (
                    <Link
                      to={project.url}
                      className="absolute bottom-6 right-6 w-12 h-12 bg-dark text-[var(--bg-main)] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 shadow-xl scale-90 group-hover:scale-100"
                    >
                      <ExternalLink size={20} />
                    </Link>
                  ) : (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute bottom-6 right-6 w-12 h-12 bg-dark text-[var(--bg-main)] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 shadow-xl scale-90 group-hover:scale-100"
                    >
                      <ExternalLink size={20} />
                    </a>
                  )}
                </div>

                <div className="mt-6 px-2">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-xl font-bold tracking-tighter uppercase group-hover:text-dark/70 transition-colors line-clamp-1">
                      {project.title}
                    </h3>
                    <Plus className="text-dark group-hover:rotate-90 transition-transform duration-500 shrink-0" strokeWidth={3} size={24} />
                  </div>

                  <div className="w-full h-[2px] bg-dark mb-4 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />

                  <p className="text-sm font-medium text-dark/80 leading-relaxed max-w-xl line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-4 mt-4">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-bold uppercase text-dark/60 tracking-widest">Design</span>
                      <span className="text-xs font-bold text-dark">{project.contribution.design}%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-bold uppercase text-dark/60 tracking-widest">Publish</span>
                      <span className="text-xs font-bold text-dark">{project.contribution.publishing}%</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
