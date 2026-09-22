import React from 'react';
import { BookOpen } from 'lucide-react';

interface PortfolioNavbarProps {
  onOpenLedger: () => void;
  waitlistCount: number;
}

export const PortfolioNavbar: React.FC<PortfolioNavbarProps> = ({ onOpenLedger, waitlistCount }) => {
  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center bg-[#FAF6F0]/90 backdrop-blur-md border-2 border-black/80 shadow-lg rounded-full py-1.5 px-3 sm:px-5 gap-1 sm:gap-2 max-w-[95vw]">
      <a
        href="#hero-display"
        className="px-2.5 sm:px-3 py-1 rounded-full hover:bg-black/10 font-mono text-[9.5px] sm:text-[10px] uppercase font-bold tracking-wider text-black transition-all"
      >
        gallery
      </a>
      <a
        href="#tasting-exhibitions"
        className="px-2.5 sm:px-3 py-1 rounded-full hover:bg-black/10 font-mono text-[9.5px] sm:text-[10px] uppercase font-bold tracking-wider text-black transition-all"
      >
        editions
      </a>
      <a
        href="#biography"
        className="px-2.5 sm:px-3 py-1 rounded-full hover:bg-black/10 font-mono text-[9.5px] sm:text-[10px] uppercase font-bold tracking-wider text-black transition-all"
      >
        biography
      </a>
      <a
        href="#kitchen-reels"
        className="px-2.5 sm:px-3 py-1 rounded-full hover:bg-black/10 font-mono text-[9.5px] sm:text-[10px] uppercase font-bold tracking-wider text-black transition-all hidden xs:inline-block"
      >
        reels
      </a>
      <a
        href="#culinary-craft"
        className="px-2.5 sm:px-3 py-1 rounded-full hover:bg-black/10 font-mono text-[9.5px] sm:text-[10px] uppercase font-bold tracking-wider text-black transition-all hidden md:inline-block"
      >
        craft
      </a>
      <a
        href="#booking-contact"
        className="px-3.5 sm:px-4 py-1.5 bg-[#0e0e0e] hover:bg-[#ffd177] hover:text-black text-white rounded-full font-mono text-[9.5px] sm:text-[10px] uppercase font-bold tracking-wider transition-all shadow-sm"
      >
        reserve
      </a>

      {waitlistCount > 0 && (
        <button
          onClick={onOpenLedger}
          title="Open Host Ledger Desk"
          className="ml-1 p-1.5 rounded-full bg-[#ffd177] border border-black hover:scale-105 transition-transform text-black cursor-pointer hidden sm:flex items-center justify-center"
        >
          <BookOpen className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};
