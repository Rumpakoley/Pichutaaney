import React from 'react';
import { ArrowUpRight, Sparkles, Utensils, Calendar } from 'lucide-react';
import { motion } from 'motion/react';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-6 sm:pt-10 md:pt-12 pb-12 sm:pb-16 bg-[#F4ECE1] border-b border-[#E4D7C8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Bold, Confident Editorial Statement */}
          <div className="md:col-span-7 text-left space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="inline-block text-[10px] tracking-[0.25em] uppercase font-bold text-[#8B3A26] font-sans mb-3">
                AN INTUITIVE INDIAN TABLE • BY ENAKSHI
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-[50px] lg:text-[64px] xl:text-[72px] leading-[1.05] font-normal text-[#241E1A] tracking-tight">
                Cooking from<br />
                <span className="italic text-[#8B3A26] font-normal">Instinct</span>, Shaped by<br />
                Memory & Travel.
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-base sm:text-lg text-[#6E6258] font-light max-w-xl leading-relaxed"
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
                className="px-6 py-3 bg-[#8B3A26] text-[#FAF6F0] hover:bg-[#1F1A16] uppercase tracking-widest font-semibold transition-all duration-200 shadow-sm rounded-full inline-flex items-center space-x-1.5"
              >
                <span>Join Supper Club</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="#sample-menu"
                className="px-6 py-3 bg-[#FAF6F0] border border-[#DECFC0] text-[#241E1A] hover:border-[#8B3A26] hover:text-[#8B3A26] uppercase tracking-widest font-semibold transition-all duration-200 rounded-full inline-flex items-center space-x-1.5"
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
              className="bg-[#FAF6F0] border border-[#DECFC0] p-6 sm:p-8 rounded-2xl shadow-xl space-y-6 relative overflow-hidden group"
            >
              {/* Subtle top indicator */}
              <div className="flex items-center justify-between border-b border-[#DECFC0] pb-4">
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#8B3A26] font-bold">
                  EXPERIENCES & HOSTING
                </span>
                <span className="font-bengali text-sm font-semibold text-[#8B3A26]">
                  পিছুটান
                </span>
              </div>

              {/* 3 Clean Minimal Navigation Row Items */}
              <div className="space-y-3">
                <a
                  href="#supper-club"
                  className="p-3.5 rounded-xl border border-[#DECFC0] hover:border-[#8B3A26] hover:bg-[#F4ECE1] flex items-center justify-between transition-all duration-200 group/item block"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-[#8B3A26]/10 text-[#8B3A26] flex items-center justify-center font-serif text-sm font-bold">
                      01
                    </div>
                    <div>
                      <h4 className="font-serif text-base text-[#241E1A] font-normal group-hover/item:text-[#8B3A26] transition-colors">
                        Supper Club Waitlist
                      </h4>
                      <p className="text-[11px] text-[#6E6258] font-sans font-light">
                        14-guest communal seasonal drops
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#A1968A] group-hover/item:text-[#8B3A26] group-hover/item:translate-x-0.5 transition-transform" />
                </a>

                <a
                  href="#private-events"
                  className="p-3.5 rounded-xl border border-[#DECFC0] hover:border-[#8B3A26] hover:bg-[#F4ECE1] flex items-center justify-between transition-all duration-200 group/item block"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-[#8B3A26]/10 text-[#8B3A26] flex items-center justify-center font-serif text-sm font-bold">
                      02
                    </div>
                    <div>
                      <h4 className="font-serif text-base text-[#241E1A] font-normal group-hover/item:text-[#8B3A26] transition-colors">
                        Private Dining & Tables
                      </h4>
                      <p className="text-[11px] text-[#6E6258] font-sans font-light">
                        Bespoke celebrations & intimate evenings
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#A1968A] group-hover/item:text-[#8B3A26] group-hover/item:translate-x-0.5 transition-transform" />
                </a>

                <a
                  href="#sample-menu"
                  className="p-3.5 rounded-xl border border-[#DECFC0] hover:border-[#8B3A26] hover:bg-[#F4ECE1] flex items-center justify-between transition-all duration-200 group/item block"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-[#8B3A26]/10 text-[#8B3A26] flex items-center justify-center font-serif text-sm font-bold">
                      03
                    </div>
                    <div>
                      <h4 className="font-serif text-base text-[#241E1A] font-normal group-hover/item:text-[#8B3A26] transition-colors">
                        Printed Tasting Menus
                      </h4>
                      <p className="text-[11px] text-[#6E6258] font-sans font-light">
                        Four curated regional editions
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#A1968A] group-hover/item:text-[#8B3A26] group-hover/item:translate-x-0.5 transition-transform" />
                </a>
              </div>

              {/* Bottom quote note */}
              <div className="pt-2 text-center border-t border-[#DECFC0]">
                <p className="text-xs font-serif italic text-[#6E6258]">
                  “An invitation to dine unhurriedly around memory.”
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
