import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { ArrowUpRight, Download, MoveRight } from 'lucide-react';

import lebassLogo from '../lebass_logo.svg';

const Footer = () => {
  const { profile } = portfolioData;

  return (
    <footer id="contact" className="relative bg-accent text-dark pt-32 pb-16 overflow-hidden min-h-screen flex flex-col justify-between transition-colors duration-500">
      <div className="px-8 md:px-[60px] relative z-20 flex flex-col md:flex-row gap-20 md:gap-0">
        
        {/* LEFT COLUMN: INFORMATION */}
        <div className="md:w-1/4">
          <span className="text-sm font-bold tracking-widest uppercase flex items-center gap-2">
            INFORMATION <span className="w-12 h-[3px] bg-dark"></span>
          </span>
        </div>

        {/* RIGHT COLUMN: CONTENT */}
        <div className="md:w-3/4 flex flex-col">
          {/* Email Row */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="mb-24 lg:mb-40"
          >
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex flex-col group border-b-[2px] md:border-b-[4px] border-dark pb-4 hover:opacity-70 transition-all max-w-full"
            >
              <div className="flex items-center gap-6">
                <div className="flex flex-wrap text-[4vw] lg:text-[3.5vw] font-bold leading-[0.9] tracking-tighter uppercase whitespace-nowrap">
                  {profile.email.split("").map((char, index) => (
                    <span key={index} className="inline-block overflow-hidden h-[1.1em] -mb-[0.1em]">
                      <motion.span
                        variants={{
                          hidden: { y: "100%" },
                          visible: { y: 0 }
                        }}
                        transition={{
                          duration: 0.6,
                          delay: index * 0.03,
                          ease: [0.16, 1, 0.3, 1]
                        }}
                        className="inline-block"
                      >
                        {char}
                      </motion.span>
                    </span>
                  ))}
                </div>
                <motion.div
                  variants={{
                    hidden: { scale: 0, rotate: -45 },
                    visible: { scale: 1, rotate: 0 }
                  }}
                  transition={{ duration: 0.8, delay: profile.email.length * 0.03, ease: "easeOut" }}
                >
                  <ArrowUpRight className="w-[4vw] h-[4vw] lg:w-[2.5vw] lg:h-[2.5vw] group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" strokeWidth={4} />
                </motion.div>
              </div>
            </a>
          </motion.div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            {/* Left Col: Address & Tel */}
            <div className="space-y-16">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40 mb-6 flex items-center gap-2">
                  <span className="w-1 h-1 bg-dark rounded-full"></span> ADDRESS
                </p>
                <p className="text-lg md:text-xl font-bold leading-relaxed max-w-[340px] whitespace-pre-line">
                  {profile.address || "서울 금천구 벚꽃로 298 \n1308호 대륭포스트타워 6차 "}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40 mb-6 flex items-center gap-2">
                  <span className="w-1 h-1 bg-dark rounded-full"></span> TEL
                </p>
                <a href={`tel:${profile.phone}`} className="text-lg md:text-xl font-bold border-b-2 border-dark/20 hover:border-dark transition-all">
                  {profile.phone}
                </a>
              </div>
            </div>

            {/* Right Col: Socials & Tagline */}
            <div className="flex flex-col justify-between">
              <div className="space-y-4 mb-20">
                <a href="#" className="flex items-center gap-2 text-lg md:text-xl font-bold border-b border-dark/10 pb-2 hover:border-dark transition-all group w-fit">
                  INSTAGRAM <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-all" />
                </a>
                <a href="#" className="flex items-center gap-2 text-lg md:text-xl font-bold border-b border-dark/10 pb-2 hover:border-dark transition-all group w-fit">
                  BEHANCE <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-all" />
                </a>
                <a href="#" className="flex items-center gap-2 text-lg md:text-xl font-bold border-b border-dark/10 pb-2 hover:border-dark transition-all group w-fit">
                  NAVER BLOG <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-all" />
                </a>
              </div>
              
              <div className="opacity-50 text-sm font-bold leading-relaxed max-w-sm">
                우리와 함께 새로운 것을 발견하세요.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER BOTTOM BAR */}
      <div className="px-8 md:px-[60px] pb-12 pt-20 flex flex-col md:flex-row justify-between items-end gap-8 relative z-20">
        <div className="flex flex-col gap-2">
          <img src={lebassLogo} alt="LEBASS" className="logo-svg h-10 w-auto" />
          <p className="text-[10px] font-bold opacity-30 mt-4">© 2026 LEBASS. ALL RIGHTS RESERVED.</p>
        </div>

        <div className="flex gap-12 text-[10px] font-bold tracking-widest uppercase">
          <a href="#" className="hover:opacity-50 transition-opacity flex items-center gap-2">COMPANY BROCHURE <Download size={14}/></a>
          <a href="#" className="hover:opacity-50 transition-opacity flex items-center gap-2">START WITH LEBASS <MoveRight size={14}/></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
