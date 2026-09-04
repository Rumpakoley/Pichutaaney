import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { motion } from 'motion/react';
import { RevealHeading, RevealText, StaggerContainer, StaggerItem } from './TextTransitions';

export const Hero: React.FC = () => {
  const [emailInput, setEmailInput] = useState('');
  const [quickJoined, setQuickJoined] = useState(false);

  const handleQuickJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    setQuickJoined(true);
    setTimeout(() => {
      const waitlistEl = document.getElementById('supper-club');
      if (waitlistEl) {
        waitlistEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 500);
  };

  return (
    <section className="relative pt-4 sm:pt-6 md:pt-8 pb-12 sm:pb-16 bg-[#FAFAF9] border-b border-[#E4E4E7] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Geometric Balance Asymmetrical Grid - Side-by-side from md (720px+) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 lg:gap-12 items-start">
          {/* Left Column (Editorial Headline, Intro & Two-column Balance) */}
          <div className="md:col-span-7 flex flex-col justify-between text-left">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                className="font-serif text-4xl sm:text-5xl md:text-[46px] lg:text-[62px] xl:text-[72px] leading-[1.05] font-normal text-[#18181B] tracking-tight"
              >
                Cooking from<br />
                <span className="italic text-[#853724] font-normal">Instinct</span>, Shaped by<br />
                Memory & Travel.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="mt-4 sm:mt-6 font-serif text-sm sm:text-base lg:text-[17px] leading-[1.65] text-[#3F3F46] font-normal max-w-xl"
              >
                My food is not bound by rigid formulas. It is an intuitive tapestry of memory, rhythm, and feel—rooted in where I come from in West Bengal, and shaped by all the landscapes, cities, and kitchens I have lived in and traveled to.
              </motion.p>
            </div>

            {/* Geometric Two-Column Balance Sub-grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 sm:mt-10 lg:mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8"
            >
              <div className="space-y-1.5 group">
                <span className="block font-sans text-[11px] tracking-[0.22em] uppercase font-bold text-[#853724] transition-transform group-hover:translate-x-0.5 duration-300">
                  ENAKSHI
                </span>
                <p className="font-sans text-xs sm:text-[13px] text-[#52525B] leading-relaxed font-light">
                  A cook guided by instinct and rhythm. Shaped by wandering, anchored in memory, and archivist of living kitchen notes.
                </p>
              </div>

              <div className="space-y-1.5 group">
                <span className="block font-sans text-[11px] tracking-[0.22em] uppercase font-bold text-[#853724] transition-transform group-hover:translate-x-0.5 duration-300">
                  THE PHILOSOPHY
                </span>
                <p className="font-sans text-xs sm:text-[13px] text-[#52525B] leading-relaxed font-light">
                  Pichhutaaney—the pull of the roots. Intuitive, travel-inspired dining connecting where we wander with where we come from.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Column (The Geometric Card Stack - directly visible beside headline) */}
          <div className="md:col-span-5 flex flex-col space-y-4 text-left mt-6 md:mt-0">
            {/* Card 1: Crisp White Bordered Box (Supper Club Waitlist) */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white border border-[#E4E4E7] p-5 sm:p-7 space-y-3 shadow-2xs hover:border-[#853724]/40 transition-colors duration-300"
            >
              <div>
                <span className="block font-sans text-[10px] sm:text-[10.5px] tracking-[0.25em] uppercase font-bold text-[#853724] mb-1.5">
                  SUPPER CLUB
                </span>
                <h2 className="font-serif text-xl sm:text-2xl lg:text-[26px] font-normal text-[#18181B] tracking-tight">
                  The Seasonal Waitlist
                </h2>
                <p className="mt-2 font-sans text-xs sm:text-[12.5px] text-[#52525B] leading-relaxed font-light">
                  Our dining experiences are intimate and unhurried. Be the first to receive invitations to upcoming pop-ups and secret table sessions.
                </p>
              </div>

              {quickJoined ? (
                <div className="flex items-center space-x-2 text-xs text-emerald-800 bg-emerald-50 p-2.5 border border-emerald-200">
                  <Check className="w-4 h-4 text-emerald-700" />
                  <span>Reserved! Redirecting to full waitlist form...</span>
                </div>
              ) : (
                <form onSubmit={handleQuickJoin} className="pt-2">
                  <div className="flex items-center justify-between border-b border-[#71717A] pb-1.5">
                    <input
                      type="email"
                      required
                      placeholder="Your email address"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      className="w-full bg-transparent text-xs sm:text-sm text-[#18181B] placeholder:text-[#A1A1AA] placeholder:italic focus:outline-none font-serif"
                    />
                    <button
                      type="submit"
                      className="ml-3 font-sans text-[10.5px] sm:text-[11px] uppercase tracking-widest font-bold text-[#18181B] hover:text-[#853724] transition-colors shrink-0 cursor-pointer"
                    >
                      JOIN
                    </button>
                  </div>
                </form>
              )}
            </motion.div>

            {/* Card 2: Rich Terracotta Card (Private Dining) */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[#853724] text-white p-5 sm:p-7 space-y-3 shadow-md hover:bg-[#722f1e] transition-colors duration-300"
            >
              <div>
                <span className="block font-sans text-[10px] sm:text-[10.5px] tracking-[0.25em] uppercase font-bold text-white/75 mb-1.5">
                  HOSTING
                </span>
                <h2 className="font-serif text-xl sm:text-2xl lg:text-[26px] font-normal text-white tracking-tight">
                  Private Dining
                </h2>
                <p className="mt-2 font-sans text-xs sm:text-[12.5px] text-white/85 leading-relaxed font-light">
                  From curated celebrations to specialist workshops, I host private dining experiences designed around your specific story and seasonal rhythms.
                </p>
              </div>

              <div className="pt-2">
                <a
                  href="#private-events"
                  className="block w-full py-2.5 text-center border border-white/40 text-white hover:bg-white hover:text-[#853724] font-sans text-[10.5px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold transition-colors duration-200"
                >
                  INQUIRY FORM
                </a>
              </div>
            </motion.div>

            {/* Card 3: Deep Obsidian Charcoal Card (Archives) */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[#18181B] text-white p-5 sm:p-7 space-y-3 shadow-md hover:bg-[#222226] transition-colors duration-300"
            >
              <div>
                <span className="block font-sans text-[10px] sm:text-[10.5px] tracking-[0.25em] uppercase font-bold text-[#A1A1AA] mb-1.5">
                  KITCHEN NOTES
                </span>
                <h2 className="font-serif text-xl sm:text-2xl lg:text-[26px] font-normal text-white tracking-tight">
                  Culinary Archive
                </h2>
                <p className="mt-2 font-sans text-xs sm:text-[12.5px] text-[#A1A1AA] leading-relaxed font-light">
                  Handwritten notes, seasonal harvests, and oral histories from the delta terroirs of Bengal.
                </p>
              </div>

              <div className="pt-2">
                <a
                  href="#kitchen-diaries"
                  className="block w-full py-2.5 text-center border border-white/30 text-white hover:bg-white hover:text-[#18181B] font-sans text-[10.5px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold transition-colors duration-200"
                >
                  EXPLORE ARCHIVES
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
