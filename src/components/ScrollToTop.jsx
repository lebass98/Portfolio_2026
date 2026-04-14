import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, X } from 'lucide-react';

const familySites = [
  { name: 'KRDS 예시 사이트', url: 'https://lebass98.github.io/KRDS/' },
  { name: 'Portfolio 2026', url: 'https://lebass98.github.io/Portfolio_2026/' },
  { name: 'BLOG. C (Editor)', url: 'https://lebass98.github.io/Editor/' },
  { name: 'Vision Pulse Dashboard', url: 'https://lebass98.github.io/react_dashboard_01/' },
  { name: '출석체크', url: 'https://lebass98.github.io/attendance/' },
  { name: 'WebTools', url: 'https://lebass98.github.io/web_guide/' },
];

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isFamilyOpen, setIsFamilyOpen] = useState(false);

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
    <>
      {/* Fixed Button Group */}
      <AnimatePresence>
        <div className="fixed bottom-10 right-[20px] sm:right-15 z-50 flex flex-col gap-4">
          {/* Family Site Button */}
          <motion.button
            onClick={() => setIsFamilyOpen(true)}
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-14 h-14 flex items-center justify-center rounded-full bg-dark text-accent shadow-2xl transition-all duration-300 font-extrabold text-base"
            aria-label="패밀리 사이트 열기"
          >
            F
          </motion.button>

          {/* Contact/Write Button */}
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

      {/* Family Site Modal */}
      <AnimatePresence>
        {isFamilyOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <button
              className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
              onClick={() => setIsFamilyOpen(false)}
              aria-label="닫기"
            />

            {/* Modal Content */}
            <motion.div
              className="relative w-full max-w-md rounded-2xl p-6 space-y-4"
              style={{
                background: 'var(--glass-card-bg)',
                border: '1px solid var(--glass-card-border)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                boxShadow: '0 25px 50px rgba(0,0,0,0.2)',
              }}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <p className="text-4xl font-extrabold" style={{ color: 'var(--text-main)' }}>
                  패밀리 사이트
                </p>
                <button
                  onClick={() => setIsFamilyOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-black/10"
                  aria-label="닫기"
                >
                  <X className="w-5 h-5" style={{ color: 'var(--text-muted)' }} />
                </button>
              </div>

              {/* Description */}
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                이동할 사이트를 선택하세요.
              </p>

              {/* Site Links */}
              <div className="space-y-2">
                {familySites.map((site) => (
                  <button
                    key={site.url}
                    onClick={() => window.open(site.url, '_blank', 'noopener,noreferrer')}
                    className="w-full text-left px-4 py-3 rounded-xl transition-all duration-200 hover:bg-black/5"
                  >
                    <p className="font-semibold text-sm" style={{ color: 'var(--text-main)' }}>
                      {site.name}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                      {site.url}
                    </p>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ScrollToTop;
