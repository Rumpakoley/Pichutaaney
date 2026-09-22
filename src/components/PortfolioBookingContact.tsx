import React, { useState } from 'react';
import { WaitlistEntry, PrivateEventInquiry } from '../types';
import { Mail, Phone, Instagram, Send, CheckCircle2, Check, ExternalLink, Sparkles, Utensils } from 'lucide-react';
import { motion } from 'motion/react';

interface PortfolioBookingContactProps {
  onAddWaitlist: (entry: WaitlistEntry) => void;
  onAddInquiry: (inquiry: PrivateEventInquiry) => void;
  recentEntries: (WaitlistEntry | PrivateEventInquiry)[];
}

export const PortfolioBookingContact: React.FC<PortfolioBookingContactProps> = ({
  onAddWaitlist,
  onAddInquiry,
  recentEntries,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experienceType: 'supper_club',
    guestCount: 2,
    cityOrVenue: '',
    preferredDate: '',
    dietary: 'Omnivore (Fish, Seafood & Veg)',
    notes: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      if (formData.experienceType === 'supper_club') {
        const newWaitlist: WaitlistEntry = {
          id: `PCH-WL-${Date.now().toString().slice(-5)}`,
          fullName: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim() || undefined,
          city: formData.cityOrVenue.trim() || 'Undisclosed',
          partySize: Number(formData.guestCount),
          dietaryPreferences: [formData.dietary],
          notes: formData.notes.trim() || undefined,
          submittedAt: new Date().toISOString(),
          status: 'pending',
        };
        onAddWaitlist(newWaitlist);
      } else {
        const newInquiry: PrivateEventInquiry = {
          id: `PCH-EVT-${Date.now().toString().slice(-5)}`,
          fullName: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim() || 'Flexible',
          eventType: formData.experienceType as any,
          guestCount: Number(formData.guestCount),
          preferredDate: formData.preferredDate.trim() || 'Flexible Timeline',
          locationOrVenue: formData.cityOrVenue.trim() || 'Private Residence',
          dietaryRestrictions: formData.dietary,
          storytellingNotes: formData.notes.trim() || 'Custom curated table',
          submittedAt: new Date().toISOString(),
          status: 'new',
        };
        onAddInquiry(newInquiry);
      }

      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 450);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      experienceType: 'supper_club',
      guestCount: 2,
      cityOrVenue: '',
      preferredDate: '',
      dietary: 'Omnivore (Fish, Seafood & Veg)',
      notes: '',
    });
    setIsSubmitted(false);
  };

  return (
    <section id="booking-contact" className="max-w-7xl mx-auto px-6 md:px-12 py-16 border-t-2 border-black/15 text-left bg-[#FAF6F0]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Column: Direct Desk & Contacts */}
        <div className="lg:col-span-5 border-2 border-black bg-[#ffd177] p-8 flex flex-col justify-between space-y-8 rounded-3xl shadow-md text-black">
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="font-mono text-xs text-black/70 uppercase tracking-widest font-black block">
                Direct Host Desk
              </span>
              <h3 className="font-marcellus text-3xl sm:text-4xl font-normal text-black tracking-tight">
                Hotline & contact
              </h3>
            </div>

            <p className="font-sans text-xs sm:text-sm text-black/75 leading-relaxed font-light">
              Connect directly for supper club invitations, private event bookings, culinary collaborations, or food writing inquiries.
            </p>

            {/* 3 Contact Cards */}
            <div className="space-y-3 pt-2">
              {/* Email Card */}
              <div className="flex items-center gap-4 bg-[#FAF6F0] border-2 border-black p-4 rounded-2xl shadow-sm group">
                <div className="w-10 h-10 bg-black text-[#ffd177] flex items-center justify-center shrink-0 rounded-xl group-hover:bg-[#ffd177] group-hover:text-black transition-colors border border-black">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-black/60 block font-bold">
                    Email address
                  </span>
                  <button
                    onClick={() => handleCopy('pichhutaaney@gmail.com', 'email')}
                    className="font-marcellus text-sm font-normal text-black hover:text-[#8B3A26] hover:underline text-left block cursor-pointer"
                  >
                    pichhutaaney@gmail.com
                  </button>
                  <span className="font-mono text-[9px] text-[#8B3A26] block mt-0.5 font-bold">
                    {copiedType === 'email' ? '✓ Copied Address' : 'Click to copy email'}
                  </span>
                </div>
              </div>

                {/* Instagram Card */}
              <div className="flex items-center gap-4 bg-[#FAF6F0] border-2 border-black p-4 rounded-2xl shadow-sm group">
                <div className="w-10 h-10 bg-black text-[#ffd177] flex items-center justify-center shrink-0 rounded-xl group-hover:bg-[#ffd177] group-hover:text-black transition-colors border border-black">
                  <Instagram className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-black/60 block font-bold">
                    Instagram journal
                  </span>
                  <a
                    href="https://www.instagram.com/pichhutaaney?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-marcellus text-sm font-normal text-black hover:text-[#8B3A26] hover:underline flex items-center gap-1 block"
                  >
                    <span>@pichhutaaney</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <span className="font-mono text-[9px] text-black/60 block mt-0.5">
                    Follow kitchen updates & reels
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Transmitted ledger badge */}
          {recentEntries.length > 0 && (
            <div className="space-y-2 border-t-2 border-black/15 pt-4 text-[10px] font-mono">
              <span className="uppercase tracking-widest text-black/70 font-bold block">
                LIVE TRANSMISSIONS ({recentEntries.length})
              </span>
              <div className="space-y-1.5 max-h-28 overflow-y-auto pr-1">
                {recentEntries.slice(0, 3).map((item) => (
                  <div key={item.id} className="flex items-center justify-between bg-[#FAF6F0] px-3 py-1.5 rounded-lg border border-black/20">
                    <span className="font-bold truncate">{item.fullName}</span>
                    <span className="bg-[#0e0e0e] text-[#ffd177] px-2 py-0.5 rounded text-[8.5px] uppercase font-bold">
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Interactive Booking Form */}
        <div className="lg:col-span-7 border-2 border-black bg-[#FAF6F0] p-8 rounded-3xl shadow-md text-black">
          {isSubmitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-5">
              <div className="w-16 h-16 bg-[#ffd177] border-2 border-black rounded-full flex items-center justify-center text-black shadow-md">
                <CheckCircle2 className="w-8 h-8 text-black" />
              </div>

              <div className="space-y-2">
                <h4 className="font-marcellus text-3xl font-normal text-black">
                  Request Transmitted!
                </h4>
                <p className="text-xs sm:text-sm text-black/70 max-w-sm mx-auto leading-relaxed font-light">
                  Enakshi will review your request parameters and get back to you at <strong>{formData.email}</strong> shortly with seating batch details.
                </p>
              </div>

              <button
                onClick={handleReset}
                className="px-6 py-3 bg-[#0e0e0e] hover:bg-[#ffd177] hover:text-black text-white font-mono text-xs uppercase tracking-widest font-black transition-all rounded-full cursor-pointer shadow-md"
              >
                Submit another request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1 border-b border-black/10 pb-3">
                <span className="font-mono text-xs text-[#8C867D] uppercase tracking-wider block font-bold">
                  Interactive Dining Deck
                </span>
                <h4 className="font-marcellus text-2xl font-normal text-black">
                  Consolidated Table Reservation
                </h4>
                <p className="text-xs text-black/60 font-light">
                  Submit specifications to directly reserve a seat or book a private bespoke gathering.
                </p>
              </div>

              {/* Name and Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-mono text-[9.5px] uppercase text-black/70 block font-bold">
                    Your Full Name <span className="text-[#8B3A26]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rohan Sengupta"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white border-2 border-black/20 rounded-full px-4 py-2.5 text-xs text-black focus:outline-none focus:border-black placeholder:text-black/35 font-sans"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-[9.5px] uppercase text-black/70 block font-bold">
                    Contact Email <span className="text-[#8B3A26]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="you@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white border-2 border-black/20 rounded-full px-4 py-2.5 text-xs text-black focus:outline-none focus:border-black placeholder:text-black/35 font-sans"
                  />
                </div>
              </div>

              {/* Requested Experience & Party Size */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-mono text-[9.5px] uppercase text-black/70 block font-bold">
                    Requested Experience
                  </label>
                  <select
                    value={formData.experienceType}
                    onChange={(e) => setFormData({ ...formData, experienceType: e.target.value })}
                    className="w-full bg-white border-2 border-black/20 rounded-full px-4 py-2.5 text-xs text-black focus:outline-none focus:border-black font-sans"
                  >
                    <option value="supper_club">Supper Club (Priority Waitlist)</option>
                    <option value="intimate_dinner">Private In-Home Dining (6–16 Guests)</option>
                    <option value="celebration">Milestone Feast (Up to 35 Guests)</option>
                    <option value="workshop">Interactive Cooking Circle</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-[9.5px] uppercase text-black/70 block font-bold">
                    Party Size
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={50}
                    value={formData.guestCount}
                    onChange={(e) => setFormData({ ...formData, guestCount: Number(e.target.value) })}
                    className="w-full bg-white border-2 border-black/20 rounded-full px-4 py-2.5 text-xs text-black focus:outline-none focus:border-black font-sans"
                  />
                </div>
              </div>

              {/* Phone & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-mono text-[9.5px] uppercase text-black/70 block font-bold">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white border-2 border-black/20 rounded-full px-4 py-2.5 text-xs text-black focus:outline-none focus:border-black placeholder:text-black/35 font-sans"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-[9.5px] uppercase text-black/70 block font-bold">
                    City / Preferred Timing
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. San Francisco / Nov 2026"
                    value={formData.cityOrVenue}
                    onChange={(e) => setFormData({ ...formData, cityOrVenue: e.target.value })}
                    className="w-full bg-white border-2 border-black/20 rounded-full px-4 py-2.5 text-xs text-black focus:outline-none focus:border-black placeholder:text-black/35 font-sans"
                  />
                </div>
              </div>

              {/* Dietary preference */}
              <div className="space-y-1">
                <label className="font-mono text-[9.5px] uppercase text-black/70 block font-bold">
                  Dietary Profile
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['Omnivore', 'Pescatarian', 'Vegetarian', 'Vegan / Plant'].map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setFormData({ ...formData, dietary: item })}
                      className={`py-2 px-2 text-[11px] font-sans border-2 rounded-full transition-all cursor-pointer truncate ${
                        formData.dietary.includes(item.split(' ')[0])
                          ? 'bg-[#0e0e0e] text-white border-black font-semibold'
                          : 'bg-white text-black/70 border-black/20 hover:border-black'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-1">
                <label className="font-mono text-[9.5px] uppercase text-black/70 block font-bold">
                  Storytelling Notes & Vision <span className="font-normal text-black/50">(Optional)</span>
                </label>
                <textarea
                  rows={2}
                  placeholder="Tell us about the occasion, cherished memories, or any questions..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-white border-2 border-black/20 rounded-2xl p-3 text-xs text-black focus:outline-none focus:border-black placeholder:text-black/35 font-sans"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-[#0e0e0e] hover:bg-[#ffd177] hover:text-black text-white font-mono text-xs uppercase tracking-widest font-black transition-all rounded-full cursor-pointer shadow-md disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'Transmitting Request...' : 'Transmitting Reservation Request'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
