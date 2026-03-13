import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      <div className="fixed bottom-10 right-15 z-50 flex flex-col gap-4 mb:right-[0]">
        {/* Contact/Write Button (Newbird Style) */}
        <motion.a
          href="mailto:dongbookro@gmail.com"
          initial={{ opacity: 0, scale: 0.8, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-14 h-14 flex items-center justify-center rounded-full bg-dark text-accent shadow-2xl transition-all duration-300 group"
          aria-label="Contact me"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
            <path d="m15 5 4 4" />
          </svg>
        </motion.a>

        {/* Scroll Top Button */}
        {isVisible && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 20 }}
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="w-14 h-14 flex items-center justify-center rounded-full glass-panel shadow-2xl group transition-all duration-300"
            aria-label="Scroll to top"
          >
            <ArrowUp
              size={24}
              className="text-dark group-hover:text-accent transition-colors duration-300"
              strokeWidth={2.5}
            />
          </motion.button>
        )}
      </div>
    </AnimatePresence>
  );
};

export default ScrollToTop;
