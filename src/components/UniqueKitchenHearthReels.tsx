import React, { useState, useRef, useEffect } from 'react';
import { CLIENT_VIDEOS } from './CinematicVideoReel';
import { Play, Pause, Volume2, VolumeX, Maximize, Film, Flame, Radio } from 'lucide-react';
import { motion } from 'motion/react';

export const UniqueKitchenHearthReels: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(15);
  const [waveBars, setWaveBars] = useState<number[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);

  const activeReel = CLIENT_VIDEOS[activeIdx];

  useEffect(() => {
    const bars = Array.from({ length: 34 }, () => Math.floor(Math.random() * 55) + 15);
    setWaveBars(bars);
  }, [activeIdx]);

  useEffect(() => {
    let interval: any = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setWaveBars((prev) =>
          prev.map((val) => Math.max(12, Math.min(95, val + (Math.random() * 24 - 12))))
        );
        if (videoRef.current) {
          setCurrentTime(Math.floor(videoRef.current.currentTime));
          if (videoRef.current.duration) {
            setDuration(Math.floor(videoRef.current.duration));
          }
        }
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });
    }
  }, [activeIdx]);

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

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
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
              Scent, Sizzle & Living Kitchen Reels
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
              src={activeReel.url}
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
                {activeReel.tag}
              </span>
            </div>

            {/* Bottom Overlay Info & Controls */}
            <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
              <div className="text-left space-y-1.5 max-w-xl">
                <span className="text-[10px] uppercase tracking-widest text-[#B58D59] font-bold font-mono">
                  {activeReel.title}
                </span>
                <p className="font-pt-serif italic text-lg sm:text-2xl text-white leading-snug">
                  {activeReel.quote}
                </p>
                <p className="text-xs text-[#D5CBBD] font-sans font-light hidden sm:block">
                  {activeReel.subtitle}
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

        {/* 6-Reel Thumbnail Switcher Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {CLIENT_VIDEOS.map((reel, idx) => {
            const isActive = activeIdx === idx;
            return (
              <button
                key={reel.id}
                onClick={() => setActiveIdx(idx)}
                className={`group relative rounded-2xl overflow-hidden p-3 text-left border transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-white/10 border-[#B58D59] shadow-md ring-1 ring-[#B58D59]'
                    : 'bg-white/5 border-white/10 hover:border-white/30'
                }`}
              >
                <div className="aspect-video w-full rounded-xl overflow-hidden relative bg-black/50 mb-2.5">
                  <video
                    src={reel.url}
                    muted
                    playsInline
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className={`p-1.5 rounded-full ${isActive ? 'bg-[#B58D59] text-[#1C1713]' : 'bg-white/30 text-white'}`}>
                      <Play className="w-3.5 h-3.5 fill-current" />
                    </div>
                  </div>
                </div>

                <span className="block text-[9.5px] font-mono uppercase tracking-widest text-[#B58D59] mb-0.5 font-bold">
                  REEL 0{idx + 1}
                </span>
                <h4 className="font-marcellus text-sm font-normal text-white truncate">
                  {reel.title}
                </h4>
              </button>
            );
          })}
        </div>

        {/* Living Hearth Soundtrack Deck */}
        <div className="border border-white/15 p-6 sm:p-7 bg-white/5 text-[#ECE5DA] flex flex-col lg:flex-row items-center justify-between gap-6 rounded-3xl">
          <div className="space-y-1 w-full lg:w-84 shrink-0 text-left">
            <span className="font-mono text-[9px] text-[#B58D59] uppercase tracking-widest font-black block">
              Living Hearth Soundtrack
            </span>
            <h4 className="font-marcellus text-lg font-normal text-white leading-tight">
              {activeReel.title}
            </h4>
            <p className="font-sans text-xs text-[#D5CBBD] font-light truncate">
              {activeReel.subtitle}
            </p>
          </div>

          <div className="w-full flex-1 space-y-2">
            <div className="h-12 bg-black/40 border border-white/10 flex items-end justify-between p-2.5 gap-0.5 relative overflow-hidden rounded-xl">
              <div className="absolute inset-0 bg-[#B58D59]/5 pointer-events-none" />
              {waveBars.map((val, idx) => (
                <div
                  key={idx}
                  className={`w-full max-w-[6px] rounded-full transition-all duration-300 ${
                    isPlaying ? 'bg-[#B58D59]' : 'bg-white/20'
                  }`}
                  style={{ height: `${val}%`, minHeight: '4px' }}
                />
              ))}
            </div>

            <div className="flex justify-between items-center text-xs font-mono text-white/50 px-1">
              <span>{formatTime(currentTime)}</span>
              <span className="text-[8.5px] uppercase tracking-widest font-bold text-[#B58D59] flex items-center gap-1.5">
                <Radio className="w-3 h-3 text-[#B58D59] animate-pulse" />
                <span>{isPlaying ? '▶ LIVE HEARTH ACOUSTICS' : '■ SOUND STANDBY'}</span>
              </span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={togglePlay}
              className={`w-11 h-11 rounded-full border border-black flex items-center justify-center transition-all cursor-pointer ${
                isPlaying
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'bg-[#B58D59] hover:bg-[#B58D59]/90 text-[#1C1713]'
              }`}
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5 fill-[#1C1713]" />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
