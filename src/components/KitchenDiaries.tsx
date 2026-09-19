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
    <section id="kitchen-diaries" className="py-20 sm:py-24 bg-[#F4ECE1] border-b border-[#E4D7C8] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl text-left mb-12">
          <RevealHeading>
            <span className="block font-sans text-[10px] tracking-[0.25em] uppercase font-bold text-[#8B3A26] mb-2">
              HISTORICAL CHRONICLES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#241E1A] tracking-tight">
              Kitchen Diaries & <span className="italic text-[#8B3A26]">Heirloom Notes</span>
            </h2>
          </RevealHeading>

          <RevealText delay={0.1}>
            <p className="mt-2 text-sm sm:text-base text-[#6E6258] font-light leading-relaxed">
              “Culture lives in handwritten recipes and sensory memory. That, too, is legacy.”
            </p>
          </RevealText>
        </div>

        {/* 3 Clean Seasonal Story Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mb-12">
          {KITCHEN_DIARY_SNIPPETS.map((snippet, idx) => (
            <div
              key={snippet.title}
              className="bg-[#FAF6F0] border border-[#DECFC0] p-6 flex flex-col justify-between shadow-2xs hover:border-[#8B3A26]/40 transition-all duration-300"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-[#8B3A26] font-sans font-bold">
                  <span>{snippet.season.split(' (')[0]}</span>
                  <BookOpen className="w-3.5 h-3.5 text-[#9E8E81]" />
                </div>
                <h3 className="font-serif text-xl font-normal text-[#241E1A]">
                  {snippet.title}
                </h3>
                <p className="font-serif italic text-base text-[#6E6258] leading-relaxed">
                  “{snippet.excerpt}”
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-[#DECFC0] text-[10px] uppercase font-sans tracking-wider text-[#9E8E81]">
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
                  ? 'bg-[#8B3A26] text-[#FAF6F0] border-[#8B3A26]'
                  : 'bg-[#FAF6F0] text-[#241E1A] border-[#DECFC0]'
              }`}
            >
              <div className="flex justify-between items-baseline mb-1">
                <span className={`text-[9px] uppercase tracking-widest font-sans font-bold ${idx === 0 ? 'text-[#FAF6F0]/80' : 'text-[#8B3A26]'}`}>
                  {staple.role}
                </span>
                <span className="font-bengali text-base">{staple.bengali}</span>
              </div>
              <h4 className="font-serif text-base font-normal leading-snug mb-1">
                {staple.name}
              </h4>
              <p className={`text-xs font-sans font-light leading-relaxed ${idx === 0 ? 'text-[#FAF6F0]/85' : 'text-[#6E6258]'}`}>
                {staple.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
