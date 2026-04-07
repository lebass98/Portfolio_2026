import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import lightPreview from '../assets/images/theme_light.png';
import darkPreview from '../assets/images/theme_dark.png';

const ThemeSelection = ({ onSelect }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050505]/80 backdrop-blur-[100px] overflow-y-auto p-4 md:p-8"
    >
      <div className="max-w-5xl w-full flex flex-col items-center py-10">
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="text-center mb-8 md:mb-16"
        >
          <p className="text-[10px] md:text-sm font-black tracking-[0.4em] text-white/40 uppercase mb-4">Choose your experience</p>
          <h2 className="text-3xl md:text-6xl font-black tracking-tighter text-white uppercase italic">
            Select Your <br />
            <span className="text-yellow-theme transition-colors">Visual Mode</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-10 w-full px-4">
          {/* Light Mode Block */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              onClick={() => onSelect('light')}
              className="w-full relative h-[250px] md:h-[480px] rounded-[30px] md:rounded-[40px] overflow-hidden group bg-white/5 border border-white/10 flex flex-col items-center justify-center gap-6 md:gap-10 hover:border-white/30 transition-all duration-700"
            >
              {/* Background Preview */}
              <div className="absolute inset-0 z-0">
                <img src={lightPreview} alt="Light Mode" className="w-full h-full object-cover opacity-20 group-hover:opacity-40 group-hover:scale-110 transition-all duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />
              </div>

              <div className="relative">
                <div className="absolute inset-0 blur-3xl bg-yellow-400/20 scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <Sun size={60} className="md:size-[120px] text-white group-hover:text-yellow-theme group-hover:rotate-45 transition-all duration-1000 ease-out z-10 relative" strokeWidth={1} />
              </div>
              <div className="text-center z-10 transition-transform duration-700 group-hover:translate-y-[-10px]">
                <h3 className="text-2xl md:text-4xl font-black tracking-tighter text-white mb-1 md:mb-2 italic">LIGHT</h3>
                <p className="text-[8px] md:text-[10px] font-black text-white/40 tracking-[0.3em] uppercase">High Clarity & Detail</p>
              </div>
            </button>
          </motion.div>

          {/* Dark Mode Block */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              onClick={() => onSelect('dark')}
              className="w-full relative h-[250px] md:h-[480px] rounded-[30px] md:rounded-[40px] overflow-hidden group bg-white/[0.02] border border-white/5 flex flex-col items-center justify-center gap-6 md:gap-10 hover:border-white/20 transition-all duration-700"
            >
              {/* Background Preview */}
              <div className="absolute inset-0 z-0">
                <img src={darkPreview} alt="Dark Mode" className="w-full h-full object-cover opacity-20 group-hover:opacity-40 group-hover:scale-110 transition-all duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />
              </div>

              <div className="relative">
                <div className="absolute inset-0 blur-3xl bg-indigo-500/10 scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <Moon size={60} className="md:size-[120px] text-white/80 group-hover:text-indigo-theme group-hover:rotate-12 transition-all duration-1000 ease-out z-10 relative" strokeWidth={1} />
              </div>
              <div className="text-center z-10 transition-transform duration-700 group-hover:translate-y-[-10px]">
                <h3 className="text-2xl md:text-4xl font-black tracking-tighter text-white mb-1 md:mb-2 italic">DARK</h3>
                <p className="text-[8px] md:text-[10px] font-black text-white/40 tracking-[0.3em] uppercase">Immersive Focus</p>
              </div>
            </button>
          </motion.div>
        </div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-8 md:mt-16 text-[8px] md:text-[10px] font-black text-white/20 tracking-[0.5em] uppercase"
        >
          Choice valid for 1 hour
        </motion.p>
      </div>
    </motion.div>
  );
};

export default ThemeSelection;
