import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Utensils, Compass, Flame, Play, ArrowUpRight, Volume2, VolumeX } from 'lucide-react';

const CHEF_ATELIER_LOOKBOOK = [
  {
    id: 'look-1',
    category: 'The Intuitive Cook',
    title: 'Enakshi • West Bengal to the World',
    subtitle: 'Wandering, sensory memory, and instinct-led cooking in full motion',
    type: 'video',
    url: 'https://res.cloudinary.com/dpdtsaalf/video/upload/v1788549931/WhatsApp_Video_2026-09-05_at_12.42.00_AM_4_k3o720.mp4',
    badge: 'CHEF ATELIER • 01',
    provenance: 'Bengal Delta to Global Tables',
  },
  {
    id: 'look-2',
    category: 'The Hearth & Flame',
    title: 'Panch Phoron & Golden Mustard Oil',
    subtitle: 'Golden mustard oil heating to smoke point and the raw sizzle of whole spices',
    type: 'video',
    url: 'https://res.cloudinary.com/dpdtsaalf/video/upload/v1788549950/WhatsApp_Video_2026-09-05_at_12.47.22_AM_udyrd8.mp4',
    badge: 'HEARTH SOUND • 02',
    provenance: 'Nadia District & River Silts',
  },
  {
    id: 'look-3',
    category: 'Zero-Waste & Heirloom',
    title: 'Potato Peels, Stems & Posto Paste',
    subtitle: 'Honoring home frugality where vegetable skins and forgotten greens take center stage',
    type: 'image',
    url: 'https://res.cloudinary.com/dpdtsaalf/image/upload/v1788550859/WhatsApp_Image_2026-09-05_at_12.49.29_AM_f1smhc.jpg',
    badge: 'FRUGAL ARCHIVE • 03',
    provenance: 'Generational Bengali Kitchens',
  },
  {
    id: 'look-4',
    category: 'The Communal Table',
    title: 'Intimate 14-Seat Supper Club',
    subtitle: 'Strangers gathering around shared courses, breaking bread, and sharing stories',
    type: 'video',
    url: 'https://res.cloudinary.com/dpdtsaalf/video/upload/v1788549941/WhatsApp_Video_2026-09-05_at_12.42.00_AM_2_w12jyr.mp4',
    badge: 'SUPPER FEAST • 04',
    provenance: 'Rotating Pop-Ups & Salons',
  },
  {
    id: 'look-5',
    category: 'Fermentation & Nostalgia',
    title: 'Pantaa Bhaat & Anglo-Indian Vindaloo',
    subtitle: 'Probiotic overnight rice ferments paired with crisp sides and date-palm jaggery',
    type: 'image',
    url: 'https://res.cloudinary.com/dpdtsaalf/image/upload/v1788550859/WhatsApp_Image_2026-09-05_at_12.49.14_AM_uwvgz4.jpg',
    badge: 'PROBIOTIC LORE • 05',
    provenance: 'Colonial Archives & Delta Soils',
  },
];

export const UniqueHero: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const currentItem = CHEF_ATELIER_LOOKBOOK[activeIdx];

  return (
    <section id="hero" className="relative min-h-[92vh] lg:min-h-screen bg-[#ECE5DA] text-[#28221D] pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-[#D5CBBD]">
      {/* Subtle organic light glow matching menu card highlights */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-[#F7F3EC]/70 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-10 left-0 w-[450px] h-[450px] bg-[#D5CBBD]/30 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[75vh]">
        {/* Left Column: Bespoke Culinary Identity in Menu Card Parchment */}
        <div className="lg:col-span-6 text-left space-y-6">
          {/* Top Pill Tag */}
          <div className="inline-flex items-center space-x-2.5 bg-[#F7F3EC] border border-[#D5CBBD] px-4 py-1.5 rounded-full text-xs font-sans text-[#28221D] shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#B58D59] animate-pulse" />
            <span className="font-semibold uppercase tracking-wider text-[10.5px]">
              INTUITIVE CULINARY ATELIER & SUPPER CLUB
            </span>
          </div>

          {/* Hero Typography */}
          <div className="space-y-2">
            <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#B58D59] font-bold block">
              TASTING NIGHTS WITH
            </span>
            <h1 className="font-marcellus text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-[#28221D] tracking-tight leading-[0.9]">
              Pichhutaaney
            </h1>
            <div className="flex items-center space-x-3 pt-1">
              <span className="font-bengali text-3xl sm:text-4xl text-[#28221D] font-medium">
                পিছুটানে
              </span>
              <span className="font-pt-serif italic text-sm sm:text-base text-[#655B51]">
                / The gentle, backward glance toward home /
              </span>
            </div>
          </div>

          {/* Core Hook Narrative */}
          <p className="font-sans text-sm sm:text-base text-[#4A4138] leading-relaxed font-light max-w-xl">
            An intuitive Indian dining table, communal supper club, and living archive of kitchen memories. Cooked by instinct, shaped by travel, and rooted in the warmth of West Bengal.
          </p>

          {/* Sensory Pillar Badges */}
          <div className="grid grid-cols-3 gap-2.5 pt-2 max-w-lg">
            <div className="p-3 bg-[#F7F3EC] rounded-2xl border border-[#D5CBBD] shadow-xs text-left">
              <span className="font-mono text-[9px] text-[#B58D59] uppercase font-bold block">01 / SENSES</span>
              <span className="font-marcellus text-xs font-normal text-[#28221D] block mt-0.5">Mustard Smoke</span>
            </div>
            <div className="p-3 bg-[#F7F3EC] rounded-2xl border border-[#D5CBBD] shadow-xs text-left">
              <span className="font-mono text-[9px] text-[#B58D59] uppercase font-bold block">02 / TABLE</span>
              <span className="font-marcellus text-xs font-normal text-[#28221D] block mt-0.5">14 Communal Seats</span>
            </div>
            <div className="p-3 bg-[#F7F3EC] rounded-2xl border border-[#D5CBBD] shadow-xs text-left">
              <span className="font-mono text-[9px] text-[#B58D59] uppercase font-bold block">03 / ETHOS</span>
              <span className="font-marcellus text-xs font-normal text-[#28221D] block mt-0.5">Peel-to-Stem Care</span>
            </div>
          </div>

          {/* Quick CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#tasting-archive"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-[#28221D] hover:bg-[#1C1713] text-[#ECE5DA] rounded-full font-sans text-xs uppercase tracking-widest font-semibold transition-all shadow-md hover:shadow-lg"
            >
              <span>Explore Tasting Archive</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#B58D59]" />
            </a>

            <a
              href="#table-concierge"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-[#F7F3EC] border border-[#D5CBBD] hover:border-[#28221D] text-[#28221D] rounded-full font-sans text-xs uppercase tracking-widest font-semibold transition-all shadow-xs"
            >
              <span>Supper Club Waitlist</span>
            </a>
          </div>
        </div>

        {/* Right Column: Layered Chef's Atelier Lookbook Deck */}
        <div className="lg:col-span-6 relative">
          <div className="relative rounded-3xl overflow-hidden bg-[#28221D] border-2 border-[#28221D] shadow-2xl group aspect-[4/4.8] sm:aspect-[4/4.2]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentItem.id}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full relative"
              >
                {currentItem.type === 'video' ? (
                  <video
                    src={currentItem.url}
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    className="w-full h-full object-cover filter contrast-[1.03]"
                  />
                ) : (
                  <img
                    src={currentItem.url}
                    alt={currentItem.title}
                    className="w-full h-full object-cover filter contrast-[1.03]"
                  />
                )}
              </motion.div>
            </AnimatePresence>

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40 pointer-events-none" />

            {/* Top Bar with Provenance & Badge */}
            <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 flex items-center justify-between pointer-events-none">
              <span className="bg-[#1C1713]/85 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[9.5px] font-mono tracking-widest uppercase border border-white/20 text-[#ECE5DA] font-bold">
                {currentItem.badge}
              </span>

              {currentItem.type === 'video' && (
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="pointer-events-auto p-2 rounded-full bg-black/60 hover:bg-black text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer"
                  title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#B58D59]" />}
                </button>
              )}
            </div>

            {/* Bottom Lookbook Selector Switcher Bar */}
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/75 backdrop-blur-md border border-white/20 p-1.5 rounded-full z-10 shadow-2xl">
              {CHEF_ATELIER_LOOKBOOK.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => setActiveIdx(idx)}
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 transition-all relative cursor-pointer ${
                    activeIdx === idx
                      ? 'border-[#B58D59] scale-110 shadow-md ring-2 ring-[#B58D59]/50'
                      : 'border-white/30 opacity-60 hover:opacity-100'
                  }`}
                  title={item.category}
                >
                  {item.type === 'video' ? (
                    <video src={item.url} muted className="w-full h-full object-cover" />
                  ) : (
                    <img src={item.url} alt={item.category} className="w-full h-full object-cover" />
                  )}
                </button>
              ))}
            </div>

            {/* Bottom Caption & Provenance */}
            <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 text-left text-white pt-10 pointer-events-none">
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#B58D59] font-bold block mb-0.5">
                PROVENANCE // {currentItem.provenance}
              </span>
              <h4 className="font-marcellus text-base sm:text-lg font-normal text-white">
                {currentItem.title}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
