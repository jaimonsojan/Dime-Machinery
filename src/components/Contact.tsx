import { useState, useEffect, FormEvent } from 'react';
import { motion } from 'motion/react';
import { COMPLETED_PROJECTS } from '../types';
import { Mail, Phone, MapPin, Send, Check, Settings, MessageSquare, Briefcase, ChevronLeft, ChevronRight } from 'lucide-react';

interface ContactProps {
  theme?: 'dark' | 'light';
}

export default function Contact({ theme }: ContactProps) {
  const [formData, setForm] = useState({ name: '', company: '', email: '', category: 'waste', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const handlePrefill = (e: Event) => {
      const customEvent = e as CustomEvent<{ category: string; message: string }>;
      if (customEvent.detail) {
        setForm(prev => ({
          ...prev,
          category: customEvent.detail.category || 'waste',
          message: customEvent.detail.message || ''
        }));
      }
    };
    window.addEventListener('dime-prefill-spec', handlePrefill);
    return () => window.removeEventListener('dime-prefill-spec', handlePrefill);
  }, []);

  useEffect(() => {
    const updateCount = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };
    updateCount();
    window.addEventListener('resize', updateCount);
    return () => window.removeEventListener('resize', updateCount);
  }, []);

  const maxSlide = Math.max(0, COMPLETED_PROJECTS.length - visibleCount);

  // If resized and current slide exceeds maxSlide, adjust it
  useEffect(() => {
    if (currentSlide > maxSlide) {
      setCurrentSlide(maxSlide);
    }
  }, [maxSlide, currentSlide]);

  const nextSlide = () => {
    setCurrentSlide(prev => Math.min(prev + 1, maxSlide));
  };

  const prevSlide = () => {
    setCurrentSlide(prev => Math.max(prev - 1, 0));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      const mailSubject = encodeURIComponent(`Specification Request / RFQ from ${formData.company || formData.name}`);
      const mailBody = encodeURIComponent(
        `Hi DIME Engineering Team,\n\n` +
        `I would like to request a specifications review / RFQ.\n\n` +
        `--- RFQ DETAILS ---\n` +
        `Name: ${formData.name}\n` +
        `Company: ${formData.company || 'Not Specified'}\n` +
        `Sender Email: ${formData.email}\n` +
        `Category: ${formData.category}\n\n` +
        `--- SCOPE DETAILS ---\n` +
        `${formData.message || 'No additional scope details provided.'}\n\n` +
        `Best regards,\n` +
        `${formData.name}`
      );
      
      setIsSubmitted(true);
      
      // Open dynamic mail client prefilled to info@dimeequipment.com
      window.location.href = `mailto:info@dimeequipment.com?subject=${mailSubject}&body=${mailBody}`;
      
      setTimeout(() => {
        setIsSubmitted(false);
        setForm({ name: '', company: '', email: '', category: 'waste', message: '' });
      }, 4000);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
    <section id="contact" className="bg-[var(--bg-secondary)] relative pt-24 pb-12 overflow-hidden border-t border-[var(--border-color)] transition-colors duration-300">
      {/* Background radial spotlight */}
      <div className="absolute inset-0 pointer-events-none opacity-5 z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-brand-yellow/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* --- PART 1: COMPLETED PROJECTS CAROUSEL (TRACK RECORD) --- */}
        <div id="projects" className="mb-24 text-left">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="flex-1"
            >
              <span className="font-mono text-xs uppercase tracking-widest text-brand-yellow font-bold">
                05 // QATAR EXECUTIONS
              </span>
              <h2 className="font-display font-extrabold text-3xl md:text-5xl text-[var(--text-primary)] mt-2 tracking-tight">
                COMPLETED PROJECTS
              </h2>
              <p className="max-w-xl text-[var(--text-secondary)] text-sm md:text-base mt-4 leading-relaxed font-light">
                Review a selection of custom builds engineered, fabricated, and handed over to major contractors and corporate fleets in Qatar.
              </p>
            </motion.div>

            {/* Slick Custom Navigation Controls */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 self-start md:self-end"
            >
              <button
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className={`p-3 rounded-full border transition-all duration-300 ${
                  currentSlide === 0
                    ? 'border-[var(--border-color)] text-[var(--text-secondary)]/30 cursor-not-allowed opacity-40'
                    : 'border-brand-yellow/30 text-brand-yellow hover:bg-brand-yellow hover:text-black hover:border-brand-yellow cursor-pointer shadow-md'
                }`}
                aria-label="Previous Project"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <button
                onClick={nextSlide}
                disabled={currentSlide === maxSlide}
                className={`p-3 rounded-full border transition-all duration-300 ${
                  currentSlide === maxSlide
                    ? 'border-[var(--border-color)] text-[var(--text-secondary)]/30 cursor-not-allowed opacity-40'
                    : 'border-brand-yellow/30 text-brand-yellow hover:bg-brand-yellow hover:text-black hover:border-brand-yellow cursor-pointer shadow-md'
                }`}
                aria-label="Next Project"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          </div>

          {/* Sliding horizontal carousel with 100% controlled slide alignment */}
          <div className="overflow-hidden mx-[-12px] pb-6">
            <motion.div 
              animate={{ x: `-${currentSlide * (100 / visibleCount)}%` }}
              transition={{ type: 'spring', damping: 25, stiffness: 120 }}
              className="flex"
            >
              {COMPLETED_PROJECTS.map((proj, idx) => (
                <div
                  key={idx}
                  className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-3 animate-none"
                >
                  <motion.div
                    whileHover={{ y: -6, borderColor: 'rgba(255, 204, 51, 0.45)', backgroundColor: 'var(--card-hover-bg)' }}
                    className="h-full p-6.5 rounded-2xl bg-black/5 dark:bg-white/[0.02] border border-[var(--border-color)] transition-all duration-300 flex flex-col justify-between text-left relative overflow-hidden"
                  >
                    <div>
                      {/* Clean Text Badge instead of an image */}
                      <div className="mb-4">
                        <span className="inline-block font-mono text-[9px] uppercase tracking-widest text-brand-yellow bg-brand-yellow/10 px-2 py-0.5 rounded border border-brand-yellow/20 font-bold">
                          Project {idx + 1} // Qatar
                        </span>
                      </div>

                      <h4 className="font-display font-extrabold text-[var(--text-primary)] text-base md:text-lg mb-2.5 leading-snug font-semibold">
                        {proj.customer}
                      </h4>
                      <p className="text-[var(--text-secondary)] text-xs md:text-sm leading-relaxed font-light">
                        {proj.scope}
                      </p>
                    </div>

                    <div className="mt-8 border-t border-[var(--border-color)] pt-4.5 flex items-center gap-2 text-[10px] font-mono text-[var(--text-secondary)] font-bold uppercase">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      Successfully Handed Over
                    </div>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Smooth Pagination Bullets Indicator */}
          {maxSlide > 0 && (
            <div className="flex justify-center items-center gap-2.5 mt-4">
              {Array.from({ length: maxSlide + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentSlide === index 
                      ? 'w-8 bg-brand-yellow' 
                      : 'w-2 bg-[var(--text-secondary)]/20 hover:bg-[var(--text-secondary)]/40 cursor-pointer'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* --- PART 2: CONTACT & QUOTE FORM --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch mb-20 text-left">
          
          {/* Left Side: Contact Information */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 flex flex-col justify-between"
          >
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-brand-yellow font-bold">
                06 // DIRECT CHANNELS
              </span>
              <h2 className="font-display font-extrabold text-3xl md:text-5xl text-[var(--text-primary)] mt-2 tracking-tight mb-6">
                GET IN TOUCH
              </h2>
              <p className="text-[var(--text-secondary)] text-sm md:text-base leading-relaxed mb-10 font-light">
                Request a custom engineering review, submit a RFQ, or inquire about emergency machinery repairs. Our Doha Industrial Area workshop operates 24/7 for critical logistics support.
              </p>

              {/* Specific info channels */}
              <div className="flex flex-col gap-6">
                {/* Physical address */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-black/10 dark:bg-white/5 rounded-xl border border-[var(--border-color)] text-brand-yellow flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block font-mono text-[9px] uppercase tracking-widest text-[var(--text-secondary)] font-bold">
                      Workshop Location
                    </span>
                    <span className="text-[var(--text-primary)] text-xs md:text-sm font-medium">
                      Gate #17, Street #577(43), Zone #57,<br />
                      Doha Industrial Area, Qatar
                    </span>
                  </div>
                </div>

                {/* Direct Telephone */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-black/10 dark:bg-white/5 rounded-xl border border-[var(--border-color)] text-brand-yellow flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block font-mono text-[9px] uppercase tracking-widest text-[var(--text-secondary)] font-bold">
                      Call Support
                    </span>
                    <a href="tel:+97455410118" className="block text-[var(--text-primary)] text-sm font-semibold hover:text-brand-yellow transition">
                      Mobile: +974 5541 0118
                    </a>
                    <a href="tel:+97444503254" className="block text-xs text-[var(--text-secondary)] mt-0.5 hover:text-brand-yellow transition">
                      Phone: +974 4450 3254
                    </a>
                  </div>
                </div>

                {/* Corporate Emails */}
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center p-3 bg-black/10 dark:bg-white/5 rounded-xl border border-[var(--border-color)] text-brand-yellow flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block font-mono text-[9px] uppercase tracking-widest text-[var(--text-secondary)] font-bold">
                      Email Correspondence
                    </span>
                    <a href="mailto:info@dimeequipment.com" className="block text-[var(--text-primary)] text-xs md:text-sm font-semibold hover:text-brand-yellow transition">
                      info@dimeequipment.com
                    </a>
                    <a href="mailto:mohan@dimedoha.com" className="block text-[var(--text-secondary)] text-xs mt-0.5 hover:text-brand-yellow transition">
                      mohan@dimedoha.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick response note */}
            <div className="mt-12 p-5 rounded-2xl bg-black/5 dark:bg-white/[0.01] border border-[var(--border-color)] flex items-center gap-3">
              <Settings className="w-5 h-5 text-brand-yellow animate-spin-slow flex-shrink-0" />
              <span className="font-mono text-[10px] text-[var(--text-secondary)] font-bold">
                ESTIMATED RFQ RESPONSE TIME IS UNDER 4 HOURS ON BUSINESS DAYS.
              </span>
            </div>
          </motion.div>

          {/* Right Side: High-End Request Quote Form inside liquid glass */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 p-8 md:p-10 rounded-3xl liquid-glass border border-brand-yellow/15 glass-glow-yellow"
          >
            <h3 className="font-display font-bold text-[var(--text-primary)] text-lg md:text-xl mb-2 flex items-center gap-2 font-semibold">
              <Briefcase className="w-5 h-5 text-brand-yellow" /> Custom RFQ & Inquiries
            </h3>
            <p className="text-[var(--text-secondary)] text-xs md:text-sm mb-6 font-light">
              Submit your specific equipment configurations or fleet service requests.
            </p>

            {isSubmitted ? (
              <div className="py-16 text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-brand-yellow/10 border border-brand-yellow/20 flex items-center justify-center text-brand-yellow mb-4 animate-bounce">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>
                <h4 className="font-display font-bold text-[var(--text-primary)] text-lg mb-1">
                  RFQ Received Successfully
                </h4>
                <p className="text-[var(--text-secondary)] text-xs max-w-sm leading-relaxed">
                  Thank you for connecting with DIME. Our engineering review team is currently processing your specifications.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Name / Company Side-by-side */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[9px] uppercase tracking-widest text-[var(--text-secondary)] mb-2 font-bold">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setForm({ ...formData, name: e.target.value })}
                      placeholder="e.g. Mohandasan Balakrishnan"
                      className="w-full px-4 py-3 rounded-xl bg-black/5 dark:bg-white/5 border border-[var(--border-color)] text-[var(--text-primary)] text-xs md:text-sm placeholder-[var(--text-secondary)]/50 focus:outline-none focus:border-brand-yellow transition"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[9px] uppercase tracking-widest text-[var(--text-secondary)] mb-2 font-bold">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setForm({ ...formData, company: e.target.value })}
                      placeholder="e.g. Elegancia Imar"
                      className="w-full px-4 py-3 rounded-xl bg-black/5 dark:bg-white/5 border border-[var(--border-color)] text-[var(--text-primary)] text-xs md:text-sm placeholder-[var(--text-secondary)]/50 focus:outline-none focus:border-brand-yellow transition"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label className="block font-mono text-[9px] uppercase tracking-widest text-[var(--text-secondary)] mb-2 font-bold">
                    Email Address *
                    </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setForm({ ...formData, email: e.target.value })}
                    placeholder="e.g. mohan@dimedoha.com"
                    className="w-full px-4 py-3 rounded-xl bg-black/5 dark:bg-white/5 border border-[var(--border-color)] text-[var(--text-primary)] text-xs md:text-sm placeholder-[var(--text-secondary)]/50 focus:outline-none focus:border-brand-yellow transition"
                  />
                </div>

                {/* Category Dropdown */}
                <div>
                  <label className="block font-mono text-[9px] uppercase tracking-widest text-[var(--text-secondary)] mb-2 font-bold">
                    Interested Product / Service Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setForm({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-black/5 dark:bg-white/5 border border-[var(--border-color)] text-[var(--text-primary)] text-xs md:text-sm focus:outline-none focus:border-brand-yellow transition dark:bg-brand-dark"
                  >
                    <option value="waste" className="dark:bg-brand-dark dark:text-white text-black">Waste Management Equipment</option>
                    <option value="transport" className="dark:bg-brand-dark dark:text-white text-black">Transport & Logistics Equipment</option>
                    <option value="liquid" className="dark:bg-brand-dark dark:text-white text-black">Liquid Handling & Utility Vehicles</option>
                    <option value="fuel" className="dark:bg-brand-dark dark:text-white text-black">Fuel Storage & Handling</option>
                    <option value="access" className="dark:bg-brand-dark dark:text-white text-black">Access & Loading Infrastructure</option>
                    <option value="services" className="dark:bg-brand-dark dark:text-white text-black">Engineering & Maintenance Services</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block font-mono text-[9px] uppercase tracking-widest text-[var(--text-secondary)] mb-2 font-bold">
                    Scope Details & Special Requirements
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setForm({ ...formData, message: e.target.value })}
                    placeholder="Provide specific dimensions, materials (e.g. Mild Steel vs SS316), or service descriptions here..."
                    className="w-full px-4 py-3 rounded-xl bg-black/5 dark:bg-white/5 border border-[var(--border-color)] text-[var(--text-primary)] text-xs md:text-sm placeholder-[var(--text-secondary)]/50 focus:outline-none focus:border-brand-yellow transition resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-4 mt-2 rounded-xl bg-brand-yellow hover:bg-brand-gold text-black font-display font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-brand-yellow/10 transition cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" /> Send Specifications Request
                </button>
              </form>
            )}
          </motion.div>

        </div>

        {/* --- PART 3: LEGAL FOOTER --- */}
        <div className="border-t border-[var(--border-color)] pt-12 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          
          {/* Footer branding */}
          <div className="flex items-center gap-3">
            <img 
              src={theme === 'light' ? 'https://dimedoha.com/DMEC/DMEC_LOGO_LIGHT.png' : 'https://dimedoha.com/DMEC/DMEC_LOGO_DARK.png'} 
              alt="DIME Logo" 
              className="h-8 w-auto object-contain transition-all duration-300"
              referrerPolicy="no-referrer"
            />
            <div>
              <span className="block font-display font-extrabold text-sm tracking-tight text-[var(--text-primary)]">
                DIME MACHINERY & EQUIPMENT CO.
              </span>
              <span className="block font-mono text-[8px] uppercase tracking-widest text-[var(--text-secondary)] font-bold">
                DRIVING EFFICIENCY. ENGINEERING EXCELLENCE.
              </span>
            </div>
          </div>

          {/* Copyrights */}
          <div className="text-[var(--text-secondary)] font-mono text-[9px] uppercase tracking-widest font-bold">
            © {new Date().getFullYear()} DIME EQUIPMENT. ALL RIGHTS RESERVED.<br />
            Gate #17, Street #577(43), Zone #57, Doha Industrial Area, Qatar
          </div>

        </div>

      </div>
    </section>
  );
}
