import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

const Header = ({ toggleTheme, theme }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'PROJECTS', href: '#portfolio' },
    { name: 'ABOUT', href: '#about' },
    { name: 'EXPERIENCE', href: '#experience' },
    { name: 'CONTACT', href: '#contact' },
  ];

  return (
    <div className="fixed top-8 left-0 right-0 z-50 flex justify-center px-4">
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, cubicBezier: [0.16, 1, 0.3, 1] }}
        className="capsule-nav flex items-center gap-8 md:gap-12"
      >
        <a href="#home" className="text-xl font-black tracking-tighter text-[var(--text-main)] font-saira mr-4">
          JK<span className="text-accent">.</span>
        </a>

        <nav className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[13px] font-bold tracking-[0.15em] text-[var(--text-main)] hover:opacity-50 transition-all"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4 pl-4 border-l border-[var(--glass-border)]">
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-full text-[var(--text-main)] hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </div>
      </motion.header>
    </div>
  );
};

export default Header;
