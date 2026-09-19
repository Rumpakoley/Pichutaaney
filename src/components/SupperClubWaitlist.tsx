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
    <section id="supper-club" className="py-20 sm:py-28 bg-[#F4ECE1] border-b border-[#E4D7C8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl text-left mb-16">
          <RevealHeading>
            <span className="block font-sans text-[10px] tracking-[0.25em] uppercase font-bold text-[#8B3A26] mb-2">
              INTIMATE DINING EXPERIENCE
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-[#241E1A] tracking-tight">
              Supper Club <span className="italic text-[#8B3A26]">Waitlist</span>
            </h2>
          </RevealHeading>
          
          <RevealText delay={0.15}>
            <p className="mt-3 text-base sm:text-lg text-[#6E6258] font-light leading-relaxed">
              Ten to fourteen seats. One communal table. Six seasonal courses crafted around memory and Bengal terroir.
            </p>
          </RevealText>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Essential Details */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="bg-[#FAF6F0] border border-[#DECFC0] p-6 sm:p-8 space-y-6 shadow-2xs">
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#241E1A]">
                The Supper Club Experience
              </h3>

              <ul className="space-y-4 text-xs sm:text-sm text-[#6E6258] font-sans">
                <li className="flex items-start space-x-3">
                  <span className="w-6 h-6 border border-[#DECFC0] bg-[#F4ECE1] text-[#8B3A26] flex items-center justify-center font-serif text-xs shrink-0 mt-0.5 font-bold">
                    01
                  </span>
                  <div>
                    <strong className="font-medium text-[#241E1A] block">Private Batch Releases</strong>
                    <span className="text-[#6E6258] font-light">Dates and menus are shared with waitlist members before public announcements.</span>
                  </div>
                </li>

                <li className="flex items-start space-x-3">
                  <span className="w-6 h-6 border border-[#DECFC0] bg-[#F4ECE1] text-[#8B3A26] flex items-center justify-center font-serif text-xs shrink-0 mt-0.5 font-bold">
                    02
                  </span>
                  <div>
                    <strong className="font-medium text-[#241E1A] block">One Communal Table</strong>
                    <span className="text-[#6E6258] font-light">Guests dine together intimately, sharing stories and courses cooked from instinct.</span>
                  </div>
                </li>

                <li className="flex items-start space-x-3">
                  <span className="w-6 h-6 border border-[#DECFC0] bg-[#F4ECE1] text-[#8B3A26] flex items-center justify-center font-serif text-xs shrink-0 mt-0.5 font-bold">
                    03
                  </span>
                  <div>
                    <strong className="font-medium text-[#241E1A] block">Seasonal & Travel-Shaped</strong>
                    <span className="text-[#6E6258] font-light">Menus evolve with local harvests and memories of places lived in.</span>
                  </div>
                </li>
              </ul>

              <div className="pt-4 border-t border-[#DECFC0] flex items-center justify-between text-xs text-[#6E6258] font-sans">
                <span className="flex items-center space-x-1.5">
                  <Users className="w-4 h-4 text-[#8B3A26]" />
                  <span className="uppercase tracking-wider text-[10px]">10–14 Guests</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <Clock className="w-4 h-4 text-[#8B3A26]" />
                  <span className="uppercase tracking-wider text-[10px]">~3 Hours Dining</span>
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Waitlist Submission Form / Confirmation */}
          <div className="lg:col-span-7">
            {submittedEntry ? (
              /* Success Confirmation Card */
              <div className="bg-[#FAF6F0] border border-[#DECFC0] p-8 sm:p-10 text-left space-y-6">
                <div className="flex items-center space-x-3 text-[#241E1A]">
                  <CheckCircle2 className="w-8 h-8 text-[#8B3A26]" />
                  <div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#241E1A]">
                      You’re on the Priority List
                    </h3>
                    <p className="text-xs text-[#6E6258] font-sans">
                      Welcome to the Pichhutaaney inner circle, {submittedEntry.fullName}.
                    </p>
                  </div>
                </div>

                <div className="bg-[#F4ECE1] border border-[#DECFC0] p-5 space-y-3 font-sans text-xs">
                  <div className="flex justify-between items-center border-b border-[#DECFC0] pb-2">
                    <span className="text-[#8B3A26] uppercase font-bold tracking-wider text-[10px]">Reference Code</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono font-bold text-[#241E1A] bg-[#FAF6F0] px-2 py-0.5 border border-[#DECFC0]">
                        {submittedEntry.id}
                      </span>
                      <button
                        onClick={handleCopyCode}
                        className="text-[#6E6258] hover:text-[#241E1A] p-1 cursor-pointer"
                        title="Copy code"
                      >
                        {copiedCode ? <Check className="w-3.5 h-3.5 text-[#8B3A26]" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[#6E6258]">
                    <div>
                      <span className="text-[#9E8E81] block text-[10px] uppercase tracking-wider">Email</span>
                      <span className="font-medium text-[#241E1A] truncate block">{submittedEntry.email}</span>
                    </div>
                    <div>
                      <span className="text-[#9E8E81] block text-[10px] uppercase tracking-wider">Party Size</span>
                      <span className="font-medium text-[#241E1A]">{submittedEntry.partySize} {submittedEntry.partySize === 1 ? 'Guest' : 'Guests'}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
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
                    className="px-6 py-3 text-[11px] font-sans font-semibold uppercase tracking-widest bg-[#8B3A26] text-[#FAF6F0] hover:bg-[#1F1A16] transition-colors cursor-pointer"
                  >
                    Add Another Party
                  </button>
                </div>
              </div>
            ) : (
              /* Clean Minimal Waitlist Form */
              <form
                onSubmit={handleSubmit}
                id="supper-club-waitlist-form"
                className="bg-[#FAF6F0] border border-[#DECFC0] p-6 sm:p-8 text-left space-y-5"
              >
                <div className="border-b border-[#DECFC0] pb-4">
                  <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#241E1A]">
                    Join the Priority Waitlist
                  </h3>
                  <p className="text-xs text-[#6E6258] font-sans mt-1 font-light">
                    Receive first notice on upcoming seatings, seasonal menus, and private invitations.
                  </p>
                </div>

                {/* Name and Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-sans font-semibold uppercase tracking-widest text-[#241E1A] mb-1.5">
                      Full Name <span className="text-[#8B3A26]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FAF6F0] border border-[#DECFC0] text-sm text-[#241E1A] placeholder:text-[#9E8E81] focus:outline-none focus:border-[#8B3A26] transition-colors font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-sans font-semibold uppercase tracking-widest text-[#241E1A] mb-1.5">
                      Email Address <span className="text-[#8B3A26]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FAF6F0] border border-[#DECFC0] text-sm text-[#241E1A] placeholder:text-[#9E8E81] focus:outline-none focus:border-[#8B3A26] transition-colors font-sans"
                    />
                  </div>
                </div>

                {/* Phone & City */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-sans font-semibold uppercase tracking-widest text-[#241E1A] mb-1.5">
                      Phone / WhatsApp <span className="text-[#9E8E81] font-normal">(Optional)</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FAF6F0] border border-[#DECFC0] text-sm text-[#241E1A] placeholder:text-[#9E8E81] focus:outline-none focus:border-[#8B3A26] transition-colors font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-sans font-semibold uppercase tracking-widest text-[#241E1A] mb-1.5">
                      City / Area
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. San Francisco / London"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FAF6F0] border border-[#DECFC0] text-sm text-[#241E1A] placeholder:text-[#9E8E81] focus:outline-none focus:border-[#8B3A26] transition-colors font-sans"
                    />
                  </div>
                </div>

                {/* Party Size */}
                <div>
                  <label className="block text-[10px] font-sans font-semibold uppercase tracking-widest text-[#241E1A] mb-1.5">
                    Party Size
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[1, 2, 4, 6].map((size) => (
                      <button
                        type="button"
                        key={size}
                        onClick={() => setFormData({ ...formData, partySize: size })}
                        className={`py-2 text-xs font-sans font-medium border transition-all cursor-pointer ${
                          formData.partySize === size
                            ? 'bg-[#1F1A16] text-[#FAF6F0] border-[#1F1A16]'
                            : 'bg-[#FAF6F0] text-[#6E6258] border-[#DECFC0] hover:border-[#8B3A26]'
                        }`}
                      >
                        {size === 6 ? '6+ Guests' : `${size} ${size === 1 ? 'Guest' : 'Guests'}`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dietary Profile Pills */}
                <div>
                  <label className="block text-[10px] font-sans font-semibold uppercase tracking-widest text-[#241E1A] mb-1.5">
                    Dietary Preference
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {DIETARY_OPTIONS.map((option) => {
                      const isChecked = formData.dietaryPreferences.includes(option);
                      return (
                        <button
                          type="button"
                          key={option}
                          onClick={() => handleDietaryToggle(option)}
                          className={`px-3 py-1.5 border text-xs cursor-pointer transition-colors font-sans ${
                            isChecked
                              ? 'bg-[#8B3A26] text-[#FAF6F0] border-[#8B3A26] font-medium'
                              : 'bg-[#FAF6F0] border-[#DECFC0] text-[#6E6258] hover:border-[#8B3A26]'
                          }`}
                        >
                          {option.split(' (')[0]}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    id="submit-waitlist-btn"
                    className="w-full py-3.5 bg-[#8B3A26] text-[#FAF6F0] hover:bg-[#1F1A16] font-sans text-xs font-semibold uppercase tracking-widest transition-colors disabled:opacity-50 cursor-pointer shadow-xs"
                  >
                    {isSubmitting ? 'Securing your spot...' : 'Join Supper Club Waitlist'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
