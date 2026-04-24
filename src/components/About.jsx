import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { portfolioData } from '../data/portfolioData';
import { 
  Mail, 
  Phone, 
  ArrowUpRight, 
  Zap, 
  Atom, 
  Code2, 
  Palette, 
  Terminal, 
  Figma, 
  Users, 
  Globe, 
  Search, 
  Layout, 
  Cpu, 
  PenTool,
  CheckCircle2,
  MousePointer2,
  Lightbulb,
  Image as ImageIcon
} from 'lucide-react';
import profileImg from '../assets/images/lee.png';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const About = ({ theme }) => {
  const { profile, experience } = portfolioData;
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    // Desktop Only GSAP
    mm.add("(min-width: 1024px)", () => {
      const experienceList = containerRef.current.querySelector('#experience');
      const introBlock = containerRef.current.querySelector('.about-intro');
      
      const updatePin = () => {
        if (!experienceList || !introBlock || !sectionRef.current) return;
        
        const totalHeight = experienceList.scrollHeight;
        const viewHeight = window.innerHeight;
        
        const sectionRect = sectionRef.current.getBoundingClientRect();
        const listRect = experienceList.getBoundingClientRect();
        const offsetTop = listRect.top - sectionRect.top;
        
        const scrollDistance = (offsetTop + totalHeight) - viewHeight;
        
        if (scrollDistance > 0) {
          gsap.to(experienceList, {
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: () => `+=${scrollDistance}`,
              pin: sectionRef.current,
              pinSpacing: true,
              scrub: true,
              invalidateOnRefresh: true,
            },
            y: -scrollDistance,
            ease: 'none'
          });

          gsap.fromTo(introBlock, 
            { x: -50, opacity: 0 },
            {
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top center',
              },
              x: 0,
              opacity: 1,
              duration: 1,
              ease: 'power3.out'
            }
          );
        }
      };

      const timer = setTimeout(() => {
        updatePin();
        ScrollTrigger.refresh();
      }, 100);

      window.addEventListener('resize', ScrollTrigger.refresh);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('resize', ScrollTrigger.refresh);
        ScrollTrigger.getAll().forEach(t => t.kill());
      };
    });

  }, { scope: containerRef });

  // Native IntersectionObserver fallback for Mobile
  useEffect(() => {
    const isMobile = window.innerWidth < 1024;
    if (!isMobile || !containerRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0) scale(1)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    const intro = containerRef.current.querySelector('.about-intro');
    const cards = containerRef.current.querySelectorAll('.experience-card');

    if (intro) {
      intro.style.opacity = '0';
      intro.style.transform = 'translateY(50px)';
      intro.style.transition = 'opacity 1s ease-out, transform 1s cubic-bezier(0.215, 0.61, 0.355, 1)';
      observer.observe(intro);
    }

    cards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(50px) scale(0.98)';
      card.style.transition = 'opacity 1s ease-out, transform 1s cubic-bezier(0.215, 0.61, 0.355, 1)';
      // Add slight delay based on index for stagger effect
      card.style.transitionDelay = `${(index % 5) * 0.15}s`; 
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  const getSkillIcon = (skill) => {
    const s = skill.toLowerCase();
    if (s.includes('vite')) return <Zap size={10} />;
    if (s.includes('react')) return <Atom size={10} />;
    if (s.includes('html')) return <Code2 size={10} />;
    if (s.includes('css') || s.includes('scss')) return <Palette size={10} />;
    if (s.includes('js') || s.includes('jquery') || s.includes('javascript')) return <Terminal size={10} />;
    if (s.includes('ui') || s.includes('ux') || s.includes('figma')) return <Figma size={10} />;
    if (s.includes('leading') || s.includes('team') || s.includes('users')) return <Users size={10} />;
    if (s.includes('web') || s.includes('standard')) return <Globe size={10} />;
    if (s.includes('seo') || s.includes('search')) return <Search size={10} />;
    if (s.includes('publishing')) return <Layout size={10} />;
    if (s.includes('interaction')) return <MousePointer2 size={10} />;
    if (s.includes('design') || s.includes('creative')) return <PenTool size={10} />;
    if (s.includes('planning') || s.includes('concept')) return <Lightbulb size={10} />;
    if (s.includes('frontend')) return <Code2 size={10} />;
    if (s.includes('graphic') || s.includes('image')) return <ImageIcon size={10} />;
    
    return <Cpu size={10} />;
  };

  return (
    <section 
      id="about" 
      ref={sectionRef} 
      className="bg-yellow-theme transition-colors duration-500 relative overflow-visible pb-20 pt-20 lg:pt-0 lg:h-screen lg:pb-0"
    >

      <div className="px-8 md:px-[60px] relative z-10" ref={containerRef}>
        <h2 className="mb-24">About / Career</h2>

        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-12">
          {/* Left Column: Intro & Profile */}
          <div
            className="about-intro h-fit mb-16"
          >
            <div>
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-dark shadow-xl mb-8">
                <img src={profileImg} alt={profile.name} className="w-full h-full object-cover" />
              </div>
              <span className="text-sm font-bold tracking-widest text-[var(--bg-main)] uppercase bg-dark px-4 py-1 inline-block mb-8">About Me</span>
              <h3 className="text-4xl md:text-5xl font-bold leading-tight mb-8 uppercase text-dark">
                디자인과 코드의 <br />
                <span 
                  className="underline decoration-8 underline-offset-8"
                >경계</span>를 허무는 <span 
                  className="underline decoration-8 underline-offset-8"
                >퍼블리셔</span>
              </h3>
              <p className="text-xl text-dark/80 font-medium leading-relaxed max-w-lg whitespace-pre-line">
                {profile.intro}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-12 mt-12">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-dark/60 mb-4">Contact</p>
                <div className="space-y-2">
                  <a href={`mailto:${profile.email}`} className="flex items-center gap-2 group">
                    <Mail size={16} className="text-dark/80 group-hover:text-dark transition-colors" />
                    <span className="font-bold border-b border-dark/30 group-hover:border-dark transition-all text-dark">{profile.email}</span>
                  </a>
                  <div className="flex items-center gap-2">
                    <Phone size={16} className="text-dark/80" />
                    <span className="font-bold text-dark">{profile.phone}</span>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-dark/60 mb-4">Roles</p>
                <div className="flex flex-wrap gap-2">
                  {profile.roles.map(role => (
                    <span key={role} className="text-xs font-bold px-3 py-1 border border-dark text-dark rounded-full uppercase">{role}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Experience Timeline */}
          <div id="experience" className="space-y-16">
            {experience.map((item, index) => (
              <div
                key={index}
                className="experience-card group relative pb-12 border-b-2 border-dark/10 last:border-0 glass-glow mb-8 rounded-2xl"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                  <div>
                    <span className="text-sm font-bold text-dark/60 tracking-widest mb-2 block">{item.period}</span>
                    <h4 className="text-2xl font-bold uppercase tracking-tighter group-hover:text-dark transition-colors flex items-center gap-3 text-dark">
                      {item.company}
                      <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 text-dark" size={24} />
                    </h4>
                  </div>
                  <span className="text-[12px] font-bold uppercase px-4 py-1.5 bg-dark text-[var(--bg-main)] rounded-full shadow-lg">
                    {item.position.split('(')[0]}
                  </span>
                </div>

                <p className="text-lg font-medium text-dark/80 mb-8 max-w-xl">
                  {item.details}
                </p>

                <div className="flex flex-wrap gap-2">
                  {item.skills.map(skill => (
                    <span key={skill} className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-3 py-1 bg-dark/5 border border-dark/10 text-dark rounded group-hover:bg-dark group-hover:text-main group-hover:border-dark transition-all duration-300">
                      {getSkillIcon(skill)}
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
