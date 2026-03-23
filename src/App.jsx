import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import SmoothScroll from './components/SmoothScroll';
import CustomCursor from './components/CustomCursor';
import ParallaxBackground from './components/ParallaxBackground';

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <SmoothScroll>
      <div className="min-h-screen transition-colors duration-300 relative z-0">
        <CustomCursor />
        <Header toggleTheme={toggleTheme} theme={theme} />
        <main>
          <Hero theme={theme} />
          <About theme={theme} />
          <Portfolio theme={theme} />
        </main>
        <Footer />
        <ScrollToTop theme={theme} />
      </div>
    </SmoothScroll>
  );
}

export default App;
