import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { ArrowUpRight, Download, MoveRight } from 'lucide-react';
import footerTexture from '../assets/images/footer_texture.png';

import lebassLogo from '../lebass_logo.svg';

const Footer = () => {
  const { profile } = portfolioData;

  return (
    <footer id="contact" className="relative bg-accent text-dark pt-24 pb-12 overflow-hidden min-h-[700px] flex flex-col justify-between transition-colors duration-500">
      <div className="px-8 md:px-[60px] relative z-20">
        <div className="flex justify-between items-start mb-16">
          <span className="text-sm font-bold tracking-widest uppercase flex items-center gap-2">
            INFORMATION <span className="w-8 h-[2px] bg-dark"></span>
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-32"
        >
          <a
            href={`mailto:${profile.email}`}
            className="text-[5vw] md:text-[7vw] font-bold leading-none tracking-tighter uppercase border-b-[6px] border-dark pb-4 hover:opacity-70 transition-opacity flex items-center justify-between group"
          >
            {profile.email}
            <ArrowUpRight size={80} className="w-[8vw] h-[8vw] group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" strokeWidth={3} />
          </a>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-32">


          {/* Tel */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-8 flex items-center gap-2">
              <span className="w-1 h-1 bg-dark rounded-full"></span> TEL
            </p>
            <a href={`tel:${profile.phone}`} className="text-xl font-bold border-b border-dark/30 hover:border-dark transition-all">
              {profile.phone}
            </a>
          </div>{/* Address */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-8 flex items-center gap-2">
              <span className="w-1 h-1 bg-dark rounded-full"></span> ADDRESS
            </p>
            <p className="text-xl font-bold leading-relaxed max-w-[280px]">
              {profile.address || "서울 금천구 벚꽃로 298 \n1308호 대륭포스트타워 6차 "}
            </p>
          </div>

          {/* Socials */}
          <div className="space-y-4">
            <a href="#" className="flex items-center justify-between text-xl font-bold border-b border-dark/10 pb-2 hover:border-dark transition-all group">
              INSTAGRAM <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-all" />
            </a>
            <a href="#" className="flex items-center justify-between text-xl font-bold border-b border-dark/10 pb-2 hover:border-dark transition-all group">
              BEHANCE <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-all" />
            </a>
            <a href="#" className="flex items-center justify-between text-xl font-bold border-b border-dark/10 pb-2 hover:border-dark transition-all group">
              NAVER BLOG <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-all" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="px-8 md:px-[60px] pb-12 flex flex-col md:flex-row justify-between items-center gap-8 relative z-20">
        <div className="flex items-center gap-4">
          <img src={lebassLogo} alt="LEBASS" className="logo-svg h-11 w-auto" />
        </div>


      </div>
    </footer>
  );
};

export default Footer;
