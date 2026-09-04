import React, { useState } from 'react';
import { ContactMessage } from '../types';
import { FAQ_ITEMS } from '../data/content';
import { Mail, MessageSquare, Send, CheckCircle2, ChevronDown, ChevronUp, Instagram, MapPin, Sparkles } from 'lucide-react';

interface GetInTouchProps {
  onAddMessage: (msg: ContactMessage) => void;
}

export const GetInTouch: React.FC<GetInTouchProps> = ({ onAddMessage }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    purpose: 'collaboration' as ContactMessage['purpose'],
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const newMsg: ContactMessage = {
        id: `PCH-MSG-${Date.now().toString().slice(-5)}`,
        name: formData.name.trim(),
        email: formData.email.trim(),
        purpose: formData.purpose,
        message: formData.message.trim(),
        submittedAt: new Date().toISOString(),
      };

      onAddMessage(newMsg);
      setSubmitted(true);
      setIsSubmitting(false);
    }, 400);
  };

  return (
    <section id="contact" className="py-20 sm:py-28 bg-[#FAFAF9] border-b border-[#E4E4E7]">
      <div id="get-in-touch" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl text-left mb-16">
          <span className="block font-sans text-[10px] tracking-[0.25em] uppercase font-bold text-[#853724] mb-2">
            OPEN TABLE & DIALOGUE
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-[#18181B] tracking-tight">
            Get in <span className="italic text-[#853724]">Touch</span>
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#52525B] font-light leading-relaxed">
            An open invitation for collaborations, culinary partnerships, food writing, ideas, or simply to say hello.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Invitation & FAQ */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <div className="bg-white border border-[#E4E4E7] p-6 sm:p-7 space-y-5">
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#18181B]">
                Conversations Over Chai
              </h3>
              <p className="text-xs sm:text-sm text-[#52525B] font-sans leading-relaxed font-light">
                Whether you are a fellow cook, an archivist of oral food histories, a venue host, a food journalist, or simply someone who misses the taste of home-tempered dal, I would love to connect.
              </p>

              <div className="pt-2 space-y-3 text-xs text-[#52525B] font-sans">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 border border-[#E4E4E7] bg-[#FAFAF9] flex items-center justify-center text-[#853724]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-bold text-[#18181B]">Direct Correspondence</span>
                    <a href="mailto:hello@pichhutaaney.com" className="text-[#853724] hover:underline font-medium">
                      hello@pichhutaaney.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 border border-[#E4E4E7] bg-[#FAFAF9] flex items-center justify-center text-[#853724]">
                    <Instagram className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-bold text-[#18181B]">Kitchen Notes & Updates</span>
                    <span className="text-[#52525B]">@pichhutaaney</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 border border-[#E4E4E7] bg-[#FAFAF9] flex items-center justify-center text-[#853724]">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-bold text-[#18181B]">Base of Operations</span>
                    <span className="text-[#52525B]">Rotating Pop-ups & Private Residences</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick FAQ Section */}
            <div className="space-y-3">
              <h4 className="font-serif text-2xl font-normal text-[#18181B]">
                Common Curiosities
              </h4>
              <div className="space-y-2 font-sans">
                {FAQ_ITEMS.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div
                      key={faq.question}
                      className="border border-[#E4E4E7] bg-white overflow-hidden"
                    >
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className="w-full px-4 py-3 text-left flex items-center justify-between text-xs sm:text-sm font-medium text-[#18181B] hover:bg-[#FAFAF9] transition-colors"
                      >
                        <span>{faq.question}</span>
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-[#853724] shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-[#A1A1AA] shrink-0" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 pt-1 text-xs text-[#52525B] font-light leading-relaxed border-t border-[#E4E4E7] bg-[#FAFAF9]">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7">
            {submitted ? (
              <div className="bg-white border border-[#E4E4E7] p-8 sm:p-10 text-left space-y-6">
                <div className="flex items-center space-x-3 text-[#18181B]">
                  <CheckCircle2 className="w-8 h-8 text-[#853724]" />
                  <div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#18181B]">
                      Message Received
                    </h3>
                    <p className="text-xs text-[#52525B] font-sans">
                      Thank you for reaching out, {formData.name}.
                    </p>
                  </div>
                </div>
                <p className="text-sm text-[#52525B] font-sans leading-relaxed font-light">
                  Enakshi reads every personal note and proposal. You will hear back at <strong>{formData.email}</strong> shortly.
                </p>
                <div>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        purpose: 'collaboration',
                        message: '',
                      });
                    }}
                    className="px-6 py-3 text-[11px] font-sans font-semibold uppercase tracking-widest bg-[#853724] text-white hover:bg-[#18181B] transition-colors"
                  >
                    Send Another Note
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                id="contact-form"
                className="bg-white border border-[#E4E4E7] p-6 sm:p-8 text-left space-y-5 font-sans"
              >
                <div className="border-b border-[#E4E4E7] pb-4">
                  <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#18181B]">
                    Send a Note to Enakshi
                  </h3>
                  <p className="text-xs text-[#52525B] font-sans mt-1 font-light">
                    Have an idea, want to collaborate on a culinary project, or simply want to talk regional food?
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-sans font-bold uppercase tracking-widest text-[#18181B] mb-1.5">
                      Your Name <span className="text-[#853724]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2.5 bg-white border border-[#E4E4E7] text-sm text-[#18181B] placeholder:text-[#A1A1AA] focus:outline-none focus:border-[#18181B]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-sans font-bold uppercase tracking-widest text-[#18181B] mb-1.5">
                      Your Email <span className="text-[#853724]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2.5 bg-white border border-[#E4E4E7] text-sm text-[#18181B] placeholder:text-[#A1A1AA] focus:outline-none focus:border-[#18181B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-sans font-bold uppercase tracking-widest text-[#18181B] mb-1.5">
                    What is on your mind?
                  </label>
                  <select
                    value={formData.purpose}
                    onChange={(e) => setFormData({ ...formData, purpose: e.target.value as any })}
                    className="w-full px-3 py-2.5 bg-white border border-[#E4E4E7] text-sm text-[#18181B] focus:outline-none focus:border-[#18181B]"
                  >
                    <option value="collaboration">Collaborative Pop-up or Chef Exchange</option>
                    <option value="partnership">Brand / Venue / Producer Partnership</option>
                    <option value="press">Food Writing, Media, or Podcast Inquiry</option>
                    <option value="idea">Creative Culinary Idea or Recipe Archiving</option>
                    <option value="say_hello">Just Saying Hello & Sharing Appreciation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-sans font-bold uppercase tracking-widest text-[#18181B] mb-1.5">
                    Your Message <span className="text-[#853724]">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Write your thoughts here..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E4E4E7] text-sm text-[#18181B] placeholder:text-[#A1A1AA] focus:outline-none focus:border-[#18181B]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    id="submit-contact-btn"
                    className="w-full py-3.5 bg-[#853724] text-white hover:bg-[#18181B] font-sans text-xs font-semibold uppercase tracking-widest transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
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
