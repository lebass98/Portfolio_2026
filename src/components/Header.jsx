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
      <div className="capsule-nav-wrapper">
        <a href="#home" className="capsule-nav-logo text-2xl font-bold tracking-tighter">
          JK.LEE<span className="text-accent">.</span>
        </a>

        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, cubicBezier: [0.16, 1, 0.3, 1] }}
          className="capsule-nav"
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

        <div className="capsule-nav-contact flex items-center gap-4">
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
    </div>
  );
};

export default Header;
