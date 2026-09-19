import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart, Compass, Utensils } from 'lucide-react';
import { RevealHeading, RevealText } from './TextTransitions';

export const StoryOfPichhutaaney: React.FC = () => {
  return (
    <section id="story-of-pichhutaaney" className="py-20 sm:py-24 bg-[#FAFAF9] border-b border-[#E4E4E7] relative overflow-hidden">
      {/* Subtle Bengali Watermark */}
      <div className="absolute right-4 sm:right-12 top-4 select-none pointer-events-none z-0 opacity-[0.05]">
        <span className="font-bengali text-6xl sm:text-8xl md:text-9xl font-normal text-[#18181B]">
          পিছুটান
        </span>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl text-left mb-12">
          <RevealHeading>
            <span className="block font-sans text-[10px] tracking-[0.25em] uppercase font-bold text-[#853724] mb-2">
              ORIGINS & PHILOSOPHY
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#18181B] tracking-tight">
              The Meaning of <span className="italic text-[#853724]">Pichhutaaney</span>
            </h2>
          </RevealHeading>
        </div>

        {/* Single Cohesive Minimalist Editorial Panel */}
        <div className="bg-white border border-[#E4E4E7] p-8 sm:p-12 text-left shadow-2xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: The Word and Etymology */}
            <div className="lg:col-span-6 space-y-4 border-b lg:border-b-0 lg:border-r border-[#E4E4E7] pb-8 lg:pb-0 lg:pr-10">
              <div className="flex items-center space-x-3">
                <span className="font-bengali text-3xl font-medium text-[#853724]">পিছুটান</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#A1A1AA] font-sans">/ pich-hu-taan /</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#18181B] leading-snug">
                “The gentle, irresistible tug toward where you came from.”
              </h3>
              <p className="text-sm text-[#52525B] font-sans font-light leading-relaxed">
                In Bengali, Pichhutan describes the quiet backward glance—the scent of home, mother’s mustard tempering, and the roots that anchor you no matter how far you travel.
              </p>
            </div>

            {/* Right: The Cooking Ethos */}
            <div className="lg:col-span-6 space-y-4">
              <span className="text-[10px] uppercase tracking-[0.2em] font-sans font-bold text-[#853724] block">
                THE PHILOSOPHY
              </span>
              <p className="font-serif text-xl sm:text-2xl font-light italic text-[#18181B] leading-snug">
                “Food is not a rigid formula. It lives in raw instinct, sensory memory, and the diverse tables where we broke bread with strangers who became friends.”
              </p>
              
              <div className="pt-4 flex flex-wrap gap-2 text-xs font-sans">
                <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-[#FAFAF9] border border-[#E4E4E7] text-[#18181B]">
                  <Utensils className="w-3.5 h-3.5 text-[#853724]" />
                  <span>Cooked by Instinct</span>
                </span>
                <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-[#FAFAF9] border border-[#E4E4E7] text-[#18181B]">
                  <Compass className="w-3.5 h-3.5 text-[#853724]" />
                  <span>Shaped by Travel</span>
                </span>
                <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-[#FAFAF9] border border-[#E4E4E7] text-[#18181B]">
                  <Heart className="w-3.5 h-3.5 text-[#853724]" />
                  <span>Anchored in Bengal</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
