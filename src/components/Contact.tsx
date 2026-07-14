import { useState, useEffect, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, Check, Settings, MessageSquare, Briefcase, Copy, ExternalLink, AlertTriangle, ArrowLeft } from 'lucide-react';

// =======================================================================
// WEB3FORMS ACCESS KEY CONFIGURATION
// =======================================================================
// PASTE YOUR WEB3FORMS ACCESS KEY HERE:
// Get a free Access Key at: https://web3forms.com/
// Example: const WEB3FORMS_ACCESS_KEY = "1234abcd-12ab-34cd-56ef-1234567890ab";
const WEB3FORMS_ACCESS_KEY = "7e0db6ed-5b03-4423-9577-47803511b8c5" as string;

interface ContactProps {
  theme?: 'dark' | 'light';
}

export default function Contact({ theme }: ContactProps) {
  const [formData, setForm] = useState({ name: '', company: '', email: '', category: 'waste', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  
  // Web3Forms Setup
  const [web3Key, setWeb3Key] = useState<string>(() => {
    if (WEB3FORMS_ACCESS_KEY && WEB3FORMS_ACCESS_KEY !== "7e0db6ed-5b03-4423-9577-47803511b8c5" && WEB3FORMS_ACCESS_KEY.trim() !== "") {
      return WEB3FORMS_ACCESS_KEY.trim();
    }
    return ((import.meta as any).env?.VITE_WEB3FORMS_ACCESS_KEY as string) || localStorage.getItem('web3forms_key') || '';
  });
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  // Submission result tracking states
  const [lastSubmittedData, setLastSubmittedData] = useState<{
    subject: string;
    body: string;
    to: string;
  } | null>(null);
  const [submittedVia, setSubmittedVia] = useState<'api' | 'mailto' | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

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

  const handleKeySave = (key: string) => {
    const trimmed = key.trim();
    setWeb3Key(trimmed);
    localStorage.setItem('web3forms_key', trimmed);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setIsSending(true);
    setSubmitError(null);

    const mailSubject = `Specification Request / RFQ from ${formData.company || formData.name}`;
    const emailBodyText = 
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
      `${formData.name}`;

    setLastSubmittedData({
      subject: mailSubject,
      body: emailBodyText,
      to: 'info@dimeequipment.com'
    });

    // 1. If Web3Forms Access Key is provided, attempt direct API delivery
    if (web3Key && web3Key.trim() !== '') {
      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            access_key: web3Key.trim(),
            name: formData.name,
            email: formData.email,
            subject: mailSubject,
            message: emailBodyText,
            from_name: "Dime Machinery Portal"
          })
        });

        const data = await response.json();

        if (response.ok && data.success) {
          setIsSending(false);
          setSubmittedVia('api');
          setIsSubmitted(true);
          setForm({ name: '', company: '', email: '', category: 'waste', message: '' });
          return;
        } else {
          throw new Error(data.message || 'API request failed');
        }
      } catch (err: any) {
        console.error('Web3Forms delivery failed:', err);
        setSubmitError(`API Error: ${err?.message || 'Failed to deliver directly'}. Falling back to standard mail client...`);
        // Fall through to standard mailto client fallback so the user doesn't get blocked
      }
    }

    // 2. Fallback / No-key mailto client delivery
    setTimeout(() => {
      setIsSending(false);
      setSubmittedVia('mailto');
      setIsSubmitted(true);
      
      const mailtoUrl = `mailto:info@dimeequipment.com?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(emailBodyText)}`;
      window.location.href = mailtoUrl;
    }, 1000);
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

        {/* --- CONTACT & QUOTE FORM --- */}
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
              submittedVia === 'api' ? (
                <div className="py-12 text-center flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4 animate-bounce">
                    <Check className="w-8 h-8 stroke-[3]" />
                  </div>
                  <h4 className="font-display font-bold text-[var(--text-primary)] text-lg mb-1">
                    RFQ Transmitted Directly via API
                  </h4>
                  <p className="text-[var(--text-secondary)] text-xs max-w-sm leading-relaxed mb-6">
                    Thank you! Your specifications were delivered directly to our DIME review inbox using Web3Forms secure background delivery.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setSubmittedVia(null);
                    }}
                    className="px-5 py-2.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white font-mono text-[10px] uppercase tracking-widest font-bold cursor-pointer transition"
                  >
                    Submit Another RFQ
                  </button>
                </div>
              ) : (
                <div className="py-4 flex flex-col gap-5">
                  <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                    <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div className="flex flex-col gap-1">
                      <h5 className="font-mono text-[11px] font-bold uppercase tracking-widest leading-none">
                        Launch Device Email Client & Confirm
                      </h5>
                      <p className="text-[10px] leading-relaxed font-light text-neutral-300">
                        We have generated your custom specification file and initiated the mail client. If your email application did not launch automatically, or if you are using browser-based webmail, please copy the details below to email us manually.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 p-4 rounded-2xl bg-neutral-950/50 border border-neutral-800/80">
                    <div className="flex flex-col gap-1">
                      <span className="font-mono text-[8px] uppercase tracking-widest text-neutral-500 font-bold">Recipient Email</span>
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-[11px] text-brand-yellow font-semibold">{lastSubmittedData?.to}</span>
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(lastSubmittedData?.to || '');
                            setCopiedField('to');
                            setTimeout(() => setCopiedField(null), 2000);
                          }}
                          className="p-1 px-2.5 rounded bg-neutral-900 border border-neutral-800 text-[9px] uppercase tracking-wider font-mono text-neutral-400 hover:text-brand-yellow cursor-pointer flex items-center gap-1 hover:border-brand-yellow/30 transition"
                        >
                          <Copy className="w-3.5 h-3.5" /> {copiedField === 'to' ? 'Copied' : 'Copy'}
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1 border-t border-neutral-800/50 pt-2.5">
                      <span className="font-mono text-[8px] uppercase tracking-widest text-neutral-500 font-bold">Subject Line</span>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] text-white font-medium truncate max-w-[220px] sm:max-w-xs">{lastSubmittedData?.subject}</span>
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(lastSubmittedData?.subject || '');
                            setCopiedField('subject');
                            setTimeout(() => setCopiedField(null), 2000);
                          }}
                          className="p-1 px-2.5 rounded bg-neutral-900 border border-neutral-800 text-[9px] uppercase tracking-wider font-mono text-neutral-400 hover:text-brand-yellow cursor-pointer flex items-center gap-1 hover:border-brand-yellow/30 transition"
                        >
                          <Copy className="w-3.5 h-3.5" /> {copiedField === 'subject' ? 'Copied' : 'Copy'}
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1 border-t border-neutral-800/50 pt-2.5">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[8px] uppercase tracking-widest text-neutral-500 font-bold">Generated Message Body</span>
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(lastSubmittedData?.body || '');
                            setCopiedField('body');
                            setTimeout(() => setCopiedField(null), 2000);
                          }}
                          className="p-1 px-2.5 rounded bg-neutral-900 border border-neutral-800 text-[9px] uppercase tracking-wider font-mono text-neutral-400 hover:text-brand-yellow cursor-pointer flex items-center gap-1 hover:border-brand-yellow/30 transition"
                        >
                          <Copy className="w-3.5 h-3.5" /> {copiedField === 'body' ? 'Copied' : 'Copy'}
                        </button>
                      </div>
                      <pre className="text-[9.5px] p-2.5 rounded bg-black/60 border border-neutral-900 text-neutral-300 font-mono overflow-y-auto max-h-36 whitespace-pre-wrap leading-relaxed mt-1 scrollbar-hide">
                        {lastSubmittedData?.body}
                      </pre>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <button
                      type="button"
                      onClick={() => {
                        if (lastSubmittedData) {
                          const mailtoUrl = `mailto:${lastSubmittedData.to}?subject=${encodeURIComponent(lastSubmittedData.subject)}&body=${encodeURIComponent(lastSubmittedData.body)}`;
                          window.location.href = mailtoUrl;
                        }
                      }}
                      className="flex-1 py-3.5 rounded-xl bg-brand-yellow hover:bg-brand-gold text-black font-display font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer transition hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-brand-yellow/10"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> Re-trigger Mail App
                  </button>
                  
                    <button
                      type="button"
                      onClick={() => {
                        setIsSubmitted(false);
                        setSubmittedVia(null);
                      }}
                      className="py-3.5 px-6 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white font-mono text-[10px] uppercase tracking-widest font-bold cursor-pointer transition flex items-center justify-center gap-2"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" /> Back / Edit Form
                    </button>
                  </div>

                  <p className="text-[9.5px] text-neutral-500 font-light leading-relaxed mt-2 text-center border-t border-neutral-800/40 pt-3">
                    💡 <strong>Pro Tip:</strong> Want emails to send silently in the background without launching your device email application? Paste your Web3Forms Access Key into the <strong>WEB3FORMS_ACCESS_KEY</strong> constant inside the code!
                  </p>
                </div>
              )
            ) : (
              <div className="flex flex-col gap-4">
                {submitError && (
                  <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 font-mono text-[10px] uppercase tracking-wide leading-relaxed">
                    ⚠️ {submitError}
                  </div>
                )}

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
                      placeholder="e.g. Robert Chen"
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
                      placeholder="e.g. Engineering Solutions"
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
                    placeholder="e.g. robert.chen@engineering.com"
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
                  disabled={isSending}
                  className={`w-full py-4 mt-2 rounded-xl text-black font-display font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg transition duration-300 ${
                    isSending 
                      ? 'bg-neutral-700 text-neutral-300 cursor-not-allowed shadow-none' 
                      : 'bg-brand-yellow hover:bg-brand-gold hover:scale-[1.01] active:scale-[0.99] shadow-brand-yellow/10 cursor-pointer'
                  }`}
                >
                  {isSending ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-black mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Verifying Specs & Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" /> Send Specifications Request
                    </>
                  )}
                </button>
              </form>
              </div>
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
