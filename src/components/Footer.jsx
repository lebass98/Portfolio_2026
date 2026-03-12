import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { ArrowUpRight, Download, MoveRight } from 'lucide-react';

const Footer = () => {
  const { profile } = portfolioData;

  return (
    <footer id="contact" className="relative bg-[#FFE600] text-[#111427] pt-24 pb-12 overflow-hidden min-h-[700px] flex flex-col justify-between transition-colors duration-500">
      {/* Plastic Wrap Texture Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-50 mix-blend-multiply z-10"
        style={{ 
          backgroundImage: `url('${import.meta.env.BASE_URL}images/footer_texture.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      
      <div className="px-[60px] relative z-20">
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
          {/* Address */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-8 flex items-center gap-2">
              <span className="w-1 h-1 bg-dark rounded-full"></span> ADDRESS
            </p>
            <p className="text-xl font-bold leading-relaxed max-w-[280px]">
              {profile.address || "서울특별시 마포구 홍익로5안길 28\n2F, 208"}
            </p>
          </div>

          {/* Tel */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-8 flex items-center gap-2">
              <span className="w-1 h-1 bg-dark rounded-full"></span> TELL
            </p>
            <a href={`tel:${profile.phone}`} className="text-xl font-bold border-b border-dark/30 hover:border-dark transition-all">
              {profile.phone}
            </a>
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
            
            <p className="text-sm font-medium opacity-60 pt-8 leading-relaxed max-w-xs">
              뉴버드는 디지털 익스피리언스 에이전시입니다.<br />
              <strong className="text-dark">우리와 함께 새로운 것을 발견</strong>하세요.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="px-[60px] pb-12 flex flex-col md:flex-row justify-between items-center gap-8 relative z-20">
        <div className="flex items-center gap-4">
          <span className="text-2xl font-bold tracking-tighter uppercase">
            JK.LEE<span className="text-white">.</span>
          </span>
        </div>

        <div className="flex flex-col md:flex-row gap-12 text-[12px] font-bold tracking-widest">
          <a href="#" className="flex items-center gap-2 border-b border-dark/30 hover:border-dark transition-all uppercase">
            COMPANY BROCHURE <Download size={16} />
          </a>
          <a href="#contact" className="flex items-center gap-2 border-b border-dark/30 hover:border-dark transition-all uppercase">
            START WITH PORTFOLIO <MoveRight size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
