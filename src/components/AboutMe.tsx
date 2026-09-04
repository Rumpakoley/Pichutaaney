import React, { useRef } from 'react';
import { BookMarked, MapPin, ArrowRight, Sparkles } from 'lucide-react';
import { motion, useScroll, useTransform, MotionValue } from 'motion/react';

interface ScrollWordProps {
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
  isAccent?: boolean;
}

const ScrollWord: React.FC<ScrollWordProps> = ({ children, progress, range, isAccent }) => {
  const opacity = useTransform(progress, range, [0.18, 1]);
  const color = useTransform(
    progress,
    range,
    [
      isAccent ? 'rgba(133, 55, 36, 0.22)' : 'rgba(24, 24, 27, 0.18)',
      isAccent ? '#853724' : '#18181B',
    ]
  );
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

const RAW_PARAGRAPHS = [
  "I come from West Bengal, where food was never merely sustenance—it was language, season, memory, and sentiment.",
  "I do not cook from rigid formulas. I cook from raw instincts: the sizzle of mustard oil heated to its golden smoking point, the intuitive pinch of spice, the rhythm of a simmering hearth, and the wisdom of women who cooked purely by feel.",
  "My palate has been shaped by wanderlust—by all the places I have lived in, the landscapes I have traveled through, and the diverse tables where I broke bread with strangers who became friends.",
  "Travel has expanded my worldview, but home remains the emotional anchor that holds my cooking true. Pichhutaaney is my tribute to that anchor—an intimate space where intuition, travel-shaped recipes, and the pull of home gather around one shared table.",
];

export const AboutMe: React.FC = () => {
  const storyContainerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: storyContainerRef,
    offset: ['start 0.85', 'end 0.35'],
  });

  const progressHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  // Calculate global word distribution across all 4 paragraphs
  const allParagraphWords = RAW_PARAGRAPHS.map((p) => p.split(' '));
  const totalWordsCount = allParagraphWords.reduce((acc, words) => acc + words.length, 0);

  let accumulatedWordIndex = 0;

  const pillars = [
    {
      number: '01',
      title: 'Instinct & Feel',
      desc: 'Cooking by intuition, aroma, and rhythm rather than standardized or rigid rules.',
      isDark: false,
    },
    {
      number: '02',
      title: 'Shaped by Travel',
      desc: 'Recipes layered with memories, landscapes, and every city and kitchen I’ve called home.',
      isDark: false,
    },
    {
      number: '03',
      title: 'The Anchor of Home',
      desc: 'Intimate, unhurried dinners celebrating the tender pull of where we come from.',
      isDark: true,
    },
  ];

  return (
    <section id="about-me" className="py-20 sm:py-28 bg-[#FAFAF9] border-b border-[#E4E4E7] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl text-left mb-16"
        >
          <span className="block font-sans text-[10px] tracking-[0.25em] uppercase font-bold text-[#853724] mb-2">
            THE INTUITIVE COOK & STORYTELLER
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-[#18181B] tracking-tight">
            About Me, <span className="italic text-[#853724]">Enakshi</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#52525B] font-light leading-relaxed">
            A cook guided by instinct, sensory memory, and recipes shaped by all the places I have lived and traveled to.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Portrait & Visual Note (Sticky during scroll) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 space-y-4 lg:sticky lg:top-28"
          >
            <div className="border border-[#E4E4E7] bg-white p-3 shadow-xs">
              <div className="relative overflow-hidden bg-[#FAFAF9] group">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80"
                  alt="Enakshi, founder and culinary host of Pichhutaaney"
                  referrerPolicy="no-referrer"
                  className="w-full h-[420px] sm:h-[460px] object-cover filter contrast-[1.02] brightness-[0.98] transition-transform duration-700 ease-out group-hover:scale-105"
                />
                
                {/* Overlay quote with clean hairline border */}
                <div className="absolute bottom-0 inset-x-0 bg-[#18181B]/95 p-5 text-white text-left border-t border-[#18181B]">
                  <p className="font-serif text-lg italic leading-snug">
                    “Travel has shaped me, but home is always the anchor.”
                  </p>
                  <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#853724] mt-2 font-bold">
                    Enakshi • West Bengal to the World
                  </p>
                </div>
              </div>
            </div>

            {/* Micro details strip */}
            <div className="bg-white border border-[#E4E4E7] p-4 flex items-center justify-between text-xs text-[#52525B]">
              <div className="flex items-center space-x-2">
                <MapPin className="w-3.5 h-3.5 text-[#853724]" />
                <span className="font-sans text-[11px] uppercase tracking-wider font-medium">Roots in West Bengal</span>
              </div>
              <span className="text-[#E4E4E7]">/</span>
              <div className="flex items-center space-x-2">
                <BookMarked className="w-3.5 h-3.5 text-[#853724]" />
                <span className="font-sans text-[11px] uppercase tracking-wider font-medium">Heirloom Recipe Collector</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Personal Story with Word-by-Word Scroll Scrubber Transition */}
          <div className="lg:col-span-7 space-y-10 text-left">
            {/* Scroll Scrubber Container */}
            <div
              ref={storyContainerRef}
              className="relative pl-6 sm:pl-8 space-y-8"
            >
              {/* Vertical Scroll Progress Track Line */}
              <div className="absolute left-0 top-1 bottom-1 w-[2px] bg-[#E4E4E7]">
                <motion.div
                  style={{ height: progressHeight }}
                  className="w-full bg-[#853724] transition-all origin-top"
                />
              </div>

              {/* Word-by-word Illuminated Paragraphs */}
              {allParagraphWords.map((words, pIdx) => {
                return (
                  <p
                    key={pIdx}
                    className="flex flex-wrap text-base sm:text-lg lg:text-[19px] leading-[1.8] font-sans font-light"
                  >
                    {words.map((word, wIdx) => {
                      const wordGlobalIdx = accumulatedWordIndex++;
                      const start = wordGlobalIdx / totalWordsCount;
                      const end = (wordGlobalIdx + 1) / totalWordsCount;

                      const cleanWord = word.replace(/[^a-zA-Z]/g, '');
                      const isAccent = ['Bengal', 'West', 'Pichhutaaney'].includes(cleanWord);

                      return (
                        <ScrollWord
                          key={`${pIdx}-${wIdx}`}
                          progress={scrollYProgress}
                          range={[start, end]}
                          isAccent={isAccent}
                        >
                          {word}
                        </ScrollWord>
                      );
                    })}
                  </p>
                );
              })}
            </div>

            {/* Guiding Principles Cards matching Geometric Balance */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {pillars.map((pillar, idx) => (
                <motion.div
                  key={pillar.number}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{
                    duration: 0.6,
                    delay: 0.2 + idx * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`p-5 text-left border transition-all duration-300 hover:-translate-y-1 ${
                    pillar.isDark
                      ? 'bg-[#853724] text-white border-[#853724] shadow-xs'
                      : 'bg-white border-[#E4E4E7] hover:border-[#853724]'
                  }`}
                >
                  <span
                    className={`block text-[10px] uppercase tracking-[0.25em] font-sans font-bold mb-1 ${
                      pillar.isDark ? 'text-white/70' : 'text-[#853724]'
                    }`}
                  >
                    PILLAR {pillar.number}
                  </span>
                  <h4
                    className={`font-serif text-xl font-normal ${
                      pillar.isDark ? 'text-white' : 'text-[#18181B]'
                    }`}
                  >
                    {pillar.title}
                  </h4>
                  <p
                    className={`mt-2 text-xs font-sans leading-relaxed font-light ${
                      pillar.isDark ? 'text-white/85' : 'text-[#52525B]'
                    }`}
                  >
                    {pillar.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="pt-2"
            >
              <a
                href="#story-of-pichhutaaney"
                className="inline-flex items-center space-x-2 font-sans text-xs uppercase tracking-[0.2em] text-[#18181B] hover:text-[#853724] transition-colors font-semibold group"
              >
                <span>Read the regional manifesto</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};


