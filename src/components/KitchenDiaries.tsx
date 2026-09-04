import React, { useState } from 'react';
import { KITCHEN_DIARY_SNIPPETS } from '../data/content';
import { BookOpen, Sparkles, Flame, Droplets, Sun, CloudRain } from 'lucide-react';

export const KitchenDiaries: React.FC = () => {
  const [activeSnippet, setActiveSnippet] = useState(0);

  const pantryStaples = [
    {
      name: "Cold-Pressed Mustard Oil (Kachi Ghani)",
      bengali: "সর্ষের তেল",
      role: "The Pungent Backbone",
      note: "Heated to the exact smoking point to release its signature sinus-clearing warmth, defining eastern cooking."
    },
    {
      name: "Panch Phoron (The Five-Spice)",
      bengali: "পাঁচ ফোড়ন",
      role: "The Tempered Symphony",
      note: "An equal blend of fenugreek, nigella, cumin, black mustard, and wild celery seed (radhuni). Never ground; tempered whole."
    },
    {
      name: "White Poppy Seed (Posto)",
      bengali: "পোস্ত",
      role: "The Silken Calm",
      note: "Crushed on stone into a velvety, cooling paste that lends nutty richness to vegetables without a single drop of dairy."
    },
    {
      name: "Fresh Date Palm Jaggery (Nolen Gur)",
      bengali: "নলেন গুড়",
      role: "The Winter Epilogue",
      note: "Tapped fresh from date palms at dawn between December and February. Unrefined, butterscotch-scented, and irreplaceable."
    }
  ];

  return (
    <section id="kitchen-diaries" className="py-20 sm:py-28 bg-[#FAFAF9] border-b border-[#E4E4E7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl text-left mb-16">
          <span className="block font-sans text-[10px] tracking-[0.25em] uppercase font-bold text-[#853724] mb-2">
            HISTORICAL CHRONICLES
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-[#18181B] tracking-tight">
            Kitchen Diaries & <span className="italic text-[#853724]">Heirloom Notes</span>
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#52525B] font-light leading-relaxed">
            “Culture lives in handwritten recipes, in the way something is tempered or plated. That, too, is legacy.”
          </p>
        </div>

        {/* Notebook Excerpt Interactive Viewer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          {/* Left: Diary Selector */}
          <div className="lg:col-span-5 space-y-3 text-left">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#853724] font-sans font-bold block mb-3">
              SELECT A SEASONAL CHRONICLE
            </span>
            {KITCHEN_DIARY_SNIPPETS.map((snippet, idx) => (
              <button
                key={snippet.title}
                onClick={() => setActiveSnippet(idx)}
                className={`w-full p-5 border text-left transition-all ${
                  activeSnippet === idx
                    ? 'bg-[#853724] text-white border-[#853724]'
                    : 'bg-white border-[#E4E4E7] text-[#18181B] hover:border-[#853724]'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-sans uppercase tracking-widest mb-1 opacity-80">
                  <span>{snippet.season}</span>
                  <BookOpen className="w-3.5 h-3.5" />
                </div>
                <h4 className="font-serif text-xl font-normal">
                  {snippet.title}
                </h4>
              </button>
            ))}
          </div>

          {/* Right: Simulated Handwritten Paper Notebook View */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 border border-[#E4E4E7] relative text-left flex flex-col justify-between">
            <div className="absolute top-5 right-6 text-[10px] font-mono text-[#A1A1AA] uppercase tracking-widest">
              Folio #{activeSnippet + 1}
            </div>

            <div className="space-y-5">
              <span className="inline-block px-3 py-1 text-[10px] uppercase font-sans font-bold tracking-[0.2em] bg-[#FAFAF9] text-[#853724] border border-[#E4E4E7]">
                {KITCHEN_DIARY_SNIPPETS[activeSnippet].season}
              </span>
              <h3 className="font-serif text-3xl font-normal text-[#18181B]">
                {KITCHEN_DIARY_SNIPPETS[activeSnippet].title}
              </h3>
              <p className="font-serif italic text-xl sm:text-2xl text-[#18181B] leading-relaxed">
                “{KITCHEN_DIARY_SNIPPETS[activeSnippet].excerpt}”
              </p>
            </div>

            <div className="mt-8 pt-5 border-t border-[#E4E4E7] flex items-center justify-between text-xs text-[#52525B] font-sans">
              <span className="font-medium text-[#18181B]">
                {KITCHEN_DIARY_SNIPPETS[activeSnippet].note}
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#A1A1AA]">Archived in Kolkata & Beyond</span>
            </div>
          </div>
        </div>

        {/* The 4 Iconic Bengal Elements */}
        <div className="border-t border-[#E4E4E7] pt-16 text-left">
          <div className="max-w-2xl mb-8">
            <span className="text-[10px] uppercase tracking-[0.25em] font-sans text-[#853724] font-bold block mb-1">
              MICRO-REGIONAL ANATOMY
            </span>
            <h3 className="font-serif text-3xl font-normal text-[#18181B]">
              The Four Staples of the Pichhutaaney Pantry
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {pantryStaples.map((staple, idx) => {
              const bgClass = idx === 0 ? 'bg-[#853724] text-white border-[#853724]' : 'bg-white text-[#18181B] border-[#E4E4E7]';
              const roleColor = idx === 0 ? 'text-white/80' : 'text-[#853724]';
              const noteColor = idx === 0 ? 'text-white/85' : 'text-[#52525B]';
              const bengaliColor = idx === 0 ? 'text-white' : 'text-[#18181B]';

              return (
                <div
                  key={staple.name}
                  className={`p-6 border flex flex-col justify-between ${bgClass}`}
                >
                  <div>
                    <div className="flex justify-between items-baseline mb-2">
                      <span className={`text-[10px] uppercase tracking-widest font-sans font-bold ${roleColor}`}>
                        {staple.role}
                      </span>
                      <span className={`font-bengali text-xl ${bengaliColor}`}>
                        {staple.bengali}
                      </span>
                    </div>
                    <h4 className="font-serif text-lg font-normal leading-snug mb-2">
                      {staple.name}
                    </h4>
                    <p className={`text-xs font-sans leading-relaxed font-light ${noteColor}`}>
                      {staple.note}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
