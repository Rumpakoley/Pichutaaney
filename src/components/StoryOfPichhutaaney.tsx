import React, { useRef } from 'react';
import { Feather, ScrollText, CheckCircle2 } from 'lucide-react';
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
  "In Bengali, Pichhutan describes the quiet backward glance—the irresistible pull of home that stays with you wherever you journey.",
];

const MANIFESTO_PARAGRAPHS = [
  "Food is not a formula. It lives in raw instinct, sensory memory, and the diverse tables where we broke bread with strangers who became friends.",
];

export const StoryOfPichhutaaney: React.FC = () => {
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
      {/* Organic Bengali Watermark */}
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
            The tender pull of roots, the geography of memory, and intuitive cooking shaped by life and wanderlust.
          </p>
        </div>

        {/* Part 1: Linguistic Meaning & The Manifesto */}
        <div
          ref={part1ContainerRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12"
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
                      className="flex flex-wrap text-sm leading-relaxed font-sans font-light text-[#52525B]"
                    >
                      {words.map((word, wIdx) => {
                        const globalIdx = etymologyAcc++;
                        const start = globalIdx / etymologyTotal;
                        const end = (globalIdx + 1) / etymologyTotal;

                        const cleanWord = word.replace(/[^a-zA-Z]/g, '');
                        const isAccent = ['Pichhutan', 'Pichhutaaney', 'home'].includes(cleanWord);

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
                <span>THE COOKING MANIFESTO</span>
              </div>
              
              <blockquote className="font-serif text-2xl sm:text-3xl font-light italic leading-snug text-white">
                “Food is not a rigid formula. It lives in raw instinct, in the sensory memories of places traveled, and in the warmth of the home hearth.”
              </blockquote>

              <div className="space-y-4">
                {manifestoWords.map((words, pIdx) => {
                  return (
                    <p
                      key={pIdx}
                      className="flex flex-wrap text-sm leading-relaxed font-sans font-light text-white/90"
                    >
                      {words.map((word, wIdx) => {
                        const globalIdx = manifestoAcc++;
                        const start = globalIdx / manifestoTotal;
                        const end = (globalIdx + 1) / manifestoTotal;

                        const cleanWord = word.replace(/[^a-zA-Z]/g, '');
                        const isAccent = ['instinct', 'memory', 'Pichhutaaney'].includes(cleanWord);

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
                <span className="text-white text-[11px] uppercase tracking-wider">Cooked by Instinct</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#853724]" />
                <span className="text-white text-[11px] uppercase tracking-wider">Shaped by Travel</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#853724]" />
                <span className="text-white text-[11px] uppercase tracking-wider">Anchored in Bengal</span>
              </span>
            </div>
          </div>
        </div>

        {/* Part 2: The 3 Core Tenets */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
          <div className="p-6 bg-white border border-[#E4E4E7]">
            <span className="font-serif text-3xl font-light text-[#853724]">01</span>
            <h4 className="font-serif text-xl text-[#18181B] mt-2 mb-1 font-normal">Instinct & Seasonality</h4>
            <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed font-sans font-light">
              Cooking unhurriedly with seasonal harvests, intuitive spices, and the rhythm of the flame.
            </p>
          </div>

          <div className="p-6 bg-white border border-[#E4E4E7]">
            <span className="font-serif text-3xl font-light text-[#853724]">02</span>
            <h4 className="font-serif text-xl text-[#18181B] mt-2 mb-1 font-normal">Shaped by Travel</h4>
            <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed font-sans font-light">
              Recipes enriched by landscapes, memories, and every kitchen and city called home.
            </p>
          </div>

          <div className="p-6 bg-[#853724] text-white border border-[#853724]">
            <span className="font-serif text-3xl font-light text-white/80">03</span>
            <h4 className="font-serif text-xl text-white mt-2 mb-1 font-normal">The Communal Table</h4>
            <p className="text-xs sm:text-sm text-white/85 leading-relaxed font-sans font-light">
              Unhurried dining, shared storytelling, and intimate gatherings where guests arrive as strangers and leave as friends.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
