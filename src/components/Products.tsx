import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PRODUCT_CATEGORIES, ProductCategory } from '../types';
import { 
  Trash2, Truck, Droplet, Fuel, Layers, ShieldAlert, Home, Shield,
  Check, ArrowUpRight, Compass, Info, ShieldCheck, HelpCircle, FileText
} from 'lucide-react';

// Highly-curated high-resolution industrial Unsplash images matching each category
const CATEGORY_IMAGES: Record<string, string> = {
  waste: 'https://dimedoha.com/DMEC/waste_management.jpg', // Heavy-duty waste/metal container
  transport: 'https://dimedoha.com/DMEC/transport.jpg', // Commercial flatbed trailer transport
  liquid: 'https://dimedoha.com/DMEC/liquid.jpg', // Heavy liquid/industrial tanks
  fuel: 'https://dimedoha.com/DMEC/fuel storage.jpg', // Fuel storage & pressure valves
  access: 'https://dimedoha.com/DMEC/access.jpg', // Steel scaffolding & structural access
  emergency: 'https://dimedoha.com/DMEC/emergency.jpg', // Hydraulic machinery / breakdown crane profile
  site: 'https://dimedoha.com/DMEC/site.jpg', // Modular prefab cabin steel welding environment
  safety: 'https://dimedoha.com/DMEC/safety.jpg' // Safety signs & yellow protection gear on site
};

// Map icon name from string to Lucide Icon component
const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'Trash2': return <Trash2 className="w-5 h-5" />;
    case 'Truck': return <Truck className="w-5 h-5" />;
    case 'Droplet': return <Droplet className="w-5 h-5" />;
    case 'Fuel': return <Fuel className="w-5 h-5" />;
    case 'Layers': return <Layers className="w-5 h-5" />;
    case 'ShieldAlert': return <ShieldAlert className="w-5 h-5" />;
    case 'Home': return <Home className="w-5 h-5" />;
    default: return <Shield className="w-5 h-5" />;
  }
};

export default function Products() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeSectionId, setActiveSectionId] = useState<string>('waste');
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Monitor active section as user scrolls for the indicator using high-performance IntersectionObserver
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-25% 0px -45% 0px', // Matches the active zone in view
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSectionId(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    PRODUCT_CATEGORIES.forEach((cat) => {
      const element = sectionRefs.current[cat.id];
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      PRODUCT_CATEGORIES.forEach((cat) => {
        const element = sectionRefs.current[cat.id];
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);

  // Handle toast timeout
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const handleQuickInquire = (category: ProductCategory) => {
    const specDetails = 
      `Hi DIME Doha Team,\n\n` +
      `I am interested in requesting a formal quote and engineering review for assets under the "${category.title}" category.\n` +
      `Specified standards: ${category.specs || 'QCS 2014 Compliant'}\n\n` +
      `Please provide more information, current turnaround lead times, and pricing models for fabrication in Qatar.`;

    const event = new CustomEvent('dime-prefill-spec', {
      detail: {
        category: category.id === 'services' ? 'services' : category.id,
        message: specDetails
      }
    });
    window.dispatchEvent(event);

    setToastMessage(`Inquiry template for "${category.title}" successfully loaded! Scroll to bottom form.`);
    
    // Smooth scroll down to contact form
    const contactSec = document.getElementById('contact');
    if (contactSec) {
      setTimeout(() => {
        const offset = 65; // Header offset
        const y = contactSec.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }, 300);
    }
  };

  const scrollToCategory = (id: string) => {
    const el = sectionRefs.current[id] || document.getElementById(id);
    if (el) {
      const offset = 100; // Account for the sticky header
      const y = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="products" className="py-24 md:py-32 bg-[var(--bg-primary)] relative overflow-hidden border-t border-[var(--border-color)] transition-colors duration-300">
      
      {/* Symmetrical High-Tech Engineering Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] dark:opacity-[0.04] z-0">
        <div className="absolute top-0 bottom-0 left-12 w-[1px] bg-brand-yellow" />
        <div className="absolute top-0 bottom-0 right-12 w-[1px] bg-brand-yellow" />
        <div className="absolute left-0 right-0 top-1/4 h-[1px] bg-brand-yellow" />
        <div className="absolute left-0 right-0 bottom-1/4 h-[1px] bg-brand-yellow" />
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] border-l border-dashed border-brand-yellow" />
      </div>

      {/* Floating Specs prefilled alert toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 max-w-md p-4 rounded-xl bg-green-950/90 backdrop-blur-md border border-green-500/40 text-white shadow-2xl flex items-start gap-3"
          >
            <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center text-green-400 mt-0.5 flex-shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="font-display font-bold text-xs uppercase tracking-wider text-green-300">Inquiry Target Synced</p>
              <p className="text-[11px] text-green-100 mt-1 leading-relaxed">{toastMessage}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Passive indicator bar showing scroll progress in catalog */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-4 z-40 bg-black/50 backdrop-blur-md border border-[var(--border-color)] p-3 rounded-full shadow-2xl">
        {PRODUCT_CATEGORIES.map((cat) => {
          const isActive = cat.id === activeSectionId;
          return (
            <div
              key={cat.id}
              className="relative group flex items-center h-5"
            >
              {/* Premium Vertical Aligned Tooltip */}
              <div className="absolute left-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300 bg-neutral-900/95 text-brand-yellow text-[10px] uppercase font-mono font-bold tracking-widest px-3 py-1.5 rounded-md border border-brand-yellow/30 whitespace-nowrap shadow-xl pointer-events-none z-50">
                {cat.title}
              </div>
              <button
                onClick={() => scrollToCategory(cat.id)}
                className={`w-3.5 h-3.5 rounded-full transition-all duration-300 border flex items-center justify-center cursor-pointer ${
                  isActive 
                    ? 'bg-brand-yellow border-brand-yellow scale-125 shadow-md shadow-brand-yellow/35' 
                    : 'bg-transparent border-neutral-600 hover:border-brand-yellow/60'
                }`}
                aria-label={cat.title}
              >
                {isActive && <div className="w-1.5 h-1.5 rounded-full bg-black" />}
              </button>
            </div>
          );
        })}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Apple-style Interactive Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-left mb-12"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-brand-yellow font-bold px-3 py-1 bg-brand-yellow/10 border border-brand-yellow/20 rounded-full inline-block mb-4">
            02 // HEAVY EQUIPMENT CATALOG & FABRICATION
          </span>
          <h2 className="font-display font-extrabold text-3xl md:text-5xl lg:text-6xl text-[var(--text-primary)] tracking-tight leading-tight uppercase">
            Product Portfolio
          </h2>
          <p className="max-w-2xl text-[var(--text-secondary)] text-sm md:text-base mt-4 leading-relaxed font-light">
            Scroll down to review each of our specialized machinery categories, custom engineered and manufactured under strict international ISO 9001:2015 and Qatar Construction Specifications (QCS 2014) compliance guidelines.
          </p>
        </motion.div>

        {/* --- HIGH-PERFORMANCE CATEGORY QUICK-SELECTOR --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-20 overflow-x-auto scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0 sticky top-[72px] z-30 py-4 bg-[var(--bg-primary)]/80 backdrop-blur-md border-b border-[var(--border-color)]/50"
        >
          <div className="flex flex-nowrap md:grid md:grid-cols-4 lg:grid-cols-8 gap-3 min-w-max md:min-w-0">
            {PRODUCT_CATEGORIES.map((cat) => {
              const isActive = cat.id === activeSectionId;
              return (
                <button
                  key={cat.id}
                  onClick={() => scrollToCategory(cat.id)}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all duration-300 group cursor-pointer w-[120px] md:w-auto h-20 flex-shrink-0 ${
                    isActive
                      ? 'bg-brand-yellow/10 border-brand-yellow text-brand-yellow shadow-[0_0_15px_rgba(255,204,51,0.12)]'
                      : 'bg-neutral-900/40 border-neutral-800/85 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700 hover:bg-neutral-800/10'
                  }`}
                >
                  <div className={`p-1.5 rounded-lg mb-1 transition-transform duration-300 group-hover:scale-105 ${
                    isActive ? 'bg-brand-yellow/20 text-brand-yellow' : 'bg-neutral-800/50 text-neutral-400 group-hover:text-neutral-200'
                  }`}>
                    {getIcon(cat.iconName)}
                  </div>
                  <span className="text-[9px] uppercase tracking-widest font-bold leading-tight line-clamp-1 truncate w-full px-1 font-mono">
                    {cat.title.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* --- DYNAMIC SCROLL FEED --- */}
        <div className="flex flex-col gap-24 md:gap-36">
          {PRODUCT_CATEGORIES.map((cat, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={cat.id}
                id={cat.id}
                ref={(el) => { sectionRefs.current[cat.id] = el; }}
                className="scroll-mt-28"
              >
                {/* Visual Section Divider & Index Indicator */}
                <div className="flex items-center gap-4 mb-6 md:mb-10">
                  <span className="font-mono text-xs text-brand-yellow font-bold tracking-widest">
                    [0{index + 1} // {cat.id.toUpperCase()}]
                  </span>
                  <div className="flex-grow h-[1px] bg-gradient-to-r from-brand-yellow/30 to-transparent" />
                </div>

                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}>
                  
                  {/* --- VISUAL STAGE CARD (Lg Column 6 or 7) --- */}
                  <div className={`lg:col-span-6 w-full ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 40 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: false, amount: 0.15 }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className="group relative aspect-[16/10] md:aspect-[16/9] rounded-3xl overflow-hidden border border-[var(--border-color)] shadow-2xl bg-black/40"
                    >
                      {/* Industrial grid lining */}
                      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none z-10" />
                      
                      {/* Premium Image with Hover zoom effect */}
                      <img 
                        src={CATEGORY_IMAGES[cat.id] || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80'} 
                        alt={cat.title}
                        className="w-full h-full object-cover brightness-[0.8] contrast-[1.05] transition-all duration-700 group-hover:scale-103"
                        referrerPolicy="no-referrer"
                      />

                      {/* Dark overlay gradients */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30 z-10" />

                      {/* Technical specifications tag on the top left */}
                      <div className="absolute top-4 left-4 z-20 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-brand-yellow/20 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-yellow animate-pulse" />
                        <span className="font-mono text-[9px] text-brand-yellow font-extrabold uppercase tracking-widest">
                          Certified Fabrication Profile
                        </span>
                      </div>

                      {/* Live specs label on the bottom left overlay */}
                      <div className="absolute bottom-4 left-4 right-4 z-20 text-left">
                        <span className="block font-mono text-[8px] uppercase tracking-widest text-neutral-400 font-bold mb-1">
                          Standard Alloys & Materials
                        </span>
                        <p className="text-[11px] text-white font-medium bg-black/60 backdrop-blur-sm px-3.5 py-2 rounded-xl border border-white/[0.06] leading-relaxed">
                          {cat.specs || 'Certified premium ASTM steel subframes, corrosion-resistant linings, and heavy hydraulics.'}
                        </p>
                      </div>
                    </motion.div>
                  </div>

                  {/* --- SPECIFICATIONS DETAILS COLUMN (Lg Column 6) --- */}
                  <div className={`lg:col-span-6 flex flex-col justify-center text-left ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false, amount: 0.15 }}
                      transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {/* Floating Category Icon and Title Block */}
                      <div className="flex items-center gap-3.5 mb-5">
                        <div className="p-3.5 rounded-2xl bg-brand-yellow/10 text-brand-yellow border border-brand-yellow/20 flex-shrink-0 shadow-lg shadow-brand-yellow/5">
                          {getIcon(cat.iconName)}
                        </div>
                        <div>
                          <span className="block font-mono text-[9px] uppercase tracking-widest text-brand-yellow font-bold">
                            Qatar Certified Standard Category
                          </span>
                          <h3 className="font-display font-extrabold text-2xl md:text-3xl text-[var(--text-primary)] leading-tight tracking-tight uppercase mt-0.5">
                            {cat.title}
                          </h3>
                        </div>
                      </div>

                      <p className="text-[var(--text-secondary)] text-sm md:text-base leading-relaxed font-light mb-8">
                        {cat.description}
                      </p>

                      {/* COMPREHENSIVE SUB-PRODUCTS CARDS */}
                      <div className="mb-9">
                        <h4 className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 mb-4 flex items-center gap-2 font-bold">
                          <Compass className="w-3.5 h-3.5 text-brand-yellow" /> Equipment Portfolio & Drawings
                        </h4>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {cat.products.map((prod, idx) => (
                            <div 
                              key={idx} 
                              className="flex items-center gap-3 p-3 bg-black/5 dark:bg-white/[0.01] border border-[var(--border-color)] rounded-2xl hover:bg-black/10 dark:hover:bg-white/[0.02] hover:border-brand-yellow/20 transition-all duration-300"
                            >
                              <div className="w-5 h-5 rounded-full bg-brand-yellow/10 flex items-center justify-center text-brand-yellow flex-shrink-0 border border-brand-yellow/20">
                                <Check className="w-3 h-3 stroke-[3]" />
                              </div>
                              <span className="text-[var(--text-primary)] text-xs font-semibold tracking-wide leading-tight">
                                {prod}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* REAL-TIME SPEC INQUIRY DESK TRIGGER */}
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 border-t border-[var(--border-color)] pt-7.5">
                        <button
                          onClick={() => handleQuickInquire(cat)}
                          className="flex items-center justify-center gap-2.5 px-6.5 py-4 rounded-2xl bg-brand-yellow text-black font-display text-xs uppercase tracking-wider font-extrabold shadow-xl hover:shadow-brand-yellow/10 transition-all duration-300 cursor-pointer hover:scale-102 hover:bg-amber-400 active:scale-98"
                        >
                          Request Blueprints & Quote
                          <ArrowUpRight className="w-4 h-4" />
                        </button>

                        <div className="flex items-center gap-2.5 px-4.5 py-3 rounded-2xl bg-black/15 dark:bg-white/[0.02] border border-[var(--border-color)] justify-center sm:justify-start">
                          <Info className="w-4 h-4 text-brand-yellow flex-shrink-0" />
                          <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--text-secondary)] font-medium">
                            Meets ISO 9001 & QCS 2014 Standard
                          </span>
                        </div>
                      </div>

                    </motion.div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* BOTTOM CALL TO ACTION FOR BESPOKE PROJECTS */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-32 p-8 md:p-12 rounded-3xl liquid-glass border border-brand-yellow/15 glass-glow-yellow text-center relative overflow-hidden max-w-4xl mx-auto"
        >
          {/* Engineering grid lines */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
          
          <span className="font-mono text-xs uppercase tracking-widest text-brand-yellow font-extrabold mb-3 inline-block">
            CUSTOM FABRICATION DESK
          </span>
          <h3 className="font-display font-extrabold text-2xl md:text-4xl text-[var(--text-primary)] leading-tight tracking-tight uppercase">
            Have a custom design or project drawing?
          </h3>
          <p className="max-w-xl text-[var(--text-secondary)] text-sm mt-3 mx-auto leading-relaxed font-light">
            DIME Doha specializes in translating complex mechanical design drawings into highly durable road assets. Submit your customized specs or raw blueprint PDFs directly to our estimation team.
          </p>
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => {
                const contactSec = document.getElementById('contact');
                if (contactSec) {
                  const offset = 65;
                  window.scrollTo({
                    top: contactSec.getBoundingClientRect().top + window.scrollY - offset,
                    behavior: 'smooth'
                  });
                }
              }}
              className="px-7.5 py-4 rounded-2xl bg-black dark:bg-white text-white dark:text-black font-display text-xs uppercase tracking-widest font-extrabold hover:bg-brand-yellow hover:text-black dark:hover:bg-brand-yellow transition-all duration-300 cursor-pointer shadow-xl border border-[var(--border-color)]"
            >
              Contact Our Engineering Department
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
