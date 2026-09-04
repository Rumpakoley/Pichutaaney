import React from 'react';
import { BookMarked, MapPin, ArrowRight } from 'lucide-react';

export const AboutMe: React.FC = () => {
  return (
    <section id="about-me" className="py-20 sm:py-28 bg-[#FAFAF9] border-b border-[#E4E4E7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl text-left mb-16">
          <span className="block font-sans text-[10px] tracking-[0.25em] uppercase font-bold text-[#853724] mb-2">
            THE CULINARY ARCHIVIST
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-[#18181B] tracking-tight">
            About Me, <span className="italic text-[#853724]">Enakshi</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#52525B] font-light leading-relaxed">
            A cook, storyteller, and archivist of the quieter, hyper-regional dining traditions of Bengal and beyond.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Portrait & Visual Note */}
          <div className="lg:col-span-5 space-y-4">
            <div className="border border-[#E4E4E7] bg-white p-3">
              <div className="relative overflow-hidden bg-[#FAFAF9]">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80"
                  alt="Enakshi, founder and culinary host of Pichhutaaney"
                  referrerPolicy="no-referrer"
                  className="w-full h-[420px] sm:h-[460px] object-cover filter contrast-[1.02] brightness-[0.98]"
                />
                
                {/* Overlay quote with clean hairline border */}
                <div className="absolute bottom-0 inset-x-0 bg-[#18181B]/95 p-5 text-white text-left border-t border-[#18181B]">
                  <p className="font-serif text-lg italic leading-snug">
                    “Travel has shaped me, but home is always the anchor.”
                  </p>
                  <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#853724] mt-2 font-bold">
                    Enakshi • West Bengal to the World
                  </p>
                </div>
              </div>
            </div>

            {/* Micro details strip */}
            <div className="bg-white border border-[#E4E4E7] p-4 flex items-center justify-between text-xs text-[#52525B]">
              <div className="flex items-center space-x-2">
                <MapPin className="w-3.5 h-3.5 text-[#853724]" />
                <span className="font-sans text-[11px] uppercase tracking-wider font-medium">Roots in West Bengal</span>
              </div>
              <span className="text-[#E4E4E7]">/</span>
              <div className="flex items-center space-x-2">
                <BookMarked className="w-3.5 h-3.5 text-[#853724]" />
                <span className="font-sans text-[11px] uppercase tracking-wider font-medium">Heirloom Recipe Collector</span>
              </div>
            </div>
          </div>

          {/* Right Column: Personal Story & Journey */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="space-y-4 text-[#52525B] text-base sm:text-lg leading-relaxed font-sans font-light">
              <p>
                I come from <strong className="font-medium text-[#18181B]">West Bengal</strong>, a land bordered by the Himalayas in the north and the Bay of Bengal in the south, cradled by fertile river silts where food is not merely sustenance—it is language, season, and sentiment.
              </p>
              <p>
                My cooking is rooted in what I grew up eating: the crackle of nigella seeds in golden mustard oil on rainy July afternoons, the scent of seasonal Gobindobhog rice steaming on brass plates, the quiet genius of my grandmother’s kitchen diaries where no peel, stem, or seed was ever wasted.
              </p>
              <p>
                Living outside India, I found myself constantly navigating a familiar frustration. Whenever people spoke of “Indian food,” the conversation inevitably condensed into butter chicken, garlic naan, samosas, and biryani. While those have their rightful place in celebratory dining, they are only a tiny fraction of what travelled—not the vast, nuanced reality of what billions eat daily across our micro-regions.
              </p>
              <p>
                Travel has broadened my worldview, but home is the anchor that holds my palate true. Pichhutaaney is my love letter to that anchor—an intimate space where you are invited not just to taste dishes, but to hear the personal histories, women’s kitchen notebooks, and hyper-regional terroirs that gave them life.
              </p>
            </div>

            {/* Guiding Principles Cards matching Geometric Balance */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 bg-white border border-[#E4E4E7] text-left">
                <span className="block text-[10px] uppercase tracking-[0.25em] text-[#853724] font-sans font-bold mb-1">
                  PILLAR 01
                </span>
                <h4 className="font-serif text-xl font-normal text-[#18181B]">Hyper-Regional</h4>
                <p className="mt-2 text-xs text-[#52525B] font-sans leading-relaxed font-light">
                  Uncompromising celebration of micro-climates, soil varieties, and community heritage.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E4E4E7] text-left">
                <span className="block text-[10px] uppercase tracking-[0.25em] text-[#853724] font-sans font-bold mb-1">
                  PILLAR 02
                </span>
                <h4 className="font-serif text-xl font-normal text-[#18181B]">Kitchen Diaries</h4>
                <p className="mt-2 text-xs text-[#52525B] font-sans leading-relaxed font-light">
                  Hand-penned techniques, grandmotherly notes, and oral histories brought to table.
                </p>
              </div>

              <div className="p-5 bg-[#853724] text-white border border-[#853724] text-left">
                <span className="block text-[10px] uppercase tracking-[0.25em] text-white/70 font-sans font-bold mb-1">
                  PILLAR 03
                </span>
                <h4 className="font-serif text-xl font-normal text-white">Intimacy First</h4>
                <p className="mt-2 text-xs text-white/85 font-sans leading-relaxed font-light">
                  Small, unhurried tables where guests arrive as strangers and leave as dinner companions.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="#story-of-pichhutaaney"
                className="inline-flex items-center space-x-2 font-sans text-xs uppercase tracking-[0.2em] text-[#18181B] hover:text-[#853724] transition-colors font-semibold"
              >
                <span>Read the regional manifesto</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
