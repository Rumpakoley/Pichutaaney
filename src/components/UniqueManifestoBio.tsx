import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Utensils, Heart, Compass, Mail, Check, Sparkles, MapPin } from 'lucide-react';

export const UniqueManifestoBio: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('hello@pichhutaaney.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="philosophy" className="py-20 sm:py-24 bg-[#F5EFEB] border-b border-[#D8CEBF] text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Founder Visual in Warm Arch Frame */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-3xl p-3 bg-white border border-[#D8CEBF] shadow-md">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/4.8] bg-[#E8E0D5] group">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80"
                  alt="Enakshi, founder of Pichhutaaney"
                  className="w-full h-full object-cover filter contrast-[1.02] brightness-[0.98] group-hover:scale-105 transition-transform duration-700"
                />

                <div className="absolute bottom-0 inset-x-0 p-5 bg-[#191512]/90 backdrop-blur-sm text-white border-t border-white/10 text-left">
                  <p className="font-pt-serif italic text-base sm:text-lg leading-snug">
                    “Travel has broadened my palate, but home will always remain the anchor.”
                  </p>
                  <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#E8A857] font-bold block mt-1.5">
                    Enakshi • Intuitive Cook & Culinary Storyteller
                  </span>
                </div>
              </div>
            </div>

            {/* Provenance Strip */}
            <div className="bg-white rounded-full border border-[#D8CEBF] px-5 py-3 flex items-center justify-between text-xs text-[#695F55] shadow-xs">
              <div className="flex items-center space-x-2">
                <MapPin className="w-3.5 h-3.5 text-[#963D28]" />
                <span className="font-sans font-semibold uppercase tracking-wider text-[10.5px] text-[#191512]">
                  West Bengal to the World
                </span>
              </div>
              <span className="text-[#D8CEBF]">/</span>
              <div className="flex items-center space-x-2">
                <Utensils className="w-3.5 h-3.5 text-[#963D28]" />
                <span className="font-sans font-semibold uppercase tracking-wider text-[10.5px] text-[#191512]">
                  Unstandardized Hearth
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Culinary Manifesto & Principles */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <span className="font-sans text-[11px] uppercase tracking-[0.25em] text-[#963D28] font-bold block">
                THE PHILOSOPHY OF PICHHUTAANEY
              </span>
              <h2 className="font-marcellus text-3xl sm:text-4xl md:text-5xl font-normal text-[#191512] tracking-tight leading-tight">
                Food cooked by raw instinct, not formulas.
              </h2>
              <p className="font-pt-serif italic text-lg sm:text-xl text-[#4D453D] leading-relaxed pt-2">
                “Pichhutaaney (পিছুটানেই) is that gentle, nostalgic pull toward where you came from—expressed through dishes created with unhurried memory, wanderlust, and heartfelt hospitality.”
              </p>
            </div>

            {/* 3 Foundational Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
              <div className="p-5 bg-white rounded-2xl border border-[#D8CEBF] shadow-xs space-y-1.5">
                <span className="font-mono text-[9.5px] text-[#963D28] uppercase font-bold block">
                  TENET 01
                </span>
                <h4 className="font-marcellus text-lg font-normal text-[#191512]">
                  Instinct & Aroma
                </h4>
                <p className="font-sans text-xs text-[#695F55] leading-relaxed font-light">
                  Cooking by sensory feel and sputtering oil rather than rigid standardized scales.
                </p>
              </div>

              <div className="p-5 bg-white rounded-2xl border border-[#D8CEBF] shadow-xs space-y-1.5">
                <span className="font-mono text-[9.5px] text-[#963D28] uppercase font-bold block">
                  TENET 02
                </span>
                <h4 className="font-marcellus text-lg font-normal text-[#191512]">
                  Shaped by Travel
                </h4>
                <p className="font-sans text-xs text-[#695F55] leading-relaxed font-light">
                  Recipes layered with coastal tamarinds, mountain broths, and unexpected ferments.
                </p>
              </div>

              <div className="p-5 bg-[#963D28] text-white rounded-2xl border border-[#963D28] shadow-xs space-y-1.5">
                <span className="font-mono text-[9.5px] text-[#E8A857] uppercase font-bold block">
                  TENET 03
                </span>
                <h4 className="font-marcellus text-lg font-normal text-white">
                  The Bengal Anchor
                </h4>
                <p className="font-sans text-xs text-white/85 leading-relaxed font-light">
                  Honoring the childhood hearth, mustard oils, and grandmother’s kitchen notebooks.
                </p>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#hearth-reels"
                className="px-6 py-3 bg-[#191512] hover:bg-[#963D28] text-white rounded-full font-sans text-xs uppercase tracking-widest font-semibold transition-all shadow-sm"
              >
                Watch Living Hearth Reels
              </a>

              <button
                onClick={handleCopy}
                className="px-6 py-3 bg-white border border-[#D8CEBF] hover:border-[#191512] text-[#191512] rounded-full font-sans text-xs uppercase tracking-widest font-semibold transition-all shadow-xs flex items-center space-x-2 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600 font-bold" />
                    <span className="text-emerald-700">✓ hello@pichhutaaney.com copied</span>
                  </>
                ) : (
                  <>
                    <Mail className="w-3.5 h-3.5 text-[#963D28]" />
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
