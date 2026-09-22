import React, { useState, useRef, useEffect } from 'react';
import { CLIENT_VIDEOS } from './CinematicVideoReel';
import { Play, Pause, Volume2, VolumeX, Maximize, Film, Sparkles, Radio } from 'lucide-react';
import { motion } from 'motion/react';

export const PortfolioVideoAudioReels: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(80);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(15);
  const [waveBars, setWaveBars] = useState<number[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);

  const activeReel = CLIENT_VIDEOS[activeIdx];

  useEffect(() => {
    // Generate simulated decibel modulation bars
    const initialBars = Array.from({ length: 36 }, () => Math.floor(Math.random() * 60) + 15);
    setWaveBars(initialBars);
  }, [activeIdx]);

  useEffect(() => {
    let interval: any = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setWaveBars((prev) =>
          prev.map((val) => Math.max(15, Math.min(100, val + (Math.random() * 26 - 13))))
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

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  return (
    <section id="kitchen-reels" className="max-w-7xl mx-auto px-6 md:px-12 py-16 bg-[#FAF6F0] border-t-2 border-black/15 text-left space-y-12">
      {/* Section Header */}
      <div className="space-y-3 max-w-3xl">
        <span className="font-mono text-xs text-[#8C867D] uppercase tracking-widest font-black block">
          LIVING REELS & KITCHEN ARCHIVES
        </span>
        <h2 className="font-marcellus text-3xl sm:text-4xl md:text-5xl font-normal text-black tracking-tight">
          I cook by instinct & capture the living kitchen
        </h2>
        <p className="font-sans text-xs md:text-sm text-black/70 leading-relaxed font-light">
          Atmospheric glimpses into Enakshi’s private kitchen studio—where spices crackle in golden mustard oil, leaves steam over slow earthen embers, and heirloom recipes come alive through unhurried intuition.
        </p>
      </div>

      {/* Main Spotlight Video Reel */}
      <div className="relative rounded-3xl overflow-hidden bg-black border-2 border-black shadow-2xl group">
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

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40 pointer-events-none" />

          {/* Top Tag Bar */}
          <div className="absolute top-4 sm:top-6 left-4 sm:left-6 flex items-center space-x-2">
            <span className="bg-black/80 backdrop-blur-md px-4 py-1.5 rounded-full text-[9.5px] font-mono tracking-widest uppercase border border-white/20 text-[#ffd177] font-bold">
              {activeReel.tag}
            </span>
          </div>

          {/* Bottom Info & Controls */}
          <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div className="text-left space-y-1 max-w-xl">
              <span className="text-[10px] uppercase tracking-widest text-[#ffd177] font-black font-mono">
                {activeReel.title}
              </span>
              <p className="font-pt-serif italic text-lg sm:text-2xl text-white leading-snug">
                {activeReel.quote}
              </p>
              <p className="text-xs text-white/70 font-sans font-light hidden sm:block">
                {activeReel.subtitle}
              </p>
            </div>

            {/* Floating Controls Bar */}
            <div className="flex items-center space-x-3 bg-black/80 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20 text-xs text-white">
              <button
                onClick={togglePlay}
                className="flex items-center space-x-1.5 hover:text-[#ffd177] transition-colors p-1 cursor-pointer"
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
                className="flex items-center space-x-1.5 hover:text-[#ffd177] transition-colors p-1 cursor-pointer"
                aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                <span className="hidden sm:inline font-mono uppercase text-[10px] tracking-widest font-bold">
                  {isMuted ? 'Unmute' : 'Sound'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 6-Reel Horizontal Selector Bar */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b-2 border-black/10 pb-3">
          <span className="font-mono text-[10px] text-[#8C867D] uppercase tracking-widest font-black">
            SELECT LIVING KITCHEN REEL (06 CLIPS)
          </span>
          <span className="font-mono text-[10px] text-black font-bold">
            CLIP 0{activeIdx + 1} OF 0{CLIENT_VIDEOS.length}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {CLIENT_VIDEOS.map((reel, idx) => {
            const isActive = activeIdx === idx;
            return (
              <button
                key={reel.id}
                onClick={() => setActiveIdx(idx)}
                className={`group relative rounded-2xl overflow-hidden p-3 text-left border-2 transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-[#0e0e0e] text-white border-black shadow-lg scale-[1.02]'
                    : 'bg-white border-black/20 hover:border-black text-black'
                }`}
              >
                <div className="aspect-video w-full rounded-xl overflow-hidden relative bg-black/40 mb-2.5">
                  <video
                    src={reel.url}
                    muted
                    playsInline
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className={`p-1.5 rounded-full ${isActive ? 'bg-[#ffd177] text-black' : 'bg-white/40 text-white'}`}>
                      <Play className="w-3 h-3 fill-current" />
                    </div>
                  </div>
                </div>

                <span className={`block text-[9px] font-mono uppercase tracking-widest font-black mb-0.5 ${isActive ? 'text-[#ffd177]' : 'text-[#8C867D]'}`}>
                  REEL 0{idx + 1}
                </span>
                <h4 className="font-marcellus text-sm font-normal truncate">
                  {reel.title}
                </h4>
              </button>
            );
          })}
        </div>
      </div>

      {/* Decibel Waveform & Audio Player Deck (Matches Husne Shabnam Tape Deck) */}
      <div className="border-2 border-black p-6 sm:p-8 bg-[#0e0e0e] text-[#f5f2eb] flex flex-col lg:flex-row items-center justify-between gap-6 rounded-3xl shadow-xl">
        <div className="space-y-1 w-full lg:w-96 shrink-0 text-left">
          <span className="font-mono text-[9px] text-[#ffd177] uppercase tracking-widest font-black block">
            Active Kitchen Soundtrack
          </span>
          <h4 className="font-marcellus text-xl font-normal text-white leading-tight">
            {activeReel.title}
          </h4>
          <p className="font-pt-serif italic text-xs text-white/70 line-clamp-1">
            {activeReel.subtitle}
          </p>
        </div>

        {/* Dynamic Waveform Visualizer */}
        <div className="w-full flex-1 space-y-2">
          <div className="h-14 bg-white/5 border border-white/10 flex items-end justify-between p-3 gap-0.5 relative overflow-hidden rounded-xl">
            <div className="absolute inset-0 bg-[#ffd177]/5 pointer-events-none" />
            {waveBars.map((val, idx) => (
              <div
                key={idx}
                className={`w-full max-w-[6px] rounded-full transition-all duration-300 ${
                  isPlaying ? 'bg-[#ffd177]' : 'bg-white/20'
                }`}
                style={{ height: `${val}%`, minHeight: '4px' }}
              />
            ))}
          </div>

          <div className="flex justify-between items-center text-xs font-mono text-white/50 px-1">
            <span>{formatTime(currentTime)}</span>
            <span className="text-[8.5px] uppercase tracking-widest font-bold text-[#ffd177] flex items-center gap-1.5">
              <Radio className="w-3 h-3 text-[#ffd177] animate-pulse" />
              <span>{isPlaying ? '▶ LIVE HEARTH ACOUSTICS' : '■ TAPE STANDBY'}</span>
            </span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Play/Pause CTA */}
        <div className="flex items-center gap-4 shrink-0 w-full lg:w-auto justify-between lg:justify-end border-t lg:border-t-0 border-white/10 pt-4 lg:pt-0">
          <button
            onClick={togglePlay}
            className={`w-12 h-12 rounded-full border-2 border-black flex items-center justify-center transition-all cursor-pointer ${
              isPlaying
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-[#ffd177] hover:bg-[#ffd177]/90 text-black'
            }`}
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5 fill-black" />}
          </button>
        </div>
      </div>
    </section>
  );
};
