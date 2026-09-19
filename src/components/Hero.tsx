import React from 'react';
import { ArrowUpRight, Sparkles, Utensils, Calendar } from 'lucide-react';
import { motion } from 'motion/react';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-6 sm:pt-10 md:pt-12 pb-12 sm:pb-16 bg-[#FAFAF9] border-b border-[#E4E4E7] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Bold, Confident Editorial Statement */}
          <div className="md:col-span-7 text-left space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="inline-block text-[10px] tracking-[0.25em] uppercase font-bold text-[#853724] font-sans mb-3">
                AN INTUITIVE INDIAN TABLE • BY ENAKSHI
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-[50px] lg:text-[64px] xl:text-[72px] leading-[1.05] font-normal text-[#18181B] tracking-tight">
                Cooking from<br />
                <span className="italic text-[#853724] font-normal">Instinct</span>, Shaped by<br />
                Memory & Travel.
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-base sm:text-lg text-[#52525B] font-light max-w-xl leading-relaxed"
            >
              An unhurried communal table rooted in the warmth of West Bengal, shaped by everywhere I have lived and traveled.
            </motion.p>

            {/* Quick Action Pills */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4 font-sans text-xs"
            >
              <a
                href="#supper-club"
                className="px-6 py-3 bg-[#853724] text-white hover:bg-[#18181B] uppercase tracking-widest font-semibold transition-all duration-200 shadow-sm rounded-full inline-flex items-center space-x-1.5"
              >
                <span>Join Supper Club</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="#sample-menu"
                className="px-6 py-3 bg-white border border-[#E4E4E7] text-[#18181B] hover:border-[#853724] hover:text-[#853724] uppercase tracking-widest font-semibold transition-all duration-200 rounded-full inline-flex items-center space-x-1.5"
              >
                <span>Tasting Menus</span>
              </a>
            </motion.div>
          </div>

          {/* Right Column: Clean Visual Invitation Card */}
          <div className="md:col-span-5 text-left">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white border border-[#E4E4E7] p-6 sm:p-8 rounded-2xl shadow-xl space-y-6 relative overflow-hidden group"
            >
              {/* Subtle top indicator */}
              <div className="flex items-center justify-between border-b border-[#E4E4E7] pb-4">
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#853724] font-bold">
                  EXPERIENCES & HOSTING
                </span>
                <span className="font-bengali text-sm font-semibold text-[#853724]">
                  পিছুটান
                </span>
              </div>

              {/* 3 Clean Minimal Navigation Row Items */}
              <div className="space-y-3">
                <a
                  href="#supper-club"
                  className="p-3.5 rounded-xl border border-[#E4E4E7] hover:border-[#853724] hover:bg-[#FAFAF9] flex items-center justify-between transition-all duration-200 group/item block"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-[#853724]/10 text-[#853724] flex items-center justify-center font-serif text-sm font-bold">
                      01
                    </div>
                    <div>
                      <h4 className="font-serif text-base text-[#18181B] font-normal group-hover/item:text-[#853724] transition-colors">
                        Supper Club Waitlist
                      </h4>
                      <p className="text-[11px] text-[#71717A] font-sans font-light">
                        14-guest communal seasonal drops
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#A1A1AA] group-hover/item:text-[#853724] group-hover/item:translate-x-0.5 transition-transform" />
                </a>

                <a
                  href="#private-events"
                  className="p-3.5 rounded-xl border border-[#E4E4E7] hover:border-[#853724] hover:bg-[#FAFAF9] flex items-center justify-between transition-all duration-200 group/item block"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-[#853724]/10 text-[#853724] flex items-center justify-center font-serif text-sm font-bold">
                      02
                    </div>
                    <div>
                      <h4 className="font-serif text-base text-[#18181B] font-normal group-hover/item:text-[#853724] transition-colors">
                        Private Dining & Tables
                      </h4>
                      <p className="text-[11px] text-[#71717A] font-sans font-light">
                        Bespoke celebrations & intimate evenings
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#A1A1AA] group-hover/item:text-[#853724] group-hover/item:translate-x-0.5 transition-transform" />
                </a>

                <a
                  href="#sample-menu"
                  className="p-3.5 rounded-xl border border-[#E4E4E7] hover:border-[#853724] hover:bg-[#FAFAF9] flex items-center justify-between transition-all duration-200 group/item block"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-[#853724]/10 text-[#853724] flex items-center justify-center font-serif text-sm font-bold">
                      03
                    </div>
                    <div>
                      <h4 className="font-serif text-base text-[#18181B] font-normal group-hover/item:text-[#853724] transition-colors">
                        Printed Tasting Menus
                      </h4>
                      <p className="text-[11px] text-[#71717A] font-sans font-light">
                        Four curated regional editions
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#A1A1AA] group-hover/item:text-[#853724] group-hover/item:translate-x-0.5 transition-transform" />
                </a>
              </div>

              {/* Bottom quote note */}
              <div className="pt-2 text-xs italic font-serif text-[#853724] text-center border-t border-[#E4E4E7]/60">
                “No rigid formulas—just the pull of memory and instinct.”
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
