import React, { useState } from 'react';
import { CLIENT_MENU_COLLECTION, TastingMenuTheme } from '../data/content';
import { Sparkles, Utensils, GlassWater, Leaf, Eye, X, ZoomIn, BookOpen, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { RevealHeading, RevealText, StaggerContainer, StaggerItem } from './TextTransitions';

export const SampleMenu: React.FC = () => {
  const [activeMenuIndex, setActiveMenuIndex] = useState(0);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const currentMenu = CLIENT_MENU_COLLECTION[activeMenuIndex];

  return (
    <section id="sample-menu" className="py-20 sm:py-28 bg-[#FAFAF9] border-b border-[#E4E4E7] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl text-left mb-12 sm:mb-16">
          <RevealHeading>
            <div className="inline-flex items-center space-x-2 text-[10px] tracking-[0.25em] uppercase font-bold text-[#853724] font-sans mb-2">
              <Utensils className="w-3.5 h-3.5" />
              <span>THE TASTING MENUS & PRINTED EDITIONS</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-[#18181B] tracking-tight">
              Curated Seasonal <span className="italic text-[#853724]">Tasting Menus</span>
            </h2>
          </RevealHeading>

          <RevealText delay={0.15}>
            <p className="mt-3 text-base sm:text-lg text-[#52525B] font-light leading-relaxed">
              Explore the authentic printed menu editions designed for Pichhutaaney tasting nights. Each card represents a unique regional mood, from Calcutta street-food reimaginations to zero-waste root-to-stem feasts.
            </p>
          </RevealText>
        </div>

        {/* 4-Menu Interactive Tabs Strip */}
        <div className="mb-10 sm:mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {CLIENT_MENU_COLLECTION.map((menu, idx) => {
              const isActive = activeMenuIndex === idx;
              return (
                <button
                  key={menu.id}
                  onClick={() => setActiveMenuIndex(idx)}
                  className={`p-4 sm:p-5 text-left border rounded-xl transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-[#853724] text-white border-[#853724] shadow-md ring-1 ring-[#853724]'
                      : 'bg-white border-[#E4E4E7] text-[#18181B] hover:border-[#853724]/50'
                  }`}
                >
                  <span
                    className={`block text-[9.5px] font-mono uppercase tracking-widest mb-1 ${
                      isActive ? 'text-white/80' : 'text-[#853724]'
                    }`}
                  >
                    EDITION 0{idx + 1}
                  </span>
                  <h3 className="font-serif text-base sm:text-lg font-normal leading-snug">
                    {menu.title}
                  </h3>
                  <span
                    className={`block font-bengali text-xs mt-1 ${
                      isActive ? 'text-white/90' : 'text-[#853724]'
                    }`}
                  >
                    {menu.bengaliTitle}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Hero Spotlight: Visual Menu Card & Course Breakdown Side-by-Side */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentMenu.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
          >
            {/* Left: Prominently Visible Printed Menu Card Image */}
            <div className="lg:col-span-5 flex flex-col space-y-4 text-left">
              <div
                onClick={() => setLightboxImage(currentMenu.imageUrl)}
                className="group relative rounded-2xl overflow-hidden bg-white p-3 border border-[#E4E4E7] shadow-xl hover:shadow-2xl transition-all duration-500 cursor-zoom-in"
              >
                <div className="relative aspect-[3/4.2] w-full rounded-xl overflow-hidden bg-[#F5F1EB]">
                  <img
                    src={currentMenu.imageUrl}
                    alt={`${currentMenu.title} Printed Menu Card`}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/75 text-white px-4 py-2 rounded-full text-xs font-mono tracking-wider flex items-center space-x-1.5 shadow-lg">
                      <ZoomIn className="w-3.5 h-3.5" />
                      <span>Click to Enlarge Card</span>
                    </span>
                  </div>
                </div>

                <div className="pt-3 pb-1 px-1 flex items-center justify-between text-xs text-[#52525B] font-sans">
                  <span className="font-semibold text-[#18181B] font-serif text-sm">
                    {currentMenu.title}
                  </span>
                  <span className="text-[10.5px] font-mono text-[#853724] uppercase tracking-wider flex items-center space-x-1">
                    <Eye className="w-3 h-3" />
                    <span>Original Card</span>
                  </span>
                </div>
              </div>

              {/* Quick Card Action */}
              <button
                onClick={() => setLightboxImage(currentMenu.imageUrl)}
                className="w-full py-2.5 px-4 bg-white border border-[#E4E4E7] hover:border-[#853724] text-[#18181B] hover:text-[#853724] text-xs font-sans font-semibold uppercase tracking-widest transition-colors flex items-center justify-center space-x-2 rounded-lg cursor-pointer"
              >
                <ZoomIn className="w-4 h-4" />
                <span>Open Full-Screen Card</span>
              </button>
            </div>

            {/* Right: Detailed Course Breakdown & Editorial Story */}
            <div className="lg:col-span-7 flex flex-col space-y-6 text-left">
              {/* Menu Intro Box */}
              <div className="bg-white border border-[#E4E4E7] p-6 sm:p-8 rounded-xl shadow-2xs space-y-2.5">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="inline-block px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-widest bg-[#FAFAF9] border border-[#E4E4E7] text-[#853724] font-semibold">
                    {currentMenu.tag}
                  </span>
                  <span className="font-bengali text-sm font-semibold text-[#853724]">
                    {currentMenu.bengaliTitle}
                  </span>
                </div>
                <h3 className="font-serif text-3xl sm:text-4xl text-[#18181B] font-normal tracking-tight">
                  {currentMenu.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#52525B] font-sans font-light leading-relaxed">
                  {currentMenu.description}
                </p>
              </div>

              {/* Courses List */}
              <div className="space-y-4">
                {currentMenu.courses.map((course, idx) => {
                  const isHighlight = idx === 0;
                  return (
                    <div
                      key={course.courseNumber + course.courseTitle}
                      className={`border p-5 sm:p-6 rounded-xl transition-all duration-300 hover:shadow-md ${
                        isHighlight
                          ? 'bg-white border-[#853724]'
                          : 'bg-white border-[#E4E4E7] hover:border-[#853724]/40'
                      }`}
                    >
                      <div className="flex items-center justify-between border-b border-[#E4E4E7] pb-2.5 mb-3">
                        <span className="font-mono text-[11px] font-bold text-[#18181B] bg-[#FAFAF9] px-2.5 py-0.5 border border-[#E4E4E7] rounded-xs">
                          Course {course.courseNumber}
                        </span>
                        <span className="font-bengali text-sm font-semibold text-[#853724]">
                          {course.bengaliName}
                        </span>
                      </div>

                      <h4 className="font-serif text-xl sm:text-2xl font-normal text-[#18181B] mb-1.5 leading-snug">
                        {course.courseTitle}
                      </h4>

                      <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed font-sans font-light">
                        {course.description}
                      </p>

                      {course.tag && (
                        <div className="mt-3 inline-block text-[10px] uppercase font-mono tracking-wider text-[#853724] bg-[#853724]/10 px-2 py-0.5 border border-[#853724]/20 rounded-xs">
                          {course.tag}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Drink Pairing if available */}
              {currentMenu.drinkPairing && (
                <div className="bg-[#853724] text-white p-5 rounded-xl border border-[#853724] flex items-center space-x-3 text-left shadow-xs">
                  <GlassWater className="w-5 h-5 text-white/90 shrink-0" />
                  <p className="text-xs sm:text-sm font-sans font-light">
                    <strong className="font-medium text-white">{currentMenu.drinkPairing}</strong>
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* All 4 Printed Menu Cards Gallery Strip */}
        <div className="mt-20 pt-16 border-t border-[#E4E4E7] text-left">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="inline-flex items-center space-x-2 text-[10px] tracking-[0.25em] uppercase font-bold text-[#853724] font-sans mb-1">
                <Layers className="w-3.5 h-3.5" />
                <span>ARCHIVAL PRINTED CARDS</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#18181B]">
                All Four Tasting Menu Cards
              </h3>
            </div>
            <span className="text-xs text-[#52525B] font-sans hidden sm:block">
              Click any card to inspect in high resolution
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {CLIENT_MENU_COLLECTION.map((menu, idx) => (
              <div
                key={menu.id}
                onClick={() => {
                  setActiveMenuIndex(idx);
                  setLightboxImage(menu.imageUrl);
                }}
                className="group relative rounded-xl overflow-hidden bg-white p-2.5 border border-[#E4E4E7] shadow-sm hover:shadow-xl hover:border-[#853724] transition-all duration-300 cursor-pointer"
              >
                <div className="relative aspect-[3/4.2] w-full rounded-lg overflow-hidden bg-[#F5F1EB] mb-2.5">
                  <img
                    src={menu.imageUrl}
                    alt={menu.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="p-2 rounded-full bg-white text-[#18181B] shadow-md">
                      <ZoomIn className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                <span className="block text-[9px] font-mono uppercase tracking-widest text-[#853724] mb-0.5">
                  EDITION 0{idx + 1}
                </span>
                <h4 className="font-serif text-sm font-normal text-[#18181B] truncate">
                  {menu.title}
                </h4>
              </div>
            ))}
          </div>
        </div>

        {/* Note on adaptability & CTA */}
        <div className="mt-16 bg-white p-6 sm:p-8 rounded-xl border border-[#E4E4E7] flex flex-col sm:flex-row items-center justify-between gap-4 text-left shadow-2xs">
          <div className="flex items-center space-x-3">
            <Leaf className="w-5 h-5 text-[#853724] shrink-0" />
            <p className="text-xs sm:text-sm text-[#52525B] font-sans font-light">
              <strong className="text-[#18181B] font-medium">Seasonal & Dietary Curation:</strong> All courses are adapted with equal reverence for vegetarian, pescatarian, and plant-forward guests during private seating drops.
            </p>
          </div>

          <a
            href="#supper-club"
            className="shrink-0 px-6 py-3 bg-[#853724] text-white hover:bg-[#18181B] text-xs font-sans font-semibold uppercase tracking-widest transition-colors duration-200 rounded-lg"
          >
            Join Supper Club Waitlist
          </a>
        </div>
      </div>

      {/* Lightbox Modal for Original Printed Menu Card */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm p-4 sm:p-6 md:p-10 flex items-center justify-center"
            onClick={() => setLightboxImage(null)}
          >
            <div
              className="relative max-w-2xl max-h-[92vh] bg-white rounded-2xl overflow-hidden shadow-2xl p-3 sm:p-5 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#E4E4E7]">
                <span className="font-serif text-lg text-[#18181B] font-normal">
                  Authentic Pichhutaaney Menu Card
                </span>
                <button
                  onClick={() => setLightboxImage(null)}
                  className="p-1.5 rounded-full bg-[#FAFAF9] hover:bg-[#E4E4E7] text-[#18181B] transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="max-h-[78vh] overflow-y-auto rounded-lg mt-3">
                <img
                  src={lightboxImage}
                  alt="Original Printed Menu Card"
                  className="w-full h-auto object-contain mx-auto"
                />
              </div>

              <div className="pt-3 text-center font-sans text-xs text-[#52525B]">
                Click anywhere outside or ✕ to return to the site
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
