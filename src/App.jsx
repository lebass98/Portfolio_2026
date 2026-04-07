import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Info from './components/Info';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import SmoothScroll from './components/SmoothScroll';
import CustomCursor from './components/CustomCursor';
import ProjectSeowon from './pages/ProjectSeowon';
import ThemeSelection from './components/ThemeSelection';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('nb_theme') || 'dark');
  const [showThemeSelection, setShowThemeSelection] = useState(false);

  useEffect(() => {
    const lastSelected = localStorage.getItem('nb_theme_last_selected');
    const currentTime = new Date().getTime();
    const oneHour = 3600 * 1000; // 1 hour

    if (!lastSelected || (currentTime - parseInt(lastSelected)) > oneHour) {
      setShowThemeSelection(true);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('nb_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
    localStorage.setItem('nb_theme_last_selected', new Date().getTime().toString());
  };

  const handleThemeSelect = (selectedTheme) => {
    setTheme(selectedTheme);
    localStorage.setItem('nb_theme_last_selected', new Date().getTime().toString());
    setShowThemeSelection(false);
  };

  return (
    <SmoothScroll>
      <div className="min-h-screen transition-colors duration-300 relative z-0 overflow-y-hidden">
        <AnimatePresence>
          {showThemeSelection && (
            <ThemeSelection onSelect={handleThemeSelect} />
          )}
        </AnimatePresence>
        <CustomCursor />
        <Header toggleTheme={toggleTheme} theme={theme} />
        <main style={{overflow:"hidden"}}>
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
