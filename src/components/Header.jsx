import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X } from 'lucide-react';

const Header = ({ toggleTheme, theme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'PROJECTS', href: '#portfolio', count: '28' },
    { name: 'ABOUT', href: '#about' },
    { name: 'CAREER', href: '#experience' },
    { name: 'CONTACT', href: '#contact' },
  ];

  return (
    <div className="capsule-nav-container">
      <div className="capsule-nav-wrapper">
        <a 
          href="#home" 
          className={`capsule-nav-logo text-2xl font-bold tracking-tighter transition-all duration-300 ${isMenuOpen ? 'opacity-0 pointer-events-none translate-y-[-20px]' : 'opacity-100'}`}
        >
          JK.LEE<span className="text-accent">.</span>
        </a>

        {/* Desktop Navigation */}
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, cubicBezier: [0.16, 1, 0.3, 1] }}
          className={`capsule-nav hidden md:flex transition-all duration-300 ${isMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        >
          <nav className="h_nav">
            <ul className="flex items-center gap-10">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="flex items-center"
                  >
                    <span className="autotext" data-text={link.name}>{link.name}</span>
                    {link.count && <em className="nav-item-count">{link.count}</em>}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </motion.header>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center gap-4 capsule-nav-contact">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-12 h-12 flex items-center justify-center rounded-full glass-panel shadow-lg z-[210] pointer-events-auto"
          >
            {isMenuOpen ? <X size={24} className="text-dark" /> : <Menu size={24} className="text-dark" />}
          </button>
        </div>

        {/* Desktop Theme Toggle & Contact Group */}
        <div className="capsule-nav-contact hidden md:flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="w-12 h-12 flex items-center justify-center rounded-full glass-panel shadow-lg transition-all duration-300 group"
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? (
              <Moon size={20} className="text-dark group-hover:text-accent transition-colors" />
            ) : (
              <Sun size={20} className="text-dark group-hover:text-accent transition-colors" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[205] flex items-center justify-center p-6 md:hidden pointer-events-auto"
          >
            <div 
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
              onClick={() => setIsMenuOpen(false)}
            />
            <div className="relative w-full max-w-sm glass-panel p-8 flex flex-col items-center gap-8 shadow-2xl">
              <nav className="w-full">
                <ul className="flex flex-col items-center gap-6">
                  {navLinks.map((link) => (
                    <li key={link.name} className="w-full">
                      <a
                        href={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center justify-center gap-2 group w-full py-4 border-b border-white/10"
                      >
                        <span className="text-2xl font-black tracking-widest text-white group-hover:text-accent transition-colors uppercase">
                          {link.name}
                        </span>
                        {link.count && <em className="text-accent text-xs font-black not-italic">{link.count}</em>}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  toggleTheme();
                  setIsMenuOpen(false);
                }}
                className="w-full py-6 mt-4 bg-accent text-dark font-black uppercase tracking-widest flex items-center justify-center gap-3 rounded-2xl"
              >
                {theme === 'light' ? (
                  <>
                    <Moon size={20} />
                    <span>Dark Mode</span>
                  </>
                ) : (
                  <>
                    <Sun size={20} />
                    <span>Light Mode</span>
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Header;
