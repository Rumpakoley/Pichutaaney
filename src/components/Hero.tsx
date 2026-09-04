import React, { useState } from 'react';
import { Check } from 'lucide-react';

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
    <section className="relative pt-4 sm:pt-6 md:pt-8 pb-12 sm:pb-16 bg-[#FAFAF9] border-b border-[#E4E4E7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Geometric Balance Asymmetrical Grid - Side-by-side from md (720px+) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 lg:gap-12 items-start">
          {/* Left Column (Editorial Headline, Intro & Two-column Balance) */}
          <div className="md:col-span-7 flex flex-col justify-between text-left">
            <div>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-[46px] lg:text-[62px] xl:text-[72px] leading-[1.05] font-normal text-[#18181B] tracking-tight">
                Preserving the<br />
                <span className="italic text-[#853724] font-normal">Legacy</span> of the<br />
                Regional Table.
              </h1>

              <p className="mt-4 sm:mt-6 font-serif text-sm sm:text-base lg:text-[17px] leading-[1.65] text-[#3F3F46] font-normal max-w-xl">
                Indian food is not one cuisine; it is a vast, layered map of memory and soil. From the mustard oils of West Bengal to the coconut groves of the South, I invite you to discover the quieter stories that rarely travel beyond the village kitchen.
              </p>
            </div>

            {/* Geometric Two-Column Balance Sub-grid (Direct match to 1.png) */}
            <div className="mt-8 sm:mt-10 lg:mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              <div className="space-y-1.5">
                <span className="block font-sans text-[11px] tracking-[0.22em] uppercase font-bold text-[#853724]">
                  ENAKSHI
                </span>
                <p className="font-sans text-xs sm:text-[13px] text-[#52525B] leading-relaxed font-light">
                  A cook rooted in heritage, travel-shaped but home-anchored. Curator of kitchen diaries and handwritten legacy.
                </p>
              </div>

              <div className="space-y-1.5">
                <span className="block font-sans text-[11px] tracking-[0.22em] uppercase font-bold text-[#853724]">
                  THE PHILOSOPHY
                </span>
                <p className="font-sans text-xs sm:text-[13px] text-[#52525B] leading-relaxed font-light">
                  Pichhutaaney—the pull of the roots. Bringing hyper-regional flavors to the contemporary table through intentional dining.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column (The Geometric Card Stack - directly visible beside headline) */}
          <div className="md:col-span-5 flex flex-col space-y-4 text-left mt-6 md:mt-0">
            {/* Card 1: Crisp White Bordered Box (Supper Club Waitlist) */}
            <div className="bg-white border border-[#E4E4E7] p-5 sm:p-7 space-y-3 shadow-2xs">
              <div>
                <span className="block font-sans text-[10px] sm:text-[10.5px] tracking-[0.25em] uppercase font-bold text-[#853724] mb-1.5">
                  SUPPER CLUB
                </span>
                <h2 className="font-serif text-xl sm:text-2xl lg:text-[26px] font-normal text-[#18181B] tracking-tight">
                  The Seasonal Waitlist
                </h2>
                <p className="mt-2 font-sans text-xs sm:text-[12.5px] text-[#52525B] leading-relaxed font-light">
                  Our dining experiences are intimate and rare. Be the first to receive invitations to our upcoming regional pop ups and secret table sessions.
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
                      className="ml-3 font-sans text-[10.5px] sm:text-[11px] uppercase tracking-widest font-bold text-[#18181B] hover:text-[#853724] transition-colors shrink-0"
                    >
                      JOIN
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Card 2: Rich Terracotta Card (Private Dining) */}
            <div className="bg-[#853724] text-white p-5 sm:p-7 space-y-3">
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
                  className="block w-full py-2.5 text-center border border-white/40 text-white hover:bg-white hover:text-[#853724] font-sans text-[10.5px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold transition-colors"
                >
                  INQUIRY FORM
                </a>
              </div>
            </div>

            {/* Card 3: Deep Obsidian Charcoal Card (Archives) */}
            <div className="bg-[#18181B] text-white p-5 sm:p-7 space-y-3">
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
                  className="block w-full py-2.5 text-center border border-white/30 text-white hover:bg-white hover:text-[#18181B] font-sans text-[10.5px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold transition-colors"
                >
                  EXPLORE ARCHIVES
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
