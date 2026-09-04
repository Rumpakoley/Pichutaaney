import React from 'react';
import { Heart, Instagram, Mail, BookOpen, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenLedger: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLedger }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#18181B] text-[#FAFAF9] border-t border-[#27272A] pt-16 pb-12 text-left font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#27272A]">
          {/* Brand & Manifesto Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-3">
              <span className="font-serif text-3xl font-light text-[#FAFAF9] tracking-tight">
                Pichhutaaney
              </span>
              <span className="text-xs font-bengali font-medium text-[#853724] px-2 py-0.5 border border-[#853724]/40 bg-[#853724]/10">
                পিছুটান
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed max-w-md font-light">
              A hyper-regional Indian table, communal supper club, and archive of kitchen diaries founded by Enakshi. Rooted in the seasons, silt, and hearths of West Bengal.
            </p>

            <div className="pt-2 text-xs italic font-serif text-[#853724]">
              “Preserving culture lives in the way something is tempered or plated. That, too, is legacy.”
            </div>
          </div>

          {/* Quick Navigation: Core Sections */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FAFAF9] block">
              EDITORIAL INDEX
            </span>
            <ul className="space-y-2 text-xs text-[#A1A1AA] font-light">
              <li>
                <a href="#about-me" className="hover:text-[#853724] transition-colors">
                  01. About Me (Enakshi’s Journey)
                </a>
              </li>
              <li>
                <a href="#story-of-pichhutaaney" className="hover:text-[#853724] transition-colors">
                  02. The Story of Pichhutaaney & Regional Manifesto
                </a>
              </li>
              <li>
                <a href="#supper-club" className="hover:text-[#853724] transition-colors">
                  03. Supper Club Waitlist (Seasonal Drops)
                </a>
              </li>
              <li>
                <a href="#private-events" className="hover:text-[#853724] transition-colors">
                  04. Private Events & Bespoke Dining
                </a>
              </li>
              <li>
                <a href="#kitchen-diaries" className="hover:text-[#853724] transition-colors">
                  05. Kitchen Diaries & Seasonal Notes
                </a>
              </li>
              <li>
                <a href="#sample-menu" className="hover:text-[#853724] transition-colors">
                  06. Sample 6-Course Tasting Journey
                </a>
              </li>
              <li>
                <a href="#get-in-touch" className="hover:text-[#853724] transition-colors">
                  07. Get in Touch & Collaborations
                </a>
              </li>
            </ul>
          </div>

          {/* Connect & Host Desk */}
          <div className="md:col-span-3 space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FAFAF9] block">
              CONNECT
            </span>
            <div className="space-y-2 text-xs text-[#A1A1AA] font-light">
              <p>Direct inquiries: <a href="mailto:hello@pichhutaaney.com" className="text-[#FAFAF9] underline hover:text-[#853724]">hello@pichhutaaney.com</a></p>
              <p>Instagram: <span className="text-[#FAFAF9]">@pichhutaaney</span></p>
              <p>Pop-ups & Seatings: Announced via Private Waitlist</p>
            </div>

            <div className="pt-3">
              <button
                onClick={onOpenLedger}
                className="inline-flex items-center space-x-2 px-4 py-2 text-[10px] uppercase tracking-widest font-semibold bg-[#853724] text-white hover:bg-white hover:text-[#18181B] transition-colors"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Host Inquiries Desk</span>
              </button>
            </div>
          </div>
        </div>

        {/* Sub-footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] uppercase tracking-widest text-[#71717A]">
          <div>
            © {new Date().getFullYear()} Pichhutaaney by Enakshi. Rooted in regional Indian terroirs.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center space-x-1.5 text-[#A1A1AA] hover:text-[#FAFAF9] transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
