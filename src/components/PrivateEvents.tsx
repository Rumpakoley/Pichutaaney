import React, { useState } from 'react';
import { PrivateEventInquiry } from '../types';
import { Wine, Sparkles, CheckCircle2, Calendar, MapPin, User, Mail, Phone, Clock, FileText } from 'lucide-react';
import { motion } from 'motion/react';
import { RevealHeading, RevealText } from './TextTransitions';

interface PrivateEventsProps {
  onAddInquiry: (inquiry: PrivateEventInquiry) => void;
}

export const PrivateEvents: React.FC<PrivateEventsProps> = ({ onAddInquiry }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    eventType: 'intimate_dinner' as PrivateEventInquiry['eventType'],
    guestCount: 10,
    preferredDate: '',
    locationOrVenue: '',
    budgetOrFormat: '',
    dietaryRestrictions: '',
    storytellingNotes: '',
  });

  const [submittedInquiry, setSubmittedInquiry] = useState<PrivateEventInquiry | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const newInquiry: PrivateEventInquiry = {
        id: `PCH-EVT-${Date.now().toString().slice(-5)}`,
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        eventType: formData.eventType,
        guestCount: Number(formData.guestCount),
        preferredDate: formData.preferredDate || 'Flexible / To be discussed',
        locationOrVenue: formData.locationOrVenue.trim() || 'Private Residence',
        budgetOrFormat: formData.budgetOrFormat.trim() || undefined,
        dietaryRestrictions: formData.dietaryRestrictions.trim() || 'Standard / Flexible',
        storytellingNotes: formData.storytellingNotes.trim() || 'Custom regional curation',
        submittedAt: new Date().toISOString(),
        status: 'new',
      };

      onAddInquiry(newInquiry);
      setSubmittedInquiry(newInquiry);
      setIsSubmitting(false);
    }, 450);
  };

  return (
    <section id="private-events" className="py-20 sm:py-28 bg-[#E9E4DD] border-b border-[#DED8CF] overflow-hidden text-[#2D2D2A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl text-left mb-16">
          <RevealHeading>
            <span className="inline-block px-3 py-1 rounded-full text-[11px] font-sans font-medium tracking-[0.2em] uppercase bg-white/80 border border-[#DED8CF] text-[#2D2D2A] mb-4">
              BESPOKE GATHERINGS
            </span>
            <h2 className="font-marcellus text-4xl sm:text-5xl md:text-6xl font-normal text-[#171716] tracking-tight">
              Private Dining & <span className="font-pt-serif italic">Events</span>
            </h2>
          </RevealHeading>

          <RevealText delay={0.15}>
            <p className="mt-3 text-base sm:text-lg text-[#55524E] font-sans font-light leading-relaxed">
              Invite Enakshi to host an intimate, story-driven regional culinary experience for your celebration or gathering.
            </p>
          </RevealText>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Event Archetypes */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="space-y-4">
              <h3 className="font-marcellus text-2xl sm:text-3xl font-normal text-[#171716]">
                Tailored Gatherings
              </h3>
              <p className="text-sm text-[#55524E] leading-relaxed font-sans font-light">
                From custom multi-course tasting menus to tablescapes and stories, Enakshi hosts bespoke dining experiences for private celebrations.
              </p>
            </div>

            {/* Event Formats */}
            <div className="space-y-3">
              <div className="p-5 bg-white rounded-2xl border border-[#DED8CF] flex items-center justify-between shadow-xs">
                <div>
                  <h4 className="font-marcellus text-lg font-normal text-[#171716]">Intimate In-Home Dinners</h4>
                  <p className="text-xs text-[#55524E] font-sans font-light">Unhurried course-by-course presentation in your home.</p>
                </div>
                <span className="text-[10px] uppercase tracking-wider text-[#171716] bg-[#E9E4DD] px-3 py-1 rounded-full font-medium shrink-0 ml-3">6–16 Guests</span>
              </div>

              <div className="p-5 bg-white rounded-2xl border border-[#DED8CF] flex items-center justify-between shadow-xs">
                <div>
                  <h4 className="font-marcellus text-lg font-normal text-[#171716]">Milestones & Celebrations</h4>
                  <p className="text-xs text-[#55524E] font-sans font-light">Curated feasts celebrating cherished family recipes.</p>
                </div>
                <span className="text-[10px] uppercase tracking-wider text-[#171716] bg-[#E9E4DD] px-3 py-1 rounded-full font-medium shrink-0 ml-3">Up to 35</span>
              </div>

              <div className="p-5 bg-[#171716] text-white rounded-2xl border border-[#171716] flex items-center justify-between shadow-sm">
                <div>
                  <h4 className="font-marcellus text-lg font-normal text-white">Interactive Cooking Circles</h4>
                  <p className="text-xs text-white/80 font-sans font-light">Sensory cooking, spice tempering, and shared feast.</p>
                </div>
                <span className="text-[10px] uppercase tracking-wider text-[#EED485] bg-white/10 px-3 py-1 rounded-full font-medium shrink-0 ml-3">Small Groups</span>
              </div>
            </div>

            {/* Atmosphere photo */}
            <div className="relative overflow-hidden rounded-2xl border border-[#DED8CF] bg-white p-2.5 shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80"
                alt="Intimate candlelit dining table ready for a private supper"
                referrerPolicy="no-referrer"
                className="w-full h-44 object-cover rounded-xl filter contrast-[1.02]"
              />
            </div>
          </div>

          {/* Right Column: Private Event Inquiry Form */}
          <div className="lg:col-span-7">
            {submittedInquiry ? (
              /* Success card */
              <div className="bg-white rounded-3xl border border-[#DED8CF] p-8 sm:p-10 text-left space-y-6 shadow-md">
                <div className="flex items-center space-x-3 text-[#171716]">
                  <CheckCircle2 className="w-8 h-8 text-[#2D2D2A]" />
                  <div>
                    <h3 className="font-marcellus text-2xl sm:text-3xl font-normal text-[#171716]">
                      Inquiry Received
                    </h3>
                    <p className="text-xs text-[#55524E] font-sans">
                      Thank you, {submittedInquiry.fullName}. Enakshi will review your gathering details.
                    </p>
                  </div>
                </div>

                <div className="bg-[#E9E4DD] rounded-2xl border border-[#DED8CF] p-6 space-y-3 font-sans text-xs">
                  <div className="flex justify-between items-center border-b border-[#DED8CF] pb-3">
                    <span className="text-[#171716] uppercase font-bold tracking-wider text-[10px]">Reference</span>
                    <span className="font-mono font-bold text-[#171716] bg-white px-3 py-1 rounded-full border border-[#DED8CF]">
                      {submittedInquiry.id}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[#55524E] pt-1">
                    <div>
                      <span className="text-[#8C867D] block text-[10px] uppercase tracking-wider font-semibold">Format</span>
                      <span className="font-medium text-[#171716] capitalize">
                        {submittedInquiry.eventType.replace('_', ' ')}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#8C867D] block text-[10px] uppercase tracking-wider font-semibold">Guests</span>
                      <span className="font-medium text-[#171716]">{submittedInquiry.guestCount} Guests</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      setSubmittedInquiry(null);
                      setFormData({
                        fullName: '',
                        email: '',
                        phone: '',
                        eventType: 'intimate_dinner',
                        guestCount: 10,
                        preferredDate: '',
                        locationOrVenue: '',
                        budgetOrFormat: '',
                        dietaryRestrictions: '',
                        storytellingNotes: '',
                      });
                    }}
                    className="px-6 py-3 rounded-full text-xs font-sans font-medium uppercase tracking-widest bg-[#2D2D2A] text-white hover:bg-[#171716] transition-colors cursor-pointer shadow-sm"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              /* Clean Private Event Inquiry Form */
              <form
                onSubmit={handleSubmit}
                id="private-events-inquiry-form"
                className="bg-white rounded-3xl border border-[#DED8CF] p-8 sm:p-10 text-left space-y-4 font-sans shadow-md"
              >
                <div className="border-b border-[#DED8CF] pb-4">
                  <h3 className="font-marcellus text-2xl sm:text-3xl font-normal text-[#171716]">
                    Inquire About Private Dining
                  </h3>
                  <p className="text-xs text-[#55524E] font-sans mt-1 font-light">
                    Share your vision, preferred timeline, and guest count. We’ll design an unforgettable table.
                  </p>
                </div>

                {/* Name, Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-widest text-[#171716] mb-2">
                      Your Name <span className="text-[#171716]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rohan Sen"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-5 py-3 rounded-full bg-[#FAF8F5] border border-[#DED8CF] text-sm text-[#171716] placeholder:text-[#8C867D] focus:outline-none focus:border-[#2D2D2A] focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-widest text-[#171716] mb-2">
                      Email Address <span className="text-[#171716]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-5 py-3 rounded-full bg-[#FAF8F5] border border-[#DED8CF] text-sm text-[#171716] placeholder:text-[#8C867D] focus:outline-none focus:border-[#2D2D2A] focus:bg-white transition-all"
                    />
                  </div>
                </div>

                {/* Phone & Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-widest text-[#171716] mb-2">
                      Phone / WhatsApp <span className="text-[#171716]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-5 py-3 rounded-full bg-[#FAF8F5] border border-[#DED8CF] text-sm text-[#171716] placeholder:text-[#8C867D] focus:outline-none focus:border-[#2D2D2A] focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-widest text-[#171716] mb-2">
                      Estimated Date & Location
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Nov 2026, San Francisco"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full px-5 py-3 rounded-full bg-[#FAF8F5] border border-[#DED8CF] text-sm text-[#171716] placeholder:text-[#8C867D] focus:outline-none focus:border-[#2D2D2A] focus:bg-white transition-all"
                    />
                  </div>
                </div>

                {/* Event Format & Guest Count */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-widest text-[#171716] mb-2">
                      Event Format
                    </label>
                    <select
                      value={formData.eventType}
                      onChange={(e) => setFormData({ ...formData, eventType: e.target.value as any })}
                      className="w-full px-5 py-3 rounded-full bg-[#FAF8F5] border border-[#DED8CF] text-sm text-[#171716] focus:outline-none focus:border-[#2D2D2A] focus:bg-white transition-all"
                    >
                      <option value="intimate_dinner">Intimate In-Home Dinner (6–16 guests)</option>
                      <option value="celebration">Milestone / Birthday / Anniversary</option>
                      <option value="curated_gathering">Brand / Salon Dining Gathering</option>
                      <option value="workshop">Interactive Cooking Circle</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-widest text-[#171716] mb-2">
                      Approximate Guests
                    </label>
                    <input
                      type="number"
                      min={2}
                      max={50}
                      value={formData.guestCount}
                      onChange={(e) => setFormData({ ...formData, guestCount: Number(e.target.value) })}
                      className="w-full px-5 py-3 rounded-full bg-[#FAF8F5] border border-[#DED8CF] text-sm text-[#171716] focus:outline-none focus:border-[#2D2D2A] focus:bg-white transition-all"
                    />
                  </div>
                </div>

                {/* Vision Notes */}
                <div>
                  <label className="block text-[11px] font-sans font-semibold uppercase tracking-widest text-[#171716] mb-2">
                    Tell us about the occasion <span className="font-normal text-[#8C867D]">(Optional)</span>
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Any specific dishes, memories, or dietary preferences you'd like to include..."
                    value={formData.storytellingNotes}
                    onChange={(e) => setFormData({ ...formData, storytellingNotes: e.target.value })}
                    className="w-full px-5 py-3 rounded-2xl bg-[#FAF8F5] border border-[#DED8CF] text-sm text-[#171716] placeholder:text-[#8C867D] focus:outline-none focus:border-[#2D2D2A] focus:bg-white transition-all"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    id="submit-private-event-btn"
                    className="w-full py-4 rounded-full bg-[#2D2D2A] text-white hover:bg-[#171716] font-sans text-xs font-medium uppercase tracking-widest transition-all disabled:opacity-50 cursor-pointer shadow-md hover:shadow-lg"
                  >
                    {isSubmitting ? 'Sending inquiry...' : 'Send Private Event Inquiry'}
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
