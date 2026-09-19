import React from 'react';
import { KITCHEN_DIARY_SNIPPETS } from '../data/content';
import { BookOpen } from 'lucide-react';
import { RevealHeading, RevealText } from './TextTransitions';

export const KitchenDiaries: React.FC = () => {
  const pantryStaples = [
    {
      name: "Cold-Pressed Mustard Oil",
      bengali: "সর্ষের তেল",
      role: "The Backbone",
      note: "Pungent warmth defining eastern memory."
    },
    {
      name: "Panch Phoron (Five-Spice)",
      bengali: "পাঁচ ফোড়ন",
      role: "The Tempering",
      note: "Whole spices bloomed in smoking oil."
    },
    {
      name: "White Poppy Seed (Posto)",
      bengali: "পোস্ত",
      role: "The Silken Calm",
      note: "Stone-ground cooling velvety paste."
    },
    {
      name: "Date Palm Jaggery (Nolen Gur)",
      bengali: "নলেন গুড়",
      role: "The Winter Epilogue",
      note: "Tapped fresh at dawn in winter."
    }
  ];

  return (
    <section id="kitchen-diaries" className="py-20 sm:py-24 bg-[#FAFAF9] border-b border-[#E4E4E7] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl text-left mb-12">
          <RevealHeading>
            <span className="block font-sans text-[10px] tracking-[0.25em] uppercase font-bold text-[#853724] mb-2">
              HISTORICAL CHRONICLES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#18181B] tracking-tight">
              Kitchen Diaries & <span className="italic text-[#853724]">Heirloom Notes</span>
            </h2>
          </RevealHeading>

          <RevealText delay={0.1}>
            <p className="mt-2 text-sm sm:text-base text-[#52525B] font-light leading-relaxed">
              “Culture lives in handwritten recipes and sensory memory. That, too, is legacy.”
            </p>
          </RevealText>
        </div>

        {/* 3 Clean Seasonal Story Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mb-12">
          {KITCHEN_DIARY_SNIPPETS.map((snippet, idx) => (
            <div
              key={snippet.title}
              className="bg-white border border-[#E4E4E7] p-6 flex flex-col justify-between shadow-2xs hover:border-[#853724]/40 transition-all duration-300"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-[#853724] font-sans font-bold">
                  <span>{snippet.season.split(' (')[0]}</span>
                  <BookOpen className="w-3.5 h-3.5 text-[#A1A1AA]" />
                </div>
                <h3 className="font-serif text-xl font-normal text-[#18181B]">
                  {snippet.title}
                </h3>
                <p className="font-serif italic text-base text-[#52525B] leading-relaxed">
                  “{snippet.excerpt}”
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-[#E4E4E7] text-[10px] uppercase font-sans tracking-wider text-[#A1A1AA]">
                {snippet.note}
              </div>
            </div>
          ))}
        </div>

        {/* The 4 Iconic Bengal Staples */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-left">
          {pantryStaples.map((staple, idx) => (
            <div
              key={staple.name}
              className={`p-4 border transition-all ${
                idx === 0
                  ? 'bg-[#853724] text-white border-[#853724]'
                  : 'bg-white text-[#18181B] border-[#E4E4E7]'
              }`}
            >
              <div className="flex justify-between items-baseline mb-1">
                <span className={`text-[9px] uppercase tracking-widest font-sans font-bold ${idx === 0 ? 'text-white/80' : 'text-[#853724]'}`}>
                  {staple.role}
                </span>
                <span className="font-bengali text-base">{staple.bengali}</span>
              </div>
              <h4 className="font-serif text-base font-normal leading-snug mb-1">
                {staple.name}
              </h4>
              <p className={`text-xs font-sans font-light leading-relaxed ${idx === 0 ? 'text-white/85' : 'text-[#52525B]'}`}>
                {staple.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
