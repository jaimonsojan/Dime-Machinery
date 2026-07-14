import { useState, useEffect } from 'react';
import { Menu, X, Settings, Sun, Moon, Linkedin } from 'lucide-react';

interface HeaderProps {
  onNavClick: (sectionId: string) => void;
  activeSection: string;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

export default function Header({ onNavClick, activeSection, theme, toggleTheme }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero', label: 'DIME' },
    { id: 'about', label: 'Overview' },
    { id: 'products', label: 'Products' },
    { id: 'services', label: 'Services' },
    { id: 'quality', label: 'QA/QC' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleLinkClick = (id: string) => {
    onNavClick(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      id="app-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'py-2 bg-[var(--bg-secondary)]/85 backdrop-blur-lg border-b border-[var(--border-color)] shadow-xl' 
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo with dynamic invert in light theme if needed, or keeping it pristine */}
        <button 
          onClick={() => handleLinkClick('hero')} 
          className="flex items-center gap-3 group text-left cursor-pointer"
        >
          <div className="relative h-10 md:h-12 flex items-center justify-center p-1 rounded-lg transition-transform duration-500 group-hover:scale-105">
            <img 
              src={theme === 'light' ? 'https://dimedoha.com/DMEC/DMEC_LOGO_LIGHT.png' : 'https://dimedoha.com/DMEC/DMEC_LOGO_DARK.png'} 
              alt="DIME Logo" 
              className="h-9 md:h-11 w-auto object-contain transition-all duration-300"
              referrerPolicy="no-referrer"
            />
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-full p-1 backdrop-blur-sm">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`px-4 py-1.5 rounded-full text-[10px] md:text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activeSection === link.id
                  ? 'bg-brand-yellow text-black shadow-md shadow-brand-yellow/20 font-bold'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right Side: Theme Switcher, LinkedIn Page & Call to Action */}
        <div className="hidden md:flex items-center gap-3">
          {/* LinkedIn Page Link */}
          <a
            href="https://www.linkedin.com/company/dime-machinery-equipment"
            target="_blank"
            rel="noreferrer"
            title="Follow DIME on LinkedIn"
            aria-label="Follow DIME on LinkedIn"
            className="p-2.5 rounded-full bg-brand-yellow/10 hover:bg-brand-yellow hover:text-black border border-brand-yellow/30 text-brand-yellow transition-all duration-300 cursor-pointer flex items-center justify-center shadow-sm shadow-brand-yellow/5"
          >
            <Linkedin className="w-4 h-4" />
          </a>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-2.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/5 text-[var(--text-primary)] hover:text-brand-yellow hover:border-brand-yellow/30 transition-all duration-300 cursor-pointer"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-brand-yellow" />
            ) : (
              <Moon className="w-4 h-4 text-brand-dark" />
            )}
          </button>

          {/* Request Quote RFQ Button */}
          <button
            onClick={() => handleLinkClick('contact')}
            className="relative px-5 py-2 overflow-hidden group rounded-full bg-transparent border border-brand-yellow/30 font-display text-xs font-semibold uppercase tracking-wider text-brand-yellow hover:text-black transition-colors duration-500 cursor-pointer"
          >
            <span className="absolute inset-0 w-full h-full bg-brand-yellow transition-all duration-500 ease-out -translate-x-full group-hover:translate-x-0 z-0"></span>
            <span className="relative z-10 flex items-center gap-2">
              Request Quote
              <Settings className="w-3.5 h-3.5 animate-spin-slow" />
            </span>
          </button>
        </div>

        {/* Mobile Menu Action Row */}
        <div className="md:hidden flex items-center gap-2">
          {/* LinkedIn Mobile Link */}
          <a
            href="https://www.linkedin.com/company/dime-machinery-equipment"
            target="_blank"
            rel="noreferrer"
            aria-label="Follow DIME on LinkedIn"
            className="p-2 rounded-lg bg-brand-yellow/10 border border-brand-yellow/20 text-brand-yellow hover:bg-brand-yellow hover:text-black transition-all cursor-pointer flex items-center justify-center"
          >
            <Linkedin className="w-4 h-4" />
          </a>

          {/* Theme Toggle Mobile */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-2 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/5 text-[var(--text-primary)] hover:text-brand-yellow transition-all cursor-pointer"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-brand-yellow" />
            ) : (
              <Moon className="w-4 h-4 text-brand-dark" />
            )}
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/5 text-[var(--text-primary)] hover:text-brand-yellow transition-colors cursor-pointer"
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div
        className={`md:hidden fixed inset-x-0 top-[56px] h-screen bg-[var(--bg-secondary)]/95 backdrop-blur-lg border-t border-[var(--border-color)] transition-all duration-500 ease-in-out ${
          isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'
        }`}
      >
        <div className="flex flex-col p-8 gap-4">
          {navLinks.map((link, idx) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`w-full py-4 px-6 rounded-xl text-left font-display font-medium text-lg uppercase tracking-wide border transition-all duration-300 ${
                activeSection === link.id
                  ? 'bg-brand-yellow text-black border-brand-yellow/50 font-bold shadow-md shadow-brand-yellow/15'
                  : 'text-[var(--text-primary)] border-[var(--border-color)] hover:bg-black/5 dark:hover:bg-white/5'
              }`}
              style={{ transitionDelay: `${idx * 40}ms` }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleLinkClick('contact')}
            className="w-full mt-4 py-4 rounded-xl bg-brand-yellow text-black font-display font-bold uppercase tracking-widest text-center shadow-lg shadow-brand-yellow/20 cursor-pointer"
          >
            GET IN TOUCH
          </button>
        </div>
      </div>
    </header>
  );
}
