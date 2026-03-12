import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { portfolioData } from '../data/portfolioData';

const Hero = () => {
  const { profile } = portfolioData;

  return (
    <section id="home" className="h-screen flex items-center justify-start bg-accent pt-16 relative overflow-hidden max-w-none">
      {/* Background Graphic Element */}
      <div className="absolute top-0 right-0 w-2/3 h-full opacity-10 pointer-events-none">
        <svg viewBox="0 0 800 800" className="w-full h-full text-black fill-current">
          <path d="M769 229L1037 260.9M927 880L731 737" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="400" cy="400" r="300" fill="none" stroke="currentColor" strokeWidth="0.5"/>
        </svg>
      </div>

      <div className="container mx-auto px-12 md:px-24 z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="max-w-5xl"
        >
          <p className="text-xl md:text-2xl font-black tracking-[0.2em] mb-8 text-black uppercase opacity-80 font-saira">
            {profile.name}
          </p>
          
          <h1 className="text-[6rem] md:text-[10rem] lg:text-[12rem] font-black leading-[0.85] tracking-[-0.08em] text-black uppercase mb-12 font-saira">
            <TypeAnimation
              sequence={[
                profile.title,
                2000,
                'UI/UX DESIGNER',
                2000,
                'WEB PUBLISHER',
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </h1>

          <div className="flex flex-col md:flex-row gap-12 mt-16 md:mt-24">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="max-w-md"
            >
              <p className="text-2xl font-bold leading-tight text-black mb-6">
                Creating intuitive digital experiences through bold design and precise publishing.
              </p>
              <a href="#portfolio" className="inline-flex items-center gap-4 text-sm font-black tracking-widest uppercase border-b-2 border-black pb-2 hover:border-black/30 hover:text-black/60 transition-all">
                View Projects 
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Aesthetic Overlay Line */}
      <div className="absolute bottom-12 left-12 right-12 h-[1px] bg-black/10 hidden md:block" />
      <div className="absolute bottom-12 left-12 text-[10px] font-black tracking-widest text-black/30 uppercase hidden md:block">
        © 2026 Portfolio / Powered by Pretendard & Saira
      </div>
    </section>
  );
};

export default Hero;
