import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Overview from './components/Overview';
import Products from './components/Products';
import Services from './components/Services';
import QAQC from './components/QAQC';
import Contact from './components/Contact';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('theme');
    return (saved === 'light' || saved === 'dark') ? saved : 'dark';
  });

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light-theme');
    } else {
      root.classList.remove('light-theme');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Handle smooth scroll navigation
  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const offset = 65; // Header offset height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Monitor scroll positioning to update active navigation state using high-performance IntersectionObserver
  useEffect(() => {
    const sections = ['hero', 'about', 'products', 'services', 'quality', 'projects', 'contact'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -40% 0px', // Target middle horizontal band of viewport
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div id="app-root" className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex flex-col justify-between selection:bg-brand-yellow selection:text-black transition-colors duration-300">
      {/* Sticky Liquid Glass Header */}
      <Header onNavClick={scrollToSection} activeSection={activeSection} theme={theme} toggleTheme={toggleTheme} />

      {/* Main Single Page Layout Sections */}
      <main className="flex-grow">
        {/* Full-screen Hero Landing */}
        <Hero onExploreClick={scrollToSection} theme={theme} />

        {/* Corporate Profile Bento Grid */}
        <Overview onLearnMoreClick={scrollToSection} />

        {/* Standard Product Catalog */}
        <Products />

        {/* Field & Workshop Services Support */}
        <Services />

        {/* 8-Step Inspections Quality Timeline */}
        <QAQC />

        {/* Finished Executions & Request Quote Form */}
        <Contact theme={theme} />
      </main>
    </div>
  );
}
