import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Sparkles, Film } from 'lucide-react';
import { motion } from 'motion/react';

interface VideoSectionProps {
  videoUrl?: string;
  posterUrl?: string;
  title?: string;
  subtitle?: string;
}

export const CinematicVideoReel: React.FC<VideoSectionProps> = ({
  videoUrl = "https://assets.mixkit.co/videos/preview/mixkit-chef-cooking-vegetables-in-a-pan-43093-large.mp4",
  posterUrl = "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1600&q=80",
  title = "An Atmosphere of Flame, Scent & Sizzle",
  subtitle = "Step inside Enakshi's kitchen—where spices crackle in golden mustard oil and recipes come alive through instinct."
}) => {
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
    <section className="py-12 sm:py-16 md:py-20 bg-[#18181B] text-white relative overflow-hidden border-b border-[#27272A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 text-left gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 text-[10px] tracking-[0.25em] uppercase font-bold text-[#F3947E] font-sans mb-2">
              <Film className="w-3.5 h-3.5" />
              <span>THE LIVING TABLE IN MOTION</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white">
              {title}
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm text-[#A1A1AA] font-light leading-relaxed font-sans">
            {subtitle}
          </p>
        </div>

        {/* Video Canvas Frame */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-black border border-white/15 shadow-2xl group"
        >
          {/* HTML5 Video Element */}
          <div className="relative aspect-video sm:aspect-[21/9] w-full overflow-hidden">
            <video
              ref={videoRef}
              src={videoUrl}
              poster={posterUrl}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className="w-full h-full object-cover filter contrast-[1.05] brightness-90"
            />

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

            {/* Bottom Overlay & Video Controls */}
            <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
              <div className="text-left space-y-1 max-w-lg">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#F3947E] font-bold font-sans">
                  INTUITIVE PROCESS
                </span>
                <p className="font-serif italic text-lg sm:text-2xl text-white/95 leading-snug">
                  “No timer, no measuring spoons—just the sound of the tempering and the aroma in the air.”
                </p>
              </div>

              {/* Floating Controls Bar */}
              <div className="flex items-center space-x-3 bg-[#18181B]/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-xs text-white">
                <button
                  onClick={togglePlay}
                  className="flex items-center space-x-1.5 hover:text-[#F3947E] transition-colors p-1"
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
                  className="flex items-center space-x-1.5 hover:text-[#F3947E] transition-colors p-1"
                  aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  <span className="hidden sm:inline font-mono uppercase text-[10px] tracking-widest">
                    {isMuted ? "Unmute" : "Mute"}
                  </span>
                </button>

                <span className="text-white/30">|</span>

                <button
                  onClick={handleFullScreen}
                  className="hover:text-[#F3947E] transition-colors p-1"
                  aria-label="Fullscreen"
                >
                  <Maximize className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
