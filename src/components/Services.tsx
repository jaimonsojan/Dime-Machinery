import { motion } from 'motion/react';
import { SERVICE_ITEMS } from '../types';
import { Settings, Wrench, Shield, CheckCircle, Activity, Play } from 'lucide-react';

export default function Services() {
  
  // Custom helper to render distinct, high-end visual accents for each service block
  const getServiceAccents = (idx: number) => {
    const icons = [
      <Settings className="w-5 h-5 text-brand-yellow animate-spin-slow" />,
      <Activity className="w-5 h-5 text-brand-yellow" />,
      <Wrench className="w-5 h-5 text-brand-yellow" />,
      <Shield className="w-5 h-5 text-brand-yellow" />,
      <CheckCircle className="w-5 h-5 text-brand-yellow" />,
      <Play className="w-5 h-5 text-brand-yellow" />
    ];
    return icons[idx % icons.length];
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

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="services" className="py-24 bg-[var(--bg-primary)] relative overflow-hidden border-t border-[var(--border-color)] transition-colors duration-300">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none opacity-5 z-0">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-yellow/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-left mb-16"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-brand-yellow font-bold">
            03 // FIELD & WORKSHOP SUPPORT
          </span>
          <h2 className="font-display font-extrabold text-3xl md:text-5xl text-[var(--text-primary)] mt-2 tracking-tight">
            ENGINEERING SERVICES
          </h2>
          <p className="max-w-xl text-[var(--text-secondary)] text-sm md:text-base mt-4 leading-relaxed font-light">
            We provide custom-engineered maintenance, repair, refurbishment, and support services executed by certified technicians to maximize equipment lifespan.
          </p>
        </motion.div>

        {/* Custom Service Grid with Framer Motion Stagger */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {SERVICE_ITEMS.map((srv, idx) => (
            <motion.div 
              key={srv.id}
              variants={cardVariants}
              whileHover={{ y: -6, borderColor: 'rgba(255, 204, 51, 0.3)', backgroundColor: 'rgba(255, 204, 51, 0.01)' }}
              className="p-8 rounded-3xl bg-black/5 dark:bg-white/[0.01] border border-[var(--border-color)] transition-all duration-500 flex flex-col justify-between text-left group relative"
            >
              {/* Outer boundary hover lighting */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-brand-yellow/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div>
                {/* Header Accents & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 bg-black/10 dark:bg-white/5 rounded-2xl border border-[var(--border-color)] shadow-inner">
                    {getServiceAccents(idx)}
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[var(--text-secondary)] group-hover:text-brand-yellow transition-colors font-bold">
                    [ SERVICE {idx + 1} ]
                  </span>
                </div>

                {/* Service Titles */}
                <h3 className="font-display font-extrabold text-lg md:text-xl text-[var(--text-primary)] group-hover:text-brand-yellow transition-colors mb-1 font-semibold">
                  {srv.title}
                </h3>
                <span className="block font-mono text-[10px] uppercase tracking-wider text-brand-gold/80 mb-4 font-bold">
                  {srv.subtitle}
                </span>

                {/* Description */}
                <p className="text-[var(--text-secondary)] text-xs md:text-sm leading-relaxed mb-6 font-light">
                  {srv.description}
                </p>
              </div>

              {/* Service List items */}
              <div className="border-t border-[var(--border-color)] pt-6 mt-6">
                <ul className="flex flex-col gap-2">
                  {srv.items.map((bullet, bidx) => (
                    <li key={bidx} className="flex items-start gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-yellow mt-1.5 flex-shrink-0" />
                      <span className="text-[var(--text-primary)] text-xs font-medium">
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
