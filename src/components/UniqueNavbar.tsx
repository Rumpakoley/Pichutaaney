import React, { useState, useEffect } from 'react';
import { BookOpen } from 'lucide-react';

interface UniqueNavbarProps {
  onOpenLedger: () => void;
  reservationCount: number;
}

export const UniqueNavbar: React.FC<UniqueNavbarProps> = ({ 
  onOpenLedger, 
  reservationCount 
}) => {
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
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 w-[94%] max-w-6xl flex items-center justify-between px-4 sm:px-6 py-2.5 rounded-full border backdrop-blur-md ${
        scrolled
          ? 'bg-[#F7F3EC]/98 border-[#C8BEAE] shadow-xl text-[#28221D]'
          : 'bg-[#F7F3EC]/90 border-[#D5CBBD] shadow-md text-[#28221D]'
      }`}
    >
      {/* Brand Identity */}
      <a href="#hero" className="flex items-center space-x-2.5 group">
        <span className="w-8 h-8 rounded-full bg-[#28221D] text-[#ECE5DA] flex items-center justify-center font-serif text-sm font-bold shadow-sm group-hover:scale-110 group-hover:bg-[#B58D59] group-hover:text-[#1C1713] transition-all duration-300">
          P
        </span>
        <div className="flex flex-col text-left">
          <span className="font-marcellus text-sm sm:text-base font-medium tracking-wide leading-none text-[#28221D] group-hover:text-[#B58D59] transition-colors duration-300">
            Pichhutaaney
          </span>
          <span className="font-bengali text-[11px] text-[#655B51] leading-tight font-medium group-hover:text-[#28221D] transition-colors duration-300">
            পিছুটানে
          </span>
        </div>
      </a>

      {/* Navigation Links */}
      <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 font-sans text-xs uppercase tracking-wider font-semibold">
        <a
          href="#dishes-gallery"
          className="px-3.5 py-1.5 rounded-full text-[#28221D] hover:bg-black/5 hover:text-[#B58D59] hover:tracking-widest transition-all duration-300"
        >
          Dishes
        </a>
        <a
          href="#hearth-reels"
          className="px-3.5 py-1.5 rounded-full text-[#28221D] hover:bg-black/5 hover:text-[#B58D59] hover:tracking-widest transition-all duration-300"
        >
          Living Hearth
        </a>
        <a
          href="#philosophy"
          className="px-3.5 py-1.5 rounded-full text-[#28221D] hover:bg-black/5 hover:text-[#B58D59] hover:tracking-widest transition-all duration-300"
        >
          Philosophy
        </a>
        <a
          href="#dialogues"
          className="px-3.5 py-1.5 rounded-full text-[#28221D] hover:bg-black/5 hover:text-[#B58D59] hover:tracking-widest transition-all duration-300"
        >
          Dialogues
        </a>
        <a
          href="#table-concierge"
          className="px-3.5 py-1.5 rounded-full text-[#28221D] hover:bg-black/5 hover:text-[#B58D59] hover:tracking-widest transition-all duration-300"
        >
          Concierge
        </a>
      </nav>

      {/* Actions */}
      <div className="flex items-center space-x-2">
        <a
          href="#table-concierge"
          className="px-4 sm:px-5 py-1.5 bg-[#28221D] hover:bg-[#B58D59] hover:text-[#1C1713] text-[#ECE5DA] rounded-full font-sans text-xs uppercase tracking-widest font-semibold transition-all duration-300 shadow-sm hover:shadow-md hover:scale-[1.03] active:scale-[0.98] inline-block"
        >
          Reserve Table
        </a>

        {reservationCount > 0 && (
          <button
            onClick={onOpenLedger}
            title="Open Host Concierge Desk"
            className="p-1.5 rounded-full bg-[#B58D59] text-white hover:bg-[#C49E67] hover:scale-105 transition-all flex items-center justify-center cursor-pointer shadow-xs"
          >
            <BookOpen className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </header>
  );
};
