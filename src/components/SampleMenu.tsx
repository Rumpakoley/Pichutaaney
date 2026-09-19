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
    <section id="sample-menu" className="py-16 sm:py-24 bg-[#F4ECE1] border-b border-[#E4D7C8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl text-left mb-10 sm:mb-12">
          <RevealHeading>
            <span className="block font-sans text-[10px] tracking-[0.25em] uppercase font-bold text-[#8B3A26] mb-2">
              THE TASTING MENUS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#241E1A] tracking-tight">
              Curated <span className="italic text-[#8B3A26]">Tasting Editions</span>
            </h2>
          </RevealHeading>

          <RevealText delay={0.1}>
            <p className="mt-2 text-sm sm:text-base text-[#6E6258] font-light leading-relaxed">
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
                className={`px-4 sm:px-5 py-2.5 rounded-full text-xs font-sans whitespace-nowrap transition-all duration-200 cursor-pointer border ${
                  isActive
                    ? 'bg-[#8B3A26] text-[#FAF6F0] border-[#8B3A26] shadow-xs'
                    : 'bg-[#FAF6F0] text-[#6E6258] border-[#DECFC0] hover:border-[#8B3A26]/40 hover:text-[#241E1A]'
                }`}
              >
                <span className="font-medium">{menu.title}</span>
                <span className="ml-1.5 opacity-70 font-bengali text-[11px]">({menu.bengaliTitle})</span>
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
                className="group relative rounded-xl overflow-hidden bg-[#FAF6F0] p-2.5 border border-[#DECFC0] shadow-lg hover:shadow-xl transition-all duration-300 cursor-zoom-in"
              >
                <div className="relative aspect-[3/4.2] w-full rounded-lg overflow-hidden bg-[#EFE6DA]">
                  <img
                    src={currentMenu.imageUrl}
                    alt={`${currentMenu.title} Printed Card`}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-[#1F1A16]/90 text-[#FAF6F0] px-3.5 py-1.5 rounded-full text-[11px] font-mono tracking-wider flex items-center space-x-1.5 shadow-md">
                      <ZoomIn className="w-3.5 h-3.5" />
                      <span>Click to Enlarge</span>
                    </span>
                  </div>
                </div>

                <div className="pt-2 px-1 flex items-center justify-between text-xs text-[#6E6258]">
                  <span className="font-serif text-sm text-[#241E1A]">{currentMenu.title}</span>
                  <span className="text-[10px] font-mono text-[#8B3A26] uppercase tracking-wider font-semibold">Original Printed Card</span>
                </div>
              </div>
            </div>

            {/* Right: Clean, Minimalist Course List */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              {/* Short Intro */}
              <div className="border-b border-[#DECFC0] pb-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#8B3A26] font-semibold block mb-1">
                  {currentMenu.tag}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#241E1A] font-normal">
                  {currentMenu.title}
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-[#6E6258] font-light leading-relaxed">
                  {currentMenu.description}
                </p>
              </div>

              {/* Minimal Course Rows */}
              <div className="divide-y divide-[#DECFC0]/70">
                {currentMenu.courses.map((course) => (
                  <div key={course.courseNumber + course.courseTitle} className="py-3.5 first:pt-0 last:pb-0">
                    <div className="flex items-baseline justify-between gap-4">
                      <div className="flex items-baseline space-x-2">
                        <span className="font-mono text-[11px] text-[#8B3A26] font-semibold">
                          {course.courseNumber}
                        </span>
                        <h4 className="font-serif text-lg sm:text-xl text-[#241E1A] font-normal">
                          {course.courseTitle}
                        </h4>
                      </div>
                      <span className="font-bengali text-xs text-[#8B3A26] shrink-0 font-medium opacity-80">
                        {course.bengaliName}
                      </span>
                    </div>

                    <p className="mt-1 font-serif italic text-xs sm:text-sm text-[#6E6258] font-normal leading-relaxed pl-5">
                      {course.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Drink Pairing Highlight */}
              {currentMenu.drinkPairing && (
                <div className="pt-2">
                  <div className="inline-flex items-center space-x-2 px-3.5 py-2 bg-[#8B3A26]/10 border border-[#8B3A26]/20 rounded-md text-xs text-[#8B3A26]">
                    <GlassWater className="w-3.5 h-3.5 shrink-0" />
                    <span className="font-sans font-medium">{currentMenu.drinkPairing}</span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Archival Printed Cards Row */}
        <div className="mt-16 pt-10 border-t border-[#DECFC0] text-left">
          <div className="flex items-center justify-between mb-5">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#8B3A26] font-bold">
              ALL 4 PRINTED MENU CARDS
            </span>
            <span className="text-[11px] text-[#8C7E72] font-sans">
              Click any card to preview full size
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {CLIENT_MENU_COLLECTION.map((menu, idx) => (
              <button
                key={menu.id}
                onClick={() => {
                  setActiveMenuIndex(idx);
                  setLightboxImage(menu.imageUrl);
                }}
                className="group p-2 bg-[#FAF6F0] border border-[#DECFC0] hover:border-[#8B3A26] rounded-lg transition-all duration-200 text-left cursor-pointer"
              >
                <div className="aspect-[3/4.2] w-full rounded overflow-hidden bg-[#EFE6DA] mb-2">
                  <img
                    src={menu.imageUrl}
                    alt={menu.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                  />
                </div>
                <span className="block text-[9px] font-mono text-[#8B3A26] uppercase">0{idx + 1}</span>
                <span className="block font-serif text-xs text-[#241E1A] truncate">{menu.title}</span>
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
            className="fixed inset-0 z-50 bg-[#1F1A16]/90 backdrop-blur-sm p-4 sm:p-6 flex items-center justify-center"
            onClick={() => setLightboxImage(null)}
          >
            <div
              className="relative max-w-lg max-h-[92vh] bg-[#FAF6F0] border border-[#DECFC0] rounded-xl overflow-hidden shadow-2xl p-3 sm:p-4 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-2 border-b border-[#DECFC0]">
                <span className="font-serif text-base text-[#241E1A]">Pichhutaaney Menu Card</span>
                <button
                  onClick={() => setLightboxImage(null)}
                  className="p-1 rounded bg-[#F4ECE1] hover:bg-[#DECFC0] text-[#241E1A] transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="max-h-[78vh] overflow-y-auto rounded mt-2">
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
