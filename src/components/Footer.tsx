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
    <footer className="bg-[#18181B] text-[#FAFAF9] border-t border-[#27272A] pt-16 pb-12 text-left font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#27272A]">
          {/* Brand & Manifesto Column */}
          <div className="md:col-span-5 space-y-4">
            <RevealHeading>
              <div className="flex items-center space-x-3">
                <span className="font-serif text-3xl font-light text-[#FAFAF9] tracking-tight">
                  Pichhutaaney
                </span>
                <span className="text-xs font-bengali font-medium text-[#F3947E] px-2 py-0.5 border border-[#F3947E]/40 bg-[#F3947E]/10">
                  পিছুটান
                </span>
              </div>
            </RevealHeading>

            <RevealText delay={0.1}>
              <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed max-w-md font-light">
                An intuitive Indian table, communal supper club, and living archive of kitchen memories founded by Enakshi. Cooked by instinct, shaped by travel, and rooted in the warmth of West Bengal.
              </p>
            </RevealText>

            <RevealText delay={0.2}>
              <div className="pt-2 text-xs italic font-serif text-[#F3947E]">
                “Food is not a rigid formula. It lives in instinct, wanderlust, and the warmth of home.”
              </div>
            </RevealText>
          </div>

          {/* Quick Navigation: Core Sections */}
          <div className="md:col-span-4 space-y-3">
            <RevealHeading delay={0.1}>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FAFAF9] block">
                EDITORIAL INDEX
              </span>
            </RevealHeading>

            <StaggerContainer staggerDelay={0.04} className="space-y-2 text-xs text-[#A1A1AA] font-light">
              <StaggerItem>
                <a href="#about-me" className="hover:text-[#F3947E] transition-colors">
                  01. About Me (Enakshi’s Journey)
                </a>
              </StaggerItem>
              <StaggerItem>
                <a href="#kitchen-reels" className="hover:text-[#F3947E] transition-colors">
                  02. The Living Kitchen in Motion (Reels)
                </a>
              </StaggerItem>
              <StaggerItem>
                <a href="#story-of-pichhutaaney" className="hover:text-[#F3947E] transition-colors">
                  03. The Story of Pichhutaaney & Regional Manifesto
                </a>
              </StaggerItem>
              <StaggerItem>
                <a href="#supper-club" className="hover:text-[#F3947E] transition-colors">
                  04. Supper Club Waitlist (Seasonal Drops)
                </a>
              </StaggerItem>
              <StaggerItem>
                <a href="#private-events" className="hover:text-[#F3947E] transition-colors">
                  05. Private Events & Bespoke Dining
                </a>
              </StaggerItem>
              <StaggerItem>
                <a href="#kitchen-diaries" className="hover:text-[#F3947E] transition-colors">
                  06. Kitchen Diaries & Seasonal Notes
                </a>
              </StaggerItem>
              <StaggerItem>
                <a href="#sample-menu" className="hover:text-[#F3947E] transition-colors">
                  07. Sample 6-Course Tasting Journey
                </a>
              </StaggerItem>
              <StaggerItem>
                <a href="#get-in-touch" className="hover:text-[#F3947E] transition-colors">
                  08. Get in Touch & Collaborations
                </a>
              </StaggerItem>
            </StaggerContainer>
          </div>

          {/* Connect & Host Desk */}
          <div className="md:col-span-3 space-y-4">
            <RevealHeading delay={0.15}>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FAFAF9] block">
                CONNECT
              </span>
            </RevealHeading>

            <RevealText delay={0.2}>
              <div className="space-y-2 text-xs text-[#A1A1AA] font-light">
                <p>Direct inquiries: <a href="mailto:hello@pichhutaaney.com" className="text-[#FAFAF9] underline hover:text-[#F3947E]">hello@pichhutaaney.com</a></p>
                <p>Instagram: <span className="text-[#FAFAF9]">@pichhutaaney</span></p>
                <p>Pop-ups & Seatings: Announced via Private Waitlist</p>
              </div>

              <div className="pt-3">
                <button
                  onClick={onOpenLedger}
                  className="inline-flex items-center space-x-2 px-4 py-2 text-[10px] uppercase tracking-widest font-semibold bg-[#853724] text-white hover:bg-white hover:text-[#18181B] transition-colors cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Host Inquiries Desk</span>
                </button>
              </div>
            </RevealText>
          </div>
        </div>

        {/* Sub-footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] uppercase tracking-widest text-[#71717A]">
          <div>
            © {new Date().getFullYear()} Pichhutaaney by Enakshi. Rooted in regional Indian terroirs.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center space-x-1.5 text-[#A1A1AA] hover:text-[#FAFAF9] transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
