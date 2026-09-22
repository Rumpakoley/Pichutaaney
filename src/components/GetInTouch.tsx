import React, { useState } from 'react';
import { ContactMessage } from '../types';
import { FAQ_ITEMS } from '../data/content';
import { Mail, MessageSquare, Send, CheckCircle2, ChevronDown, ChevronUp, Instagram, MapPin, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { RevealHeading, RevealText, StaggerContainer, StaggerItem } from './TextTransitions';

interface GetInTouchProps {
  onAddMessage: (msg: ContactMessage) => void;
}

export const GetInTouch: React.FC<GetInTouchProps> = ({ onAddInquiry, onAddMessage }: any) => {
  const addMessageFn = onAddMessage || onAddInquiry;
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

      if (addMessageFn) addMessageFn(newMsg);
      setSubmitted(true);
      setIsSubmitting(false);
    }, 400);
  };

  return (
    <section id="contact" className="py-20 sm:py-28 bg-[#E9E4DD] border-b border-[#DED8CF] overflow-hidden text-[#2D2D2A]">
      <div id="get-in-touch" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl text-left mb-16">
          <RevealHeading>
            <span className="inline-block px-3 py-1 rounded-full text-[11px] font-sans font-medium tracking-[0.2em] uppercase bg-white/80 border border-[#DED8CF] text-[#2D2D2A] mb-4">
              OPEN TABLE & DIALOGUE
            </span>
            <h2 className="font-marcellus text-4xl sm:text-5xl md:text-6xl font-normal text-[#171716] tracking-tight">
              Get in <span className="font-pt-serif italic">Touch</span>
            </h2>
          </RevealHeading>

          <RevealText delay={0.15}>
            <p className="mt-3 text-base sm:text-lg text-[#55524E] font-sans font-light leading-relaxed">
              An open invitation for collaborations, culinary partnerships, food writing, ideas, or simply to say hello.
            </p>
          </RevealText>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Invitation & FAQ */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <RevealText delay={0.1}>
              <div className="bg-white rounded-3xl border border-[#DED8CF] p-8 space-y-6 shadow-md">
                <h3 className="font-marcellus text-2xl sm:text-3xl font-normal text-[#171716]">
                  Conversations Over Chai
                </h3>
                <p className="text-xs sm:text-sm text-[#55524E] font-sans leading-relaxed font-light">
                  Whether you are a fellow cook, an archivist of oral food histories, a venue host, a food journalist, or simply someone who misses the taste of home-tempered dal, I would love to connect.
                </p>

                <div className="pt-2 space-y-3.5 text-xs text-[#55524E] font-sans">
                  <div className="flex items-center space-x-3.5">
                    <div className="w-9 h-9 rounded-full border border-[#DED8CF] bg-[#E9E4DD] flex items-center justify-center text-[#171716]">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block font-medium text-[#171716]">Direct Correspondence</span>
                      <a href="mailto:pichhutaaney@gmail.com" className="text-[#2D2D2A] hover:underline font-medium">
                        pichhutaaney@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3.5">
                    <div className="w-9 h-9 rounded-full border border-[#DED8CF] bg-[#E9E4DD] flex items-center justify-center text-[#171716]">
                      <Instagram className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block font-medium text-[#171716]">Kitchen Notes & Updates</span>
                      <span className="text-[#55524E]">@pichhutaaney</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3.5">
                    <div className="w-9 h-9 rounded-full border border-[#DED8CF] bg-[#E9E4DD] flex items-center justify-center text-[#171716]">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block font-medium text-[#171716]">Base of Operations</span>
                      <span className="text-[#55524E]">Rotating Pop-ups & Private Residences</span>
                    </div>
                  </div>
                </div>
              </div>
            </RevealText>

            {/* Quick FAQ Section */}
            <div className="space-y-4">
              <RevealHeading delay={0.15}>
                <h4 className="font-marcellus text-2xl font-normal text-[#171716]">
                  Common Curiosities
                </h4>
              </RevealHeading>

              <StaggerContainer staggerDelay={0.07} className="space-y-2.5 font-sans">
                {FAQ_ITEMS.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <StaggerItem key={faq.question}>
                      <div className="border border-[#DED8CF] bg-white rounded-2xl overflow-hidden transition-all duration-200 hover:border-[#2D2D2A] shadow-xs">
                        <button
                          onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                          className="w-full px-5 py-3.5 text-left flex items-center justify-between text-xs sm:text-sm font-medium text-[#171716] hover:bg-[#FAF8F5] transition-colors cursor-pointer"
                        >
                          <span>{faq.question}</span>
                          {isOpen ? (
                            <ChevronUp className="w-4 h-4 text-[#171716] shrink-0" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-[#8C867D] shrink-0" />
                          )}
                        </button>
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.25, ease: 'easeInOut' }}
                              className="px-5 pb-4 pt-1 text-xs text-[#55524E] font-light leading-relaxed border-t border-[#DED8CF] bg-[#FAF8F5]"
                            >
                              {faq.answer}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7">
            {submitted ? (
              <div className="bg-white rounded-3xl border border-[#DED8CF] p-8 sm:p-10 text-left space-y-6 shadow-md">
                <div className="flex items-center space-x-3 text-[#171716]">
                  <CheckCircle2 className="w-8 h-8 text-[#2D2D2A]" />
                  <div>
                    <h3 className="font-marcellus text-2xl sm:text-3xl font-normal text-[#171716]">
                      Message Received
                    </h3>
                    <p className="text-xs text-[#55524E] font-sans">
                      Thank you for reaching out, {formData.name}.
                    </p>
                  </div>
                </div>
                <p className="text-sm text-[#55524E] font-sans leading-relaxed font-light">
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
                    className="px-6 py-3 rounded-full text-xs font-sans font-medium uppercase tracking-widest bg-[#2D2D2A] text-white hover:bg-[#171716] transition-colors cursor-pointer shadow-sm"
                  >
                    Send Another Note
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                id="contact-form"
                className="bg-white rounded-3xl border border-[#DED8CF] p-8 sm:p-10 text-left space-y-5 font-sans shadow-md"
              >
                <div className="border-b border-[#DED8CF] pb-4">
                  <h3 className="font-marcellus text-2xl sm:text-3xl font-normal text-[#171716]">
                    Send a Note to Enakshi
                  </h3>
                  <p className="text-xs text-[#55524E] font-sans mt-1 font-light">
                    Have an idea, want to collaborate on a culinary project, or simply want to talk regional food?
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-widest text-[#171716] mb-2">
                      Your Name <span className="text-[#171716]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-5 py-3 rounded-full bg-[#FAF8F5] border border-[#DED8CF] text-sm text-[#171716] placeholder:text-[#8C867D] focus:outline-none focus:border-[#2D2D2A] focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-widest text-[#171716] mb-2">
                      Your Email <span className="text-[#171716]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-5 py-3 rounded-full bg-[#FAF8F5] border border-[#DED8CF] text-sm text-[#171716] placeholder:text-[#8C867D] focus:outline-none focus:border-[#2D2D2A] focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-sans font-semibold uppercase tracking-widest text-[#171716] mb-2">
                    What is on your mind?
                  </label>
                  <select
                    value={formData.purpose}
                    onChange={(e) => setFormData({ ...formData, purpose: e.target.value as any })}
                    className="w-full px-5 py-3 rounded-full bg-[#FAF8F5] border border-[#DED8CF] text-sm text-[#171716] focus:outline-none focus:border-[#2D2D2A] focus:bg-white transition-all"
                  >
                    <option value="collaboration">Collaborative Pop-up or Chef Exchange</option>
                    <option value="partnership">Brand / Venue / Producer Partnership</option>
                    <option value="press">Food Writing, Media, or Podcast Inquiry</option>
                    <option value="idea">Creative Culinary Idea or Recipe Archiving</option>
                    <option value="say_hello">Just Saying Hello & Sharing Appreciation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-sans font-semibold uppercase tracking-widest text-[#171716] mb-2">
                    Your Message <span className="text-[#171716]">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Write your thoughts here..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-5 py-3 rounded-2xl bg-[#FAF8F5] border border-[#DED8CF] text-sm text-[#171716] placeholder:text-[#8C867D] focus:outline-none focus:border-[#2D2D2A] focus:bg-white transition-all"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    id="submit-contact-btn"
                    className="w-full py-4 rounded-full bg-[#2D2D2A] text-white hover:bg-[#171716] font-sans text-xs font-medium uppercase tracking-widest transition-all disabled:opacity-50 flex items-center justify-center space-x-2 cursor-pointer shadow-md hover:shadow-lg"
                  >
                    <Send className="w-3.5 h-3.5 text-[#EED485]" />
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
