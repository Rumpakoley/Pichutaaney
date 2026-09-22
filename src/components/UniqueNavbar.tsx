import React, { useState, useEffect } from 'react';
import { Utensils, BookOpen, Sparkles, Compass } from 'lucide-react';

interface UniqueNavbarProps {
  onOpenLedger: () => void;
  reservationCount: number;
}

export const UniqueNavbar: React.FC<UniqueNavbarProps> = ({ onOpenLedger, reservationCount }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 w-[94%] max-w-6xl flex items-center justify-between px-4 sm:px-6 py-2.5 rounded-full border ${
        scrolled
          ? 'bg-[#191512]/90 backdrop-blur-md border-[#3D342C] shadow-2xl text-[#F5EFEB]'
          : 'bg-[#FAF7F2]/90 backdrop-blur-md border-[#D8CEBF] shadow-lg text-[#191512]'
      }`}
    >
      {/* Brand Identity */}
      <a href="#hero" className="flex items-center space-x-2.5 group">
        <span className="w-8 h-8 rounded-full bg-[#963D28] text-white flex items-center justify-center font-serif text-sm font-bold shadow-sm group-hover:scale-105 transition-transform">
          P
        </span>
        <div className="flex flex-col text-left">
          <span className="font-marcellus text-sm sm:text-base font-normal tracking-wide leading-none">
            Pichhutaaney
          </span>
          <span className="font-bengali text-[10.5px] opacity-80 leading-tight">
            পিছুটানেই
          </span>
        </div>
      </a>

      {/* Navigation Links */}
      <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 font-sans text-xs uppercase tracking-wider font-semibold">
        <a
          href="#tasting-archive"
          className="px-3.5 py-1.5 rounded-full hover:bg-black/5 hover:text-[#963D28] transition-colors"
        >
          Tasting Archive
        </a>
        <a
          href="#hearth-reels"
          className="px-3.5 py-1.5 rounded-full hover:bg-black/5 hover:text-[#963D28] transition-colors"
        >
          Living Hearth
        </a>
        <a
          href="#terroir-pillars"
          className="px-3.5 py-1.5 rounded-full hover:bg-black/5 hover:text-[#963D28] transition-colors"
        >
          Terroirs
        </a>
        <a
          href="#philosophy"
          className="px-3.5 py-1.5 rounded-full hover:bg-black/5 hover:text-[#963D28] transition-colors"
        >
          Philosophy
        </a>
      </nav>

      {/* Actions */}
      <div className="flex items-center space-x-2">
        <a
          href="#table-concierge"
          className="px-4 sm:px-5 py-1.5 bg-[#963D28] hover:bg-[#80311E] text-[#F5EFEB] rounded-full font-sans text-xs uppercase tracking-widest font-semibold transition-all shadow-sm hover:shadow-md"
        >
          Reserve Table
        </a>

        {reservationCount > 0 && (
          <button
            onClick={onOpenLedger}
            title="Open Host Concierge Desk"
            className="p-1.5 rounded-full bg-[#E8A857] text-[#191512] hover:scale-105 transition-transform flex items-center justify-center cursor-pointer shadow-xs"
          >
            <BookOpen className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </header>
  );
};
