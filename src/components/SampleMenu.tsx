import React, { useState } from 'react';
import { CLIENT_MENU_COLLECTION, TastingMenuTheme } from '../data/content';
import { Sparkles, Utensils, GlassWater, Leaf, Eye, X, ZoomIn, BookOpen } from 'lucide-react';
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
              <span>THE TASTING MENUS & EDITIONS</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-[#18181B] tracking-tight">
              Curated Seasonal <span className="italic text-[#853724]">Tasting Journeys</span>
            </h2>
          </RevealHeading>

          <RevealText delay={0.15}>
            <p className="mt-3 text-base sm:text-lg text-[#52525B] font-light leading-relaxed">
              Explore the four distinct tasting editions crafted by Enakshi—from Kolkata street-food reinterpretations to zero-waste root-to-stem feasts and heirloom fermentation notes.
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

        {/* Active Menu Detail & Card Showcase Banner */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentMenu.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="space-y-10"
          >
            {/* Editorial Overview Card */}
            <div className="bg-white border border-[#E4E4E7] p-6 sm:p-8 md:p-10 text-left flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xs">
              <div className="space-y-2 max-w-2xl">
                <span className="inline-block px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-widest bg-[#FAFAF9] border border-[#E4E4E7] text-[#853724] font-semibold">
                  {currentMenu.tag}
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl text-[#18181B] font-normal">
                  {currentMenu.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#52525B] font-sans font-light leading-relaxed">
                  {currentMenu.description}
                </p>
              </div>

              {/* View Original Printed Card Button */}
              <button
                onClick={() => setLightboxImage(currentMenu.imageUrl)}
                className="inline-flex items-center space-x-2 px-5 py-3 bg-[#18181B] text-white hover:bg-[#853724] text-xs font-sans font-semibold uppercase tracking-widest transition-colors cursor-pointer shrink-0 rounded-xs shadow-xs"
              >
                <Eye className="w-4 h-4" />
                <span>View Printed Menu Card</span>
              </button>
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
              {currentMenu.courses.map((course, idx) => {
                const isHighlight = idx === 0;
                return (
                  <div
                    key={course.courseNumber + course.courseTitle}
                    className={`border p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                      isHighlight
                        ? 'bg-white border-[#853724]'
                        : 'bg-white border-[#E4E4E7] hover:border-[#853724]/50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between border-b border-[#E4E4E7] pb-3 mb-4">
                        <span className="font-mono text-[11px] font-bold text-[#18181B] bg-[#FAFAF9] px-2.5 py-0.5 border border-[#E4E4E7]">
                          Course {course.courseNumber}
                        </span>
                        <span className="font-bengali text-sm font-semibold text-[#853724]">
                          {course.bengaliName}
                        </span>
                      </div>

                      <h4 className="font-serif text-2xl font-normal text-[#18181B] mb-2 leading-tight">
                        {course.courseTitle}
                      </h4>

                      <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed font-sans font-light mb-4">
                        {course.description}
                      </p>
                    </div>

                    <div className="space-y-3 pt-3 border-t border-[#E4E4E7] text-xs font-sans">
                      {course.tag && (
                        <div className="inline-block text-[10px] uppercase font-mono tracking-wider text-[#853724] bg-[#853724]/10 px-2 py-0.5 border border-[#853724]/20">
                          {course.tag}
                        </div>
                      )}

                      {course.heirloomElement && (
                        <div className="text-[#52525B] italic text-[11.5px] leading-relaxed font-light">
                          <span className="font-bold text-[#18181B] not-italic block mb-0.5 text-[10px] uppercase tracking-wider">
                            Heirloom Footnote:
                          </span>
                          {course.heirloomElement}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Beverage Pairing Highlight if available */}
            {currentMenu.drinkPairing && (
              <div className="bg-[#853724] text-white p-5 sm:p-6 border border-[#853724] flex items-center space-x-3 text-left shadow-xs">
                <GlassWater className="w-5 h-5 text-white/90 shrink-0" />
                <p className="text-xs sm:text-sm font-sans font-light">
                  <strong className="font-medium text-white">{currentMenu.drinkPairing}</strong>
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Note on adaptability & CTA */}
        <div className="mt-12 bg-white p-6 border border-[#E4E4E7] flex flex-col sm:flex-row items-center justify-between gap-4 text-left shadow-2xs">
          <div className="flex items-center space-x-3">
            <Leaf className="w-5 h-5 text-[#853724] shrink-0" />
            <p className="text-xs sm:text-sm text-[#52525B] font-sans font-light">
              <strong className="text-[#18181B] font-medium">Seasonal & Dietary Curation:</strong> All courses are adapted with equal reverence for vegetarian, pescatarian, and plant-forward guests during private seating drops.
            </p>
          </div>

          <a
            href="#supper-club"
            className="shrink-0 px-6 py-3 bg-[#853724] text-white hover:bg-[#18181B] text-xs font-sans font-semibold uppercase tracking-widest transition-colors duration-200"
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
              className="relative max-w-2xl max-h-[90vh] bg-white rounded-xl overflow-hidden shadow-2xl p-2 sm:p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightboxImage(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="max-h-[82vh] overflow-y-auto rounded-lg">
                <img
                  src={lightboxImage}
                  alt="Original Printed Menu Card"
                  className="w-full h-auto object-contain"
                />
              </div>

              <div className="pt-3 pb-1 text-center font-sans text-xs text-[#52525B]">
                Original Pichhutaaney Menu Card • Click anywhere outside or X to close
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
