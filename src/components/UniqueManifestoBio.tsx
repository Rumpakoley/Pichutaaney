import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Utensils, Heart, Compass, Mail, Check, Sparkles, MapPin } from 'lucide-react';

export const UniqueManifestoBio: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('pichhutaaney@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="philosophy" className="py-20 sm:py-24 bg-[#ECE5DA] border-b border-[#D5CBBD] text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Founder Visual in Warm Arch Frame */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-3xl p-3 bg-[#F7F3EC] border border-[#D5CBBD] shadow-md">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/4.8] bg-[#E8E0D5] group">
                <img
                  src="https://res.cloudinary.com/dpdtsaalf/image/upload/v1790097435/WhatsApp_Image_2026-09-22_at_10.49.36_AM_cjzkai.jpg"
                  alt="Enakshi, founder of Pichhutaaney"
                  className="w-full h-full object-cover filter contrast-[1.02] brightness-[0.98] group-hover:scale-105 transition-transform duration-700"
                />

                <div className="absolute bottom-0 inset-x-0 p-5 bg-[#28221D]/90 backdrop-blur-sm text-[#ECE5DA] border-t border-white/10 text-left">
                  <p className="font-pt-serif italic text-base sm:text-lg leading-snug">
                    “Travel has broadened my palate, but home will always remain the anchor.”
                  </p>
                  <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#B58D59] font-bold block mt-1.5">
                    Enakshi • Intuitive Cook & Culinary Storyteller
                  </span>
                </div>
              </div>
            </div>

            {/* Provenance Strip */}
            <div className="bg-[#F7F3EC] rounded-full border border-[#D5CBBD] px-5 py-2.5 flex items-center justify-center text-xs text-[#655B51] shadow-xs">
              <div className="flex items-center space-x-2">
                <MapPin className="w-3.5 h-3.5 text-[#B58D59]" />
                <span className="font-sans font-semibold uppercase tracking-wider text-[10.5px] text-[#28221D]">
                  West Bengal to the World
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Culinary Manifesto & Principles */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <span className="font-sans text-[11px] uppercase tracking-[0.25em] text-[#B58D59] font-bold block">
                ABOUT ME • ENAKSHI
              </span>
              <h2 className="font-marcellus text-3xl sm:text-4xl md:text-5xl font-normal text-[#28221D] tracking-tight leading-tight">
                Bringing people together around food, stories & home.
              </h2>
              <p className="font-sans text-base sm:text-lg text-[#28221D] leading-relaxed font-normal">
                I’m Enakshi, a self-taught chef from Kolkata, now based in Toronto. I grew up in a joint family, surrounded by people and long conversations around the dining table—and that has always been my happy place.
              </p>
              <p className="font-pt-serif italic text-lg sm:text-xl text-[#4A4138] leading-relaxed border-l-2 border-[#B58D59] pl-4 py-1">
                “Through Pichhutaaney, I want to recreate that feeling: bringing people together around food, stories and a table that feels a little like home.”
              </p>
            </div>

            {/* 3 Foundational Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
              <div className="p-5 bg-[#F7F3EC] rounded-2xl border border-[#D5CBBD] shadow-xs space-y-1.5">
                <span className="font-mono text-[9.5px] text-[#B58D59] uppercase font-bold block">
                  TENET 01
                </span>
                <h4 className="font-marcellus text-lg font-normal text-[#28221D]">
                  Instinct & Aroma
                </h4>
                <p className="font-sans text-xs text-[#655B51] leading-relaxed font-light">
                  Cooking by sensory feel and sputtering oil rather than rigid standardized scales.
                </p>
              </div>

              <div className="p-5 bg-[#F7F3EC] rounded-2xl border border-[#D5CBBD] shadow-xs space-y-1.5">
                <span className="font-mono text-[9.5px] text-[#B58D59] uppercase font-bold block">
                  TENET 02
                </span>
                <h4 className="font-marcellus text-lg font-normal text-[#28221D]">
                  Shaped by Travel
                </h4>
                <p className="font-sans text-xs text-[#655B51] leading-relaxed font-light">
                  Recipes layered with coastal tamarinds, mountain broths, and unexpected ferments.
                </p>
              </div>

              <div className="p-5 bg-[#28221D] text-[#ECE5DA] rounded-2xl border border-[#28221D] shadow-xs space-y-1.5">
                <span className="font-mono text-[9.5px] text-[#B58D59] uppercase font-bold block">
                  TENET 03
                </span>
                <h4 className="font-marcellus text-lg font-normal text-white">
                  The Bengal Anchor
                </h4>
                <p className="font-sans text-xs text-[#ECE5DA]/85 leading-relaxed font-light">
                  Honoring the childhood hearth, mustard oils, and grandmother’s kitchen notebooks.
                </p>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#hearth-reels"
                className="px-6 py-3 bg-[#28221D] hover:bg-[#1C1713] text-[#ECE5DA] rounded-full font-sans text-xs uppercase tracking-widest font-semibold transition-all shadow-sm"
              >
                Watch Living Hearth Reels
              </a>

              <button
                onClick={handleCopy}
                className="px-6 py-3 bg-[#F7F3EC] border border-[#D5CBBD] hover:border-[#28221D] text-[#28221D] rounded-full font-sans text-xs uppercase tracking-widest font-semibold transition-all shadow-xs flex items-center space-x-2 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600 font-bold" />
                    <span className="text-emerald-700">✓ pichhutaaney@gmail.com copied</span>
                  </>
                ) : (
                  <>
                    <Mail className="w-3.5 h-3.5 text-[#B58D59]" />
                    <span>Copy Direct Email</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
