import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Film, Sparkles, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface ClientVideo {
  id: string;
  title: string;
  subtitle: string;
  url: string;
  tag: string;
  quote: string;
}

export const CLIENT_VIDEOS: ClientVideo[] = [
  {
    id: 'vid-intro',
    title: 'The Essence of Pichhutaaney',
    subtitle: 'Wandering, memory, and instinct-led cooking in full motion',
    url: 'https://res.cloudinary.com/dpdtsaalf/video/upload/v1790102790/WhatsApp_Video_2026-09-22_at_10.52.23_AM_vugp9u.mp4',
    tag: 'REEL 01 • THE ESSENCE',
    quote: '“Cooking not by formula, but by the quiet pull of memory and instinct.”',
  },
  {
    id: 'vid-1',
    title: 'The Hearth & The Flame',
    subtitle: 'Golden mustard oil heating to smoke point and the rhythm of the pan',
    url: 'https://res.cloudinary.com/dpdtsaalf/video/upload/v1788549950/WhatsApp_Video_2026-09-05_at_12.47.22_AM_udyrd8.mp4',
    tag: 'REEL 02 • THE HEARTH',
    quote: '“No timers, no strict formulas—just the crackle in the oil and the aroma in the air.”',
  },
  {
    id: 'vid-2',
    title: 'Intuitive Tempering',
    subtitle: 'Panch phoron, whole spices, and raw instinct guiding the pan',
    url: 'https://res.cloudinary.com/dpdtsaalf/video/upload/v1788549943/WhatsApp_Video_2026-09-05_at_12.42.00_AM_jkldp2.mp4',
    tag: 'REEL 03 • INSTINCT',
    quote: '“Cooking by touch, aroma, and the generational memory carried in our hands.”',
  },
  {
    id: 'vid-3',
    title: 'Handcrafted Heritage',
    subtitle: 'Steaming in banana leaves and slow simmered earthen textures',
    url: 'https://res.cloudinary.com/dpdtsaalf/video/upload/v1788549942/WhatsApp_Video_2026-09-05_at_12.42.00_AM_3_lm4akh.mp4',
    tag: 'REEL 04 • HANDCRAFT',
    quote: '“Every course is an intimate story from home, shaped by everywhere I’ve lived.”',
  },
  {
    id: 'vid-4',
    title: 'The Communal Table',
    subtitle: 'Strangers gathering around shared plates and warm conversations',
    url: 'https://res.cloudinary.com/dpdtsaalf/video/upload/v1788549941/WhatsApp_Video_2026-09-05_at_12.42.00_AM_2_w12jyr.mp4',
    tag: 'REEL 05 • THE GATHERING',
    quote: '“A three-hour unhurried communion of wandering, nostalgia, and belonging.”',
  },
  {
    id: 'vid-5',
    title: 'Kitchen Notes in Motion',
    subtitle: 'Atmospheric glimpses into Enakshi’s private kitchen studio',
    url: 'https://res.cloudinary.com/dpdtsaalf/video/upload/v1788549936/WhatsApp_Video_2026-09-05_at_12.42.00_AM_1_hoycwv.mp4',
    tag: 'REEL 06 • THE ARCHIVE',
    quote: '“Pichhutaaney is that tender pull toward where you came from, alive in every bite.”',
  },
];

export const CinematicVideoReel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const activeVideo = CLIENT_VIDEOS[activeIndex];

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });
    }
  }, [activeIndex]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleFullScreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <section id="kitchen-reels" className="py-20 sm:py-28 bg-[#171716] text-[#E9E4DD] relative overflow-hidden border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 text-left gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 text-[10px] tracking-[0.25em] uppercase font-bold text-[#EED485] font-sans mb-3 bg-white/10 px-3.5 py-1 rounded-full">
              <Film className="w-3.5 h-3.5" />
              <span>THE LIVING KITCHEN IN MOTION</span>
            </div>
            <h2 className="font-marcellus text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white">
              Scent, Sizzle & <span className="font-pt-serif italic text-[#EED485]">The Hearth</span>
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm text-[#DED8CF] font-sans font-light leading-relaxed">
            Glimpses from Enakshi’s private kitchen—where spices crackle in golden mustard oil and recipes come alive through raw instinct.
          </p>
        </div>

        {/* Spotlight Video Player Frame */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl overflow-hidden bg-black border border-white/15 shadow-2xl group"
        >
          <div className="relative aspect-video sm:aspect-[21/9] w-full overflow-hidden bg-black">
            <video
              ref={videoRef}
              src={activeVideo.url}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className="w-full h-full object-cover filter contrast-[1.04] brightness-95"
            />

            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/35 pointer-events-none" />

            {/* Top Tag Bar */}
            <div className="absolute top-4 sm:top-6 left-4 sm:left-6 flex items-center space-x-2">
              <span className="bg-[#171716]/80 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-mono tracking-widest uppercase border border-white/20 text-[#EED485]">
                {activeVideo.tag}
              </span>
            </div>

            {/* Bottom Overlay Info & Controls */}
            <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
              <div className="text-left space-y-1.5 max-w-xl">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#EED485] font-bold font-sans">
                  {activeVideo.title}
                </span>
                <p className="font-pt-serif italic text-lg sm:text-2xl text-white leading-snug">
                  {activeVideo.quote}
                </p>
                <p className="text-xs text-[#DED8CF] font-sans font-light hidden sm:block">
                  {activeVideo.subtitle}
                </p>
              </div>

              {/* Floating Controls Bar */}
              <div className="flex items-center space-x-3 bg-[#171716]/85 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20 text-xs text-white">
                <button
                  onClick={togglePlay}
                  className="flex items-center space-x-1.5 hover:text-[#EED485] transition-colors p-1 cursor-pointer"
                  aria-label={isPlaying ? "Pause video" : "Play video"}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                  <span className="hidden sm:inline font-mono uppercase text-[10px] tracking-widest">
                    {isPlaying ? "Pause" : "Play"}
                  </span>
                </button>

                <span className="text-white/30">|</span>

                <button
                  onClick={toggleMute}
                  className="flex items-center space-x-1.5 hover:text-[#EED485] transition-colors p-1 cursor-pointer"
                  aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  <span className="hidden sm:inline font-mono uppercase text-[10px] tracking-widest">
                    {isMuted ? "Unmute" : "Sound"}
                  </span>
                </button>

                <span className="text-white/30">|</span>

                <button
                  onClick={handleFullScreen}
                  className="hover:text-[#EED485] transition-colors p-1 cursor-pointer"
                  aria-label="Fullscreen"
                >
                  <Maximize className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 6-Video Reel Selector Strip */}
        <div className="mt-8 sm:mt-10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#DED8CF]">
              SELECT A KITCHEN REEL ({CLIENT_VIDEOS.length} CLIPS)
            </span>
            <span className="text-[10px] font-mono text-[#EED485]">
              CLIP {activeIndex + 1} OF {CLIENT_VIDEOS.length}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {CLIENT_VIDEOS.map((video, idx) => {
              const isActive = activeIndex === idx;
              return (
                <button
                  key={video.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`group relative rounded-2xl overflow-hidden p-3 text-left border transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-white/10 border-[#EED485] shadow-md ring-1 ring-[#EED485]'
                      : 'bg-white/5 border-white/10 hover:border-white/30'
                  }`}
                >
                  {/* Thumbnail Video Preview */}
                  <div className="aspect-video w-full rounded-xl overflow-hidden relative bg-black/50 mb-2.5">
                    <video
                      src={video.url}
                      muted
                      playsInline
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className={`p-2 rounded-full ${isActive ? 'bg-[#EED485] text-[#171716]' : 'bg-white/30 text-white'}`}>
                        <Play className="w-3.5 h-3.5 fill-current" />
                      </div>
                    </div>
                  </div>

                  <span className="block text-[9.5px] font-mono uppercase tracking-widest text-[#EED485] mb-0.5">
                    REEL 0{idx + 1}
                  </span>
                  <h4 className="font-marcellus text-sm sm:text-base font-normal text-white truncate">
                    {video.title}
                  </h4>
                  <p className="text-[11px] text-[#DED8CF] font-sans font-light line-clamp-1 mt-0.5">
                    {video.subtitle}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
