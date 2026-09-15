import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MessageSquare, MapPin, Send, CheckCircle2, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { PHOTOGRAPHER_CONFIG } from '../../data/portfolioData';
import { playFocusClick, playShutterSound } from '../../utils/sound';

export default function Contact({ preselectedService, onOpenLegal }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'Editorial & Magazine Cover',
    budgetRange: '€5,000 — €10,000',
    preferredDate: '',
    message: '',
    consent: false,
    // Anti-spam honeypot
    website_hp: ''
  });

  const [formTime] = useState(Date.now());
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Update projectType if preselected from services
  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({ ...prev, projectType: preselectedService }));
    }
  }, [preselectedService]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const isFormValid =
    formData.name.trim().length >= 2 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
    formData.message.trim().length >= 10 &&
    formData.consent === true;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    // Spam honeypot check
    if (formData.website_hp) {
      console.warn('Bot submission prevented.');
      return;
    }

    // Timestamp check: human submissions usually take at least 3 seconds
    if (Date.now() - formTime < 2500) {
      setErrorMsg('Submission too rapid. Please try again.');
      return;
    }

    if (!isFormValid) {
      setErrorMsg('Please complete all required fields and accept the privacy consent.');
      return;
    }

    setSubmitting(true);
    playShutterSound();

    // Simulate reliable dispatch
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <section
      id="contact"
      className="relative py-28 sm:py-36 px-4 sm:px-8 md:px-12 bg-[#070708] border-t border-editorial-border/60"
    >
      <div className="max-w-7xl mx-auto">
        {/* Dramatic Editorial Headline */}
        <div className="border-b border-editorial-border pb-16 mb-16 sm:mb-20">
          <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter uppercase text-white leading-[0.9] max-w-5xl">
            LET'S MAKE SOMETHING <span className="text-accent-lime">WORTH REMEMBERING.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Studio Channels & Live Availability */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h3 className="font-mono text-xs uppercase tracking-widest text-neutral-400 mb-4">
                [ STUDIO LOCATIONS & DIRECT ACCESS ]
              </h3>
              <p className="font-sans text-neutral-300 leading-relaxed text-sm sm:text-base">
                Whether you are planning an international magazine cover, an autumn runway campaign, or an intimate private portrait monograph, Alex Kane accepts a limited number of commissions per calendar quarter.
              </p>
            </div>

            {/* Direct Contact Links */}
            <div className="space-y-4 font-mono text-xs">
              <a
                href={`mailto:${PHOTOGRAPHER_CONFIG.email}`}
                className="p-4 rounded border border-editorial-border bg-editorial-card flex items-center justify-between hover:border-accent-lime transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-accent-lime" />
                  <div>
                    <div className="text-[10px] text-neutral-400">DIRECT EMAIL</div>
                    <div className="text-white text-sm font-sans">{PHOTOGRAPHER_CONFIG.email}</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-accent-lime transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a
                href={PHOTOGRAPHER_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded border border-editorial-border bg-editorial-card flex items-center justify-between hover:border-accent-lime transition-all group"
              >
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-4 h-4 text-accent-lime" />
                  <div>
                    <div className="text-[10px] text-neutral-400">WHATSAPP STUDIO DESK</div>
                    <div className="text-white text-sm font-sans">{PHOTOGRAPHER_CONFIG.whatsapp}</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-accent-lime transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <div className="p-4 rounded border border-editorial-border bg-editorial-card flex items-start gap-3">
                <MapPin className="w-4 h-4 text-accent-lime shrink-0 mt-1" />
                <div>
                  <div className="text-[10px] text-neutral-400 mb-1">PRIMARY STUDIOS</div>
                  <div className="text-white text-xs leading-relaxed">
                    {PHOTOGRAPHER_CONFIG.studioLocation}
                  </div>
                  <div className="text-neutral-400 text-xs mt-1">
                    {PHOTOGRAPHER_CONFIG.secondaryStudio}
                  </div>
                </div>
              </div>
            </div>

            {/* Availability Status Card */}
            <div className="p-5 rounded border border-accent-lime/30 bg-accent-lime/[0.03] space-y-2">
              <div className="flex items-center gap-2 text-accent-lime font-mono text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-accent-lime animate-pulse" />
                <span>COMMISSION CALENDAR</span>
              </div>
              <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                Currently booking Q3 and Q4 2026 for Europe and Asia. For urgent editorial assignments with under 7 days lead time, please contact via direct telephone.
              </p>
            </div>
          </div>

          {/* Right Column: Professional Commission Enquiry Form */}
          <div className="lg:col-span-7">
            {submitted ? (
              <div className="p-8 sm:p-12 rounded-lg border border-accent-lime/40 bg-editorial-card text-center space-y-6 animate-fade-in">
                <div className="w-14 h-14 rounded-full bg-accent-lime/20 border border-accent-lime flex items-center justify-center mx-auto text-accent-lime">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <h3 className="font-display font-bold text-2xl sm:text-3xl uppercase text-white">
                  ENQUIRY DISPATCHED
                </h3>

                <p className="font-sans text-neutral-300 max-w-md mx-auto leading-relaxed text-sm sm:text-base">
                  Thank you, <span className="text-white font-semibold">{formData.name}</span>. Your brief has been securely routed to the studio director. We review all commissions within 24 business hours.
                </p>

                <div className="pt-4 font-mono text-xs text-neutral-400">
                  REF: AK-ENQ-{Date.now().toString().slice(-6)}
                </div>

                <button
                  onClick={() => {
                    playFocusClick();
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      projectType: 'Editorial & Magazine Cover',
                      budgetRange: '€5,000 — €10,000',
                      preferredDate: '',
                      message: '',
                      consent: false,
                      website_hp: ''
                    });
                  }}
                  className="px-6 py-2.5 rounded border border-editorial-border hover:border-white font-mono text-xs text-white uppercase tracking-wider transition-colors"
                >
                  SUBMIT ANOTHER ENQUIRY
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="p-6 sm:p-10 rounded-lg border border-editorial-border bg-editorial-card space-y-6 shadow-2xl"
                noValidate
              >
                {/* Anti-spam honeypot (hidden from human users) */}
                <input
                  type="text"
                  name="website_hp"
                  value={formData.website_hp}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="name"
                      className="block font-mono text-xs text-neutral-400 uppercase tracking-wider"
                    >
                      YOUR NAME / BRAND *
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Élise Laurent"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-black/40 border border-editorial-border rounded px-4 py-3 text-base sm:text-sm text-white placeholder-neutral-600 focus:border-accent-lime focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="email"
                      className="block font-mono text-xs text-neutral-400 uppercase tracking-wider"
                    >
                      EMAIL ADDRESS *
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      required
                      placeholder="e.g. elise@vogue.fr"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-black/40 border border-editorial-border rounded px-4 py-3 text-base sm:text-sm text-white placeholder-neutral-600 focus:border-accent-lime focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Phone (Optional) */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="phone"
                      className="block font-mono text-xs text-neutral-400 uppercase tracking-wider"
                    >
                      TELEPHONE (OPTIONAL)
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      placeholder="+33 6 ..."
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-black/40 border border-editorial-border rounded px-4 py-3 text-base sm:text-sm text-white placeholder-neutral-600 focus:border-accent-lime focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Preferred Date / Timeline */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="preferredDate"
                      className="block font-mono text-xs text-neutral-400 uppercase tracking-wider"
                    >
                      PREFERRED DATE / TIMELINE
                    </label>
                    <input
                      id="preferredDate"
                      type="text"
                      name="preferredDate"
                      placeholder="e.g. Late Autumn 2026 / Paris"
                      value={formData.preferredDate}
                      onChange={handleChange}
                      className="w-full bg-black/40 border border-editorial-border rounded px-4 py-3 text-base sm:text-sm text-white placeholder-neutral-600 focus:border-accent-lime focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Project Type */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="projectType"
                      className="block font-mono text-xs text-neutral-400 uppercase tracking-wider"
                    >
                      COMMISSION TYPE
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className="w-full bg-[#0d0d10] border border-editorial-border rounded px-4 py-3 text-base sm:text-sm text-white focus:border-accent-lime focus:outline-none transition-colors"
                    >
                      <option value="Editorial & Magazine Cover">Editorial & Magazine Cover</option>
                      <option value="Global Fashion Campaign">Global Fashion Campaign</option>
                      <option value="Intimate Portraiture & Artists">Intimate Portraiture & Artists</option>
                      <option value="Commercial & Architectural">Commercial & Architectural</option>
                      <option value="Limited Monograph Edition">Limited Monograph Edition</option>
                      <option value="Destination Documentary">Destination Documentary</option>
                    </select>
                  </div>

                  {/* Budget Range */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="budgetRange"
                      className="block font-mono text-xs text-neutral-400 uppercase tracking-wider"
                    >
                      ESTIMATED PRODUCTION BUDGET
                    </label>
                    <select
                      id="budgetRange"
                      name="budgetRange"
                      value={formData.budgetRange}
                      onChange={handleChange}
                      className="w-full bg-[#0d0d10] border border-editorial-border rounded px-4 py-3 text-base sm:text-sm text-white focus:border-accent-lime focus:outline-none transition-colors"
                    >
                      <option value="€3,000 — €5,000">€3,000 — €5,000</option>
                      <option value="€5,000 — €10,000">€5,000 — €10,000</option>
                      <option value="€10,000 — €25,000">€10,000 — €25,000</option>
                      <option value="€25,000+ (Global Campaign)">€25,000+ (Global Campaign)</option>
                      <option value="To Be Determined">To Be Determined</option>
                    </select>
                  </div>
                </div>

                {/* Project Brief Message */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="message"
                    className="block font-mono text-xs text-neutral-400 uppercase tracking-wider"
                  >
                    PROJECT BRIEF & CREATIVE SCOPE * (MIN 10 CHARACTERS)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    placeholder="Describe your vision, locations, deliverables, and any specific aesthetic references..."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-black/40 border border-editorial-border rounded px-4 py-3 text-base sm:text-sm text-white placeholder-neutral-600 focus:border-accent-lime focus:outline-none transition-colors"
                  />
                </div>

                {/* Explicit Consent Checkbox */}
                <div className="pt-2">
                  <label className="flex items-start gap-3 cursor-pointer group select-none">
                    <input
                      type="checkbox"
                      name="consent"
                      required
                      checked={formData.consent}
                      onChange={handleChange}
                      className="mt-1 w-4 h-4 rounded bg-black/50 border border-editorial-border text-accent-lime focus:ring-accent-lime accent-accent-lime cursor-pointer"
                    />
                    <span className="font-mono text-xs text-neutral-400 group-hover:text-neutral-300 leading-relaxed">
                      I agree to be contacted regarding my enquiry and accept the{' '}
                      <button
                        type="button"
                        onClick={() => onOpenLegal('privacy')}
                        className="text-white underline hover:text-accent-lime"
                      >
                        Privacy Policy
                      </button>
                      . *
                    </span>
                  </label>
                </div>

                {errorMsg && (
                  <div className="p-3 bg-red-950/40 border border-red-800/60 rounded text-red-300 text-xs font-mono">
                    {errorMsg}
                  </div>
                )}

                {/* Submit Action */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={!isFormValid || submitting}
                    className={`w-full py-4 rounded font-mono text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 ${
                      isFormValid && !submitting
                        ? 'bg-accent-lime text-black hover:bg-white cursor-pointer shadow-lg'
                        : 'bg-white/10 text-neutral-500 cursor-not-allowed border border-white/5'
                    }`}
                  >
                    {submitting ? (
                      <span>TRANSMITTING ENQUIRY...</span>
                    ) : (
                      <>
                        <span>TRANSMIT COMMISSION BRIEF</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                  <p className="mt-2 text-center font-mono text-[10px] text-neutral-500">
                    * Submit button unlocks once all required fields and consent are confirmed.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
