import React, { useRef } from 'react';
import { BookMarked, MapPin, ArrowRight, Sparkles, Utensils, Compass, Heart } from 'lucide-react';
import { motion, useScroll, useTransform, MotionValue } from 'motion/react';

interface ScrollWordProps {
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
  isAccent?: boolean;
}

const ScrollWord: React.FC<ScrollWordProps> = ({ children, progress, range, isAccent }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);
  const color = useTransform(
    progress,
    range,
    [
      isAccent ? 'rgba(45, 45, 42, 0.3)' : 'rgba(45, 45, 42, 0.25)',
      isAccent ? '#171716' : '#2D2D2A',
    ]
  );
  const y = useTransform(progress, range, [2, 0]);

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
  "I cook from raw instinct and memory—guided by the sizzle of golden mustard oil, the intuitive pinch of spice, and the warmth of the hearth.",
  "My recipes are shaped by all the places I have lived and traveled to, rooted always in the quiet emotional anchor of West Bengal.",
];

export const AboutMe: React.FC = () => {
  const storyContainerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: storyContainerRef,
    offset: ['start 0.85', 'end 0.35'],
  });

  const progressHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  // Calculate global word distribution across all paragraphs
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
    <section id="about-me" className="py-20 sm:py-28 bg-[#E9E4DD] border-b border-[#DED8CF] overflow-hidden text-[#2D2D2A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl text-left mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full text-[11px] font-sans font-medium tracking-[0.2em] uppercase bg-white/80 border border-[#DED8CF] text-[#2D2D2A] mb-4">
            A Note From The Founder
          </span>
          <h2 className="font-marcellus text-4xl sm:text-5xl md:text-6xl font-normal text-[#171716] tracking-tight">
            About Me, <span className="font-pt-serif italic">Enakshi</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#55524E] font-sans font-light leading-relaxed">
            A cook guided by instinct, sensory memory, and recipes shaped by all the places I have lived and traveled to.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Portrait & Visual Note */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 space-y-4 lg:sticky lg:top-28"
          >
            <div className="rounded-3xl border border-[#DED8CF] bg-white p-3 shadow-md overflow-hidden">
              <div className="relative rounded-2xl overflow-hidden bg-[#E9E4DD] group">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80"
                  alt="Enakshi, founder and culinary host of Pichhutaaney"
                  referrerPolicy="no-referrer"
                  className="w-full h-[420px] sm:h-[460px] object-cover filter contrast-[1.02] brightness-[0.98] transition-transform duration-700 ease-out group-hover:scale-105"
                />
                
                {/* Overlay quote with clean rounded frame */}
                <div className="absolute bottom-0 inset-x-0 bg-[#171716]/90 backdrop-blur-sm p-6 text-white text-left border-t border-white/10">
                  <p className="font-pt-serif text-lg sm:text-xl italic leading-snug">
                    “Travel has shaped me, but home is always the anchor.”
                  </p>
                  <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#EED485] mt-2 font-medium">
                    Enakshi • West Bengal to the World
                  </p>
                </div>
              </div>
            </div>

            {/* Micro details strip */}
            <div className="bg-white rounded-full border border-[#DED8CF] px-6 py-3.5 flex items-center justify-between text-xs text-[#55524E] shadow-sm">
              <div className="flex items-center space-x-2">
                <MapPin className="w-3.5 h-3.5 text-[#2D2D2A]" />
                <span className="font-sans text-[11px] uppercase tracking-wider font-medium text-[#171716]">Roots in West Bengal</span>
              </div>
              <span className="text-[#DED8CF]">/</span>
              <div className="flex items-center space-x-2">
                <BookMarked className="w-3.5 h-3.5 text-[#2D2D2A]" />
                <span className="font-sans text-[11px] uppercase tracking-wider font-medium text-[#171716]">Heirloom Collector</span>
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
              <div className="absolute left-0 top-1 bottom-1 w-[2px] bg-[#DED8CF]">
                <motion.div
                  style={{ height: progressHeight }}
                  className="w-full bg-[#171716] transition-all origin-top"
                />
              </div>

              {/* Word-by-word Illuminated Paragraphs */}
              {allParagraphWords.map((words, pIdx) => {
                return (
                  <p
                    key={pIdx}
                    className="flex flex-wrap text-lg sm:text-xl lg:text-[22px] leading-[1.8] font-pt-serif"
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

            {/* Guiding Principles Cards */}
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
                  className={`p-6 rounded-2xl text-left border transition-all duration-300 hover:-translate-y-1 shadow-sm ${
                    pillar.isDark
                      ? 'bg-[#171716] text-white border-[#171716]'
                      : 'bg-white border-[#DED8CF] hover:border-[#2D2D2A]'
                  }`}
                >
                  <span
                    className={`block text-[10px] uppercase tracking-[0.25em] font-sans font-bold mb-2 ${
                      pillar.isDark ? 'text-[#EED485]' : 'text-[#8C867D]'
                    }`}
                  >
                    PILLAR {pillar.number}
                  </span>
                  <h4
                    className={`font-marcellus text-xl font-normal ${
                      pillar.isDark ? 'text-white' : 'text-[#171716]'
                    }`}
                  >
                    {pillar.title}
                  </h4>
                  <p
                    className={`mt-2 text-xs font-sans leading-relaxed font-light ${
                      pillar.isDark ? 'text-white/80' : 'text-[#55524E]'
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
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-[#2D2D2A] text-white hover:bg-[#171716] font-sans text-xs uppercase tracking-[0.2em] font-medium transition-all shadow-sm hover:shadow-md group"
              >
                <span>Read the regional story</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1 text-[#EED485]" />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
