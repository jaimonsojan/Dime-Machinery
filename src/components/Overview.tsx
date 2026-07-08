import { motion } from 'motion/react';
import { CORE_VALUES, CAPACITY_STATS } from '../types';
import { Shield, Eye, Flame, Compass, ChevronRight } from 'lucide-react';

interface OverviewProps {
  onLearnMoreClick: (sectionId: string) => void;
}

export default function Overview({ onLearnMoreClick }: OverviewProps) {
  // Map index to different icons to create intentional visual rhythms
  const getCoreValueIcon = (idx: number) => {
    switch (idx % 4) {
      case 0: return <Shield className="w-5 h-5 text-brand-yellow" />;
      case 1: return <Eye className="w-5 h-5 text-brand-yellow" />;
      case 2: return <Flame className="w-5 h-5 text-brand-yellow" />;
      default: return <Compass className="w-5 h-5 text-brand-yellow" />;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="about" className="py-24 bg-[var(--bg-primary)] relative overflow-hidden border-t border-[var(--border-color)] transition-colors duration-300">
      {/* Subtle Vector Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-5">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 border border-brand-yellow rounded-full animate-pulse-slow" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4"
        >
          <div className="text-left">
            <span className="font-mono text-xs uppercase tracking-widest text-brand-yellow font-bold">
              01 // QATAR INDUSTRIAL LEADER
            </span>
            <h2 className="font-display font-extrabold text-3xl md:text-5xl text-[var(--text-primary)] mt-2 tracking-tight">
              CORPORATE PROFILE
            </h2>
          </div>
          <p className="max-w-xl text-left text-[var(--text-secondary)] text-sm md:text-base leading-relaxed font-light">
            Over 17 years of engineering insight and strategic execution driving reliable, heavy equipment assets and custom-built fabrication solutions across Qatar.
          </p>
        </motion.div>

        {/* Bento Grid - About & Mission/Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          {/* Main About block */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2 p-8 rounded-3xl liquid-glass flex flex-col justify-between text-left"
          >
            <div>
              <h3 className="font-display font-extrabold text-xl md:text-2xl text-[var(--text-primary)] mb-4 font-semibold">
                About DIME Machinery & Equipment
              </h3>
              <p className="text-[var(--text-secondary)] text-sm md:text-base leading-relaxed mb-6 font-light">
                Focused on plant, machinery, and transport asset services, DIME combines high-tier maintenance operations with state-of-the-art metal engineering, structure custom builds, and heavy transport manufacturing.
              </p>
              <p className="text-[var(--text-secondary)] text-sm md:text-base leading-relaxed font-light">
                Operating strictly in line with ISO 9001 (Quality), ISO 14001 (Environment), and ISO 45001 (Occupational Health & Safety) mandates, we execute every single custom build under rigorous QA/QC procedures. Our clients span crucial economic pillars: Qatar's oil & gas sectors, commercial logistics, environmental works, and municipal infrastructure.
              </p>
            </div>
            <div className="mt-8 border-t border-[var(--border-color)] pt-6 flex items-center justify-between">
              <span className="text-xs font-mono text-[var(--text-secondary)] uppercase tracking-widest">
                Doha Industrial Area • Qatar
              </span>
              <button
                onClick={() => onLearnMoreClick('contact')}
                className="inline-flex items-center gap-1.5 text-xs font-display font-bold uppercase tracking-wider text-brand-yellow hover:text-[var(--text-primary)] transition-colors cursor-pointer"
              >
                Connect With Us <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>

          {/* Vision & Mission blocks in a column */}
          <div className="flex flex-col gap-6 text-left">
            {/* Vision Panel */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="p-8 rounded-3xl liquid-glass flex-1 border-l-2 border-brand-yellow relative overflow-hidden"
            >
              <span className="absolute top-4 right-6 text-brand-yellow/10 font-display font-black text-6xl select-none">V</span>
              <h3 className="font-display font-bold text-xs uppercase tracking-widest text-brand-yellow mb-3">
                Our Vision
              </h3>
              <p className="text-[var(--text-primary)] text-sm leading-relaxed font-light">
                To be the leading one-stop solution provider for Plant, Machinery & Transport Equipment in Qatar, delivering premium custom transport equipment and maintenance services built to endure the harshest field conditions.
              </p>
            </motion.div>

            {/* Mission Panel */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="p-8 rounded-3xl liquid-glass flex-1 border-l-2 border-brand-gold relative overflow-hidden"
            >
              <span className="absolute top-4 right-6 text-brand-gold/10 font-display font-black text-6xl select-none">M</span>
              <h3 className="font-display font-bold text-xs uppercase tracking-widest text-brand-gold mb-3">
                Our Mission
              </h3>
              <p className="text-[var(--text-primary)] text-sm leading-relaxed font-light">
                Delivering customer-centric excellence through continuous technological innovation, strict adherence to global safety standards, and sustainable workforce development to minimize down-time and create real client value.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Capacity Counters Block */}
        <div className="mb-20">
          <motion.h3 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-display font-bold text-xs uppercase tracking-widest text-brand-yellow text-left mb-8"
          >
            // ANNUAL FABRICATION & SERVICING CAPACITY
          </motion.h3>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
          >
            {CAPACITY_STATS.map((stat, idx) => (
              <motion.div 
                key={idx} 
                variants={itemVariants}
                whileHover={{ y: -5, borderColor: 'rgba(255, 204, 51, 0.4)', backgroundColor: 'rgba(255, 204, 51, 0.02)' }}
                className="p-6 rounded-2xl bg-black/5 dark:bg-white/[0.02] border border-[var(--border-color)] transition-all duration-300 flex flex-col justify-between text-left"
              >
                <div>
                  <span className="block font-display font-extrabold text-3xl md:text-4xl text-brand-yellow">
                    {stat.value}
                  </span>
                  <span className="block font-mono text-[9px] uppercase tracking-widest text-[var(--text-secondary)] mt-1 font-bold">
                    {stat.subtext}
                  </span>
                </div>
                <p className="text-[var(--text-primary)] text-xs mt-6 leading-relaxed font-medium">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Core Values Section */}
        <div>
          <motion.h3 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-display font-bold text-xs uppercase tracking-widest text-brand-yellow text-left mb-8"
          >
            // OUR CORE VALUES
          </motion.h3>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {CORE_VALUES.map((val, idx) => (
              <motion.div 
                key={idx} 
                variants={itemVariants}
                whileHover={{ y: -4, borderColor: 'rgba(255, 204, 51, 0.2)', backgroundColor: 'rgba(255, 204, 51, 0.01)' }}
                className="p-6 rounded-2xl bg-black/5 dark:bg-white/[0.01] border border-[var(--border-color)] transition-all duration-300 flex items-start gap-4 text-left"
              >
                <div className="p-3 bg-black/10 dark:bg-white/5 rounded-xl border border-[var(--border-color)] shadow-inner">
                  {getCoreValueIcon(idx)}
                </div>
                <div>
                  <h4 className="font-display font-bold text-[var(--text-primary)] text-base mb-2 font-semibold">
                    {val.title}
                  </h4>
                  <p className="text-[var(--text-secondary)] text-xs md:text-sm leading-relaxed font-light">
                    {val.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
