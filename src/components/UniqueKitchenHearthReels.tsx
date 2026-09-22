import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Flame } from 'lucide-react';

const SPOTLIGHT_VIDEO = {
  url: 'https://res.cloudinary.com/dpdtsaalf/video/upload/v1790102790/WhatsApp_Video_2026-09-22_at_10.52.23_AM_vugp9u.mp4',
  tag: 'THE LIVING HEARTH • IN MOTION',
  title: 'Enakshi • Food, Stories & Home',
  quote: '“Cooking not by formula, but by the quiet pull of memory and instinct.”',
  subtitle: 'Bringing people together around food, stories and a table that feels a little like home.',
};

export const UniqueKitchenHearthReels: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

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
    <section id="hearth-reels" className="py-20 sm:py-28 bg-[#1C1713] text-[#ECE5DA] border-b border-[#382F27] text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-8">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 text-[10px] tracking-[0.25em] uppercase font-bold text-[#B58D59] font-sans bg-white/10 px-4 py-1.5 rounded-full border border-white/10">
              <Flame className="w-3.5 h-3.5 text-[#B58D59]" />
              <span>THE LIVING HEARTH IN MOTION</span>
            </div>
            <h2 className="font-marcellus text-3xl sm:text-4xl md:text-5xl font-normal text-[#ECE5DA] tracking-tight">
              Scent, Sizzle & Living Kitchen
            </h2>
          </div>
          <p className="font-sans text-xs sm:text-sm text-[#D5CBBD] max-w-md leading-relaxed font-light">
            Witness the sizzle of golden mustard oil heating to smoke point, whole spices crackling in the pan, and intimate communal dinner moments.
          </p>
        </div>

        {/* Spotlight Video Player Frame */}
        <div className="relative rounded-3xl overflow-hidden bg-black border border-white/15 shadow-2xl group">
          <div className="relative aspect-video sm:aspect-[21/9] w-full overflow-hidden bg-black">
            <video
              ref={videoRef}
              src={SPOTLIGHT_VIDEO.url}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className="w-full h-full object-cover filter contrast-[1.04] brightness-95"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/35 pointer-events-none" />

            {/* Top Tag */}
            <div className="absolute top-4 sm:top-6 left-4 sm:left-6">
              <span className="bg-[#1C1713]/85 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-mono tracking-widest uppercase border border-white/20 text-[#B58D59] font-bold">
                {SPOTLIGHT_VIDEO.tag}
              </span>
            </div>

            {/* Bottom Overlay Info & Controls */}
            <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
              <div className="text-left space-y-1.5 max-w-xl">
                <span className="text-[10px] uppercase tracking-widest text-[#B58D59] font-bold font-mono">
                  {SPOTLIGHT_VIDEO.title}
                </span>
                <p className="font-pt-serif italic text-lg sm:text-2xl text-white leading-snug">
                  {SPOTLIGHT_VIDEO.quote}
                </p>
                <p className="text-xs text-[#D5CBBD] font-sans font-light hidden sm:block">
                  {SPOTLIGHT_VIDEO.subtitle}
                </p>
              </div>

              {/* Floating Controls Bar */}
              <div className="flex items-center space-x-3 bg-[#1C1713]/85 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20 text-xs text-white">
                <button
                  onClick={togglePlay}
                  className="flex items-center space-x-1.5 hover:text-[#B58D59] transition-colors p-1 cursor-pointer"
                  aria-label={isPlaying ? 'Pause video' : 'Play video'}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                  <span className="hidden sm:inline font-mono uppercase text-[10px] tracking-widest font-bold">
                    {isPlaying ? 'Pause' : 'Play'}
                  </span>
                </button>

                <span className="text-white/30">|</span>

                <button
                  onClick={toggleMute}
                  className="flex items-center space-x-1.5 hover:text-[#B58D59] transition-colors p-1 cursor-pointer"
                  aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  <span className="hidden sm:inline font-mono uppercase text-[10px] tracking-widest font-bold">
                    {isMuted ? 'Unmute' : 'Sound'}
                  </span>
                </button>

                <span className="text-white/30">|</span>

                <button
                  onClick={handleFullScreen}
                  className="hover:text-[#B58D59] transition-colors p-1 cursor-pointer"
                  aria-label="Fullscreen"
                >
                  <Maximize className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
