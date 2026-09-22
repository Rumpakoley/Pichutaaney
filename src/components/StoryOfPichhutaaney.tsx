import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart, Compass, Utensils } from 'lucide-react';
import { RevealHeading, RevealText } from './TextTransitions';

export const StoryOfPichhutaaney: React.FC = () => {
  return (
    <section id="story-of-pichhutaaney" className="py-20 sm:py-28 bg-[#E9E4DD] border-b border-[#DED8CF] relative overflow-hidden text-[#2D2D2A]">
      {/* Subtle Bengali Watermark */}
      <div className="absolute right-4 sm:right-12 top-4 select-none pointer-events-none z-0 opacity-[0.04]">
        <span className="font-bengali text-6xl sm:text-8xl md:text-9xl font-normal text-[#171716]">
          পিছুটানেই
        </span>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl text-left mb-12">
          <RevealHeading>
            <span className="inline-block px-3 py-1 rounded-full text-[11px] font-sans font-medium tracking-[0.2em] uppercase bg-white/80 border border-[#DED8CF] text-[#2D2D2A] mb-4">
              ORIGINS & PHILOSOPHY
            </span>
            <h2 className="font-marcellus text-4xl sm:text-5xl md:text-6xl font-normal text-[#171716] tracking-tight">
              The Meaning of <span className="font-pt-serif italic">Pichhutaaney</span>
            </h2>
          </RevealHeading>
        </div>

        {/* Cohesive Minimalist Editorial Card */}
        <div className="bg-white rounded-3xl border border-[#DED8CF] p-8 sm:p-12 text-left shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: The Word and Etymology */}
            <div className="lg:col-span-6 space-y-4 border-b lg:border-b-0 lg:border-r border-[#DED8CF] pb-8 lg:pb-0 lg:pr-10">
              <div className="flex items-center space-x-3">
                <span className="font-bengali text-3xl font-medium text-[#171716]">পিছুটানেই</span>
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#8C867D] font-sans">/ pich-hu-taan /</span>
              </div>
              <h3 className="font-marcellus text-2xl sm:text-3xl font-normal text-[#171716] leading-snug">
                “The gentle, irresistible tug toward where you came from.”
              </h3>
              <p className="text-sm text-[#55524E] font-sans font-light leading-relaxed">
                In Bengali, Pichhutan describes the quiet backward glance—the scent of home, mother’s mustard tempering, and the roots that anchor you no matter how far you travel.
              </p>
            </div>

            {/* Right: The Cooking Ethos */}
            <div className="lg:col-span-6 space-y-4">
              <span className="text-[10px] uppercase tracking-[0.2em] font-sans font-bold text-[#8C867D] block">
                THE PHILOSOPHY
              </span>
              <p className="font-pt-serif text-xl sm:text-2xl font-normal italic text-[#171716] leading-snug">
                “Food is not a rigid formula. It lives in raw instinct, sensory memory, and the diverse tables where we broke bread with strangers who became friends.”
              </p>
              
              <div className="pt-4 flex flex-wrap gap-2 text-xs font-sans">
                <span className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-full bg-[#E9E4DD] border border-[#DED8CF] text-[#171716] font-medium">
                  <Utensils className="w-3.5 h-3.5 text-[#2D2D2A]" />
                  <span>Cooked by Instinct</span>
                </span>
                <span className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-full bg-[#E9E4DD] border border-[#DED8CF] text-[#171716] font-medium">
                  <Compass className="w-3.5 h-3.5 text-[#2D2D2A]" />
                  <span>Shaped by Travel</span>
                </span>
                <span className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-full bg-[#E9E4DD] border border-[#DED8CF] text-[#171716] font-medium">
                  <Heart className="w-3.5 h-3.5 text-[#2D2D2A]" />
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
