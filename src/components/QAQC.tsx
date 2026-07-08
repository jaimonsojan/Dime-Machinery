import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { QAQC_STEPS } from '../types';
import { Check, Clipboard, ShieldCheck } from 'lucide-react';

export default function QAQC() {
  const [selectedStep, setSelectedStep] = useState('01');

  const activeStepItem = QAQC_STEPS.find(s => s.step === selectedStep) || QAQC_STEPS[0];

  return (
    <section id="quality" className="py-24 bg-[var(--bg-primary)] relative overflow-hidden border-t border-[var(--border-color)] transition-colors duration-300">
      {/* Background design line */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05] z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-dashed border-brand-yellow rounded-full" />
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
            04 // ZERO FAILURE STANDARDS
          </span>
          <h2 className="font-display font-extrabold text-3xl md:text-5xl text-[var(--text-primary)] mt-2 tracking-tight">
            QA/QC PROCEDURE
          </h2>
          <p className="max-w-xl text-[var(--text-secondary)] text-sm md:text-base mt-4 leading-relaxed font-light">
            Every custom-manufactured unit goes through eight precise inspections from initial raw material receipt to final functional validation before client mobilization.
          </p>
        </motion.div>

        {/* Interactive Timeline Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Side: Step Bubbles Grid */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3 w-full"
          >
            {QAQC_STEPS.map((stepItem) => {
              const isSelected = stepItem.step === selectedStep;
              return (
                <button
                  key={stepItem.step}
                  onClick={() => setSelectedStep(stepItem.step)}
                  className={`p-5 rounded-2xl text-left border transition-all duration-300 relative overflow-hidden group cursor-pointer ${
                    isSelected
                      ? 'bg-brand-yellow text-black border-brand-yellow shadow-lg shadow-brand-yellow/10 font-semibold'
                      : 'bg-black/5 dark:bg-white/[0.01] text-[var(--text-secondary)] border-[var(--border-color)] hover:bg-black/10 dark:hover:bg-white/[0.02] hover:text-[var(--text-primary)] hover:border-brand-yellow/30'
                  }`}
                >
                  <span className={`absolute top-2 right-4 font-display font-black text-3xl select-none ${
                    isSelected ? 'text-black/10' : 'text-black/[0.04] dark:text-white/[0.02] group-hover:text-brand-yellow/10'
                  }`}>
                    {stepItem.step}
                  </span>
                  
                  <span className={`block font-mono text-[9px] uppercase tracking-widest ${
                    isSelected ? 'text-black/60' : 'text-[var(--text-secondary)]'
                  }`}>
                    Inspection Stage
                  </span>
                  <span className="block font-display text-sm uppercase tracking-wider font-bold mt-2 pr-6 leading-tight">
                    {stepItem.title}
                  </span>
                </button>
              );
            })}
          </motion.div>

          {/* Right Side: Step Checklist Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 w-full"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedStep}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="p-8 md:p-10 rounded-3xl liquid-glass text-left border border-brand-yellow/10 glass-glow-yellow relative min-h-[400px] flex flex-col justify-between"
              >
                <div className="absolute top-8 right-8 text-brand-yellow/5">
                  <ShieldCheck className="w-16 h-16 stroke-[1]" />
                </div>

                <div>
                  {/* Step indicator */}
                  <div className="flex items-center gap-3 border-b border-[var(--border-color)] pb-6 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-brand-yellow/10 border border-brand-yellow/20 flex items-center justify-center font-display font-bold text-brand-yellow text-lg">
                      {activeStepItem.step}
                    </div>
                    <div>
                      <span className="block font-mono text-[9px] uppercase tracking-widest text-[var(--text-secondary)] font-bold">
                        QUALITY CONTROL PROTOCOL
                      </span>
                      <h3 className="font-display text-[var(--text-primary)] text-lg md:text-xl font-semibold">
                        {activeStepItem.title}
                      </h3>
                    </div>
                  </div>

                  {/* Checklist details */}
                  <div className="flex flex-col gap-4">
                    {activeStepItem.details.map((detail, idx) => (
                      <div 
                        key={idx}
                        className="flex items-start gap-4 p-4 rounded-xl bg-black/5 dark:bg-white/[0.01] border border-[var(--border-color)] hover:border-brand-yellow/25 transition-colors"
                      >
                        <div className="w-6 h-6 rounded-lg bg-brand-yellow/15 flex items-center justify-center text-brand-yellow flex-shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                        <span className="text-[var(--text-primary)] text-xs md:text-sm font-light leading-relaxed">
                          {detail}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* QA/QC Note */}
                <div className="mt-8 pt-6 border-t border-[var(--border-color)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[var(--text-secondary)] font-bold">
                    100% compliant with ISO 9001 quality guidelines
                  </span>
                  <div className="inline-flex items-center gap-1.5 text-xs text-brand-yellow bg-brand-yellow/5 px-3 py-1 rounded-md border border-brand-yellow/15 font-bold">
                    <Clipboard className="w-3.5 h-3.5" /> Checked & Verified
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
