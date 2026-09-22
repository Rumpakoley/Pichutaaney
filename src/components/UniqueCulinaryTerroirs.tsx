import React from 'react';
import { REGIONAL_PILLARS } from '../data/content';
import { MapPin, Compass, FileText, Download, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export const UniqueCulinaryTerroirs: React.FC = () => {
  return (
    <section id="terroir-pillars" className="py-20 sm:py-28 bg-[#ECE5DA] border-b border-[#D5CBBD] text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#D5CBBD] pb-8">
          <div className="space-y-2">
            <span className="font-sans text-[11px] uppercase tracking-[0.25em] text-[#B58D59] font-bold block">
              GEOGRAPHICAL PROVENANCE & ANCHORS
            </span>
            <h2 className="font-marcellus text-3xl sm:text-4xl md:text-5xl font-normal text-[#28221D] tracking-tight">
              The 4 Culinary Terroirs of Pichhutaaney
            </h2>
          </div>
          <p className="font-sans text-xs sm:text-sm text-[#655B51] max-w-md leading-relaxed font-light">
            Every dish is born of travel and anchored in home—weaving regional spices and techniques collected from places lived in.
          </p>
        </div>

        {/* 4 Terroir Dossiers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {REGIONAL_PILLARS.map((pillar, idx) => (
            <div
              key={pillar.region}
              className="p-8 rounded-3xl bg-[#F7F3EC] border border-[#D5CBBD] shadow-xs hover:border-[#28221D] transition-all duration-300 space-y-4 text-left"
            >
              <div className="flex items-center justify-between border-b border-[#D5CBBD] pb-3">
                <span className="font-mono text-xs text-[#B58D59] font-bold tracking-widest">
                  TERROIR // 0{idx + 1}
                </span>
                <span className="px-3 py-1 rounded-full bg-[#ECE5DA] border border-[#D5CBBD] text-[10px] font-sans uppercase tracking-wider font-semibold text-[#28221D]">
                  {pillar.anchorIngredient.split(',')[0]}
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="font-marcellus text-2xl font-normal text-[#28221D]">
                  {pillar.region}
                </h3>
                <p className="font-sans text-xs text-[#B58D59] font-semibold">
                  Anchor Notes: {pillar.anchorIngredient}
                </p>
              </div>

              <p className="font-sans text-xs sm:text-sm text-[#4A4138] leading-relaxed font-light">
                {pillar.description}
              </p>

              <div className="pt-2 border-t border-[#D5CBBD]/60 text-xs font-pt-serif italic text-[#655B51]">
                “{pillar.nuance}”
              </div>
            </div>
          ))}
        </div>

        {/* Archival Briefs */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#F7F3EC] border border-[#D5CBBD] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-left">
            <span className="font-mono text-[9.5px] uppercase tracking-widest text-[#B58D59] font-bold block">
              DOWNLOADABLE ARCHIVES
            </span>
            <h4 className="font-marcellus text-xl text-[#28221D]">
              Tasting Menu Dossiers & Event Briefs
            </h4>
            <p className="font-sans text-xs text-[#655B51] font-light">
              Explore our comprehensive 4-edition tasting catalog and private dining guide.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="#tasting-archive"
              className="px-5 py-2.5 rounded-full bg-[#ECE5DA] border border-[#D5CBBD] hover:border-[#28221D] font-sans text-xs uppercase tracking-wider font-semibold text-[#28221D] transition-all shadow-xs"
            >
              View 4-Course Catalog
            </a>
            <a
              href="#table-concierge"
              className="px-5 py-2.5 rounded-full bg-[#28221D] text-[#ECE5DA] hover:bg-[#1C1713] font-sans text-xs uppercase tracking-wider font-semibold transition-all shadow-sm"
            >
              Private Event Inquiry
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
