import React, { useState } from 'react';
import { WaitlistEntry } from '../types';
import { motion } from 'motion/react';
import { RevealHeading, RevealText, StaggerContainer, StaggerItem } from './TextTransitions';
import { 
  Users, 
  Calendar, 
  CheckCircle2, 
  Utensils, 
  Sparkles, 
  Clock, 
  MapPin, 
  Mail, 
  Phone, 
  Download, 
  Copy, 
  Check, 
  HelpCircle 
} from 'lucide-react';

interface SupperClubWaitlistProps {
  onAddEntry: (entry: WaitlistEntry) => void;
  existingEntriesCount: number;
}

const DIETARY_OPTIONS = [
  'Omnivore (Fish, Seafood & Meats)',
  'Pescatarian (River Fish, Seafood & Veg)',
  'Vegetarian (Dairy & Regional Veg)',
  'Vegan (Plant-forward)',
  'Gluten-Free',
  'Allium-Free (Traditional Sattvic / No Onion-Garlic)',
];

export const SupperClubWaitlist: React.FC<SupperClubWaitlistProps> = ({ onAddEntry, existingEntriesCount }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    partySize: 2,
    dietaryPreferences: ['Omnivore (Fish, Seafood & Meats)'],
    notes: '',
  });

  const [submittedEntry, setSubmittedEntry] = useState<WaitlistEntry | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const handleDietaryToggle = (option: string) => {
    setFormData((prev) => {
      const exists = prev.dietaryPreferences.includes(option);
      if (exists) {
        // keep at least 1 option or allow empty
        return {
          ...prev,
          dietaryPreferences: prev.dietaryPreferences.filter((item) => item !== option),
        };
      } else {
        return {
          ...prev,
          dietaryPreferences: [...prev.dietaryPreferences, option],
        };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const newEntry: WaitlistEntry = {
        id: `PCH-WL-${Date.now().toString().slice(-5)}`,
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || undefined,
        city: formData.city.trim() || 'Undisclosed',
        partySize: Number(formData.partySize),
        dietaryPreferences: formData.dietaryPreferences.length > 0 ? formData.dietaryPreferences : ['Flexible'],
        notes: formData.notes.trim() || undefined,
        submittedAt: new Date().toISOString(),
        status: 'pending',
      };

      onAddEntry(newEntry);
      setSubmittedEntry(newEntry);
      setIsSubmitting(false);
    }, 450);
  };

  const handleCopyCode = () => {
    if (!submittedEntry) return;
    navigator.clipboard.writeText(submittedEntry.id);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section id="supper-club" className="py-20 sm:py-28 bg-[#FAFAF9] border-b border-[#E4E4E7] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl text-left mb-16">
          <RevealHeading>
            <span className="block font-sans text-[10px] tracking-[0.25em] uppercase font-bold text-[#853724] mb-2">
              INTIMATE DINING EXPERIENCE
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-[#18181B] tracking-tight">
              Supper Club <span className="italic text-[#853724]">Waitlist</span>
            </h2>
          </RevealHeading>
          
          <RevealText delay={0.15}>
            <p className="mt-3 text-base sm:text-lg text-[#52525B] font-light leading-relaxed">
              Ten to fourteen seats. One communal table. Six seasonal courses crafted around memory and Bengal terroir.
            </p>
          </RevealText>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: What to Expect & Rituals */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <RevealText delay={0.1}>
              <div className="bg-white border border-[#E4E4E7] p-6 sm:p-8 space-y-6 shadow-2xs">
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#18181B]">
                  How the Supper Club Works
                </h3>

                <ul className="space-y-4 text-xs sm:text-sm text-[#52525B] font-sans">
                  <li className="flex items-start space-x-3">
                    <span className="w-6 h-6 border border-[#E4E4E7] bg-[#FAFAF9] text-[#18181B] flex items-center justify-center font-serif text-xs shrink-0 mt-0.5 font-bold">
                      1
                    </span>
                    <div>
                      <strong className="font-medium text-[#18181B] block">Exclusive Waitlist Drops</strong>
                      <span className="text-[#52525B] font-light">Dates and seasonal themes are released to the waitlist community in private batches before public announcements.</span>
                    </div>
                  </li>

                  <li className="flex items-start space-x-3">
                    <span className="w-6 h-6 border border-[#E4E4E7] bg-[#FAFAF9] text-[#18181B] flex items-center justify-center font-serif text-xs shrink-0 mt-0.5 font-bold">
                      2
                    </span>
                    <div>
                      <strong className="font-medium text-[#18181B] block">Communal Table & Stories</strong>
                      <span className="text-[#52525B] font-light">Guests dine together at a single long table. Enakshi personally introduces each dish, sharing the kitchen diary notes and heirloom techniques.</span>
                    </div>
                  </li>

                  <li className="flex items-start space-x-3">
                    <span className="w-6 h-6 border border-[#E4E4E7] bg-[#FAFAF9] text-[#18181B] flex items-center justify-center font-serif text-xs shrink-0 mt-0.5 font-bold">
                      3
                    </span>
                    <div>
                      <strong className="font-medium text-[#18181B] block">Ever-Shifting Seasonal Menus</strong>
                      <span className="text-[#52525B] font-light">Menus evolve continuously around Bengal’s traditional agricultural cycles and the best local harvest.</span>
                    </div>
                  </li>
                </ul>

                <div className="pt-4 border-t border-[#E4E4E7] flex items-center justify-between text-xs text-[#52525B] font-sans">
                  <span className="flex items-center space-x-1.5">
                    <Users className="w-4 h-4 text-[#853724]" />
                    <span className="uppercase tracking-wider text-[10px]">Max 14 Guests per seating</span>
                  </span>
                  <span className="flex items-center space-x-1.5">
                    <Clock className="w-4 h-4 text-[#853724]" />
                    <span className="uppercase tracking-wider text-[10px]">~3 Hours Experience</span>
                  </span>
                </div>
              </div>
            </RevealText>

            {/* Quote testimonial box */}
            <RevealText delay={0.2}>
              <div className="border-l-2 border-[#853724] pl-5 py-2">
                <p className="font-serif italic text-lg sm:text-xl text-[#18181B] leading-snug">
                  “It felt less like a ticketed dinner and more like being welcomed into an ancestral dining room where every course unlocked a story.”
                </p>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#853724] mt-2 block font-sans font-bold">
                  — Past Supper Club Guest
                </span>
              </div>
            </RevealText>

            {/* Waitlist stats badge */}
            <RevealText delay={0.25}>
              <div className="p-4 bg-white border border-[#E4E4E7] flex items-center justify-between text-xs text-[#52525B] font-sans">
                <span className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-[#853724] rounded-full animate-pulse" />
                  <span>Waitlist active for upcoming seasonal drops</span>
                </span>
                <span className="font-semibold uppercase tracking-wider text-[11px] text-[#18181B]">
                  {existingEntriesCount > 0 ? `${existingEntriesCount} on list` : 'Early access open'}
                </span>
              </div>
            </RevealText>
          </div>

          {/* Right Column: Waitlist Submission Form / Confirmation */}
          <div className="lg:col-span-7">
            {submittedEntry ? (
              /* Success Confirmation Card */
              <div className="bg-white border border-[#E4E4E7] p-8 sm:p-10 text-left space-y-6">
                <div className="flex items-center space-x-3 text-[#18181B]">
                  <CheckCircle2 className="w-8 h-8 text-[#853724]" />
                  <div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#18181B]">
                      You’re on the Priority List
                    </h3>
                    <p className="text-xs text-[#52525B] font-sans">
                      Welcome to the Pichhutaaney inner circle, {submittedEntry.fullName}.
                    </p>
                  </div>
                </div>

                <div className="bg-[#FAFAF9] border border-[#E4E4E7] p-5 space-y-3 font-sans text-xs">
                  <div className="flex justify-between items-center border-b border-[#E4E4E7] pb-2">
                    <span className="text-[#853724] uppercase font-bold tracking-wider text-[10px]">Reference Code</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono font-bold text-[#18181B] bg-white px-2 py-0.5 border border-[#E4E4E7]">
                        {submittedEntry.id}
                      </span>
                      <button
                        onClick={handleCopyCode}
                        className="text-[#52525B] hover:text-[#18181B] p-1"
                        title="Copy code"
                      >
                        {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[#52525B]">
                    <div>
                      <span className="text-[#A1A1AA] block text-[10px] uppercase tracking-wider">Email</span>
                      <span className="font-medium text-[#18181B] truncate block">{submittedEntry.email}</span>
                    </div>
                    <div>
                      <span className="text-[#A1A1AA] block text-[10px] uppercase tracking-wider">Party Size</span>
                      <span className="font-medium text-[#18181B]">{submittedEntry.partySize} {submittedEntry.partySize === 1 ? 'Guest' : 'Guests'}</span>
                    </div>
                    <div>
                      <span className="text-[#A1A1AA] block text-[10px] uppercase tracking-wider">City</span>
                      <span className="font-medium text-[#18181B]">{submittedEntry.city}</span>
                    </div>
                    <div>
                      <span className="text-[#A1A1AA] block text-[10px] uppercase tracking-wider">Dietary</span>
                      <span className="font-medium text-[#18181B]">{submittedEntry.dietaryPreferences.join(', ')}</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-[#52525B] font-sans leading-relaxed font-light">
                  As soon as the next seasonal dates are finalized, Enakshi will send a private booking link directly to <strong>{submittedEntry.email}</strong> before open release.
                </p>

                <div className="pt-2 flex flex-wrap gap-3">
                  <button
                    onClick={() => {
                      setSubmittedEntry(null);
                      setFormData({
                        fullName: '',
                        email: '',
                        phone: '',
                        city: '',
                        partySize: 2,
                        dietaryPreferences: ['Omnivore (Fish, Seafood & Meats)'],
                        notes: '',
                      });
                    }}
                    className="px-6 py-3 text-[11px] font-sans font-semibold uppercase tracking-widest bg-[#853724] text-white hover:bg-[#18181B] transition-colors"
                  >
                    Add Another Party
                  </button>

                  <a
                    href="#story-of-pichhutaaney"
                    className="px-6 py-3 text-[11px] font-sans uppercase tracking-widest text-[#18181B] border border-[#E4E4E7] hover:border-[#18181B] transition-colors"
                  >
                    Explore Philosophy
                  </a>
                </div>
              </div>
            ) : (
              /* The Waitlist Form */
              <form
                onSubmit={handleSubmit}
                id="supper-club-waitlist-form"
                className="bg-white border border-[#E4E4E7] p-6 sm:p-8 text-left space-y-5"
              >
                <div className="border-b border-[#E4E4E7] pb-4">
                  <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#18181B]">
                    Join the Priority Waitlist
                  </h3>
                  <p className="text-xs text-[#52525B] font-sans mt-1 font-light">
                    First notice on upcoming intimate seatings, seasonal menus, and private guest invitations.
                  </p>
                </div>

                {/* Name and Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-sans font-semibold uppercase tracking-widest text-[#18181B] mb-1.5">
                      Full Name <span className="text-[#853724]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sreya Mukherjee"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#E4E4E7] text-sm text-[#18181B] placeholder:text-[#A1A1AA] focus:outline-none focus:border-[#18181B] transition-colors font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-sans font-semibold uppercase tracking-widest text-[#18181B] mb-1.5">
                      Email Address <span className="text-[#853724]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#E4E4E7] text-sm text-[#18181B] placeholder:text-[#A1A1AA] focus:outline-none focus:border-[#18181B] transition-colors font-sans"
                    />
                  </div>
                </div>

                {/* Phone & City */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-sans font-semibold uppercase tracking-widest text-[#18181B] mb-1.5">
                      Phone / WhatsApp <span className="text-[#A1A1AA] font-normal">(Optional)</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#E4E4E7] text-sm text-[#18181B] placeholder:text-[#A1A1AA] focus:outline-none focus:border-[#18181B] transition-colors font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-sans font-semibold uppercase tracking-widest text-[#18181B] mb-1.5">
                      City / Primary Area
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. San Francisco Bay Area / London"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#E4E4E7] text-sm text-[#18181B] placeholder:text-[#A1A1AA] focus:outline-none focus:border-[#18181B] transition-colors font-sans"
                    />
                  </div>
                </div>

                {/* Party Size */}
                <div>
                  <label className="block text-[10px] font-sans font-semibold uppercase tracking-widest text-[#18181B] mb-1.5">
                    Typical Party Size
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {[1, 2, 3, 4, 6].map((size) => (
                      <button
                        type="button"
                        key={size}
                        onClick={() => setFormData({ ...formData, partySize: size })}
                        className={`py-2 text-xs font-sans font-medium border transition-all ${
                          formData.partySize === size
                            ? 'bg-[#18181B] text-white border-[#18181B]'
                            : 'bg-white text-[#52525B] border-[#E4E4E7] hover:border-[#18181B]'
                        }`}
                      >
                        {size === 6 ? '6+ Guests' : `${size} ${size === 1 ? 'Guest' : 'Guests'}`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dietary Profile */}
                <div>
                  <label className="block text-[10px] font-sans font-semibold uppercase tracking-widest text-[#18181B] mb-1.5">
                    Dietary Framework & Preferences
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {DIETARY_OPTIONS.map((option) => {
                      const isChecked = formData.dietaryPreferences.includes(option);
                      return (
                        <label
                          key={option}
                          className={`flex items-center space-x-2.5 p-2.5 border text-xs cursor-pointer transition-colors font-sans ${
                            isChecked
                              ? 'bg-[#853724]/10 border-[#853724] text-[#853724] font-medium'
                              : 'bg-white border-[#E4E4E7] text-[#52525B] hover:border-[#18181B]'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleDietaryToggle(option)}
                            className="text-[#853724] focus:ring-[#853724] border-[#E4E4E7]"
                          />
                          <span className="truncate">{option}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Curiosity / Notes */}
                <div>
                  <label className="block text-[10px] font-sans font-semibold uppercase tracking-widest text-[#18181B] mb-1.5">
                    What excites you about regional Indian food? <span className="font-normal text-[#A1A1AA]">(Optional)</span>
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Tell Enakshi about a culinary memory, a dish you've wanted to taste, or how you discovered Pichhutaaney..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E4E4E7] text-sm text-[#18181B] placeholder:text-[#A1A1AA] focus:outline-none focus:border-[#18181B] transition-colors font-sans"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    id="submit-waitlist-btn"
                    className="w-full py-3.5 bg-[#853724] text-white hover:bg-[#18181B] font-sans text-xs font-semibold uppercase tracking-widest transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? 'Securing your spot...' : 'Join Supper Club Waitlist'}
                  </button>
                  <p className="text-center text-[10px] font-sans text-[#A1A1AA] mt-2 uppercase tracking-wider">
                    We never spam. You will only receive personal notifications for upcoming seatings and private drops.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
