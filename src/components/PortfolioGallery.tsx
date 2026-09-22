import React, { useState, useRef } from 'react';
import { CLIENT_MENU_COLLECTION } from '../data/content';
import { Search, ZoomIn, X, GlassWater, Utensils, Sparkles, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const PortfolioGallery: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const filterOptions = ['All', 'Calcutta Kiss', 'Zero-Waste', 'Fermentation', 'Philosophy'];

  const filteredMenus = CLIENT_MENU_COLLECTION.filter((menu) => {
    const matchesSearch =
      menu.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      menu.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
      menu.courses.some((c) =>
        c.courseTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesFilter =
      selectedFilter === 'All' ||
      (selectedFilter === 'Calcutta Kiss' && menu.id === 'calcutta-kiss') ||
      (selectedFilter === 'Zero-Waste' && menu.id === 'zero-waste-heirloom') ||
      (selectedFilter === 'Fermentation' && menu.id === 'heritage-fermentation') ||
      (selectedFilter === 'Philosophy' && menu.id === 'tasting-philosophy');

    return matchesSearch && matchesFilter;
  });

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="tasting-exhibitions" className="bg-[#ffd177] text-black border-t-2 border-b-2 border-black py-16 px-6 md:px-12 relative overflow-hidden text-left">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="font-mono text-xs text-black/70 uppercase tracking-widest font-black block">
              Tasting Editions & Archives
            </span>
            <h2 className="font-marcellus text-3xl sm:text-4xl md:text-5xl font-normal text-black tracking-tight">
              I curate tasting editions & communal tables
            </h2>
          </div>

          {/* Slider Arrow Controls */}
          <div className="hidden sm:flex items-center space-x-2">
            <button
              onClick={() => scroll('left')}
              className="p-2.5 rounded-full border-2 border-black bg-white/70 hover:bg-black hover:text-white transition-all cursor-pointer"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2.5 rounded-full border-2 border-black bg-white/70 hover:bg-black hover:text-white transition-all cursor-pointer"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <p className="font-sans text-xs md:text-sm text-black/75 max-w-2xl leading-relaxed">
          Enakshi’s culinary work is rooted in sensory instinct, heirloom recipes, and unstandardized seasonal dinners where every course tells a personal story from home and travel.
        </p>

        {/* Filter and Search Bar */}
        <div className="flex flex-wrap items-center gap-3 pt-2 pb-4">
          <div className="relative flex-1 max-w-xs">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-black/50" />
            <input
              type="text"
              placeholder="Search editions & courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#FAF6F0]/80 border-2 border-black/30 rounded-full pl-10 pr-4 py-2 font-mono text-xs text-black focus:outline-none focus:border-black placeholder:text-black/40"
            />
          </div>

          <div className="flex items-center bg-black/10 rounded-full p-1 gap-1 overflow-x-auto">
            {filterOptions.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-3.5 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                  selectedFilter === filter
                    ? 'bg-[#0e0e0e] text-white font-bold shadow-xs'
                    : 'text-black/70 hover:text-black'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Horizontal Snap-Scroll Cards Carousel */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 pt-2 scroll-smooth scrollbar-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {filteredMenus.length === 0 ? (
            <div className="snap-start shrink-0 w-full border-2 border-black border-dashed rounded-3xl p-12 text-center font-mono text-xs text-black/60 bg-black/5">
              No matching tasting editions found.
            </div>
          ) : (
            filteredMenus.map((menu, idx) => (
              <div
                key={menu.id}
                className="snap-start shrink-0 w-72 md:w-84 border-2 border-black bg-[#0e0e0e] text-[#f5f2eb] p-5 rounded-3xl flex flex-col justify-between h-[34rem] relative group hover:scale-[1.01] transition-transform duration-300 shadow-xl"
              >
                <div>
                  {/* Visual Card Cover / Printed Menu Preview */}
                  <div
                    onClick={() => setLightboxImage(menu.imageUrl)}
                    className="aspect-square w-full rounded-2xl overflow-hidden relative border border-white/10 bg-[#080808] flex items-center justify-center cursor-zoom-in group/img"
                  >
                    <img
                      src={menu.imageUrl}
                      alt={menu.title}
                      className="absolute inset-0 w-full h-full object-cover blur-lg opacity-40 scale-110 pointer-events-none"
                    />
                    <img
                      src={menu.imageUrl}
                      alt={menu.title}
                      className="w-full h-full object-contain relative z-10 transition-transform duration-500 group-hover/img:scale-105"
                      loading="lazy"
                    />

                    {/* Year badge */}
                    <div className="absolute bottom-3 left-3 z-20 bg-black/80 backdrop-blur-xs px-2.5 py-0.5 rounded text-[8.5px] font-mono tracking-wider uppercase text-[#ffd177] font-bold border border-white/15">
                      EDITION 0{idx + 1} • 2026
                    </div>

                    <div className="absolute top-3 right-3 z-20 opacity-0 group-hover/img:opacity-100 transition-opacity bg-black/80 text-white p-1.5 rounded-full">
                      <ZoomIn className="w-3.5 h-3.5 text-[#ffd177]" />
                    </div>
                  </div>

                  {/* Title & Tag */}
                  <div className="mt-4 space-y-1">
                    <h4 className="font-marcellus text-xl font-normal text-white group-hover:text-[#ffd177] transition-colors leading-tight line-clamp-1">
                      {menu.title}
                    </h4>
                    <div className="flex justify-between items-center pt-0.5">
                      <span className="font-bengali text-xs text-[#ffd177] font-medium">
                        {menu.bengaliTitle}
                      </span>
                      <span className="text-[8px] font-mono bg-white/10 text-[#ffd177] border border-[#ffd177]/25 px-2 py-0.5 uppercase tracking-wider rounded-full font-bold">
                        {menu.courses.length} Courses
                      </span>
                    </div>
                  </div>
                </div>

                {/* Course preview snippet */}
                <div className="border-t border-white/10 pt-4 mt-3 space-y-1.5">
                  <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest font-bold block">
                    FEATURED COURSES:
                  </span>
                  <div className="space-y-1">
                    {menu.courses.slice(0, 3).map((c) => (
                      <p key={c.courseTitle} className="font-sans text-[11.5px] text-white/80 line-clamp-1 flex items-baseline">
                        <span className="text-[#ffd177] font-mono mr-1.5 text-[9px]">{c.courseNumber}.</span>
                        <span>{c.courseTitle}</span>
                      </p>
                    ))}
                  </div>

                  {menu.drinkPairing ? (
                    <div className="pt-2 border-t border-white/10 mt-2">
                      <span className="font-sans text-[10px] text-[#ffd177] line-clamp-1 flex items-center gap-1">
                        <GlassWater className="w-3 h-3 shrink-0" />
                        <span>{menu.drinkPairing}</span>
                      </span>
                    </div>
                  ) : (
                    <div className="pt-2 border-t border-white/10 mt-2">
                      <span className="font-pt-serif italic text-[11px] text-white/50 line-clamp-1">
                        “{menu.description.slice(0, 60)}...”
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Matrix Cards (Supper Club & Private Dining Architecture) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 border-t border-black/15 pt-8">
          <div className="border-2 border-black bg-[#FAF6F0] p-6 rounded-3xl shadow-sm space-y-2 text-left">
            <span className="font-mono text-[9.5px] text-black/60 uppercase tracking-wider block font-bold">
              01 // INTIMATE SUPPER CLUB FORMAT
            </span>
            <h5 className="font-marcellus text-xl font-normal text-black">
              Communal Table (10–14 Guests)
            </h5>
            <p className="font-sans text-xs text-black/80 leading-relaxed font-light">
              One shared table. Seasonal batch releases announced privately to waitlist members. Three unhurried hours of eating, storytelling, and connecting.
            </p>
          </div>

          <div className="border-2 border-black bg-[#FAF6F0] p-6 rounded-3xl shadow-sm space-y-2 text-left">
            <span className="font-mono text-[9.5px] text-black/60 uppercase tracking-wider block font-bold">
              02 // BESPOKE PRIVATE GATHERINGS
            </span>
            <h5 className="font-marcellus text-xl font-normal text-black">
              Private Dining & Milestones (Up to 35 Guests)
            </h5>
            <p className="font-sans text-xs text-black/80 leading-relaxed font-light">
              Tailored multi-course journeys hosted in private residences, milestone celebrations, and interactive cooking circles curated around your cherished family memories.
            </p>
          </div>
        </div>
      </div>

      {/* Lightbox Modal for Original Printed Card */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#0e0e0e]/90 backdrop-blur-sm p-4 sm:p-6 flex items-center justify-center"
            onClick={() => setLightboxImage(null)}
          >
            <div
              className="relative max-w-lg max-h-[92vh] bg-[#FAF6F0] border-2 border-black rounded-3xl overflow-hidden shadow-2xl p-4 sm:p-6 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-3 border-b-2 border-black/10">
                <span className="font-marcellus text-lg text-black">Pichhutaaney Original Printed Card</span>
                <button
                  onClick={() => setLightboxImage(null)}
                  className="p-1.5 rounded-full bg-black/10 hover:bg-black hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="max-h-[78vh] overflow-y-auto rounded-xl mt-3">
                <img
                  src={lightboxImage}
                  alt="Original Menu Card"
                  className="w-full h-auto object-contain mx-auto rounded-lg"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
