import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Utensils, Compass, Flame, Leaf, Heart } from 'lucide-react';

export interface LookbookItem {
  id: string;
  category: string;
  title: string;
  description: string;
  mediaType: 'video' | 'image';
  mediaUrl: string;
}

const LOOKBOOK_ARCHETYPES: LookbookItem[] = [
  {
    id: 'arch-1',
    category: 'The Intuitive Cook',
    title: 'Enakshi • West Bengal to the World',
    description: 'Guided by sensory memory, raw touch, and recipes shaped by everywhere I have lived.',
    mediaType: 'video',
    mediaUrl: 'https://res.cloudinary.com/dpdtsaalf/video/upload/v1788549931/WhatsApp_Video_2026-09-05_at_12.42.00_AM_4_k3o720.mp4',
  },
  {
    id: 'arch-2',
    category: 'The Hearth & Flame',
    title: 'Panch Phoron & Golden Mustard Oil',
    description: 'Tempering whole spices to smoke point—cooking not by rigid rules, but by sound and aroma.',
    mediaType: 'video',
    mediaUrl: 'https://res.cloudinary.com/dpdtsaalf/video/upload/v1788549950/WhatsApp_Video_2026-09-05_at_12.47.22_AM_udyrd8.mp4',
  },
  {
    id: 'arch-3',
    category: 'Zero-Waste & Heirloom',
    title: 'Peels, Stems & Forgotten Harvests',
    description: 'Honoring everyday home frugality where potato skins, neem leaves, and jackfruit take center stage.',
    mediaType: 'image',
    mediaUrl: 'https://res.cloudinary.com/dpdtsaalf/image/upload/v1788550859/WhatsApp_Image_2026-09-05_at_12.49.29_AM_f1smhc.jpg',
  },
  {
    id: 'arch-4',
    category: 'The Communal Table',
    title: 'Private Supper Club Gatherings',
    description: 'An unhurried three-hour dining journey where strangers gather, break bread, and share stories.',
    mediaType: 'video',
    mediaUrl: 'https://res.cloudinary.com/dpdtsaalf/video/upload/v1788549941/WhatsApp_Video_2026-09-05_at_12.42.00_AM_2_w12jyr.mp4',
  },
  {
    id: 'arch-5',
    category: 'Fermentation & Nostalgia',
    title: 'Pantaa Bhaat & Colonial Memory',
    description: 'Overnight fermented probiotic rice paired with crisp earthen sides and date palm jaggery.',
    mediaType: 'image',
    mediaUrl: 'https://res.cloudinary.com/dpdtsaalf/image/upload/v1788550859/WhatsApp_Image_2026-09-05_at_12.49.14_AM_uwvgz4.jpg',
  },
];

export const PortfolioHero: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [istTime, setIstTime] = useState('');
  const [localTime, setLocalTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [timeZoneName, setTimeZoneName] = useState('');

  const currentItem = LOOKBOOK_ARCHETYPES[activeIdx];

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const dateFmt = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Kolkata',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
      setCurrentDate(dateFmt.format(now));

      const istFmt = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      setIstTime(istFmt.format(now));

      const localFmt = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      setLocalTime(localFmt.format(now));

      try {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone.split('/').pop()?.replace('_', ' ') || 'Local';
        setTimeZoneName(tz);
      } catch {
        setTimeZoneName('Local Time');
      }
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="hero-display"
      className="w-full min-h-[90vh] lg:h-screen flex flex-col lg:flex-row border-b-2 border-black relative overflow-hidden bg-[#FAF6F0]"
    >
      {/* Left Column: Bold Artist/Chef Identity & Typography */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-8 md:p-12 pt-24 sm:pt-28 pb-8 lg:pb-12 border-b-2 lg:border-b-0 lg:border-r-2 border-black bg-[#ffd177] text-left">
        {/* Top Location & Dual Time Bar */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className="flex flex-wrap justify-between items-center border-b border-black/15 pb-4 mb-6 font-mono text-[9.5px] md:text-[11px] font-black uppercase tracking-widest text-black gap-y-2"
        >
          <div>KOLKATA • SAN FRANCISCO</div>
          <div>{currentDate}</div>
          <div>{istTime} IST / {localTime} {timeZoneName}</div>
        </motion.div>

        {/* Center Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="my-auto py-6 space-y-3 sm:space-y-4"
        >
          <div className="flex items-baseline flex-wrap gap-x-6 gap-y-3">
            <h1 className="font-marcellus text-[2.75rem] xs:text-[3.5rem] sm:text-[4.5rem] md:text-[5.5rem] lg:text-[4rem] xl:text-[5.2rem] leading-[0.85] font-normal tracking-tight text-black">
              ENAKSHI
            </h1>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              className="max-w-[280px] border-l-2 border-black pl-4 my-auto"
            >
              <p className="font-sans text-xs md:text-[13px] font-bold leading-snug text-black">
                Intuitive Indian table, communal supper club & living culinary archive rooted in West Bengal, shaped by travel.
              </p>
            </motion.div>
          </div>

          <div>
            <h1 className="font-marcellus text-[2.2rem] xs:text-[2.8rem] sm:text-[3.8rem] md:text-[4.6rem] lg:text-[3.2rem] xl:text-[4.4rem] 2xl:text-[5.2rem] leading-[0.85] font-normal tracking-tight text-black w-full">
              PICHHUTAANEY
            </h1>
            <span className="font-bengali text-xl sm:text-2xl md:text-3xl text-black/80 font-medium block mt-1.5">
              পিছুটানেই <span className="font-mono text-xs uppercase tracking-widest font-bold opacity-60">/ The Backward Glance /</span>
            </span>
          </div>
        </motion.div>

        {/* Bottom Quick Tagline */}
        <div className="pt-4 border-t border-black/15 flex items-center justify-between text-[10px] font-mono uppercase tracking-widest font-black text-black/70">
          <span>CURATED TASTING EDITIONS</span>
          <span>HEIRLOOM RECIPES</span>
        </div>
      </div>

      {/* Right Column: Visual Lookbook Archetype Viewer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="w-full lg:w-1/2 relative min-h-[55vh] lg:min-h-0 bg-[#0e0e0e] overflow-hidden flex group"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentItem.id}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full relative"
          >
            {currentItem.mediaType === 'video' ? (
              <video
                src={currentItem.mediaUrl}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover filter contrast-[1.05] brightness-95"
              />
            ) : (
              <img
                src={currentItem.mediaUrl}
                alt={currentItem.title}
                className="w-full h-full object-cover filter contrast-[1.03]"
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Cinematic Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40 pointer-events-none" />

        {/* Top Tag Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="absolute top-6 left-6 bg-black text-[#ffd177] border border-[#ffd177]/40 px-3.5 py-1.5 font-mono text-[9.5px] uppercase tracking-wider flex items-center gap-2 font-bold shadow-lg rounded-full"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#ffd177] animate-spin" style={{ animationDuration: '6s' }} />
          <span>Archetype: {currentItem.category}</span>
        </motion.div>

        {/* Bottom Thumbnail Switcher Bar */}
        <div className="absolute bottom-24 sm:bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/70 backdrop-blur-md border border-white/20 p-2 rounded-full z-10 shadow-2xl">
          {LOOKBOOK_ARCHETYPES.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setActiveIdx(idx)}
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 transition-all relative cursor-pointer ${
                activeIdx === idx
                  ? 'border-[#ffd177] scale-110 shadow-md ring-2 ring-[#ffd177]/50'
                  : 'border-white/30 opacity-60 hover:opacity-100 hover:scale-105'
              }`}
              title={`View ${item.category}`}
            >
              {item.mediaType === 'video' ? (
                <video src={item.mediaUrl} muted className="w-full h-full object-cover" />
              ) : (
                <img src={item.mediaUrl} alt={item.category} className="w-full h-full object-cover" />
              )}
            </button>
          ))}
        </div>

        {/* Bottom Title & Description Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white pt-12 pointer-events-none text-left">
          <span className="font-mono text-[10px] text-[#ffd177] tracking-widest uppercase font-extrabold block mb-1">
            {currentItem.title}
          </span>
          <p className="text-xs sm:text-sm text-white/85 leading-relaxed font-pt-serif italic max-w-lg">
            “{currentItem.description}”
          </p>
        </div>
      </motion.div>
    </section>
  );
};
