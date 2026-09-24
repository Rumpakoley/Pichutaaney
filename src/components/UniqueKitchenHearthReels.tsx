import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Flame, ChevronLeft, ChevronRight } from 'lucide-react';

interface VideoCardData {
  id: string;
  url: string;
  poster: string;
  tag: string;
  title: string;
  quote: string;
  subtitle: string;
}

const HEARTH_VIDEOS: VideoCardData[] = [
  {
    id: 'hearth-1',
    url: 'https://res.cloudinary.com/dpdtsaalf/video/upload/v1790275883/whatsapp-video-2026-09-22-at-105223-am_EJQaSZwo_online-video-cutter.com_mcbyn5.mp4',
    poster: 'https://res.cloudinary.com/dpdtsaalf/video/upload/so_1/v1790275883/whatsapp-video-2026-09-22-at-105223-am_EJQaSZwo_online-video-cutter.com_mcbyn5.jpg',
    tag: 'THE LIVING HEARTH • IN MOTION',
    title: 'Enakshi • Food, Stories & Home',
    quote: '“Cooking not by formula, but by the quiet pull of memory and instinct.”',
    subtitle: 'Bringing people together around food, stories and a table that feels like home.',
  },
  {
    id: 'hearth-2',
    url: 'https://res.cloudinary.com/dpdtsaalf/video/upload/v1790183107/whatsapp-video-2026-09-22-at-110243-pm_hXNXyxwo_1_rh4fal.mp4',
    poster: 'https://res.cloudinary.com/dpdtsaalf/video/upload/so_1/v1790183107/whatsapp-video-2026-09-22-at-110243-pm_hXNXyxwo_1_rh4fal.jpg',
    tag: 'HEIRLOOM TEMPERING • PHORON',
    title: 'Panch Phoron & Mustard Smoke',
    quote: '“The magic begins when whole spices crackle in smoking mustard oil.”',
    subtitle: 'Slow tempering, hand-pounded spices, and aromas etched in nostalgic memory.',
  },
  {
    id: 'hearth-3',
    url: 'https://res.cloudinary.com/dpdtsaalf/video/upload/v1790183317/WhatsApp_Video_2026-09-22_at_11.10.54_PM_s2agzc.mp4',
    poster: 'https://res.cloudinary.com/dpdtsaalf/video/upload/so_1/v1790183317/WhatsApp_Video_2026-09-22_at_11.10.54_PM_s2agzc.jpg',
    tag: 'STORIES & MEMORIES • ROOTS',
    title: 'Enakshi • Memories of Bengal',
    quote: '“Food is the most honest language of belonging I know.”',
    subtitle: 'Reflections on heritage, regional culinary history, and memories of Kolkata tables.',
  },
  {
    id: 'hearth-4',
    url: 'https://res.cloudinary.com/dpdtsaalf/video/upload/v1790183520/WhatsApp_Video_2026-09-23_at_12.43.27_AM_jymoqj.mp4',
    poster: 'https://res.cloudinary.com/dpdtsaalf/video/upload/so_1/v1790183520/WhatsApp_Video_2026-09-23_at_12.43.27_AM_jymoqj.jpg',
    tag: 'CULINARY ATELIER • PASSION',
    title: 'Art of Bengali Flavors',
    quote: '“Every dish tells a tale of tradition, spices, and soulful cooking.”',
    subtitle: 'Mastering the balance of sweet, pungent, and savory notes across traditional dishes.',
  },
];

const HearthVideoCard: React.FC<{ item: VideoCardData }> = ({ item }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const webmUrl = item.url.replace('/video/upload/', '/video/upload/f_webm/').replace(/\.mp4$/i, '.webm');
  const transcodedMp4Url = item.url.replace('/video/upload/', '/video/upload/f_mp4,vc_h264/');

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.defaultMuted = true;
    video.muted = true;
    video.load();

    const startPlayback = () => {
      video.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Autoplay deferred or requires user interaction
      });
    };

    if (video.readyState >= 2) {
      startPlayback();
    } else {
      video.addEventListener('loadeddata', startPlayback, { once: true });
      video.addEventListener('canplay', startPlayback, { once: true });
    }

    return () => {
      video.removeEventListener('loadeddata', startPlayback);
      video.removeEventListener('canplay', startPlayback);
    };
  }, [item.url]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const handleFullScreen = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.requestFullscreen) {
      video.requestFullscreen();
    }
  };

  return (
    <div className="relative rounded-3xl overflow-hidden bg-black border border-white/15 shadow-2xl group flex flex-col justify-between hover:border-[#B58D59]/60 transition-all duration-300 h-full select-none">
      <div className="relative aspect-[4/5] sm:aspect-[3/4] w-full overflow-hidden bg-black cursor-pointer" onClick={togglePlay}>
        {/* Instant Frame Image Fallback while buffering */}
        <img
          src={item.poster}
          alt={item.title}
          className="absolute inset-0 w-full h-full object-cover filter contrast-[1.04] brightness-95"
          loading="lazy"
        />

        <video
          ref={videoRef}
          poster={item.poster}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          className="relative w-full h-full object-cover filter contrast-[1.04] brightness-95 group-hover:scale-105 transition-transform duration-700 ease-out"
        >
          <source src={webmUrl} type="video/webm" />
          <source src={transcodedMp4Url} type="video/mp4" />
          <source src={item.url} type="video/mp4" />
        </video>

        {/* Ambient Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-black/30 pointer-events-none" />

        {/* Top Tag */}
        <div className="absolute top-4 left-4 z-10 pointer-events-none">
          <span className="bg-[#1C1713]/85 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[9px] font-mono tracking-wider uppercase border border-white/20 text-[#B58D59] font-bold shadow-xs">
            {item.tag}
          </span>
        </div>

        {/* Center Play Overlay Icon when Paused */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            <div className="w-14 h-14 rounded-full bg-[#1C1713]/80 border border-white/20 backdrop-blur-md flex items-center justify-center text-[#B58D59] shadow-xl">
              <Play className="w-6 h-6 fill-current translate-x-0.5" />
            </div>
          </div>
        )}

        {/* Bottom Info & Controls */}
        <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 flex flex-col justify-end space-y-3 z-10" onClick={(e) => e.stopPropagation()}>
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
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#B58D59]" />}
              <span className="font-mono uppercase text-[9.5px] tracking-wider font-bold">
                {isMuted ? 'Unmute' : 'Mute'}
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
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = direction === 'left' ? -420 : 420;
    scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <section id="hearth-reels" className="py-20 sm:py-28 bg-[#1C1713] text-[#ECE5DA] border-b border-[#382F27] text-left overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 text-[10px] tracking-[0.25em] uppercase font-bold text-[#B58D59] font-sans bg-white/10 px-4 py-1.5 rounded-full border border-white/10">
              <Flame className="w-3.5 h-3.5 text-[#B58D59]" />
              <span>THE LIVING HEARTH IN MOTION</span>
            </div>
            <h2 className="font-marcellus text-3xl sm:text-4xl md:text-5xl font-normal text-[#ECE5DA] tracking-tight">
              Scent, Sizzle & Living Kitchen
            </h2>
          </div>

          {/* Right Header Description & Navigation Buttons */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="font-sans text-xs sm:text-sm text-[#D5CBBD] max-w-sm leading-relaxed font-light">
              Witness the sizzle of golden mustard oil, spices crackling, and intimate communal dinners.
            </p>

            {/* Scroll Navigation Buttons */}
            <div className="flex items-center space-x-2 shrink-0">
              <button
                onClick={() => handleScroll('left')}
                title="Scroll Left"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#B58D59] hover:text-[#1C1713] text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer shadow-sm hover:scale-105"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleScroll('right')}
                title="Scroll Right"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#B58D59] hover:text-[#1C1713] text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer shadow-sm hover:scale-105"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Scroll Track */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 pt-2 scroll-smooth scrollbar-thin scrollbar-thumb-[#B58D59]/50 scrollbar-track-white/5"
          style={{ scrollbarWidth: 'thin' }}
        >
          {HEARTH_VIDEOS.map((item) => (
            <div
              key={item.id}
              className="w-[85vw] sm:w-[360px] md:w-[390px] lg:w-[410px] shrink-0 snap-start"
            >
              <HearthVideoCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
