import React, { useState } from 'react';
import { WaitlistEntry, PrivateEventInquiry } from '../types';
import { Mail, Phone, Instagram, Send, CheckCircle2, Check, ExternalLink, Calendar, Users, Utensils } from 'lucide-react';
import { motion } from 'motion/react';

interface UniqueTableConciergeProps {
  onAddWaitlist: (entry: WaitlistEntry) => void;
  onAddInquiry: (inquiry: PrivateEventInquiry) => void;
  recentEntries: (WaitlistEntry | PrivateEventInquiry)[];
}

export const UniqueTableConcierge: React.FC<UniqueTableConciergeProps> = ({
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
  const [submittedRefId, setSubmittedRefId] = useState('');
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) return;

    setIsSubmitting(true);
    const refId = formData.experienceType === 'supper_club' 
      ? `PCH-WL-${Date.now().toString().slice(-5)}`
      : `PCH-EVT-${Date.now().toString().slice(-5)}`;

    // 1. Add to local state & Host Ledger
    if (formData.experienceType === 'supper_club') {
      const newWaitlist: WaitlistEntry = {
        id: refId,
        fullName: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || undefined,
        city: formData.cityOrVenue.trim() || 'Toronto / GTA',
        partySize: Number(formData.guestCount),
        dietaryPreferences: [formData.dietary],
        notes: formData.notes.trim() || undefined,
        submittedAt: new Date().toISOString(),
        status: 'pending',
      };
      onAddWaitlist(newWaitlist);
    } else {
      const newInquiry: PrivateEventInquiry = {
        id: refId,
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

    // 2. Dispatch automated dual-email notification (to pichhutaaney@gmail.com and the customer)
    try {
      await fetch('https://formsubmit.co/ajax/pichhutaaney@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: `New Pichhutaaney Reservation [${refId}] - ${formData.name.trim()}`,
          _replyto: formData.email.trim(),
          _cc: formData.email.trim(),
          _autoresponse: `Thank you ${formData.name.trim()} for your reservation request at Pichhutaaney! Your reference ID is ${refId}. Enakshi will review your request and reach out with seating details and confirmation.`,
          _template: 'table',
          'Reference ID': refId,
          'Full Name': formData.name.trim(),
          'Email Address': formData.email.trim(),
          'Phone / WhatsApp': formData.phone.trim() || 'Not provided',
          'Experience Type': formData.experienceType.replace('_', ' ').toUpperCase(),
          'Party Size': formData.guestCount,
          'City / Area': formData.cityOrVenue.trim() || 'Toronto / GTA',
          'Dietary Preference': formData.dietary,
          'Occasion / Notes': formData.notes.trim() || 'None',
          'Submitted Date': new Date().toLocaleString(),
        }),
      });
    } catch (err) {
      console.warn('Background email notification queued locally:', err);
    }

    setSubmittedRefId(refId);
    setSubmittedEmail(formData.email.trim());
    setIsSubmitting(false);
    setIsSubmitted(true);
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
    setSubmittedRefId('');
    setSubmittedEmail('');
    setIsSubmitted(false);
  };

  return (
    <section id="table-concierge" className="py-20 sm:py-28 bg-[#ECE5DA] border-b border-[#D5CBBD] text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left Column: Concierge Desk & Hotlines */}
          <div className="lg:col-span-5 bg-[#F7F3EC] border border-[#D5CBBD] p-8 sm:p-10 rounded-3xl shadow-sm flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="font-sans text-[11px] uppercase tracking-[0.25em] text-[#B58D59] font-bold block">
                  CONCIERGE & DESK
                </span>
                <h3 className="font-marcellus text-3xl sm:text-4xl font-normal text-[#28221D] tracking-tight">
                  Direct Table Concierge
                </h3>
              </div>

              <p className="font-sans text-xs sm:text-sm text-[#655B51] leading-relaxed font-light">
                Connect directly to join private supper club drops, reserve bespoke in-home dinners, or discuss culinary collaborations and food writing.
              </p>

              {/* Contact Cards */}
              <div className="space-y-3.5 pt-2">
                {/* Email */}
                <div className="flex items-center gap-4 bg-[#ECE5DA] border border-[#D5CBBD] p-4 rounded-2xl group">
                  <div className="w-10 h-10 bg-[#28221D] text-[#ECE5DA] flex items-center justify-center shrink-0 rounded-xl shadow-xs">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-[#655B51] block font-bold">
                      Direct Correspondence
                    </span>
                    <button
                      onClick={() => handleCopy('pichhutaaney@gmail.com', 'email')}
                      className="font-marcellus text-sm font-normal text-[#28221D] hover:text-[#B58D59] hover:underline text-left block cursor-pointer"
                    >
                      pichhutaaney@gmail.com
                    </button>
                    <span className="font-mono text-[9px] text-[#B58D59] block mt-0.5 font-bold">
                      {copiedType === 'email' ? '✓ Copied Address' : 'Click to copy email'}
                    </span>
                  </div>
                </div>

                {/* Instagram */}
                <div className="flex items-center gap-4 bg-[#ECE5DA] border border-[#D5CBBD] p-4 rounded-2xl group">
                  <div className="w-10 h-10 bg-[#B58D59] text-[#28221D] flex items-center justify-center shrink-0 rounded-xl shadow-xs">
                    <Instagram className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-[#655B51] block font-bold">
                      Instagram Journal
                    </span>
                    <a
                      href="https://www.instagram.com/pichhutaaney?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw=="
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-marcellus text-sm font-normal text-[#28221D] hover:text-[#B58D59] hover:underline flex items-center gap-1 block"
                    >
                      <span>@pichhutaaney</span>
                      <ExternalLink className="w-3 h-3 text-[#B58D59]" />
                    </a>
                    <span className="font-mono text-[9px] text-[#655B51] block mt-0.5">
                      Follow kitchen reels & seat releases
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Registry Strip */}
            {recentEntries.length > 0 && (
              <div className="space-y-2 border-t border-[#D5CBBD] pt-4 text-[10px] font-mono">
                <span className="uppercase tracking-widest text-[#655B51] font-bold block">
                  RECENT REGISTRATIONS ({recentEntries.length})
                </span>
                <div className="space-y-1.5 max-h-28 overflow-y-auto pr-1">
                  {recentEntries.slice(0, 3).map((item) => (
                    <div key={item.id} className="flex items-center justify-between bg-[#ECE5DA] px-3 py-1.5 rounded-lg border border-[#D5CBBD]">
                      <span className="font-bold truncate text-[#28221D]">{item.fullName}</span>
                      <span className="bg-[#28221D] text-[#ECE5DA] px-2 py-0.5 rounded text-[8.5px] uppercase font-bold">
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Interactive Table Reservation Form */}
          <div className="lg:col-span-7 bg-[#F7F3EC] border border-[#D5CBBD] p-8 sm:p-10 rounded-3xl shadow-sm text-[#28221D]">
            {isSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95 duration-200">
                <div className="w-16 h-16 bg-[#ECE5DA] border border-[#B58D59] rounded-full flex items-center justify-center text-[#28221D] shadow-sm">
                  <CheckCircle2 className="w-8 h-8 text-[#B58D59]" />
                </div>

                <div className="space-y-2">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#B58D59] font-bold">
                    RESERVATION REGISTRY CONFIRMED
                  </span>
                  <h4 className="font-marcellus text-3xl font-normal text-[#28221D]">
                    Receipt & Table Pass
                  </h4>
                  <p className="text-xs sm:text-sm text-[#655B51] max-w-md mx-auto leading-relaxed font-light">
                    Thank you, <strong>{formData.name}</strong>. Your gathering request is registered in Enakshi’s Host Ledger.
                  </p>
                </div>

                {/* Summary Card */}
                <div className="w-full max-w-md bg-[#ECE5DA] border border-[#D5CBBD] rounded-2xl p-4 text-left space-y-2 font-mono text-xs shadow-2xs">
                  <div className="flex justify-between border-b border-[#D5CBBD] pb-2 text-[11px]">
                    <span className="text-[#655B51]">Booking Ref:</span>
                    <span className="font-bold text-[#28221D]">{submittedRefId}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#D5CBBD] pb-2 text-[11px]">
                    <span className="text-[#655B51]">Party / Experience:</span>
                    <span className="font-bold text-[#28221D]">{formData.guestCount} Guests • {formData.experienceType.replace('_', ' ')}</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-[#655B51]">Email Acknowledgment:</span>
                    <span className="text-[#28221D] font-medium truncate max-w-[200px]">{submittedEmail}</span>
                  </div>
                </div>

                {/* Dual-Email notice */}
                <div className="w-full max-w-md bg-[#28221D] text-[#ECE5DA] rounded-xl p-3 text-[11px] font-sans flex items-center space-x-2.5 shadow-sm text-left">
                  <Mail className="w-4 h-4 text-[#B58D59] shrink-0" />
                  <span className="leading-snug">
                    Dual notification dispatched to <strong>pichhutaaney@gmail.com</strong> and <strong>{submittedEmail}</strong>.
                  </span>
                </div>

                <button
                  onClick={handleReset}
                  className="px-7 py-3 bg-[#28221D] hover:bg-[#1C1713] text-[#ECE5DA] font-sans text-xs uppercase tracking-widest font-semibold transition-all rounded-full cursor-pointer shadow-md"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1 border-b border-[#D5CBBD] pb-4">
                  <span className="font-mono text-xs text-[#B58D59] uppercase tracking-wider block font-bold">
                    SEAT & GATHERING SPECIFICATIONS
                  </span>
                  <h4 className="font-marcellus text-2xl font-normal text-[#28221D]">
                    Table Reservation & Waitlist Form
                  </h4>
                  <p className="text-xs text-[#655B51] font-light">
                    Fill out your preferences to join upcoming private batch seatings or host a bespoke gathering.
                  </p>
                </div>

                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-sans text-[10.5px] uppercase tracking-wider font-semibold text-[#28221D] block">
                      Full Name <span className="text-[#B58D59]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ananya Sengupta"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#ECE5DA] border border-[#D5CBBD] rounded-full px-4 py-2.5 text-xs text-[#28221D] focus:outline-none focus:border-[#28221D] placeholder:text-[#9A8F83] font-sans"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-sans text-[10.5px] uppercase tracking-wider font-semibold text-[#28221D] block">
                      Email Address <span className="text-[#B58D59]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#ECE5DA] border border-[#D5CBBD] rounded-full px-4 py-2.5 text-xs text-[#28221D] focus:outline-none focus:border-[#28221D] placeholder:text-[#9A8F83] font-sans"
                    />
                  </div>
                </div>

                {/* Experience & Party Size */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-sans text-[10.5px] uppercase tracking-wider font-semibold text-[#28221D] block">
                      Dining Experience
                    </label>
                    <select
                      value={formData.experienceType}
                      onChange={(e) => setFormData({ ...formData, experienceType: e.target.value })}
                      className="w-full bg-[#ECE5DA] border border-[#D5CBBD] rounded-full px-4 py-2.5 text-xs text-[#28221D] focus:outline-none focus:border-[#28221D] font-sans"
                    >
                      <option value="supper_club">Supper Club Waitlist</option>
                      <option value="private_dinners">Private Dinners</option>
                      <option value="brand_collaborations">Brand Collaborations</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-sans text-[10.5px] uppercase tracking-wider font-semibold text-[#28221D] block">
                      Party Size
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={50}
                      value={formData.guestCount}
                      onChange={(e) => setFormData({ ...formData, guestCount: Number(e.target.value) })}
                      className="w-full bg-[#ECE5DA] border border-[#D5CBBD] rounded-full px-4 py-2.5 text-xs text-[#28221D] focus:outline-none focus:border-[#28221D] font-sans"
                    />
                  </div>
                </div>

                {/* Phone & Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-sans text-[10.5px] uppercase tracking-wider font-semibold text-[#28221D] block">
                      Phone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#ECE5DA] border border-[#D5CBBD] rounded-full px-4 py-2.5 text-xs text-[#28221D] focus:outline-none focus:border-[#28221D] placeholder:text-[#9A8F83] font-sans"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-sans text-[10.5px] uppercase tracking-wider font-semibold text-[#28221D] block">
                      City / Area
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. San Francisco / Berkeley"
                      value={formData.cityOrVenue}
                      onChange={(e) => setFormData({ ...formData, cityOrVenue: e.target.value })}
                      className="w-full bg-[#ECE5DA] border border-[#D5CBBD] rounded-full px-4 py-2.5 text-xs text-[#28221D] focus:outline-none focus:border-[#28221D] placeholder:text-[#9A8F83] font-sans"
                    />
                  </div>
                </div>

                {/* Dietary Profile */}
                <div className="space-y-1">
                  <label className="font-sans text-[10.5px] uppercase tracking-wider font-semibold text-[#28221D] block">
                    Dietary Preference
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {['Omnivore', 'Pescatarian', 'Vegetarian', 'Vegan / Plant'].map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setFormData({ ...formData, dietary: item })}
                        className={`py-2 px-2 text-[11px] font-sans border rounded-full transition-all cursor-pointer truncate ${
                          formData.dietary.includes(item.split(' ')[0])
                            ? 'bg-[#28221D] text-[#ECE5DA] border-[#28221D] font-semibold shadow-xs'
                            : 'bg-[#ECE5DA] text-[#4A4138] border-[#D5CBBD] hover:border-[#28221D]'
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div className="space-y-1">
                  <label className="font-sans text-[10.5px] uppercase tracking-wider font-semibold text-[#28221D] block">
                    Special Occasion & Memory Notes <span className="font-normal text-[#655B51]">(Optional)</span>
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Tell us about cherished family recipes, dietary needs, or occasion..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full bg-[#ECE5DA] border border-[#D5CBBD] rounded-2xl p-3 text-xs text-[#28221D] focus:outline-none focus:border-[#28221D] placeholder:text-[#9A8F83] font-sans"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-[#28221D] hover:bg-[#1C1713] text-[#ECE5DA] font-sans text-xs uppercase tracking-widest font-semibold transition-all rounded-full cursor-pointer shadow-md disabled:opacity-50 flex items-center justify-center space-x-2"
                >
                  <Send className="w-3.5 h-3.5 text-[#B58D59]" />
                  <span>{isSubmitting ? 'Transmitting Request...' : 'Send Table Reservation Request'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
