import React from 'react';
import { Heart, Instagram, Mail, BookOpen, ArrowUp } from 'lucide-react';
import { motion } from 'motion/react';
import { RevealHeading, RevealText, StaggerContainer, StaggerItem } from './TextTransitions';

interface FooterProps {
  onOpenLedger: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLedger }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#171716] text-[#E9E4DD] border-t border-white/10 pt-16 pb-12 text-left font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand & Manifesto Column */}
          <div className="md:col-span-5 space-y-4">
            <RevealHeading>
              <div className="flex items-center space-x-3">
                <span className="font-marcellus text-3xl sm:text-4xl font-normal text-white tracking-tight">
                  Pichhutaaney
                </span>
                <span className="text-xs font-bengali font-medium text-[#EED485] px-3 py-1 rounded-full border border-[#EED485]/40 bg-[#EED485]/10">
                  পিছুটানে
                </span>
              </div>
            </RevealHeading>

            <RevealText delay={0.1}>
              <p className="text-xs sm:text-sm text-[#DED8CF] leading-relaxed max-w-md font-light">
                An intuitive Indian table, communal supper club, and living archive of kitchen memories founded by Enakshi. Cooked by instinct, shaped by travel, and rooted in the warmth of West Bengal.
              </p>
            </RevealText>

            <RevealText delay={0.2}>
              <div className="pt-2 text-sm italic font-pt-serif text-[#EED485]">
                “Food is not a rigid formula. It lives in instinct, wanderlust, and the warmth of home.”
              </div>
            </RevealText>
          </div>

          {/* Quick Navigation: Core Sections */}
          <div className="md:col-span-4 space-y-3">
            <RevealHeading delay={0.1}>
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white block">
                EDITORIAL INDEX
              </span>
            </RevealHeading>

            <StaggerContainer staggerDelay={0.04} className="space-y-2 text-xs text-[#DED8CF] font-light">
              <StaggerItem>
                <a href="#about-me" className="hover:text-[#EED485] transition-colors">
                  01. About Me (Enakshi’s Journey)
                </a>
              </StaggerItem>
              <StaggerItem>
                <a href="#kitchen-reels" className="hover:text-[#EED485] transition-colors">
                  02. The Living Kitchen in Motion (Reels)
                </a>
              </StaggerItem>
              <StaggerItem>
                <a href="#story-of-pichhutaaney" className="hover:text-[#EED485] transition-colors">
                  03. The Story of Pichhutaaney & Regional Manifesto
                </a>
              </StaggerItem>
              <StaggerItem>
                <a href="#supper-club" className="hover:text-[#EED485] transition-colors">
                  04. Supper Club Waitlist (Seasonal Drops)
                </a>
              </StaggerItem>
              <StaggerItem>
                <a href="#private-events" className="hover:text-[#EED485] transition-colors">
                  05. Private Events & Bespoke Dining
                </a>
              </StaggerItem>
              <StaggerItem>
                <a href="#kitchen-diaries" className="hover:text-[#EED485] transition-colors">
                  06. Kitchen Diaries & Seasonal Notes
                </a>
              </StaggerItem>
              <StaggerItem>
                <a href="#sample-menu" className="hover:text-[#EED485] transition-colors">
                  07. Sample Tasting Editions
                </a>
              </StaggerItem>
              <StaggerItem>
                <a href="#get-in-touch" className="hover:text-[#EED485] transition-colors">
                  08. Get in Touch & Collaborations
                </a>
              </StaggerItem>
            </StaggerContainer>
          </div>

          {/* Connect & Host Desk */}
          <div className="md:col-span-3 space-y-4">
            <RevealHeading delay={0.15}>
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white block">
                CONNECT
              </span>
            </RevealHeading>

            <RevealText delay={0.2}>
              <div className="space-y-2 text-xs text-[#DED8CF] font-light">
                <p>Direct inquiries: <a href="mailto:pichhutaaney@gmail.com" className="text-white underline hover:text-[#EED485]">pichhutaaney@gmail.com</a></p>
                <p>Instagram: <a href="https://www.instagram.com/pichhutaaney?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="text-white underline hover:text-[#EED485]">@pichhutaaney</a></p>
                <p>Pop-ups & Seatings: Announced via Private Waitlist</p>
              </div>

              <div className="pt-3">
                <button
                  onClick={onOpenLedger}
                  className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full text-[11px] uppercase tracking-widest font-medium bg-white text-[#171716] hover:bg-[#EED485] hover:text-[#171716] transition-all cursor-pointer shadow-sm"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Host Inquiries Desk</span>
                </button>
              </div>
            </RevealText>
          </div>
        </div>

        {/* Sub-footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] uppercase tracking-widest text-[#DED8CF]/70">
          <div>
            © {new Date().getFullYear()} Pichhutaaney by Enakshi. Rooted in regional Indian terroirs.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center space-x-2 text-[#DED8CF] hover:text-white transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
