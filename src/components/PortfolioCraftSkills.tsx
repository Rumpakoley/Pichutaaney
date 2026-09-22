import React from 'react';
import { motion } from 'motion/react';
import { FileText, Download, Sparkles, Utensils, Award } from 'lucide-react';

const CULINARY_DISCIPLINES = [
  {
    num: '01',
    name: 'Sensory Tempering & Mustard Smoke Point',
    level: 'Intuitive Mastery',
    description: 'Panch phoron, whole cumin, and kalo jeere bloomed in smoking cold-pressed mustard oil. Cooking guided by sound, aroma, and rhythm rather than standardized timers.',
  },
  {
    num: '02',
    name: 'Zero-Waste & Root-To-Stem Preparation',
    level: 'Heirloom Ethos',
    description: 'Crisp potato peels, tender neem leaves, and jackfruit seeds celebrated as stars. A tribute to the frugality and deep care of generational home kitchens.',
  },
  {
    num: '03',
    name: 'Living Fermentations & Delta Terroir',
    level: 'Probiotic Heritage',
    description: 'Overnight fermented pantaa bhaat, kashundi mustard ferments, and wild seasonal sourings bridging Bengal river deltas with global palates.',
  },
  {
    num: '04',
    name: 'Unhurried Communal Tablescaping',
    level: 'Communal Craft',
    description: 'Crafting intimate course-by-course gatherings where strangers become dinner companions, bound by shared memory and heartfelt storytelling.',
  },
];

export const PortfolioCraftSkills: React.FC = () => {
  return (
    <section id="culinary-craft" className="bg-[#0e0e0e] text-white border-t-2 border-b-2 border-black py-20 text-left">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Sticky Column */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-4">
          <div className="space-y-2">
            <span className="font-mono text-xs text-[#ffd177] uppercase tracking-widest font-black block">
              Foundational Disciplines
            </span>
            <h2 className="font-marcellus text-3xl sm:text-4xl font-normal text-white tracking-tight">
              Culinary craft & disciplines
            </h2>
          </div>

          <p className="font-sans text-sm text-white/70 leading-relaxed max-w-sm font-light">
            Enakshi’s intuitive tempering methods, zero-waste kitchen philosophies, and heirloom flavor mappings represent the core craft applied to every communal dinner.
          </p>

          {/* Download Briefs Block */}
          <div className="mt-8 pt-6 border-t border-white/15 space-y-4">
            <span className="font-mono text-[10px] text-[#ffd177] uppercase tracking-widest font-bold block">
              Tasting Cards & Archive PDFs
            </span>

            <div className="space-y-2.5">
              <a
                href="#tasting-exhibitions"
                className="flex items-center justify-between p-3.5 bg-white/5 border border-white/15 hover:border-[#ffd177] hover:bg-white/10 transition-all rounded-2xl group"
              >
                <div className="flex items-center space-x-2.5">
                  <FileText className="w-4 h-4 text-[#ffd177]" />
                  <span className="font-mono text-[11px] text-white/90 group-hover:text-white">
                    4-Edition Tasting Catalog
                  </span>
                </div>
                <span className="font-mono text-[9px] text-[#ffd177] border border-[#ffd177]/30 px-2 py-0.5 rounded-full uppercase">
                  CARD
                </span>
              </a>

              <a
                href="#booking-contact"
                className="flex items-center justify-between p-3.5 bg-white/5 border border-white/15 hover:border-[#ffd177] hover:bg-white/10 transition-all rounded-2xl group"
              >
                <div className="flex items-center space-x-2.5">
                  <Utensils className="w-4 h-4 text-[#ffd177]" />
                  <span className="font-mono text-[11px] text-white/90 group-hover:text-white">
                    Private Dining Portfolio Brief
                  </span>
                </div>
                <span className="font-mono text-[9px] text-[#ffd177] border border-[#ffd177]/30 px-2 py-0.5 rounded-full uppercase">
                  DECK
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: [01], [02], [03], [04] Disciplines */}
        <div className="lg:col-span-8 space-y-8">
          {CULINARY_DISCIPLINES.map((item, idx) => (
            <motion.div
              key={item.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: 'easeOut' }}
              className="border-b border-white/15 pb-8 space-y-3 group"
            >
              <span className="font-mono text-xs text-[#ffd177] font-bold tracking-widest block">
                [{item.num}]
              </span>

              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <h4 className="font-marcellus text-xl sm:text-2xl md:text-3xl font-normal uppercase tracking-tight text-white group-hover:text-[#ffd177] transition-colors leading-tight max-w-xl">
                  {item.name}
                </h4>

                <div className="shrink-0 flex items-center">
                  <span className="border border-[#ffd177]/40 text-[#ffd177] px-3.5 py-1 font-mono text-[10px] uppercase tracking-widest font-bold rounded-full bg-white/5">
                    LEVEL // {item.level.toUpperCase()}
                  </span>
                </div>
              </div>

              <p className="font-sans text-xs sm:text-sm text-white/70 leading-relaxed font-light max-w-2xl">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
