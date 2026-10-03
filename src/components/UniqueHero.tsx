import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Utensils, Compass, Flame, Play, ArrowUpRight, Volume2, VolumeX, ChevronRight, ChevronLeft, Film } from 'lucide-react';
import { HeroLookbookItem } from '../types';

export const CHEF_ATELIER_LOOKBOOK: HeroLookbookItem[] = [
  {
    id: 'vid-essence',
    category: 'The Intuitive Cook',
    title: 'The Essence',
    subtitle: 'Wandering, sensory memory, and instinct-led cooking in full motion',
    type: 'video',
    url: 'https://res.cloudinary.com/dpdtsaalf/video/upload/v1790520158/WhatsApp_Video_2026-09-27_at_7.56.53_PM_kry70z.mp4',
    badge: 'REEL 01 • THE ESSENCE',
    provenance: 'Bengal Delta to Global Tables',
  },
  {
    id: 'vid-hearth',
    category: 'The Hearth & Flame',
    title: 'The Hearth',
    subtitle: 'Golden mustard oil heating to smoke point and the rhythm of the pan',
    type: 'video',
    url: 'https://res.cloudinary.com/dpdtsaalf/video/upload/v1788549950/WhatsApp_Video_2026-09-05_at_12.47.22_AM_udyrd8.mp4',
    badge: 'REEL 02 • THE HEARTH',
    provenance: 'Nadia District & River Silts',
  },
  {
    id: 'vid-invite',
    category: 'The Host Invitation',
    title: 'The Invite',
    subtitle: 'A personal invitation to join our communal supper club table and taste memory in motion',
    type: 'video',
    url: 'https://res.cloudinary.com/dpdtsaalf/video/upload/v1790433308/WhatsApp_Video_2026-09-26_at_12.59.54_AM_pikgxs.mp4',
    badge: 'AAMONTRON • THE INVITE',
    provenance: 'Enakshi’s Table Invitation',
  },
];

interface UniqueHeroProps {
  lookbookItems?: HeroLookbookItem[];
}

export const UniqueHero: React.FC<UniqueHeroProps> = ({
  lookbookItems = CHEF_ATELIER_LOOKBOOK,
}) => {
  const activeLookbook = lookbookItems && lookbookItems.length > 0 ? lookbookItems : CHEF_ATELIER_LOOKBOOK;
  const hasVideos = activeLookbook.length > 0;

  const [activeIdx, setActiveIdx] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const currentItem = hasVideos ? activeLookbook[activeIdx % activeLookbook.length] : null;

  const handleNextVideo = () => {
    if (!hasVideos) return;
    setActiveIdx((prev) => (prev + 1) % activeLookbook.length);
  };

  const handlePrevVideo = () => {
    if (!hasVideos) return;
    setActiveIdx((prev) => (prev - 1 + activeLookbook.length) % activeLookbook.length);
  };

  useEffect(() => {
    if (!hasVideos) return;
    videoRefs.current.forEach((video, idx) => {
      if (video) {
        if (idx === activeIdx) {
          video.currentTime = 0;
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      }
    });
  }, [activeIdx, hasVideos]);

  useEffect(() => {
    if (!hasVideos) return;
    videoRefs.current.forEach((video) => {
      if (video) {
        video.muted = isMuted;
      }
    });
  }, [isMuted, hasVideos]);

  return (
    <section id="hero" className="relative min-h-[92vh] lg:min-h-screen bg-[#ECE5DA] text-[#28221D] pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-[#D5CBBD]">
      {/* Subtle organic light glow matching menu card highlights */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-[#F7F3EC]/70 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-10 left-0 w-[450px] h-[450px] bg-[#D5CBBD]/30 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[75vh]">
        {/* Left Column: Bespoke Culinary Identity in Menu Card Parchment */}
        <div className="lg:col-span-6 text-left space-y-6 animate-fade-in-up">
          {/* Top Pill Tag */}
          <div className="inline-flex items-center space-x-2.5 bg-[#F7F3EC] border border-[#D5CBBD] px-4 py-1.5 rounded-full text-xs font-sans text-[#28221D] shadow-xs hover:border-[#B58D59] transition-colors">
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
            <h1 className="font-marcellus text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-[#28221D] tracking-tight leading-[0.9] hover:text-[#B58D59] transition-colors duration-500 cursor-default">
              Pichhutaaney
            </h1>
            <div className="flex items-center space-x-3 pt-1 group/bengali">
              <span className="font-bengali text-3xl sm:text-4xl text-[#28221D] font-medium group-hover/bengali:text-[#B58D59] transition-colors duration-300">
                পিছুটানে
              </span>
              <span className="font-pt-serif italic text-sm sm:text-base text-[#655B51] group-hover/bengali:text-[#28221D] transition-colors duration-300">
                / The gentle, backward glance toward home /
              </span>
            </div>
          </div>

          {/* Core Hook Narrative */}
          <p className="font-sans text-sm sm:text-base text-[#4A4138] leading-relaxed font-light max-w-xl">
            An intuitive Indian dining table, communal supper club, and living archive of kitchen memories. Cooked by instinct, shaped by travel, and rooted in the warmth of West Bengal.
          </p>

          {/* Quick CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#hearth-reels"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-[#28221D] hover:bg-[#1C1713] text-[#ECE5DA] rounded-full font-sans text-xs uppercase tracking-widest font-semibold transition-all shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Explore Living Hearth</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#B58D59] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <a
              href="#table-concierge"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-[#F7F3EC] border border-[#D5CBBD] hover:border-[#28221D] text-[#28221D] rounded-full font-sans text-xs uppercase tracking-widest font-semibold transition-all shadow-xs hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Supper Club Waitlist</span>
            </a>
          </div>
        </div>

        {/* Right Column: Video Lookbook Player or Ready Placeholder */}
        <div className="lg:col-span-6 relative">
          <div className="relative rounded-3xl overflow-hidden bg-[#28221D] border-2 border-[#28221D] shadow-2xl group aspect-[4/4.8] sm:aspect-[4/4.2] flex items-center justify-center">
            {hasVideos && currentItem ? (
              <>
                {/* Pre-buffered Stacked Video Container for Instantaneous Switch */}
                <div className="w-full h-full relative">
                  {activeLookbook.map((item, idx) => (
                    <video
                      key={item.id}
                      ref={(el) => { videoRefs.current[idx] = el; }}
                      src={item.url}
                      muted={isMuted}
                      playsInline
                      preload="auto"
                      onEnded={handleNextVideo}
                      className={`absolute inset-0 w-full h-full object-cover filter contrast-[1.03] transition-opacity duration-200 ${
                        idx === activeIdx ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                      }`}
                    />
                  ))}
                </div>

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40 pointer-events-none z-20" />

                {/* Top Bar with Provenance & Auto-Progression Badge */}
                <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 flex items-center justify-between pointer-events-none z-30">
                  <div className="flex items-center space-x-2">
                    <span className="bg-[#1C1713]/85 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[9.5px] font-mono tracking-widest uppercase border border-white/20 text-[#ECE5DA] font-bold">
                      {currentItem.badge}
                    </span>
                    <span className="hidden sm:inline-flex items-center space-x-1 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[8.5px] font-mono text-[#B58D59] border border-white/10">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B58D59] animate-pulse" />
                      <span>INSTANT • AUTO-SCROLL</span>
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 pointer-events-auto">
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="p-2 rounded-full bg-black/60 hover:bg-black text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer"
                      title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
                    >
                      {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#B58D59]" />}
                    </button>
                  </div>
                </div>

                {/* Side Navigation Arrow Overlays for Instant Switching */}
                <button
                  onClick={handlePrevVideo}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black text-white backdrop-blur-sm border border-white/20 transition-all opacity-0 group-hover:opacity-100 cursor-pointer z-30"
                  title="Previous Video"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextVideo}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black text-white backdrop-blur-sm border border-white/20 transition-all opacity-0 group-hover:opacity-100 cursor-pointer z-30"
                  title="Next Video"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                {/* Bottom Lookbook Selector Switcher Bar */}
                <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/80 backdrop-blur-md border border-white/20 p-1.5 rounded-full z-30 shadow-2xl max-w-[94%] overflow-x-auto">
                  {activeLookbook.map((item, idx) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveIdx(idx)}
                      className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border-2 transition-all shrink-0 relative cursor-pointer ${
                        activeIdx === idx
                          ? 'border-[#B58D59] scale-110 shadow-md ring-2 ring-[#B58D59]/60'
                          : 'border-white/30 opacity-60 hover:opacity-100'
                      }`}
                      title={`${item.title} (Click to play instantly)`}
                    >
                      <video src={item.url} muted preload="metadata" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>

                {/* Bottom Caption */}
                <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 text-left text-white pt-10 pointer-events-none z-30">
                  <h4 className="font-marcellus text-base sm:text-lg font-normal text-white">
                    {currentItem.title}
                  </h4>
                </div>
              </>
            ) : (
              /* Atmospheric Placeholder when Videos are Cleared for Rearranging */
              <div className="text-center p-8 space-y-4 max-w-sm mx-auto">
                <div className="w-16 h-16 rounded-full bg-[#382F27] border border-[#B58D59]/40 flex items-center justify-center mx-auto text-[#B58D59] shadow-inner">
                  <Film className="w-8 h-8" />
                </div>
                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#B58D59] font-semibold block">
                    LOOKBOOK REELS • IN PREPARATION
                  </span>
                  <h3 className="font-marcellus text-2xl text-[#ECE5DA] font-normal">
                    Living Hearth in Motion
                  </h3>
                  <p className="text-xs text-[#D5CBBD]/70 font-light leading-relaxed">
                    Reels cleared and ready for your rearranged sequence.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
