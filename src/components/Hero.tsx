import React from 'react';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import { motion } from 'motion/react';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[85vh] lg:min-h-[92vh] flex items-center justify-center bg-[#171716] text-[#E9E4DD] overflow-hidden">
      {/* Background Video with Dark Atmospheric Overlay */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-45 scale-105 filter brightness-75 contrast-105"
          src="https://res.cloudinary.com/dpdtsaalf/video/upload/v1788549931/WhatsApp_Video_2026-09-05_at_12.42.00_AM_4_k3o720.mp4"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#171716] via-[#171716]/40 to-[#171716]/60" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center flex flex-col items-center justify-center">
        {/* Subtle Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#E9E4DD]/10 border border-[#E9E4DD]/20 backdrop-blur-sm mb-6"
        >
          <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.25em] text-[#EED485] font-medium">
            AN INTUITIVE INDIAN TABLE • BY ENAKSHI
          </span>
        </motion.div>

        {/* Signature Headline from pichhutaaney.com */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-marcellus text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-[#E9E4DD] tracking-tight leading-[1.08] max-w-4xl"
        >
          Held on,<br />
          <span className="italic font-pt-serif text-[#EED485]">not held back.</span>
        </motion.h1>

        {/* Signature Definition from pichhutaaney.com */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 sm:mt-8 font-pt-serif text-base sm:text-xl text-[#E9E4DD]/85 max-w-2xl font-light leading-relaxed italic"
        >
          ‘Pichhutaaney’ comes from the Bengali word <strong className="text-[#EED485] not-italic font-normal">‘Pichhutaan’</strong> — that tender ache for something once deeply loved. It’s the longing held in familiar flavors, faraway homes, and stories carried gently through time.
        </motion.p>

        {/* Action Pills */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4 text-xs font-sans"
        >
          <a
            href="#supper-club"
            className="px-8 py-3.5 bg-[#E9E4DD] text-[#171716] hover:bg-[#EED485] hover:text-[#171716] uppercase tracking-widest font-semibold transition-all duration-200 shadow-xl rounded-full inline-flex items-center space-x-2"
          >
            <span>Join Waitlist</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
          <a
            href="#about-me"
            className="px-8 py-3.5 bg-transparent border border-[#E9E4DD]/50 text-[#E9E4DD] hover:bg-[#E9E4DD]/15 hover:border-[#EED485] uppercase tracking-widest font-medium transition-all duration-200 rounded-full inline-flex items-center space-x-2"
          >
            <span>Learn More</span>
          </a>
        </motion.div>

        {/* Bottom Scroll Prompt */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-14 sm:mt-16 flex items-center space-x-2 text-[10px] uppercase tracking-[0.25em] text-[#E9E4DD]/60"
        >
          <span>Scroll to explore</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#EED485]" />
        </motion.div>
      </div>
    </section>
  );
};
