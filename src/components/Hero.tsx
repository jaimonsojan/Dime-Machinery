import { motion } from 'motion/react';
import { Settings, ChevronDown, ArrowRight, Award } from 'lucide-react';

interface HeroProps {
  onExploreClick: (sectionId: string) => void;
  theme?: 'dark' | 'light';
}

export default function Hero({ onExploreClick, theme }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[var(--bg-primary)] pt-16 transition-colors duration-300"
    >
      {/* Background Animated Tech Rings / Ambient Glows */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Soft radial background gradient mask */}
        <div className={`absolute inset-0 transition-all duration-500 ${
          theme === 'light'
            ? 'bg-[radial-gradient(circle_at_center,rgba(255,204,51,0.12)_0%,rgba(255,255,255,0)_70%)]'
            : 'bg-[radial-gradient(circle_at_center,rgba(255,204,51,0.06)_0%,rgba(0,0,0,0)_65%)]'
        }`} />

        {/* Ambient Blurred Circle Left */}
        <div className={`absolute top-1/4 -left-48 w-[500px] h-[500px] rounded-full blur-[120px] animate-pulse-slow transition-all duration-500 ${
          theme === 'light' ? 'bg-brand-yellow/12' : 'bg-brand-yellow/5'
        }`} />
        
        {/* Ambient Blurred Circle Right */}
        <div className={`absolute bottom-1/4 -right-48 w-[600px] h-[600px] rounded-full blur-[140px] animate-pulse-slow transition-all duration-500 ${
          theme === 'light' ? 'bg-brand-gold/12' : 'bg-brand-gold/5'
        }`} style={{ animationDelay: '3s' }} />

        {/* Elegant structural structural blueprint lines */}
        <div className={`absolute left-0 right-0 top-1/3 h-[1px] transition-all duration-500 ${
          theme === 'light' ? 'bg-gradient-to-r from-transparent via-brand-yellow/25 to-transparent' : 'bg-gradient-to-r from-transparent via-brand-yellow/10 to-transparent'
        }`} />
        <div className={`absolute top-0 bottom-0 left-1/4 w-[1px] transition-all duration-500 ${
          theme === 'light' ? 'bg-gradient-to-b from-transparent via-brand-yellow/20 to-transparent' : 'bg-gradient-to-b from-transparent via-brand-yellow/8 to-transparent'
        }`} />

        {/* Dynamic Vector Lines and Mechanical Gear (Right) */}
        <div className={`absolute right-[-10%] top-1/2 -translate-y-1/2 select-none transition-all duration-500 ${
          theme === 'light' ? 'opacity-[0.15] text-brand-gold' : 'opacity-[0.08] text-brand-yellow'
        }`}>
          <svg
            className="w-[600px] h-[600px] md:w-[800px] md:h-[800px] animate-spin-slow"
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.25"
          >
            {/* Massive Gear Outer Outline */}
            <circle cx="50" cy="50" r="45" strokeDasharray="3 3" />
            <circle cx="50" cy="50" r="38" />
            <circle cx="50" cy="50" r="28" strokeDasharray="8 4" />
            <circle cx="50" cy="50" r="15" />
            <path d="M 50 10 L 50 20 M 50 80 L 50 90 M 10 50 L 20 50 M 80 50 L 90 50 M 21.7 21.7 L 28.8 28.8 M 71.2 71.2 L 78.3 78.8 M 21.7 78.3 L 28.8 71.2 M 71.2 28.8 L 78.3 21.7" />
          </svg>
        </div>

        {/* Symmetrical Mechanical Gear (Left) */}
        <div className={`absolute left-[-8%] bottom-[12%] select-none transition-all duration-500 ${
          theme === 'light' ? 'opacity-[0.12] text-brand-gold' : 'opacity-[0.05] text-brand-yellow'
        }`}>
          <svg
            className="w-[300px] h-[300px] md:w-[450px] md:h-[450px]"
            style={{ animation: 'spin-slow 25s linear infinite reverse' }}
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.25"
          >
            <circle cx="50" cy="50" r="42" strokeDasharray="2 2" />
            <circle cx="50" cy="50" r="34" />
            <circle cx="50" cy="50" r="14" />
            <path d="M 50 15 L 50 25 M 50 75 L 50 85 M 15 50 L 25 50 M 75 50 L 85 50" />
          </svg>
        </div>

        {/* Grid pattern overlay */}
        <div 
          className={`absolute inset-0 transition-opacity duration-500 ${
            theme === 'light' ? 'opacity-[0.06]' : 'opacity-[0.02]'
          }`}
          style={{
            backgroundImage: `radial-gradient(circle, #ffcc33 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center flex flex-col items-center justify-center">
        {/* Quality Standard Chip Replacement - Premium Apple/Tesla Style */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={`inline-flex items-center gap-2.5 px-4.5 py-2 rounded-full backdrop-blur-md mb-8 transition-all duration-300 ${
            theme === 'light'
              ? 'bg-brand-yellow/12 border border-brand-yellow/30 hover:bg-brand-yellow/18 hover:border-brand-yellow/50'
              : 'bg-brand-yellow/10 border border-brand-yellow/20 hover:bg-brand-yellow/15 hover:border-brand-yellow/45'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-brand-yellow animate-pulse" />
          <span className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-brand-yellow font-bold">
            LEADER IN INDUSTRIAL ENGINEERING // QATAR
          </span>
        </motion.div>

        {/* Heavy Industry Title Slogans */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.1 }}
          className="font-display font-extrabold tracking-tight mb-6 leading-[1.1]"
        >
          <span className={`block text-4xl md:text-6xl lg:text-8xl transition-colors duration-300 ${theme === 'light' ? 'text-black' : 'text-white'}`}>
            DRIVING EFFICIENCY.
          </span>
          <span className="block text-4xl md:text-6xl lg:text-8xl text-brand-yellow italic mt-2">
            ENGINEERING EXCELLENCE.
          </span>
        </motion.h1>

        {/* Business Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-2xl text-[var(--text-secondary)] text-sm md:text-lg mb-12 font-sans font-light leading-relaxed"
        >
          DIME Machinery & Equipment is Qatar's premium one-stop solution provider for heavy industrial assets, custom transport equipment fabrication, and expert vehicle fleet maintenance.
        </motion.p>

        {/* Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <button
            onClick={() => onExploreClick('products')}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-brand-yellow text-black font-display font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 hover:bg-brand-gold shadow-lg shadow-brand-yellow/15 hover:shadow-brand-yellow/30 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
          >
            Explore Products
            <ArrowRight className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => onExploreClick('services')}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-[var(--text-primary)] border border-black/10 dark:border-white/10 font-display text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 hover:border-brand-yellow/30 transition-all duration-300 cursor-pointer"
          >
            Our Services
            <Settings className="w-4 h-4 animate-spin-slow" />
          </button>
        </motion.div>

        {/* Features Floating Bar with liquid glass elements */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="w-full max-w-4xl p-6 rounded-2xl liquid-glass grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 md:gap-12 text-left"
        >
          <div className="flex flex-col justify-center">
            <span className="font-display text-2xl md:text-3xl font-extrabold text-brand-yellow">17+</span>
            <span className="font-sans text-[10px] md:text-xs uppercase tracking-wider text-[var(--text-secondary)] mt-1 font-bold">
              Years of Industry Experience
            </span>
          </div>
          <div className="flex flex-col justify-center border-l border-[var(--border-color)] pl-6 md:pl-12">
            <span className="font-display text-2xl md:text-3xl font-extrabold text-brand-yellow">3,500</span>
            <span className="font-sans text-[10px] md:text-xs uppercase tracking-wider text-[var(--text-secondary)] mt-1 font-bold">
              SQ.M State-of-the-Art Facility
            </span>
          </div>
          <div className="col-span-2 md:col-span-1 flex flex-col justify-center border-t md:border-t-0 md:border-l border-[var(--border-color)] pt-4 md:pt-0 pl-0 md:pl-12">
            <span className="font-display text-2xl md:text-3xl font-extrabold text-brand-yellow">100%</span>
            <span className="font-sans text-[10px] md:text-xs uppercase tracking-wider text-[var(--text-secondary)] mt-1 font-bold">
              Custom-Engineered Products
            </span>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.button
          onClick={() => onExploreClick('about')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute bottom-8 flex flex-col items-center gap-1.5 text-[var(--text-secondary)] hover:text-brand-yellow transition-colors duration-300 cursor-pointer"
        >
          <span className="font-mono text-[9px] uppercase tracking-widest">Scroll to Discover</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </motion.button>
      </div>
    </section>
  );
}
