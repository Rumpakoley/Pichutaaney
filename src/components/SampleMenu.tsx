import React, { useState } from 'react';
import { CLIENT_MENU_COLLECTION } from '../data/content';
import { Utensils, GlassWater, Leaf, X, ZoomIn, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { RevealHeading, RevealText } from './TextTransitions';

export const SampleMenu: React.FC = () => {
  const [activeMenuIndex, setActiveMenuIndex] = useState(0);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const currentMenu = CLIENT_MENU_COLLECTION[activeMenuIndex];

  return (
    <section id="sample-menu" className="py-20 sm:py-28 bg-[#E9E4DD] border-b border-[#DED8CF] overflow-hidden text-[#2D2D2A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl text-left mb-10 sm:mb-14">
          <RevealHeading>
            <span className="inline-block px-3 py-1 rounded-full text-[11px] font-sans font-medium tracking-[0.2em] uppercase bg-white/80 border border-[#DED8CF] text-[#2D2D2A] mb-4">
              THE TASTING MENUS
            </span>
            <h2 className="font-marcellus text-4xl sm:text-5xl md:text-6xl font-normal text-[#171716] tracking-tight">
              Curated <span className="font-pt-serif italic">Tasting Editions</span>
            </h2>
          </RevealHeading>

          <RevealText delay={0.1}>
            <p className="mt-3 text-base sm:text-lg text-[#55524E] font-sans font-light leading-relaxed">
              Seasonal tasting menus shaped by memory, instinct, and the printed editions designed for our private dining nights.
            </p>
          </RevealText>
        </div>

        {/* Minimalist 4-Edition Selector Bar */}
        <div className="flex items-center space-x-2 sm:space-x-3 overflow-x-auto pb-4 mb-8 sm:mb-12 scrollbar-none text-left">
          {CLIENT_MENU_COLLECTION.map((menu, idx) => {
            const isActive = activeMenuIndex === idx;
            return (
              <button
                key={menu.id}
                onClick={() => setActiveMenuIndex(idx)}
                className={`px-5 py-3 rounded-full text-xs font-sans whitespace-nowrap transition-all duration-200 cursor-pointer border ${
                  isActive
                    ? 'bg-[#2D2D2A] text-white border-[#2D2D2A] shadow-md font-medium'
                    : 'bg-white text-[#55524E] border-[#DED8CF] hover:border-[#2D2D2A] hover:text-[#171716]'
                }`}
              >
                <span>{menu.title}</span>
                <span className="ml-2 opacity-70 font-bengali text-xs">({menu.bengaliTitle})</span>
              </button>
            );
          })}
        </div>

        {/* Spotlight Showcase: Printed Card Image & Clean Course Flow Side-by-Side */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentMenu.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start text-left"
          >
            {/* Left: Beautiful Printed Menu Card */}
            <div className="lg:col-span-5">
              <div
                onClick={() => setLightboxImage(currentMenu.imageUrl)}
                className="group relative rounded-3xl overflow-hidden bg-white p-3 border border-[#DED8CF] shadow-lg hover:shadow-xl transition-all duration-300 cursor-zoom-in"
              >
                <div className="relative aspect-[3/4.2] w-full rounded-2xl overflow-hidden bg-[#E9E4DD]">
                  <img
                    src={currentMenu.imageUrl}
                    alt={`${currentMenu.title} Printed Card`}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-[#171716]/90 text-white px-4 py-2 rounded-full text-xs font-mono tracking-wider flex items-center space-x-2 shadow-md">
                      <ZoomIn className="w-3.5 h-3.5" />
                      <span>Click to Enlarge</span>
                    </span>
                  </div>
                </div>

                <div className="pt-3 px-2 flex items-center justify-between text-xs text-[#55524E]">
                  <span className="font-marcellus text-base text-[#171716]">{currentMenu.title}</span>
                  <span className="text-[10px] font-sans text-[#2D2D2A] bg-[#E9E4DD] px-2.5 py-0.5 rounded-full uppercase tracking-wider font-semibold">Original Card</span>
                </div>
              </div>
            </div>

            {/* Right: Clean, Minimalist Course List */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6 bg-white rounded-3xl border border-[#DED8CF] p-8 sm:p-10 shadow-md">
              {/* Short Intro */}
              <div className="border-b border-[#DED8CF] pb-5">
                <span className="text-[10px] font-sans uppercase tracking-widest text-[#8C867D] font-bold block mb-1.5">
                  {currentMenu.tag}
                </span>
                <h3 className="font-marcellus text-2xl sm:text-3xl text-[#171716] font-normal">
                  {currentMenu.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-[#55524E] font-sans font-light leading-relaxed">
                  {currentMenu.description}
                </p>
              </div>

              {/* Minimal Course Rows */}
              <div className="divide-y divide-[#DED8CF]/70">
                {currentMenu.courses.map((course) => (
                  <div key={course.courseNumber + course.courseTitle} className="py-4 first:pt-0 last:pb-0">
                    <div className="flex items-baseline justify-between gap-4">
                      <div className="flex items-baseline space-x-2.5">
                        <span className="font-mono text-xs text-[#8C867D] font-semibold">
                          {course.courseNumber}
                        </span>
                        <h4 className="font-marcellus text-lg sm:text-xl text-[#171716] font-normal">
                          {course.courseTitle}
                        </h4>
                      </div>
                      <span className="font-bengali text-xs text-[#2D2D2A] shrink-0 font-medium opacity-80">
                        {course.bengaliName}
                      </span>
                    </div>

                    <p className="mt-1 font-pt-serif italic text-xs sm:text-sm text-[#55524E] leading-relaxed pl-6">
                      {course.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Drink Pairing Highlight */}
              {currentMenu.drinkPairing && (
                <div className="pt-2">
                  <div className="inline-flex items-center space-x-2 px-4 py-2.5 bg-[#E9E4DD] rounded-full border border-[#DED8CF] text-xs text-[#171716]">
                    <GlassWater className="w-3.5 h-3.5 shrink-0 text-[#2D2D2A]" />
                    <span className="font-sans font-medium">{currentMenu.drinkPairing}</span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Archival Printed Cards Row */}
        <div className="mt-16 pt-10 border-t border-[#DED8CF] text-left">
          <div className="flex items-center justify-between mb-5">
            <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#171716] font-semibold">
              ALL 4 PRINTED MENU CARDS
            </span>
            <span className="text-xs text-[#8C867D] font-sans">
              Click any card to preview full size
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {CLIENT_MENU_COLLECTION.map((menu, idx) => (
              <button
                key={menu.id}
                onClick={() => {
                  setActiveMenuIndex(idx);
                  setLightboxImage(menu.imageUrl);
                }}
                className="group p-3 bg-white border border-[#DED8CF] hover:border-[#2D2D2A] rounded-2xl transition-all duration-200 text-left cursor-pointer shadow-xs hover:shadow-md"
              >
                <div className="aspect-[3/4.2] w-full rounded-xl overflow-hidden bg-[#E9E4DD] mb-2.5">
                  <img
                    src={menu.imageUrl}
                    alt={menu.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                  />
                </div>
                <span className="block text-[10px] font-mono text-[#8C867D] uppercase">0{idx + 1}</span>
                <span className="block font-marcellus text-sm text-[#171716] truncate">{menu.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal for Original Printed Menu Card */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#171716]/90 backdrop-blur-sm p-4 sm:p-6 flex items-center justify-center"
            onClick={() => setLightboxImage(null)}
          >
            <div
              className="relative max-w-lg max-h-[92vh] bg-white border border-[#DED8CF] rounded-3xl overflow-hidden shadow-2xl p-4 sm:p-6 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#DED8CF]">
                <span className="font-marcellus text-lg text-[#171716]">Pichhutaaney Menu Card</span>
                <button
                  onClick={() => setLightboxImage(null)}
                  className="p-1.5 rounded-full bg-[#E9E4DD] hover:bg-[#DED8CF] text-[#171716] transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="max-h-[78vh] overflow-y-auto rounded-xl mt-3">
                <img
                  src={lightboxImage}
                  alt="Original Menu Card"
                  className="w-full h-auto object-contain mx-auto"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
