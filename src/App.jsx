import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Info from './components/Info';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import SmoothScroll from './components/SmoothScroll';
import CustomCursor from './components/CustomCursor';
import ParallaxBackground from './components/ParallaxBackground';
import ProjectSeowon from './pages/ProjectSeowon';

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('nb_theme') || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('nb_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <SmoothScroll>
      <div className="min-h-screen transition-colors duration-300 relative z-0 overflow-y-hidden">
        <CustomCursor />
        <Header toggleTheme={toggleTheme} theme={theme} />
        <main>
          <Routes>
            <Route path="/" element={<Home theme={theme} />} />
            <Route path="/info" element={<Info theme={theme} />} />
            <Route path="/project/seowon" element={<ProjectSeowon theme={theme} />} />
          </Routes>
        </main>
        <Footer />
        <ScrollToTop theme={theme} />
      </div>
    </SmoothScroll>
  );
}

export default App;
