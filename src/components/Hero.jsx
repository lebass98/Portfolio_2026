import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { TypeAnimation } from 'react-type-animation';
import SectionParallaxBackground from './SectionParallaxBackground';
import bgImage from '../assets/images/pic_plastic01.png';

gsap.registerPlugin(useGSAP);

const Hero = ({ theme }) => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  useGSAP(() => {
    // GSAP Timeline for hero load sequence
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Initial states set in CSS or inline are overridden by GSAP .from()
    tl.from('.hero-main-container', {
      y: 100,
      opacity: 0,
      duration: 1.5,
      ease: "power4.out"
    })
    .from('.hero-headline', {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2
    }, "-=1")
    .from('.hero-subcontent', {
      y: 30,
      opacity: 0,
      duration: 1
    }, "-=0.6");
  }, { scope: containerRef });

  return (
    <section id="home" ref={sectionRef} className="min-h-[85vh] flex items-center justify-start bg-accent pt-16 relative overflow-hidden max-w-none transition-colors duration-500">
      {/* Background Graphic Element */}
      <SectionParallaxBackground bgImage={bgImage} theme={theme} containerRef={sectionRef} />

      <div className="w-full px-8 md:px-[60px] z-10" ref={containerRef}>
        <div className="max-w-5xl hero-main-container">
          <p className="hero-headline text-xl md:text-2xl font-bold tracking-[0.2em] mb-8 text-dark uppercase opacity-80">
          </p>

          <h1 className="hero-headline text-[3.4rem] sm:text-[4rem] md:text-[9rem] lg:text-[10rem] font-bold leading-[1.1] md:leading-[0.85] text-dark uppercase mb-12 whitespace-pre-line break-words">
            <TypeAnimation
              sequence={[
                'UI/UX\nDEVELOPER',
                2000,
                'FRONTEND\nDEVELOPER',
                2000,
                'WEB\nDESIGNER',
                2000,
                'UI/UX\nDESIGNER',
                2000,
                'WEB\nPUBLISHER',
                2000,
              ]}
              wrapper="span"
              speed={10}
              repeat={Infinity}
            />
          </h1>

          <div className="hero-subcontent flex flex-col md:flex-row gap-12 mt-16 md:mt-24">
            <div className="max-w-md">
              <p className="text-2xl font-bold leading-tight text-dark mb-6">
                Creating intuitive digital experiences through bold design and precise publishing.
              </p>
              <a href="#portfolio" className="inline-flex items-center gap-4 text-sm font-bold tracking-widest uppercase border-b-2 border-dark pb-2 hover:border-dark/30 hover:text-dark/60 transition-all">
                View Projects
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Hero;
