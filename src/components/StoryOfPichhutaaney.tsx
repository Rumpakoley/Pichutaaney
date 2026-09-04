import React, { useState, useRef } from 'react';
import { REGIONAL_PILLARS, MANIFESTO_TEXT } from '../data/content';
import { Feather, Flame, Sparkles, ScrollText, CheckCircle2, ChevronRight } from 'lucide-react';
import { motion, useScroll, useTransform, MotionValue } from 'motion/react';

interface StoryWordProps {
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
  theme?: 'light' | 'dark';
  isAccent?: boolean;
}

const StoryWord: React.FC<StoryWordProps> = ({
  children,
  progress,
  range,
  theme = 'light',
  isAccent = false,
}) => {
  const opacity = useTransform(progress, range, [0.18, 1]);

  const lightDefault = 'rgba(24, 24, 27, 0.22)';
  const lightActive = '#18181B';
  const lightAccentDefault = 'rgba(133, 55, 36, 0.28)';
  const lightAccentActive = '#853724';

  const darkDefault = 'rgba(255, 255, 255, 0.22)';
  const darkActive = '#FFFFFF';
  const darkAccentDefault = 'rgba(243, 148, 126, 0.3)';
  const darkAccentActive = '#F3947E';

  const initialColor = theme === 'dark'
    ? (isAccent ? darkAccentDefault : darkDefault)
    : (isAccent ? lightAccentDefault : lightDefault);

  const activeColor = theme === 'dark'
    ? (isAccent ? darkAccentActive : darkActive)
    : (isAccent ? lightAccentActive : lightActive);

  const color = useTransform(progress, range, [initialColor, activeColor]);
  const y = useTransform(progress, range, [2.5, 0]);

  return (
    <motion.span
      style={{ opacity, color, y }}
      className={`inline-block mr-[0.28em] select-none md:select-auto ${
        isAccent ? 'font-medium' : ''
      }`}
    >
      {children}
    </motion.span>
  );
};

const ETYMOLOGY_PARAGRAPHS = [
  "In Bengali, Pichhutan describes that quiet anchor—the backward glance, the lingering scent of mother’s mustard tempering, the subtle gravitational pull of home that stays with you no matter how far across oceans you travel.",
  "Pichhutaaney was born out of honoring that pull. It is an intentional rejection of the commercialization that reduces subcontinental cooking to three dishes.",
];

const MANIFESTO_PARAGRAPHS = [
  "Outside India, Indian food is too often treated as a monolith: heavy cream, generic curry powder, and restaurant shortcuts.",
  "Yet India encompasses over 28 states, distinct agro-climatic belts, and thousands of grandmotherly kitchens. In Bengal alone, a change in wind brings five seasonal variations of a single stew. Pichhutaaney is dedicated to restoring that reverence, course by course.",
];

export const StoryOfPichhutaaney: React.FC = () => {
  const [activePillarIndex, setActivePillarIndex] = useState<number>(0);
  const part1ContainerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: part1ContainerRef,
    offset: ['start 0.85', 'end 0.35'],
  });

  const etymologyWords = ETYMOLOGY_PARAGRAPHS.map((p) => p.split(' '));
  const etymologyTotal = etymologyWords.reduce((acc, w) => acc + w.length, 0);
  let etymologyAcc = 0;

  const manifestoWords = MANIFESTO_PARAGRAPHS.map((p) => p.split(' '));
  const manifestoTotal = manifestoWords.reduce((acc, w) => acc + w.length, 0);
  let manifestoAcc = 0;

  return (
    <section id="story-of-pichhutaaney" className="py-20 sm:py-28 bg-[#FAFAF9] border-b border-[#E4E4E7] relative overflow-hidden">
      {/* Organic Bengali Watermark - Full glyph height preserved without clipping */}
      <div className="absolute right-4 sm:right-8 lg:right-12 top-2 sm:top-4 select-none pointer-events-none z-0 opacity-[0.06]">
        <span className="font-bengali text-5xl sm:text-7xl md:text-8xl lg:text-[105px] font-normal leading-normal text-[#18181B] tracking-normal inline-block py-2">
          পিছুটান
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl text-left mb-16">
          <span className="block font-sans text-[10px] tracking-[0.25em] uppercase font-bold text-[#853724] mb-2">
            ORIGINS & PHILOSOPHY
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-[#18181B] tracking-tight">
            The Story of <span className="italic text-[#853724]">Pichhutaaney</span>
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#52525B] font-light leading-relaxed">
            The tender pull of roots, the geography of memory, and why quieter culinary stories matter.
          </p>
        </div>

        {/* Part 1: The Meaning of the Word & The Manifesto with Scroll Word Illumination */}
        <div
          ref={part1ContainerRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16"
        >
          {/* Card 1: Linguistic Meaning */}
          <div className="lg:col-span-5 bg-white p-8 border border-[#E4E4E7] flex flex-col justify-between text-left shadow-xs">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#E4E4E7] pb-4">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#52525B] font-sans font-semibold">
                  BENGALI ETYMOLOGY
                </span>
                <span className="font-bengali text-2xl font-medium text-[#853724]">পিছুটান</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#18181B] leading-snug">
                “The gentle, irresistible tug toward where you came from.”
              </h3>

              <div className="space-y-4">
                {etymologyWords.map((words, pIdx) => {
                  return (
                    <p
                      key={pIdx}
                      className="flex flex-wrap text-xs sm:text-sm leading-relaxed font-sans font-light"
                    >
                      {words.map((word, wIdx) => {
                        const globalIdx = etymologyAcc++;
                        const start = globalIdx / etymologyTotal;
                        const end = (globalIdx + 1) / etymologyTotal;

                        const cleanWord = word.replace(/[^a-zA-Z]/g, '');
                        const isAccent = ['Pichhutan', 'Pichhutaaney'].includes(cleanWord);

                        return (
                          <StoryWord
                            key={`etym-${pIdx}-${wIdx}`}
                            progress={scrollYProgress}
                            range={[start, end]}
                            theme="light"
                            isAccent={isAccent}
                          >
                            {word}
                          </StoryWord>
                        );
                      })}
                    </p>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#E4E4E7] flex items-center space-x-3 text-xs text-[#52525B]">
              <Feather className="w-4 h-4 text-[#853724] shrink-0" />
              <span className="font-serif italic text-sm text-[#18181B]">“If we don’t bring these quieter stories to the table, who will?”</span>
            </div>
          </div>

          {/* Card 2: The Manifesto */}
          <div className="lg:col-span-7 bg-[#18181B] text-white p-8 sm:p-10 border border-[#18181B] flex flex-col justify-between text-left shadow-md">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 text-[10px] uppercase tracking-[0.25em] text-[#853724] font-sans font-bold">
                <ScrollText className="w-3.5 h-3.5" />
                <span>THE REGIONAL MANIFESTO</span>
              </div>
              
              <blockquote className="font-serif text-2xl sm:text-3xl font-light italic leading-snug text-white">
                “Preserving culture isn’t just about monuments. It lives in kitchen diaries, in handwritten recipes, in the way something is tempered or plated. That, too, is legacy.”
              </blockquote>

              <div className="space-y-4">
                {manifestoWords.map((words, pIdx) => {
                  return (
                    <p
                      key={pIdx}
                      className="flex flex-wrap text-xs sm:text-sm leading-relaxed font-sans font-light"
                    >
                      {words.map((word, wIdx) => {
                        const globalIdx = manifestoAcc++;
                        const start = globalIdx / manifestoTotal;
                        const end = (globalIdx + 1) / manifestoTotal;

                        const cleanWord = word.replace(/[^a-zA-Z]/g, '');
                        const isAccent = ['Bengal', 'Pichhutaaney', '28'].includes(cleanWord);

                        return (
                          <StoryWord
                            key={`manif-${pIdx}-${wIdx}`}
                            progress={scrollYProgress}
                            range={[start, end]}
                            theme="dark"
                            isAccent={isAccent}
                          >
                            {word}
                          </StoryWord>
                        );
                      })}
                    </p>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/15 flex flex-wrap items-center gap-4 text-xs font-sans text-white/90">
              <span className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#853724]" />
                <span className="text-white text-[11px] uppercase tracking-wider">Zero Commercial Pastes</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#853724]" />
                <span className="text-white text-[11px] uppercase tracking-wider">Single-Hearth Handcrafting</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#853724]" />
                <span className="text-white text-[11px] uppercase tracking-wider">Micro-Seasonal Integrity</span>
              </span>
            </div>
          </div>
        </div>

        {/* Part 2: Interactive Regional Terroir Explorer */}
        <div className="mt-12 bg-white border border-[#E4E4E7] p-6 sm:p-10 text-left">
          <div className="max-w-2xl mb-8">
            <span className="text-[10px] uppercase tracking-[0.25em] font-sans text-[#853724] font-bold block mb-1">
              THE LIVING LANDSCAPE
            </span>
            <h3 className="font-serif text-3xl font-normal text-[#18181B]">
              “Every few hundred kilometers, everything shifts...”
            </h3>
            <p className="text-xs sm:text-sm text-[#52525B] mt-1.5 font-sans font-light">
              Explore how climate, soil, and technique shape diverse regional Indian culinary identities.
            </p>
          </div>

          {/* Region Tabs with Sharp Borders */}
          <div className="flex flex-wrap gap-2 border-b border-[#E4E4E7] pb-4 mb-6">
            {REGIONAL_PILLARS.map((pillar, idx) => (
              <button
                key={pillar.region}
                onClick={() => setActivePillarIndex(idx)}
                className={`px-4 py-2.5 text-xs font-sans uppercase tracking-[0.18em] transition-all ${
                  activePillarIndex === idx
                    ? 'bg-[#18181B] text-white font-semibold'
                    : 'border border-[#E4E4E7] text-[#52525B] hover:border-[#18181B] hover:text-[#18181B] bg-[#FAFAF9]'
                }`}
              >
                {pillar.region}
              </button>
            ))}
          </div>

          {/* Active Region Display */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 space-y-4">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#853724] font-sans font-bold">
                  SIGNATURE ANCHOR
                </span>
                <h4 className="font-serif text-2xl sm:text-3xl text-[#18181B] mt-0.5 font-normal">
                  {REGIONAL_PILLARS[activePillarIndex].anchorIngredient}
                </h4>
              </div>
              <p className="text-sm sm:text-base text-[#52525B] leading-relaxed font-sans font-light">
                {REGIONAL_PILLARS[activePillarIndex].description}
              </p>
              <div className="p-4 bg-[#FAFAF9] border-l-2 border-[#853724] text-xs text-[#18181B] italic font-serif text-sm">
                {REGIONAL_PILLARS[activePillarIndex].nuance}
              </div>
            </div>

            <div className="md:col-span-4 bg-[#853724] text-white p-6 border border-[#853724] text-xs space-y-3">
              <span className="text-[10px] uppercase font-bold text-white/80 tracking-[0.2em] block font-sans">
                AT THE PICHHUTAANEY TABLE
              </span>
              <p className="text-white/85 leading-relaxed font-sans text-xs font-light">
                We celebrate West Bengal as our foundation while contextualizing each course within this larger, vibrant tapestry of Indian agro-climates.
              </p>
              <a
                href="#supper-club"
                className="inline-flex items-center space-x-1 font-sans text-[11px] uppercase tracking-widest text-white font-semibold hover:underline pt-1"
              >
                <span>Taste it at an upcoming supper club</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Part 3: The 3 Core Values */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
          <div className="p-6 bg-white border border-[#E4E4E7]">
            <span className="font-serif text-3xl font-light text-[#853724]">01</span>
            <h4 className="font-serif text-xl text-[#18181B] mt-2 mb-1.5 font-normal">Honoring Seasonality</h4>
            <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed font-sans font-light">
              Following Bengal’s traditional six seasons (Shad-Ritu). We cook with winter date palm jaggery only in winter, and fresh mustard greens when the frost sets in.
            </p>
          </div>

          <div className="p-6 bg-white border border-[#E4E4E7]">
            <span className="font-serif text-3xl font-light text-[#853724]">02</span>
            <h4 className="font-serif text-xl text-[#18181B] mt-2 mb-1.5 font-normal">The Living Kitchen Diary</h4>
            <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed font-sans font-light">
              Every menu item is paired with the handwritten recipe diary and culinary lore that inspired it—giving credit to the mothers, aunts, and grandmothers who guarded them.
            </p>
          </div>

          <div className="p-6 bg-[#853724] text-white border border-[#853724]">
            <span className="font-serif text-3xl font-light text-white/80">03</span>
            <h4 className="font-serif text-xl text-white mt-2 mb-1.5 font-normal">Unhurried Hospitality</h4>
            <p className="text-xs sm:text-sm text-white/85 leading-relaxed font-sans font-light">
              We reject high-turnover restaurant seatings. A meal at Pichhutaaney is an unhurried, three-hour communion of storytelling, shared plates, and deep conversation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
