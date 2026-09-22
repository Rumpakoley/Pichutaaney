import React, { useState } from 'react';
import { CLIENT_MENU_COLLECTION, TastingMenuTheme } from '../data/content';
import { Utensils, GlassWater, ZoomIn, X, ChevronRight, Sparkles, BookOpen, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const UniqueMenuExhibitions: React.FC = () => {
  const [activeMenuIdx, setActiveMenuIdx] = useState(0);
  const [selectedCourseIdx, setSelectedCourseIdx] = useState(0);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  const activeMenu = CLIENT_MENU_COLLECTION[activeMenuIdx];

  const handleMenuChange = (idx: number) => {
    setActiveMenuIdx(idx);
    setSelectedCourseIdx(0);
  };

  return (
    <section id="tasting-archive" className="py-20 sm:py-28 bg-[#FAF7F2] border-b border-[#D8CEBF] text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#D8CEBF] pb-8">
          <div className="space-y-2">
            <span className="font-sans text-[11px] uppercase tracking-[0.25em] text-[#963D28] font-bold block">
              SEASONAL ARCHIVE • 04 EDITIONS
            </span>
            <h2 className="font-marcellus text-3xl sm:text-4xl md:text-5xl font-normal text-[#191512] tracking-tight">
              Curated Tasting Editions & Menus
            </h2>
          </div>
          <p className="font-sans text-xs sm:text-sm text-[#695F55] max-w-md leading-relaxed font-light">
            Each tasting edition is created around a sensory theme—presented course-by-course with handwritten menu cards and seasonal drink pairings.
          </p>
        </div>

        {/* 4-Edition Selector Navigation Pills */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
          {CLIENT_MENU_COLLECTION.map((menu, idx) => {
            const isActive = activeMenuIdx === idx;
            return (
              <button
                key={menu.id}
                onClick={() => handleMenuChange(idx)}
                className={`px-5 py-3 rounded-full text-xs font-sans whitespace-nowrap transition-all duration-300 cursor-pointer border flex items-center space-x-2 ${
                  isActive
                    ? 'bg-[#191512] text-white border-[#191512] shadow-md font-medium'
                    : 'bg-white text-[#4D453D] border-[#D8CEBF] hover:border-[#963D28]'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-[#E8A857]' : 'bg-[#D8CEBF]'}`} />
                <span className="font-medium">{menu.title}</span>
                <span className="opacity-70 font-bengali text-xs">({menu.bengaliTitle})</span>
              </button>
            );
          })}
        </div>

        {/* Featured Edition Interactive Stage */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMenu.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
          >
            {/* Left: Original Printed Menu Card Spotlight */}
            <div className="lg:col-span-5 space-y-4">
              <div
                onClick={() => setLightboxImg(activeMenu.imageUrl)}
                className="group relative rounded-3xl overflow-hidden bg-white p-3.5 border border-[#D8CEBF] shadow-lg hover:shadow-xl transition-all duration-300 cursor-zoom-in"
              >
                <div className="relative aspect-[3/4.2] w-full rounded-2xl overflow-hidden bg-[#E8E0D5]">
                  <img
                    src={activeMenu.imageUrl}
                    alt={`${activeMenu.title} printed card`}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-[#191512]/90 text-white px-4 py-2 rounded-full text-xs font-mono tracking-wider flex items-center space-x-1.5 shadow-md">
                      <ZoomIn className="w-3.5 h-3.5 text-[#E8A857]" />
                      <span>Click to view full card</span>
                    </span>
                  </div>
                </div>

                <div className="pt-3 px-2 flex items-center justify-between text-xs text-[#695F55]">
                  <span className="font-marcellus text-base text-[#191512]">{activeMenu.title}</span>
                  <span className="text-[10px] font-sans text-[#963D28] bg-[#FAF7F2] px-3 py-1 rounded-full uppercase tracking-wider font-bold border border-[#D8CEBF]">
                    Original Card
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Course Breakdown & Interactive Stepper */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-[#D8CEBF] p-8 sm:p-10 shadow-md space-y-6">
              {/* Edition Synopsis */}
              <div className="border-b border-[#D8CEBF] pb-5 space-y-1">
                <span className="font-mono text-[9.5px] uppercase tracking-widest text-[#963D28] font-bold block">
                  {activeMenu.tag} • {activeMenu.courses.length} COURSES
                </span>
                <h3 className="font-marcellus text-2xl sm:text-3xl text-[#191512] font-normal">
                  {activeMenu.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#695F55] font-sans font-light leading-relaxed pt-1">
                  {activeMenu.description}
                </p>
              </div>

              {/* Course Rows */}
              <div className="divide-y divide-[#D8CEBF]/60">
                {activeMenu.courses.map((course, cIdx) => (
                  <div
                    key={course.courseTitle}
                    className="py-4 first:pt-0 last:pb-0 space-y-1 group"
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <div className="flex items-baseline space-x-2.5">
                        <span className="font-mono text-xs text-[#963D28] font-bold">
                          {course.courseNumber}.
                        </span>
                        <h4 className="font-marcellus text-lg sm:text-xl text-[#191512] font-normal group-hover:text-[#963D28] transition-colors">
                          {course.courseTitle}
                        </h4>
                      </div>
                      <span className="font-bengali text-xs text-[#963D28] shrink-0 font-medium opacity-85">
                        {course.bengaliName}
                      </span>
                    </div>

                    <p className="font-pt-serif italic text-xs sm:text-sm text-[#695F55] leading-relaxed pl-6">
                      {course.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Drink Pairing Note */}
              {activeMenu.drinkPairing && (
                <div className="pt-2 border-t border-[#D8CEBF]">
                  <div className="inline-flex items-center space-x-2 px-4 py-2.5 bg-[#FAF7F2] rounded-full border border-[#D8CEBF] text-xs text-[#963D28]">
                    <GlassWater className="w-3.5 h-3.5 shrink-0" />
                    <span className="font-sans font-medium">{activeMenu.drinkPairing}</span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* 4-Edition Thumbnail Gallery Grid */}
        <div className="pt-6 border-t border-[#D8CEBF]">
          <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#963D28] font-bold block mb-4">
            ALL 4 ARCHIVAL TASTING CARDS
          </span>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {CLIENT_MENU_COLLECTION.map((m, idx) => (
              <button
                key={m.id}
                onClick={() => handleMenuChange(idx)}
                className={`p-3 rounded-2xl border transition-all text-left cursor-pointer group ${
                  activeMenuIdx === idx
                    ? 'bg-white border-[#963D28] shadow-md ring-2 ring-[#963D28]/30'
                    : 'bg-white/60 border-[#D8CEBF] hover:border-[#191512]'
                }`}
              >
                <div className="aspect-[3/4.2] w-full rounded-xl overflow-hidden bg-[#E8E0D5] mb-2.5">
                  <img
                    src={m.imageUrl}
                    alt={m.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <span className="block text-[9.5px] font-mono uppercase text-[#963D28] font-bold">0{idx + 1}</span>
                <h5 className="font-marcellus text-sm text-[#191512] truncate">{m.title}</h5>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#191512]/90 backdrop-blur-sm p-4 sm:p-6 flex items-center justify-center"
            onClick={() => setLightboxImg(null)}
          >
            <div
              className="relative max-w-lg max-h-[92vh] bg-[#FAF7F2] border-2 border-[#191512] rounded-3xl overflow-hidden shadow-2xl p-4 sm:p-6 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#D8CEBF]">
                <span className="font-marcellus text-lg text-[#191512]">Original Tasting Card</span>
                <button
                  onClick={() => setLightboxImg(null)}
                  className="p-1.5 rounded-full bg-[#E8E0D5] hover:bg-[#D8CEBF] text-[#191512] transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="max-h-[78vh] overflow-y-auto rounded-xl mt-3">
                <img
                  src={lightboxImg}
                  alt="Original Tasting Card"
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
