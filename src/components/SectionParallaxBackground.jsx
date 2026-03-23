import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

const SectionParallaxBackground = ({ bgImage, theme, containerRef }) => {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Maps 0-1 progress of the section traversing the viewport to vertical movement (-15% to 15%)
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="!absolute inset-0 w-full h-full overflow-hidden pointer-events-none" style={{ zIndex: '1 !important' }}>
      <motion.div 
        className="absolute inset-x-0 w-full h-[130%] -top-[15%]"
        style={{ 
          y,
          backgroundImage: `url(${bgImage})`,
          backgroundSize: '1920px',
          backgroundRepeat: 'repeat',
          backgroundPosition: 'center',
          opacity: theme === 'dark' ? 0.3 : 0.15,
          mixBlendMode: theme === 'dark' ? 'screen' : 'multiply',
          willChange: 'transform'
        }}
      />
    </div>
  );
};

export default SectionParallaxBackground;
