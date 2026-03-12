import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Footer from './components/Footer';

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
    <div className="min-h-screen transition-colors duration-300">
      <Header toggleTheme={toggleTheme} theme={theme} />
      <main>
        <Hero />
        <About />
        <Portfolio />
      </main>
      <Footer />
    </div>
  );
}

export default App;
