import { useRef } from 'react';
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
import SectionParallaxBackground from './SectionParallaxBackground';
import bgImage from '../assets/images/pic_plastic02.png';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const About = ({ theme }) => {
  const { profile, experience } = portfolioData;
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  useGSAP(() => {
    const isDesktop = window.innerWidth >= 1024;
    
    if (isDesktop) {
      const experienceList = containerRef.current.querySelector('#experience');
      const introBlock = containerRef.current.querySelector('.about-intro');
      
      const updatePin = () => {
        // [중요] 섹션 전체의 자연스러운 높이와 리스트의 실제 높이를 측정
        const totalHeight = experienceList.scrollHeight;
        const viewHeight = window.innerHeight;
        
        // 섹션 상단에서 리스트가 시작되는 오프셋 (타이틀 h2 등 포함)
        const sectionRect = sectionRef.current.getBoundingClientRect();
        const listRect = experienceList.getBoundingClientRect();
        const offsetTop = listRect.top - sectionRect.top;
        
        // 스크롤 거리 계산: 리스트 끝이 뷰포트 하단에 닿을 때까지
        // scrollDistance = (전체 컨텐츠가 차지하는 높이) - (현재 보이는 뷰포트 높이)
        const scrollDistance = (offsetTop + totalHeight) - viewHeight;
        
        if (scrollDistance > 0) {
          // 메인 핀 애니메이션
          gsap.to(experienceList, {
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: () => `+=${scrollDistance}`,
              pin: sectionRef.current,
              pinSpacing: true, // 이제 섹션 높이가 100vh이므로 스페이서가 정확한 높이만 차지함
              scrub: true,
              invalidateOnRefresh: true,
            },
            y: -scrollDistance,
            ease: 'none'
          });

          // 소개 영역이 부드럽게 나타나도록 설정
          gsap.from(introBlock, {
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top center',
            },
            x: -50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
          });
        }
      };

      // 폰트나 이미지 로딩을 고려하여 약간의 지연 후 실행 및 리프레시
      const timer = setTimeout(() => {
        updatePin();
        ScrollTrigger.refresh();
      }, 100);

      window.addEventListener('resize', ScrollTrigger.refresh);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('resize', ScrollTrigger.refresh);
      };
    } else {
      // 모바일 버전은 기존과 동일하게 유지 (핀 고정 없음)
      gsap.from('.about-intro', {
        scrollTrigger: {
          trigger: '.about-intro',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out'
      });

      gsap.from('.experience-card', {
        scrollTrigger: {
          trigger: '#experience',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        y: 50,
        scale: 0.98,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power3.out'
      });
    }
  }, { scope: containerRef });

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
      className="bg-yellow-theme transition-colors duration-500 relative overflow-visible lg:h-screen lg:pb-0"
    >
      <SectionParallaxBackground bgImage={bgImage} theme={theme} containerRef={sectionRef} />
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
                className="experience-card group relative pb-12 border-b-2 border-dark/10 last:border-0 glass-glow p-6 mb-8 rounded-2xl"
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
