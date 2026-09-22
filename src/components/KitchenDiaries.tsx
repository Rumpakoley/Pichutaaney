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
    <section id="kitchen-diaries" className="py-20 sm:py-28 bg-[#E9E4DD] border-b border-[#DED8CF] overflow-hidden text-[#2D2D2A]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl text-left mb-12">
          <RevealHeading>
            <span className="inline-block px-3 py-1 rounded-full text-[11px] font-sans font-medium tracking-[0.2em] uppercase bg-white/80 border border-[#DED8CF] text-[#2D2D2A] mb-4">
              HISTORICAL CHRONICLES
            </span>
            <h2 className="font-marcellus text-4xl sm:text-5xl md:text-6xl font-normal text-[#171716] tracking-tight">
              Kitchen Diaries & <span className="font-pt-serif italic">Heirloom Notes</span>
            </h2>
          </RevealHeading>

          <RevealText delay={0.1}>
            <p className="mt-3 text-base sm:text-lg text-[#55524E] font-pt-serif italic leading-relaxed">
              “Culture lives in handwritten recipes and sensory memory. That, too, is legacy.”
            </p>
          </RevealText>
        </div>

        {/* 3 Clean Seasonal Story Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mb-12">
          {KITCHEN_DIARY_SNIPPETS.map((snippet, idx) => (
            <div
              key={snippet.title}
              className="bg-white rounded-3xl border border-[#DED8CF] p-7 flex flex-col justify-between shadow-md hover:border-[#2D2D2A] transition-all duration-300"
            >
              <div className="space-y-3.5">
                <div className="flex items-center justify-between text-[11px] uppercase tracking-widest text-[#8C867D] font-sans font-semibold">
                  <span>{snippet.season.split(' (')[0]}</span>
                  <BookOpen className="w-3.5 h-3.5 text-[#2D2D2A]" />
                </div>
                <h3 className="font-marcellus text-xl font-normal text-[#171716]">
                  {snippet.title}
                </h3>
                <p className="font-pt-serif italic text-base text-[#55524E] leading-relaxed">
                  “{snippet.excerpt}”
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#DED8CF] text-[11px] uppercase font-sans tracking-wider text-[#8C867D]">
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
              className={`p-5 rounded-2xl border transition-all shadow-xs ${
                idx === 0
                  ? 'bg-[#171716] text-white border-[#171716]'
                  : 'bg-white text-[#2D2D2A] border-[#DED8CF] hover:border-[#2D2D2A]'
              }`}
            >
              <div className="flex justify-between items-baseline mb-1.5">
                <span className={`text-[10px] uppercase tracking-widest font-sans font-bold ${idx === 0 ? 'text-[#EED485]' : 'text-[#8C867D]'}`}>
                  {staple.role}
                </span>
                <span className="font-bengali text-sm">{staple.bengali}</span>
              </div>
              <h4 className="font-marcellus text-base font-normal leading-snug mb-1">
                {staple.name}
              </h4>
              <p className={`text-xs font-sans font-light leading-relaxed ${idx === 0 ? 'text-white/80' : 'text-[#55524E]'}`}>
                {staple.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
