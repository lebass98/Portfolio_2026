import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

const Footer = () => {
  return (
    <footer id="contact" className="bg-black text-white pt-32 pb-12 transition-colors duration-500">
      <div className="container mx-auto px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl"
          >
            <p className="text-accent text-xl font-black tracking-widest uppercase mb-8">Ready to start?</p>
            <h2 className="text-white !mb-0 text-[4rem] md:text-[6rem] lg:text-[8rem] leading-[0.9] font-black uppercase font-saira">
              Let's build <br/> something <span className="text-accent">great</span>
            </h2>
          </motion.div>

          <motion.div 
            className="flex flex-col gap-8 md:text-right"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
             <div>
               <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Socials</p>
               <div className="flex md:justify-end gap-6 text-sm font-black uppercase tracking-widest">
                 <a href="#" className="hover:text-accent transition-colors">Instagram</a>
                 <a href="#" className="hover:text-accent transition-colors">Behance</a>
                 <a href="#" className="hover:text-accent transition-colors">LinkedIn</a>
               </div>
             </div>
             <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Direct</p>
                <a href={`mailto:${portfolioData.profile.email}`} className="text-2xl font-black hover:text-accent transition-colors border-b-2 border-white/10 hover:border-accent">
                  {portfolioData.profile.email}
                </a>
             </div>
          </motion.div>
        </div>

        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <span className="text-3xl font-black font-saira tracking-tighter">JK<span className="text-accent">.</span></span>
            <div className="w-[1px] h-6 bg-white/10" />
            <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Portfolio 2026</p>
          </div>

          <div className="text-[10px] font-black uppercase tracking-widest text-white/40 text-center md:text-right">
            <p className="mb-1">© 2026 {portfolioData.profile.name}. All rights reserved.</p>
            <p className="opacity-50">Handcrafted by IG (Antigravity AI)</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
