import React from 'react';
import { ArrowUp, BookOpen, ExternalLink } from 'lucide-react';

interface PortfolioFooterProps {
  onOpenLedger: () => void;
}

export const PortfolioFooter: React.FC<PortfolioFooterProps> = ({ onOpenLedger }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0e0e0e] text-[#f5f2eb] border-t-2 border-black pt-16 pb-12 text-left font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-white/10">
          {/* Brand & Manifesto Column */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center space-x-3">
              <span className="font-marcellus text-3xl sm:text-4xl font-normal text-white tracking-tight">
                Pichhutaaney
              </span>
              <span className="font-bengali text-xs text-[#ffd177] px-3 py-1 rounded-full border border-[#ffd177]/30 bg-white/5 font-medium">
                পিছুটানে
              </span>
            </div>
            <p className="font-sans text-xs sm:text-sm text-white/70 leading-relaxed max-w-sm font-light">
              Intuitive Indian culinary storytelling, living kitchen memories & intimate supper clubs founded by Enakshi. Rooted in West Bengal, shaped by travel.
            </p>
            <p className="font-pt-serif italic text-xs text-[#ffd177]">
              “Food is not a rigid formula. It lives in instinct, wanderlust, and the warmth of home.”
            </p>
          </div>

          {/* Quick Index */}
          <div className="md:col-span-4 space-y-2">
            <span className="font-mono text-[10.5px] uppercase tracking-widest text-[#ffd177] font-bold block mb-3">
              PORTFOLIO INDEX
            </span>
            <div className="space-y-1.5 text-xs text-white/70 font-mono">
              <div><a href="#hero-display" className="hover:text-[#ffd177] transition-colors">01 // VISUAL LOOKBOOK GALLERY</a></div>
              <div><a href="#tasting-exhibitions" className="hover:text-[#ffd177] transition-colors">02 // TASTING EDITIONS & PRINTED CARDS</a></div>
              <div><a href="#biography" className="hover:text-[#ffd177] transition-colors">03 // ARTIST BIOGRAPHY & STATEMENT</a></div>
              <div><a href="#kitchen-reels" className="hover:text-[#ffd177] transition-colors">04 // LIVING KITCHEN SOUND & VIDEO REELS</a></div>
              <div><a href="#culinary-craft" className="hover:text-[#ffd177] transition-colors">05 // CULINARY DISCIPLINES & CRAFT</a></div>
              <div><a href="#booking-contact" className="hover:text-[#ffd177] transition-colors">06 // DIRECT HOTLINE & RESERVATION</a></div>
            </div>
          </div>

          {/* Connect & Curator Portal */}
          <div className="md:col-span-3 space-y-3">
            <span className="font-mono text-[10.5px] uppercase tracking-widest text-[#ffd177] font-bold block mb-3">
              CONNECT & DESK
            </span>
            <div className="space-y-1.5 text-xs text-white/70 font-sans">
              <p>Email: <a href="mailto:pichhutaaney@gmail.com" className="text-white underline hover:text-[#ffd177]">pichhutaaney@gmail.com</a></p>
              <p>Instagram: <span className="text-white">@pichhutaaney</span></p>
              <p>Location: <span className="text-white">Kolkata & Toronto</span></p>
            </div>

            <div className="pt-3">
              <button
                onClick={onOpenLedger}
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full text-[10.5px] font-mono uppercase tracking-widest font-bold bg-[#ffd177] text-black hover:bg-white transition-all cursor-pointer shadow-sm"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Open Curator Desk</span>
              </button>
            </div>
          </div>
        </div>

        {/* Subfooter */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono uppercase tracking-widest text-white/40">
          <div>
            © {new Date().getFullYear()} ENAKSHI • PICHHUTAANEY PORTFOLIO
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center space-x-1.5 text-white/60 hover:text-white transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
