import React from 'react';
import { ArrowUp, BookOpen, Utensils, Heart } from 'lucide-react';

interface UniqueFooterProps {
  onOpenLedger: () => void;
}

export const UniqueFooter: React.FC<UniqueFooterProps> = ({ onOpenLedger }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1C1713] text-[#ECE5DA] border-t border-[#3D342C] pt-16 pb-12 text-left font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-white/10">
          {/* Brand & Manifesto Column */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center space-x-3">
              <span className="font-marcellus text-3xl sm:text-4xl font-normal text-white tracking-tight">
                Pichhutaaney
              </span>
              <span className="font-bengali text-xs text-[#B58D59] px-3 py-1 rounded-full border border-[#B58D59]/30 bg-white/5 font-medium">
                পিছুটানে
              </span>
            </div>
            <p className="font-sans text-xs sm:text-sm text-[#D5CBBD] leading-relaxed max-w-sm font-light">
              An intuitive Indian dining table, living kitchen archive & intimate supper club founded by Enakshi. Rooted in West Bengal, shaped by travel.
            </p>
            <p className="font-pt-serif italic text-xs text-[#B58D59]">
              “Food is not a rigid formula. It lives in instinct, wanderlust, and the warmth of home.”
            </p>
          </div>

          {/* Quick Index */}
          <div className="md:col-span-4 space-y-2">
            <span className="font-sans text-[10.5px] uppercase tracking-widest text-[#B58D59] font-bold block mb-3">
              ATELIER INDEX
            </span>
            <div className="space-y-1.5 text-xs text-[#D5CBBD] font-sans">
              <div><a href="#hero" className="hover:text-[#B58D59] transition-colors">01 // CHEF ATELIER LOOKBOOK</a></div>
              <div><a href="#tasting-archive" className="hover:text-[#B58D59] transition-colors">02 // TASTING EDITIONS & PRINTED CARDS</a></div>
              <div><a href="#hearth-reels" className="hover:text-[#B58D59] transition-colors">03 // LIVING HEARTH IN MOTION</a></div>
              <div><a href="#terroir-pillars" className="hover:text-[#B58D59] transition-colors">04 // 4 CULINARY TERROIRS & ANCHORS</a></div>
              <div><a href="#philosophy" className="hover:text-[#B58D59] transition-colors">05 // MANIFESTO & PRINCIPLES</a></div>
              <div><a href="#table-concierge" className="hover:text-[#B58D59] transition-colors">06 // TABLE CONCIERGE & HOTLINE</a></div>
            </div>
          </div>

          {/* Connect & Curator Desk */}
          <div className="md:col-span-3 space-y-3">
            <span className="font-sans text-[10.5px] uppercase tracking-widest text-[#B58D59] font-bold block mb-3">
              CONCIERGE & DESK
            </span>
            <div className="space-y-1.5 text-xs text-[#D5CBBD] font-sans font-light">
              <p>Direct: <a href="mailto:hello@pichhutaaney.com" className="text-white underline hover:text-[#B58D59]">hello@pichhutaaney.com</a></p>
              <p>Instagram: <span className="text-white">@pichhutaaney</span></p>
              <p>Base: <span className="text-white">Kolkata & San Francisco</span></p>
            </div>

            <div className="pt-3">
              <button
                onClick={onOpenLedger}
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full text-[10.5px] font-sans uppercase tracking-widest font-semibold bg-[#B58D59] text-[#1C1713] hover:bg-[#C49E67] transition-all cursor-pointer shadow-sm"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Open Curator Desk</span>
              </button>
            </div>
          </div>
        </div>

        {/* Subfooter */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-sans uppercase tracking-widest text-[#D5CBBD]/60">
          <div>
            © {new Date().getFullYear()} ENAKSHI • PICHHUTAANEY (পিছুটানে)
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center space-x-1.5 text-[#D5CBBD] hover:text-[#B58D59] transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
