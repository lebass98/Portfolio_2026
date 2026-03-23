import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import bgImage from '../assets/images/parallax_bg.png';

const ParallaxBackground = ({ theme }) => {
  const { scrollY } = useScroll();
  // Map scrollY to an absolute pixel string for backgroundPositionY
  const bgY = useTransform(scrollY, [0, 10000], ["0px", "3000px"]);

  // Handle client-side rendering issue with useTransform initially
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
      <motion.div 
        className="absolute inset-0 w-full h-full"
        style={{ 
          backgroundPositionY: bgY,
          backgroundImage: `url(${bgImage})`,
          backgroundSize: '100% 1080px',
          backgroundRepeat: 'repeat-y',
          backgroundPositionX: 'center',
          opacity: theme === 'dark' ? 0.3 : 0.15,
          mixBlendMode: theme === 'dark' ? 'screen' : 'multiply',
          willChange: 'background-position'
        }}
      />
    </div>
  );
};

export default ParallaxBackground;
