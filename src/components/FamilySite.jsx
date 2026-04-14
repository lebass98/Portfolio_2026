import { useState } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const familySites = [
  { name: 'KRDS 예시 사이트', url: 'https://lebass98.github.io/KRDS/' },
  { name: 'Portfolio 2026', url: 'https://lebass98.github.io/Portfolio_2026/' },
  { name: 'BLOG. C (Editor)', url: 'https://lebass98.github.io/Editor/' },
  { name: 'Vision Pulse Dashboard', url: 'https://lebass98.github.io/react_dashboard_01/' },
  { name: '출석체크', url: 'https://lebass98.github.io/attendance/' },
  { name: 'WebTools', url: 'https://lebass98.github.io/web_guide/' },
];

const FamilySite = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-indigo-theme text-white font-extrabold shadow-xl transition-colors"
        style={{ boxShadow: '0 8px 24px rgba(99,102,241,0.35)' }}
        aria-label="패밀리 사이트 열기"
      >
        F
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <button
              className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
              onClick={() => setIsOpen(false)}
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
                <h2 className="text-lg font-extrabold" style={{ color: 'var(--text-main)' }}>
                  패밀리 사이트
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
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
                    className="w-full text-left px-4 py-3 rounded-xl transition-all duration-200 hover:bg-indigo-theme/10"
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

export default FamilySite;
