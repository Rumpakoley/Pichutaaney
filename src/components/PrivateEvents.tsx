import React, { useState } from 'react';
import { PrivateEventInquiry } from '../types';
import { Wine, Sparkles, CheckCircle2, Calendar, MapPin, User, Mail, Phone, Clock, FileText } from 'lucide-react';

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
    <section id="private-events" className="py-20 sm:py-28 bg-[#FAFAF9] border-b border-[#E4E4E7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl text-left mb-16">
          <span className="block font-sans text-[10px] tracking-[0.25em] uppercase font-bold text-[#853724] mb-2">
            BESPOKE GATHERINGS
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-[#18181B] tracking-tight">
            Private Dining & <span className="italic text-[#853724]">Events</span>
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#52525B] font-light leading-relaxed">
            Invite Enakshi to host an intimate, story-driven regional culinary experience for your celebration or gathering.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Event Archetypes & Visual Editorial */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="space-y-4">
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#18181B]">
                Tailored Regional Experiences
              </h3>
              <p className="text-sm text-[#52525B] leading-relaxed font-sans font-light">
                Whether you are marking a landmark birthday, hosting a curated salon for creative thinkers, or celebrating an intimate wedding rehearsal, we handle every detail—from the bespoke multi-course menu design to the tablescape and historical storytelling.
              </p>
            </div>

            {/* Event Formats Grid */}
            <div className="space-y-4">
              <div className="p-5 bg-white border border-[#E4E4E7]">
                <div className="flex items-center justify-between mb-1.5">
                  <h4 className="font-serif text-xl font-normal text-[#18181B]">
                    Intimate In-Home Dinners
                  </h4>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#853724] font-sans font-bold">6 – 16 Guests</span>
                </div>
                <p className="text-xs text-[#52525B] font-sans leading-relaxed font-light">
                  Enakshi transforms your home kitchen into a warm sanctuary of aromas, with unhurried course-by-course presentation.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E4E4E7]">
                <div className="flex items-center justify-between mb-1.5">
                  <h4 className="font-serif text-xl font-normal text-[#18181B]">
                    Milestones & Celebrations
                  </h4>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#853724] font-sans font-bold">Up to 35 Guests</span>
                </div>
                <p className="text-xs text-[#52525B] font-sans leading-relaxed font-light">
                  Curated family feasts celebrating specific regional delicacies (such as an authentic Kolkata feast or Awadhi court dinner).
                </p>
              </div>

              <div className="p-5 bg-[#853724] text-white border border-[#853724]">
                <div className="flex items-center justify-between mb-1.5">
                  <h4 className="font-serif text-xl font-normal text-white">
                    Interactive Cooking Circles
                  </h4>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-white/80 font-sans font-bold">Small Groups</span>
                </div>
                <p className="text-xs text-white/85 font-sans leading-relaxed font-light">
                  Hands-on mastery of whole spices, stone grinding techniques, and the art of the Bengali *phoron* tempering, followed by a feast.
                </p>
              </div>
            </div>

            {/* Image accent */}
            <div className="relative overflow-hidden border border-[#E4E4E7] bg-white p-2">
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80"
                alt="Intimate candlelit dining table ready for a private supper"
                referrerPolicy="no-referrer"
                className="w-full h-48 object-cover filter contrast-[1.02]"
              />
              <div className="p-3 bg-[#FAFAF9] border-t border-[#E4E4E7]">
                <span className="text-xs text-[#52525B] font-serif italic">
                  “Every table is curated uniquely; no two private menus are ever identical.”
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Private Event Inquiry Form */}
          <div className="lg:col-span-7">
            {submittedInquiry ? (
              /* Success card */
              <div className="bg-white border border-[#E4E4E7] p-8 sm:p-10 text-left space-y-6">
                <div className="flex items-center space-x-3 text-[#18181B]">
                  <CheckCircle2 className="w-8 h-8 text-[#853724]" />
                  <div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#18181B]">
                      Private Event Inquiry Received
                    </h3>
                    <p className="text-xs text-[#52525B] font-sans">
                      Thank you, {submittedInquiry.fullName}. Enakshi will review your gathering details.
                    </p>
                  </div>
                </div>

                <div className="bg-[#FAFAF9] border border-[#E4E4E7] p-5 space-y-2.5 font-sans text-xs">
                  <div className="flex justify-between items-center border-b border-[#E4E4E7] pb-2">
                    <span className="text-[#853724] uppercase font-bold tracking-wider text-[10px]">Inquiry Reference</span>
                    <span className="font-mono font-bold text-[#18181B] bg-white px-2 py-0.5 border border-[#E4E4E7]">
                      {submittedInquiry.id}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[#52525B] pt-1">
                    <div>
                      <span className="text-[#A1A1AA] block text-[10px] uppercase tracking-wider">Format</span>
                      <span className="font-medium text-[#18181B] capitalize">
                        {submittedInquiry.eventType.replace('_', ' ')}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#A1A1AA] block text-[10px] uppercase tracking-wider">Guests</span>
                      <span className="font-medium text-[#18181B]">{submittedInquiry.guestCount} Guests</span>
                    </div>
                    <div>
                      <span className="text-[#A1A1AA] block text-[10px] uppercase tracking-wider">Target Date</span>
                      <span className="font-medium text-[#18181B]">{submittedInquiry.preferredDate}</span>
                    </div>
                    <div>
                      <span className="text-[#A1A1AA] block text-[10px] uppercase tracking-wider">Location</span>
                      <span className="font-medium text-[#18181B]">{submittedInquiry.locationOrVenue}</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-[#52525B] font-sans leading-relaxed font-light">
                  Enakshi will reach out via email or phone within <strong>24 to 48 hours</strong> to discuss date availability, custom seasonal menu possibilities, and dietary curation.
                </p>

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
                    className="px-6 py-3 text-[11px] font-sans font-semibold uppercase tracking-widest bg-[#853724] text-white hover:bg-[#18181B] transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              /* The Private Event Inquiry Form */
              <form
                onSubmit={handleSubmit}
                id="private-events-inquiry-form"
                className="bg-white border border-[#E4E4E7] p-6 sm:p-8 text-left space-y-5 font-sans"
              >
                <div className="border-b border-[#E4E4E7] pb-4">
                  <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#18181B]">
                    Inquire About a Private Dining Experience
                  </h3>
                  <p className="text-xs text-[#52525B] font-sans mt-1 font-light">
                    Share your vision, preferred timeline, and guest size. We’ll design an unforgettable table.
                  </p>
                </div>

                {/* Name, Email, Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[10px] font-sans font-bold uppercase tracking-widest text-[#18181B] mb-1.5">
                      Your Name <span className="text-[#853724]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rohan Sen"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3 py-2.5 bg-white border border-[#E4E4E7] text-sm text-[#18181B] placeholder:text-[#A1A1AA] focus:outline-none focus:border-[#18181B]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-sans font-bold uppercase tracking-widest text-[#18181B] mb-1.5">
                      Email <span className="text-[#853724]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="rohan@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2.5 bg-white border border-[#E4E4E7] text-sm text-[#18181B] placeholder:text-[#A1A1AA] focus:outline-none focus:border-[#18181B]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-sans font-bold uppercase tracking-widest text-[#18181B] mb-1.5">
                      Phone Number <span className="text-[#853724]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 234-5678"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2.5 bg-white border border-[#E4E4E7] text-sm text-[#18181B] placeholder:text-[#A1A1AA] focus:outline-none focus:border-[#18181B]"
                    />
                  </div>
                </div>

                {/* Event Type & Guests */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-sans font-bold uppercase tracking-widest text-[#18181B] mb-1.5">
                      Event Format
                    </label>
                    <select
                      value={formData.eventType}
                      onChange={(e) => setFormData({ ...formData, eventType: e.target.value as any })}
                      className="w-full px-3 py-2.5 bg-white border border-[#E4E4E7] text-sm text-[#18181B] focus:outline-none focus:border-[#18181B]"
                    >
                      <option value="intimate_dinner">Intimate In-Home Dinner (6-16 guests)</option>
                      <option value="celebration">Milestone Celebration / Birthday / Anniversary</option>
                      <option value="curated_gathering">Brand / Salon Dining Gathering</option>
                      <option value="workshop">Interactive Cooking Circle & Tasting</option>
                      <option value="other">Other Bespoke Collaboration</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-sans font-bold uppercase tracking-widest text-[#18181B] mb-1.5">
                      Estimated Guest Count: <span className="font-bold text-[#853724]">{formData.guestCount}</span>
                    </label>
                    <input
                      type="range"
                      min={4}
                      max={40}
                      step={1}
                      value={formData.guestCount}
                      onChange={(e) => setFormData({ ...formData, guestCount: Number(e.target.value) })}
                      className="w-full accent-[#853724] h-2 bg-[#E4E4E7] cursor-pointer mt-3"
                    />
                    <div className="flex justify-between text-[10px] text-[#A1A1AA] mt-1 uppercase tracking-wider">
                      <span>4 Guests</span>
                      <span>20 Guests</span>
                      <span>40 Guests</span>
                    </div>
                  </div>
                </div>

                {/* Date and Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-sans font-bold uppercase tracking-widest text-[#18181B] mb-1.5">
                      Target Date / Timeframe
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. October 18 or 'Mid-November weekend'"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full px-3 py-2.5 bg-white border border-[#E4E4E7] text-sm text-[#18181B] placeholder:text-[#A1A1AA] focus:outline-none focus:border-[#18181B]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-sans font-bold uppercase tracking-widest text-[#18181B] mb-1.5">
                      Location / City / Venue
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Private residence in Marin County / London / Kolkata"
                      value={formData.locationOrVenue}
                      onChange={(e) => setFormData({ ...formData, locationOrVenue: e.target.value })}
                      className="w-full px-3 py-2.5 bg-white border border-[#E4E4E7] text-sm text-[#18181B] placeholder:text-[#A1A1AA] focus:outline-none focus:border-[#18181B]"
                    />
                  </div>
                </div>

                {/* Dietary and Storytelling Vision */}
                <div>
                  <label className="block text-[10px] font-sans font-bold uppercase tracking-widest text-[#18181B] mb-1.5">
                    Dietary Framework or Specific Requests
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 8 omnivores, 2 pescatarians, 1 shellfish allergy"
                    value={formData.dietaryRestrictions}
                    onChange={(e) => setFormData({ ...formData, dietaryRestrictions: e.target.value })}
                    className="w-full px-3 py-2.5 bg-white border border-[#E4E4E7] text-sm text-[#18181B] placeholder:text-[#A1A1AA] focus:outline-none focus:border-[#18181B]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-sans font-bold uppercase tracking-widest text-[#18181B] mb-1.5">
                    Tell us about the occasion & culinary vision
                  </label>
                  <textarea
                    rows={3}
                    placeholder="What kind of mood or narrative are you hoping to evoke? Any specific regional dishes or memories you would love to highlight?"
                    value={formData.storytellingNotes}
                    onChange={(e) => setFormData({ ...formData, storytellingNotes: e.target.value })}
                    className="w-full px-3 py-2.5 bg-white border border-[#E4E4E7] text-sm text-[#18181B] placeholder:text-[#A1A1AA] focus:outline-none focus:border-[#18181B]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    id="submit-private-event-btn"
                    className="w-full py-3.5 bg-[#853724] text-white hover:bg-[#18181B] font-sans text-xs font-semibold uppercase tracking-widest transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? 'Sending inquiry...' : 'Send Private Event Inquiry'}
                  </button>
                  <p className="text-center text-[10px] font-sans text-[#A1A1AA] mt-2 uppercase tracking-wider">
                    Enakshi reviews each inquiry personally and will respond with menu concepts and date options.
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
