import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SmoothScroll = ({ children }) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    // Add smooth scroll for anchor links
    const handleHashLinkClick = (e) => {
      const anchor = e.target.closest('a');
      if (anchor && anchor.hash && anchor.origin === window.location.origin && anchor.pathname === window.location.pathname) {
        const id = anchor.hash;
        if (id === '#') return;
        const targetElement = document.querySelector(id);
        if (targetElement) {
          e.preventDefault();
          lenis.scrollTo(targetElement, { offset: -20 });
        }
      }
    };

    document.addEventListener('click', handleHashLinkClick);

    function raf(time) {
      lenis.raf(time);
      ScrollTrigger.update(); // ScrollTrigger 위치 수동 업데이트
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      document.removeEventListener('click', handleHashLinkClick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;
