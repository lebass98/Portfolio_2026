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
    { name: 'PROJECTS', href: '#portfolio', count: '28' },
    { name: 'ABOUT', href: '#about' },
    { name: 'CAREER', href: '#experience' },
    { name: 'CONTACT', href: '#contact' },
  ];

  return (
    <div className="capsule-nav-container">
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, cubicBezier: [0.16, 1, 0.3, 1] }}
        className="capsule-nav"
      >
        <a href="#home" className="text-xl font-black tracking-tighter text-[var(--text-main)] font-saira dark-mode-toggle">
          JK<span className="text-accent">.</span>
        </a>

        <nav className="h_nav">
          <ul className="flex items-center gap-12">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="text-[14px] font-bold tracking-[0.1em] text-[var(--text-main)] hover:text-accent transition-all flex items-center"
                >
                  <span className="autotext" data-text={link.name}>{link.name}</span>
                  {link.count && <em className="nav-item-count ml-1 not-italic">{link.count}</em>}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4 pl-4 border-l border-[var(--glass-border)]">
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-full text-[var(--text-main)] hover:bg-black/5 dark:hover:bg-white/5 transition-colors dark-mode-toggle"
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
