import React from 'react';
import { SAMPLE_SEASONAL_MENU } from '../data/content';
import { Sparkles, Utensils, GlassWater, Leaf } from 'lucide-react';

export const SampleMenu: React.FC = () => {
  return (
    <section id="sample-menu" className="py-20 sm:py-28 bg-[#FAFAF9] border-b border-[#E4E4E7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl text-left mb-16">
          <span className="block font-sans text-[10px] tracking-[0.25em] uppercase font-bold text-[#853724] mb-2">
            SENSORY PREVIEW
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-[#18181B] tracking-tight">
            Sample Six-Course <span className="italic text-[#853724]">Seasonal Journey</span>
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#52525B] font-light leading-relaxed">
            Bengal’s culinary rhythm follows the traditional sequence of taste: starting with bitters and sharp temperings, evolving through comforting gravies, and closing with wild winter jaggery.
          </p>
        </div>

        {/* 6-Course Tasting Flow Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {SAMPLE_SEASONAL_MENU.map((course, idx) => {
            const isHighlight = idx === 0;
            return (
              <div
                key={course.courseNumber}
                className={`border p-6 flex flex-col justify-between transition-colors ${
                  isHighlight 
                    ? 'bg-white border-[#853724]' 
                    : 'bg-white border-[#E4E4E7]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between border-b border-[#E4E4E7] pb-3 mb-4">
                    <span className="font-mono text-[11px] font-bold text-[#18181B] bg-[#FAFAF9] px-2.5 py-0.5 border border-[#E4E4E7]">
                      Course {course.courseNumber}
                    </span>
                    <span className="font-serif italic text-sm font-semibold text-[#853724]">
                      {course.bengaliName}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-normal text-[#18181B] mb-2">
                    {course.courseTitle}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed font-sans font-light mb-4">
                    {course.description}
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-[#E4E4E7] text-xs font-sans">
                  <div className="text-[#52525B] italic text-[11.5px] leading-relaxed font-light">
                    <span className="font-bold text-[#18181B] not-italic block mb-0.5 text-[10px] uppercase tracking-wider">
                      Heirloom Footnote:
                    </span>
                    {course.heirloomElement}
                  </div>

                  {course.pairingNote && (
                    <div className="flex items-center space-x-2 text-[11px] text-[#52525B] bg-[#FAFAF9] border border-[#E4E4E7] p-2.5">
                      <GlassWater className="w-3.5 h-3.5 text-[#853724] shrink-0" />
                      <span><strong className="font-medium text-[#18181B]">Pairing:</strong> {course.pairingNote}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Note on adaptability */}
        <div className="mt-12 bg-white p-6 border border-[#E4E4E7] flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
          <div className="flex items-center space-x-3">
            <Leaf className="w-5 h-5 text-[#853724] shrink-0" />
            <p className="text-xs sm:text-sm text-[#52525B] font-sans font-light">
              <strong className="text-[#18181B] font-medium">Seasonal & Dietary Curation:</strong> All courses are adapted with equal reverence for vegetarian, pescatarian, and plant-forward guests during private seating drops.
            </p>
          </div>

          <a
            href="#supper-club"
            className="shrink-0 px-6 py-3 bg-[#853724] text-white hover:bg-[#18181B] text-xs font-sans font-semibold uppercase tracking-widest transition-colors"
          >
            Join Supper Club Waitlist
          </a>
        </div>
      </div>
    </section>
  );
};
