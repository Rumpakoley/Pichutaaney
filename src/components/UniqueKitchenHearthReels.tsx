import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Flame } from 'lucide-react';

interface VideoCardData {
  id: string;
  url: string;
  tag: string;
  title: string;
  quote: string;
  subtitle: string;
}

const HEARTH_VIDEOS: VideoCardData[] = [
  {
    id: 'hearth-1',
    url: 'https://res.cloudinary.com/dpdtsaalf/video/upload/v1790102790/WhatsApp_Video_2026-09-22_at_10.52.23_AM_vugp9u.mp4',
    tag: 'THE LIVING HEARTH • IN MOTION',
    title: 'Enakshi • Food, Stories & Home',
    quote: '“Cooking not by formula, but by the quiet pull of memory and instinct.”',
    subtitle: 'Bringing people together around food, stories and a table that feels like home.',
  },
  {
    id: 'hearth-2',
    url: 'https://res.cloudinary.com/dpdtsaalf/video/upload/v1790183107/whatsapp-video-2026-09-22-at-110243-pm_hXNXyxwo_1_rh4fal.mp4',
    tag: 'HEIRLOOM TEMPERING • PHORON',
    title: 'Panch Phoron & Mustard Smoke',
    quote: '“The magic begins when whole spices crackle in smoking mustard oil.”',
    subtitle: 'Slow tempering, hand-pounded spices, and aromas etched in nostalgic memory.',
  },
  {
    id: 'hearth-3',
    url: 'https://res.cloudinary.com/dpdtsaalf/video/upload/v1788549950/WhatsApp_Video_2026-09-05_at_12.47.22_AM_udyrd8.mp4',
    tag: 'SUPPER CLUB • COMMUNAL TABLE',
    title: 'Feasts & Intimate Dinners',
    quote: '“An invitation to gather, linger over courses, and share quiet laughter.”',
    subtitle: 'Private supper clubs crafted with storytelling, warmth, and generous hospitality.',
  },
];

const HearthVideoCard: React.FC<{ item: VideoCardData }> = ({ item }) => {
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
    <div className="relative rounded-3xl overflow-hidden bg-black border border-white/15 shadow-2xl group flex flex-col justify-between hover:border-[#B58D59]/50 transition-all duration-300">
      <div className="relative aspect-[4/5] sm:aspect-[3/4] w-full overflow-hidden bg-black">
        <video
          ref={videoRef}
          src={item.url}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="w-full h-full object-cover filter contrast-[1.04] brightness-95 group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Ambient Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-black/30 pointer-events-none" />

        {/* Top Tag */}
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-[#1C1713]/85 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[9px] font-mono tracking-wider uppercase border border-white/20 text-[#B58D59] font-bold shadow-xs">
            {item.tag}
          </span>
        </div>

        {/* Bottom Info & Controls */}
        <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 flex flex-col justify-end space-y-3 z-10">
          <div className="text-left space-y-1">
            <span className="text-[9.5px] uppercase tracking-widest text-[#B58D59] font-bold font-mono block">
              {item.title}
            </span>
            <p className="font-pt-serif italic text-base sm:text-lg text-white leading-snug">
              {item.quote}
            </p>
            <p className="text-[11px] text-[#D5CBBD] font-sans font-light leading-relaxed line-clamp-2">
              {item.subtitle}
            </p>
          </div>

          {/* Floating Controls Bar */}
          <div className="flex items-center justify-between bg-[#1C1713]/90 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-xs text-white shadow-md">
            <button
              onClick={togglePlay}
              className="flex items-center space-x-1.5 hover:text-[#B58D59] transition-colors p-1 cursor-pointer"
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              <span className="font-mono uppercase text-[9.5px] tracking-wider font-bold">
                {isPlaying ? 'Pause' : 'Play'}
              </span>
            </button>

            <span className="text-white/20">|</span>

            <button
              onClick={toggleMute}
              className="flex items-center space-x-1.5 hover:text-[#B58D59] transition-colors p-1 cursor-pointer"
              aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              <span className="font-mono uppercase text-[9.5px] tracking-wider font-bold">
                {isMuted ? 'Unmute' : 'Sound'}
              </span>
            </button>

            <span className="text-white/20">|</span>

            <button
              onClick={handleFullScreen}
              className="hover:text-[#B58D59] transition-colors p-1 cursor-pointer"
              aria-label="Fullscreen"
            >
              <Maximize className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const UniqueKitchenHearthReels: React.FC = () => {
  return (
    <section id="hearth-reels" className="py-20 sm:py-28 bg-[#1C1713] text-[#ECE5DA] border-b border-[#382F27] text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
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

        {/* 3-Card Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {HEARTH_VIDEOS.map((item) => (
            <HearthVideoCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};
